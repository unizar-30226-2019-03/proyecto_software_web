import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import imagenUsuario from "../assets/user.png";
import Messages from './Messages';

require('../Chat.css');

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: '' };

    // React ES6 does not bind 'this' to event handlers by default
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
  }
  
  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    // Clear the input box
    this.setState({ chatInput: '' });

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.submitHandler}>
        <input type="text"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
      </form>
    );
  }
}

ChatInput.defaultProps = {
};

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
