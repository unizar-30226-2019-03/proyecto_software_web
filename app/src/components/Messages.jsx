/**
 * @fileoverview Fichero Messages.jsx donde se encuentra la clase
 * que renderiza la lista de mensajes de un chat.
 *
 * @author UniCast
 *
 * @requires ./Message.jsx:Message
 */

import React, { Component } from "react";
import Message from "./Message";

/**
 * Clase que gestiona el área de texto para que el usuario introduzca
 * el mensaje a enviar.
 * @extends Component
 */
class ChatInput extends Component {
  /**
   * Construye la clase ChatInput
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Number} props.width Ancho del componente
   */
  constructor(props) {
    super(props);
    this.state = { width: props.width };
    this.comentario = React.createRef();

    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ width: newProps.width });
  }

  /**
   * Envía un mensaje a un usuario por el chat.
   * @param {Event} event Evento que devuelve el formulario
   */
  submitHandler(event) {
    const comentario = this.comentario.current.value;
    if (comentario === "\n") {
      this.comentario.current.value = "";
    } else {
      if (comentario.length > 0) {
        if (event.keyCode === 13) {
          // Call the onSend callback with the chatInput message
          this.props.onSend(comentario);
          // Clear the input box
          this.comentario.current.value = "";
          event.preventDefault();
        }
      }
    }
  }

  render() {
    return (
      <textarea
        className="chat-input"
        style={{ width: this.state.width }}
        ref={this.comentario}
        onKeyDown={this.submitHandler}
      />
    );
  }
}

/**
 * Renderiza todos los mensajes de un chat entre dos usuarios.
 * @param {Array.<Object>} listaMensajes Lista de mensajes del chat
 */
const MensajesChat = listaMensajes =>
  listaMensajes.map((message, index) => {
    return (
      <Message
        key={message.id}
        message={message.text}
        timestamp={message.timestamp}
        fromMe={message.fromMe}
        id={`mensaje${index}`}
      />
    );
  });

/**
 * Clase que gestiona el listado de mensajes del chat
 * entre dos usuarios.
 * @extends Component
 */
class Messages extends Component {
  /**
   * Construye el componente Messages.
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.messages Lista de mensajes del chat
   */
  constructor(props) {
    super(props);
    this.state = { width: 0, fijarChat: false };
    this.mensajes = MensajesChat(props.messages);

    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.irAUltimoComentario = this.irAUltimoComentario.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.messages.length !== this.props.messages.length) {
      this.mensajes = MensajesChat(newProps.messages);
      this.setState({ fijarChat: false });
    }
  }

  /**
   * Recalcula el ancho en px que tiene que tener el área
   * de texto para que el usuario escriba un mensaje.
   */
  handleResize() {
    const w = document.getElementById("messageList").clientWidth - 40;
    this.setState({ width: w });
  }

  /**
   * Determina si dejar fija la lista de mensajes o no.
   * @param {Event} e Evento que devuelve el formulario
   */
  handleScroll(e) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    this.setState({ fijarChat: !bottom });
  }

  componentDidMount() {
    const w = document.getElementById("messageList").clientWidth - 40;
    window.addEventListener("resize", this.handleResize);
    this.setState({ width: w });
  }

  componentDidUpdate() {
    if (!this.state.fijarChat) {
      this.irAUltimoComentario();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  /**
   * Realiza un scroll hasta el último mensaje del chat.
   */
  irAUltimoComentario() {
    var element = document.getElementById(
      `mensaje${this.props.messages.length - 1}`
    );
    if (element !== null) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    return (
      <div>
        <div onScroll={this.handleScroll} className="messages" id="messageList">
          {this.mensajes}
        </div>
        <ChatInput onSend={this.props.onSend} width={this.state.width} />
      </div>
    );
  }
}

export default Messages;
