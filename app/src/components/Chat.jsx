import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import Messages from "./Messages";
import { isSignedIn } from "../config/Auth";
import { Redirect, Link } from "react-router-dom";
import { getUser } from "../config/UserAPI";
import {
  getMessagesToReceiver,
  getMessagesFromSender,
  addMessage
} from "../config/MessageApi";
import { mergeSortedArray, parseNewMessages } from "../config/Process";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMargin: "300px",
      messages: [],
      receivedMessages: [],
      sentMessages: [],
      prof: "",
      page: 0,
      update: false
    };
    this.getUser = this.getUser.bind(this);
    this.getNewMessages = this.getNewMessages.bind(this);
    this.getAllFromSender = this.getAllFromSender.bind(this);
    this.getAllSent = this.getAllSent.bind(this);
    this.mergeMessages = this.mergeMessages.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getAllFromSender(0, []);
      this.getAllSent(0, []);
      this.getUser();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
  }

  componentDidUpdate() {
    if (this.state.update) {
      this.pararReloj();
      this.mergeMessages();
      this.iniciarReloj();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      console.log("HEEY");
      this.pararReloj();
      this.getAllFromSender(0, []);
      this.getAllSent(0, []);
      this.getUser();
    }
  }

  getUser() {
    getUser(this.props.match.params.id, data => {
      if (this._isMounted) {
        this.setState({ prof: data });
      }
    });
  }

  getAllFromSender(page, messages) {
    if (messages.length < 20 * page) {
      console.log("paramos", messages.length, page + 1);
      if (this._isMounted) {
        this.setState({ receivedMessages: messages });
      }
    } else {
      console.log("seguimos");
      getMessagesFromSender(
        parseInt(this.props.match.params.id),
        page,
        dataReceived => {
          const received = dataReceived.map(el => {
            el.fromMe = false;
            return el;
          });
          const newData = [...messages, ...received];
          this.getAllFromSender(page + 1, newData);
        }
      );
    }
  }

  getAllSent(page, messages) {
    if (messages.length < 20 * page) {
      console.log("paramos", messages.length, page);
      if (this._isMounted) {
        this.setState({ sentMessages: messages, update: true });
      }
    } else {
      console.log("seguimos");
      getMessagesToReceiver(
        parseInt(this.props.match.params.id),
        page,
        dataSent => {
          const sent = dataSent.map(el => {
            el.fromMe = true;
            return el;
          });
          const newData = [...messages, ...sent];
          this.getAllSent(page + 1, newData);
        }
      );
    }
  }

  mergeMessages() {
    const sent = this.state.sentMessages.slice();
    const received = this.state.receivedMessages.slice();
    const messages = mergeSortedArray(sent, received).reverse();
    if (this._isMounted) {
      this.setState({ messages: messages, update: false });
    }
  }

  getNewMessages() {
    getMessagesFromSender(
      parseInt(this.props.match.params.id),
      0,
      dataReceived => {
        let received = dataReceived.map(el => {
          el.fromMe = false;
          return el;
        });
        const newReceived = parseNewMessages(
          received,
          this.state.receivedMessages
        );
        getMessagesToReceiver(
          parseInt(this.props.match.params.id),
          0,
          dataSent => {
            const sent = dataSent.map(el => {
              el.fromMe = true;
              return el;
            });
            const newSent = parseNewMessages(sent, this.state.sentMessages);
            if (this._isMounted) {
              this.setState({
                sentMessages: newSent,
                update: true,
                receivedMessages: newReceived
              });
            }
          }
        );
      }
    );
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  sendHandler(message) {
    this.addMessage(message);
  }

  addMessage(message) {
    // Append the message to the component state
    const receiver = parseInt(this.props.match.params.id);
    addMessage(receiver, message, data => {
      if (data !== false) {
        data.fromMe = true;
        let newMessages = this.state.messages.slice();
        newMessages.push(data);
        this.setState({ messages: newMessages });
      }
    });
  }

  iniciarReloj() {
    this.timerID = setInterval(() => this.getNewMessages(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Chat | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={""}
          displaySide={true}
          hide={false}
          onChat={this.props.match.params.id}
        />
        <div
          className="transform"
          style={{
            position: "absolute",
            top: "80px",
            left: this.state.contentMargin,
            right: "70px",
            bottom: "0"
          }}
        >
          <div className="cabecera-asignatura">
            <Link
              to={
                this.state.prof.role === "ROLE_PROFESSOR"
                  ? `/profesor/${this.props.match.params.id}`
                  : `/chat/${this.props.match.params.id}`
              }
              className="titulo-asignatura"
              style={{
                color: "black",
                textDecoration: "none",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical"
              }}
            >
              <img
                src={this.state.prof.photo}
                alt="icono usuario"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="50"
                height="50"
              />
              {this.state.prof.surnames}, {this.state.prof.name}
            </Link>
          </div>
          <Messages messages={this.state.messages} onSend={this.sendHandler} />
        </div>
      </div>
    );
  }
}

export default Chat;
