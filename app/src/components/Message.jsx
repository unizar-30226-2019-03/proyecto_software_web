import React from "react";
import { parsearFecha } from "../config/Process";

class Message extends React.Component {
  render() {
    //Dependiendo de si es mensaje escrito por mi o no va en un lado o en otro
    const fromMe = this.props.fromMe ? "from-me" : "";
    return (
      <div className={`message ${fromMe}`} id={this.props.id}>
        <div className="message-body">
          {this.props.message}
          <div className="timestamp-message">
            {parsearFecha(this.props.timestamp)}
          </div>
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: "",
  fromMe: false
};

export default Message;
