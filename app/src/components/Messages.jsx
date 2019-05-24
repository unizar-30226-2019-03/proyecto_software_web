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

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, fijarChat: false };
    this.mensajes = MensajesChat(this.props.messages);
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

  handleResize() {
    const w = document.getElementById("messageList").clientWidth - 40;
    this.setState({ width: w });
  }

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

Messages.defaultProps = {
  messages: []
};

export default Messages;
