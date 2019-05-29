/**
 * @fileoverview Fichero ListaVerticalProfes.jsx donde se encuentra la clase
 * que renderiza la lista vertical de profesores de un usuario.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Clase que renderiza un elemento de la lista de profesores
 * de un usuario.
 * @extends Component
 */
class MenuItem extends Component {
  render() {
    return (
      <div
        style={{
          marginBottom: "16px",
          display: "flex"
        }}
      >
        <div>
          <Link to={`/chat/${this.props.user.id}`}>
            <img
              src={this.props.user.photo}
              width="80"
              height="80"
              alt={this.props.user.username}
              style={{ borderRadius: "50%" }}
            />
          </Link>
        </div>
        <div style={{ marginTop: "0px" }}>
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
              to={`/chat/${this.props.user.id}`}
            >
              {this.props.user.name + " " + this.props.user.surnames}
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
                {this.props.user.username + ": " + this.props.user.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Renderiza la lista de profesores de un usuario
 * @param {Array.<Object>} list Lista de profesores de un usuario
 */
export const MenuVertical = list =>
  list.map(el => {
    return <MenuItem user={el} key={el.id} />;
  });

/**
 * Clase que gestiona la lista de profesores de un usuario
 * @extends Component
 */
class ListaVerticalProfes extends Component {
  /**
   * Construye el componente ListaVerticalProfes
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.lista Lista de profesores de un usuario
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

export default ListaVerticalProfes;
