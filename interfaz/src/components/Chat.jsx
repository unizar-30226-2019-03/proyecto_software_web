import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import imagenUsuario from "../assets/user.png";
import Messages from './Messages';
import ChatInput from './ChatInput';

require('../Chat.css');

class Chat extends Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
    
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Mensajes_profes</title>
          <style>{"body { background-color: #fafafa;Â }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={""}
          displaySide={true}
          hide={false}
        />
 <div
          className="transform"
          style={{
            marginLeft: "300px",
            marginTop: "80px"
          }}
        >
          <div>
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
            <Messages messages={this.state.messages} />
            <ChatInput onSend={this.sendHandler} /></div>
          </div>
    </div>
    );
  }
}

export default Chat;
