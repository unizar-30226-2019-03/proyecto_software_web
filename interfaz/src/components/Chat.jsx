import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import imagenUsuario from "../assets/user.png";
import Messages from "./Messages";
import { sesionValida, getUser } from "../App";
import { Redirect } from "react-router-dom";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { contentMargin: "300px", messages: [], me: true };
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      username: getUser(),
      message
    };
    messageObject.fromMe = this.state.me;
    this.setState({ me: !this.state.me });
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const nuevosMensages = this.state.messages.slice();
    nuevosMensages.push(message);
    this.setState({ messages: nuevosMensages });
  }

  render() {
    return !sesionValida() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Chat</title>
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
            <div className="titulo-asignatura">
              <img
                src={imagenUsuario}
                alt="icono usuario"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="60"
                height="40"
              />
              Béjar Hernández, Ruben
            </div>
          </div>
          <Messages messages={this.state.messages} onSend={this.sendHandler} />
        </div>
      </div>
    );
  }
}

export default Chat;
