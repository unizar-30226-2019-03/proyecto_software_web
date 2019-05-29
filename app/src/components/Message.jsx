/**
 * @fileoverview Fichero Message.jsx donde se encuentra la clase
 * que renderiza un mensaje en la pantalla de Chat.
 *
 * @author UniCast
 *
 * @requires ../config/Process.jsx:parsearFecha
 */

import React, { Component } from "react";
import { parsearFecha } from "../config/Process";

/**
 * Clase que renderiza un mensaje en la pantalla de Chat.
 * @extends Component
 */
class Message extends Component {
  render() {
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

export default Message;
