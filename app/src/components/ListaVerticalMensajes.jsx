/**
 * @fileoverview Fichero ListaVerticalMensajes.jsx donde se encuentra la clase
 * que renderiza la lista vertical de mensajes.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../config/Auth.jsx:getUserId
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUserID } from "../config/Auth";

/**
 * Clase que renderiza un elemento de la lista de mensajes con profesores
 * @extends Component
 */
class MenuItem extends Component {
  render() {
    const usuario =
      parseInt(this.props.chat.sender.id) === getUserID()
        ? this.props.chat.receiver
        : this.props.chat.sender;

    return (
      <div
        style={{
          marginBottom: "16px",
          display: "flex"
        }}
      >
        <div style={{ flex: "10%" }}>
          <Link to={`/chat/${usuario.id}`}>
            <img
              src={usuario.photo}
              width="80"
              height="80"
              alt={usuario.username}
              style={{ borderRadius: "50%" }}
            />
          </Link>
        </div>
        <div style={{ flex: "90%" }}>
          <div
            style={{
              marginLeft: "10px",
              lineHeight: "normal",
              marginBottom: "8px"
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                fontWeight: "400",
                wordWrap: "break-word",
                width: "90%"
              }}
              to={`/chat/${usuario.id}`}
            >
              {usuario.name + " " + usuario.surnames}
            </Link>
          </div>
          <div
            style={{
              marginLeft: "10px",
              lineHeight: "normal",
              marginBottom: "3px"
            }}
          >
            <div style={{ marginTop: "10px", width: "90%" }}>
              <div
                style={{
                  textDecoration: "none",
                  color: "#00000080",
                  fontSize: "12px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  fontWeight: "500"
                }}
              >
                {this.props.chat.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Renderiza la lista de mensajes con profesores
 * @param {Array.<Object>} list Lista de mensajes de profesores
 */
export const MenuVertical = list =>
  list.map(el => {
    return <MenuItem key={el.id} chat={el} />;
  });

/**
 * Clase que gestiona la lista de mensajes con profesores
 * @extends Component
 */
class ListaVerticalMensajes extends Component {
  /**
   * Construye el componente ListaVerticalMensajes
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.lista Lista de mensajes con profesores
   */
  constructor(props) {
    super(props);
    this.menu = MenuVertical(props.lista);
  }

  componentWillReceiveProps(newProps) {
    this.menu = MenuVertical(newProps.lista);
  }

  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVerticalMensajes;
