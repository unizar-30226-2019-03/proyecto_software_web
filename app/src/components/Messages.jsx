import React from "react";
import Message from "./Message";

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: this.props.width };
    this.comentario = React.createRef();

    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ width: newProps.width });
  }

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

const MensajesChat = listaMensajes =>
  listaMensajes.map(message => {
    return (
      <Message
        key={message.id}
        message={message.text}
        timestamp={message.timestamp}
        fromMe={message.fromMe}
        id={message.id}
      />
    );
  });

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.mensajes = MensajesChat(this.props.messages);
    this.handleResize = this.handleResize.bind(this);
    this.irAUltimoComentario = this.irAUltimoComentario.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.mensajes = MensajesChat(newProps.messages);
  }

  handleResize() {
    const w = document.getElementById("messageList").clientWidth - 40;
    this.setState({ width: w });
  }

  componentDidMount() {
    const w = document.getElementById("messageList").clientWidth - 40;
    window.addEventListener("resize", this.handleResize);
    this.setState({ width: w });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  irAUltimoComentario() {
    var el = document.getElementById("messageList");
    if (el !== null) {
      el.scrollTop = el.scrollHeight;
    }
  }

  render() {
    return (
      <div>
        <div className="messages" id="messageList">
          {this.mensajes}
          {this.irAUltimoComentario()}
        </div>
        <ChatInput onSend={this.props.onSend} width={this.state.width} />
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
