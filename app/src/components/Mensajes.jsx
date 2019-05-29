/**
 * @fileoverview Fichero Mensajes.jsx donde se encuentra la clase
 * que renderiza la pantalla de la lista de chats abiertos de un usuario.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ./ListaVerticalMensajes.jsx:ListaVerticalMensajes
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../config/MessageAPI.jsx:getLastMessages
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVerticalMensajes from "./ListaVerticalMensajes";
import { isSignedIn, getUserRole } from "../config/Auth";
import { Redirect, Link } from "react-router-dom";
import { getLastMessages } from "../config/MessageApi";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Clase que gestiona la lista de chats activos de un usuario.
 * @extends Component
 */
class MensajesLista extends Component {
  /**
   * Construye el componente MensajesLista
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.chats Lista de chats activos de un usuario
   */
  constructor(props) {
    super(props);
    this.state = { listaChats: props.chats };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listaChats: nextProps.chats });
  }

  render() {
    return (
      <div>
        <div style={{ display: "block", marginRight: "70px" }}>
          <div style={{ marginTop: "25px" }}>
            <ListaVerticalMensajes lista={this.state.listaChats} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Clase que gestiona la pantalla de la lista de chats
 * de un usuario.
 * @extends Component
 */
class Mensajes extends Component {
  /**
   * Construye el componente Mensajes
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      misChats: [],
      mostrarSpin: true
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Obtiene la lista de los chats activos de un usuario.
   */
  getData() {
    getLastMessages(data => {
      if (this._isMounted) {
        this.setState({ misChats: data, mostrarSpin: false });
      }
    });
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

  /**
   * Ajusta el contenido a la barra lateral.
   * @param {Boolean} display Determina si desplazar contenido o no
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/mensajes`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Mensajes | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={""}
          displaySide={true}
          hide={false}
        />
        <div
          className="transform"
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "80px"
          }}
        >
          <div>
            <div style={{ marginBottom: "10px" }}>
              <Link
                to="/mensajes"
                className="link-mensajes-activo"
                style={{ color: "black" }}
              >
                {"Mensajes"}
              </Link>
              <Link
                to="/mensajes-profesores"
                className="link-mensajes"
                style={{ textDecoration: "none", color: "black" }}
              >
                {"Profesores"}
              </Link>
            </div>
            {this.state.mostrarSpin ? (
              <LoadingSpinUniCast className="spin-ranking" />
            ) : this.state.misChats.length === 0 ? (
              <div
                style={{
                  color: "#00000080",
                  padding: "10px",
                  fontSize: "14px",
                  textAlign: "center"
                }}
              >
                No hay chats actualmente.
              </div>
            ) : (
              <MensajesLista chats={this.state.misChats} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Mensajes;
