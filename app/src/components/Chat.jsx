import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import Messages from "./Messages";
import { isSignedIn } from "../config/Auth";
import { Redirect, Link } from "react-router-dom";
import { getUser } from "../config/UserAPI";
import {
  enviarMensaje,
  mensajesPropios,
  mensajesRecibidos
} from "../config/MensajesAPI";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { contentMargin: "300px", messages: [], prof: "" };
    this.getData = this.getData.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData() {
    getUser(this.props.match.params.id, data => {
      if (this._isMounted) {
        this.setState({ prof: data });
        mensajesPropios(
          Number.parseInt(this.props.match.params.id),
          mensajes => {
            console.log(mensajes);
          }
        );
        mensajesRecibidos(
          Number.parseInt(this.props.match.params.id),
          mensajes => {
            console.log(mensajes);
          }
        );
      }
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
    enviarMensaje(Number.parseInt(this.state.prof.id), message.message);
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Chat</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        {console.log(this.state)}
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
