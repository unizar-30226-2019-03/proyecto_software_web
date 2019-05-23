import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import Messages from "./Messages";
import { isSignedIn } from "../config/Auth";
import { Redirect, Link } from "react-router-dom";
import { getUser } from "../config/UserAPI";
import {
  getMessagesToReceiver,
  getMessagesFromSender
} from "../config/MessageApi";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMargin: "300px",
      messagesReceived: [],
      messagesSent: [],
      prof: "",
      page: 0
    };
    this.getUser = this.getUser.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getUser();
      this.getMessages(0);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUser() {
    getUser(this.props.match.params.id, data => {
      if (this._isMounted) {
        this.setState({ prof: data });
      }
    });
  }

  getMessages(page) {
    getMessagesFromSender(parseInt(this.props.match.params.id), page, data => {
      console.log(data);
    });
    getMessagesToReceiver(parseInt(this.props.match.params.id), page, data => {
      console.log(data);
    });
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  sendHandler(message) {
    const messageObject = {
      message: message,
      fromMe: true
    };
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const nuevosMensages = this.state.messages.slice();
    nuevosMensages.push(message);
    this.setState({ messages: nuevosMensages });
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
              to={`/profesor/${this.props.match.params.nombre}`}
              className="titulo-asignatura"
              style={{ color: "black", textDecoration: "none" }}
            >
              <img
                src={this.state.prof.photo}
                alt="icono usuario"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="60"
                height="40"
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
