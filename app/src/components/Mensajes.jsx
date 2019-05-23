import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVerticalMensajes from "./ListaVerticalMensajes";
import { isSignedIn, getUserRole } from "../config/Auth";
import { Redirect, Link } from "react-router-dom";
import { getLastMessages } from "../config/MessageApi";

class MensajesLista extends Component {
  constructor(props) {
    super(props);
    this.state = { popUp: false, listaChats: this.props.chats };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listaChats: nextProps.chats });
  }

  abrirPopUp() {
    this.setState({ popUp: true });
  }

  cerrarPopUp() {
    this.setState({ popUp: false });
  }
  render() {
    return (
      <div>
        <div style={{ display: "block", marginRight: "70px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "25px"
            }}
          >
            <ListaVerticalMensajes lista={this.state.listaChats} />
          </div>
        </div>
      </div>
    );
  }
}

class Mensajes extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      misChats: []
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getData() {
    getLastMessages(data => {
      console.log(data);
    });
  }

  componentWillMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
            {this.state.misChats.length === 0 ? (
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
