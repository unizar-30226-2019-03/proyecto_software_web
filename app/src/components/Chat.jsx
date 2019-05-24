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
import { mergeSortedArray } from "../config/Process";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMargin: "300px",
      messages: [],
      prof: "",
      page: 0
    };
    this.getUser = this.getUser.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getUser();
      this.getMessages(0, true);
      this.iniciarReloj();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
  }

  getUser() {
    getUser(this.props.match.params.id, data => {
      if (this._isMounted) {
        this.setState({ prof: data });
      }
    });
  }

  getMessages(page, updatePage) {
    getMessagesFromSender(
      parseInt(this.props.match.params.id),
      page,
      dataReceived => {
        const received = dataReceived.map(el => {
          el.fromMe = false;
          return el;
        });
        getMessagesToReceiver(
          parseInt(this.props.match.params.id),
          page,
          dataSent => {
            const sent = dataSent.map(el => {
              el.fromMe = true;
              return el;
            });
            const messages = mergeSortedArray(sent, received).reverse();
            if (this._isMounted) {
              this.setState({
                messages: messages,
                page: updatePage ? page + 1 : this.state.page
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
    this.timerID = setInterval(() => this.getMessages(0, false), 1000);
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
              style={{ color: "black", textDecoration: "none" }}
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
