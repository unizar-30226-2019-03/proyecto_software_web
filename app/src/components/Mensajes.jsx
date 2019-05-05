import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVerticalMensajes from "./ListaVerticalMensajes";
import imagenUsuario from "../assets/user.png";
import Popup from "reactjs-popup";
import { Notificacion } from "./Listas";
import { RemoveAccents } from "../config/Procesar";
import { isSignedIn } from "../config/Auth";
import { Redirect, Link } from "react-router-dom";

const list = [
  {
    name: "Béjar Hernández, Ruben",
    image: imagenUsuario
  },
  {
    name: "Lacasta Miguel, Javier",
    image: imagenUsuario
  },
  {
    name: "Zarazaga Soria, F. Javier",
    image: imagenUsuario
  },
  {
    name: "Latre , Miguel Ángel",
    image: imagenUsuario
  },
  {
    name: "Nogueras, Javier",
    image: imagenUsuario
  },
  {
    name: "García Vallés, Fernando",
    image: imagenUsuario
  },
  {
    name: "Suárez Gracia, Darío",
    image: imagenUsuario
  },
  {
    name: "Lopez-Pellicer, Fracisco J.",
    image: imagenUsuario
  },
  {
    name: "Resano Ezcaray, Jesús Javier",
    image: imagenUsuario
  }
];

class MensajesLista extends Component {
  constructor(props) {
    super(props);
    this.state = { popUp: false, listaChats: this.props.historial };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listaChats: nextProps.historial });
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
        {!this.props.fixed ? (
          <div style={{ display: "block", marginRight: "70px" }}>
            <div className="profesores-asignatura">
              <input
                onChange={this.props.handleChange}
                onKeyDown={this.props.keyDown}
                defaultValue={this.props.busqueda}
                style={{
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  backgroundColor: "#fafafa",
                  borderWidth: "0px 0px 1px 0px",
                  borderColor: "lightgrey",
                  width: "calc(100% - 67%)",
                  color: "#00000080",
                  outline: "none"
                }}
                placeholder={"Buscar chat..."}
              />
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="bottom left"
                arrow={false}
                contentStyle={{
                  width: "250px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  marginTop: "10px",
                  border: "0",
                  zIndex: "200",
                  boxShadow:
                    "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                }}
                trigger={
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      width: "fit-content"
                    }}
                    className="tit-prof"
                  >
                    BORRAR TODOS LOS CHATS
                  </div>
                }
              >
                <div style={{ padding: "5px 10px" }}>
                  <div
                    style={{
                      fontWeight: "550",
                      fontSize: "16px",
                      borderBottom: "1px solid lightgrey"
                    }}
                  >
                    ¿Estás seguro?
                  </div>
                  <div style={{ fontSize: "13px", paddingTop: "10px" }}>
                    Una vez eliminados no habrá vuelta atrás.
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                      width: "fit-content",
                      height: "fit-content",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      this.cerrarPopUp();
                      this.props.borrar();
                    }}
                  >
                    Sí, eliminar
                  </div>
                </div>
              </Popup>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "25px"
                }}
              >
                <ListaVerticalMensajes
                  lista={this.state.listaChats}
                  borrar={this.props.borrarMensaje}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", marginRight: "70px" }}>
            <div style={{ paddingRight: "300px" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "25px"
                  }}
                >
                  <ListaVerticalMensajes
                    lista={this.state.listaChats}
                    borrar={this.props.borrarMensaje}
                  />
                </div>
              </div>
            </div>
            <div
              className="profesores-asignatura"
              style={{ position: "fixed", right: "70px" }}
            >
              <input
                onChange={this.props.handleChange}
                onKeyDown={this.props.keyDown}
                defaultValue={this.props.busqueda}
                style={{
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  backgroundColor: "#fafafa",
                  borderWidth: "0px 0px 1px 0px",
                  borderColor: "lightgrey",
                  width: "100%",
                  color: "#00000080",
                  outline: "none"
                }}
                placeholder={"Buscar chat..."}
              />
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="bottom center"
                arrow={false}
                contentStyle={{
                  width: "250px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  border: "0",
                  marginTop: "10px",
                  zIndex: "200",
                  boxShadow:
                    "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                }}
                trigger={
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                    className="tit-prof"
                  >
                    BORRAR TODOS LOS CHATS
                  </div>
                }
              >
                <div style={{ padding: "5px 10px" }}>
                  <div
                    style={{
                      fontWeight: "550",
                      fontSize: "16px",
                      borderBottom: "1px solid lightgrey"
                    }}
                  >
                    ¿Estás seguro?
                  </div>
                  <div style={{ fontSize: "13px", paddingTop: "10px" }}>
                    Una vez eliminados no habrá vuelta atrás.
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                      width: "fit-content",
                      height: "fit-content",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      this.cerrarPopUp();
                      this.props.borrar();
                    }}
                  >
                    Sí, eliminar
                  </div>
                </div>
              </Popup>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class Mensajes extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      fixed: window.innerWidth >= 970,
      busqueda: "",
      miHistorial: list,
      historialFiltrado: [],
      filtrado: false,
      notif: false,
      mensajeNotif: "",
      tiempo: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.borrarHistorial = this.borrarHistorial.bind(this);
    this.buscarHistorial = this.buscarHistorial.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.borrarMensaje = this.borrarMensaje.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  borrarHistorial() {
    this.setState({ miHistorial: [], fixed: false });
  }

  buscarHistorial(e) {
    e.preventDefault();
    this.setState({ busqueda: e.target.value });
    if (e.target.value === "") {
      this.setState({ historialFiltrado: [], filtrado: false });
    }
  }

  keyDown(e) {
    if (this.state.busqueda !== "") {
      if (e.keyCode === 13) {
        const palabras = this.state.busqueda.split(" ");
        var resultado = [];
        this.state.miHistorial.forEach(e => {
          const { name, image } = e;
          for (let index = 0; index < palabras.length; index++) {
            const element = palabras[index];
            if (
              RemoveAccents(name)
                .toLowerCase()
                .includes(RemoveAccents(element).toLowerCase())
            ) {
              resultado.push({ name, image });
              break;
            }
          }
        });
        this.setState({ historialFiltrado: resultado, filtrado: true });
      }
    }
  }

  borrarMensaje(nombreMensaje) {
    var nuevoHistorial = this.state.miHistorial.slice();
    const index = nuevoHistorial.findIndex(e => e.name === nombreMensaje);
    nuevoHistorial.splice(index, 1);
    this.setState({
      miHistorial: nuevoHistorial,
      notif: true,
      mensajeNotif: `Chat ${nombreMensaje.toUpperCase()} eliminado de mensajes`
    });

    if (this.state.filtrado) {
      //Borrar también de filtrado
      var nuevoFiltrado = this.state.historialFiltrado.slice();
      const index2 = nuevoFiltrado.findIndex(e => e.name === nombreMensaje);
      if (index2 !== -1) {
        //Borrarlo
        nuevoFiltrado.splice(index2, 1);
        this.setState({ historialFiltrado: nuevoFiltrado });
      }
    }
  }

  handleResize() {
    if (this.state.miHistorial.length > 0) {
      if (window.innerWidth <= 970) {
        this.setState({ fixed: false });
      } else {
        this.setState({ fixed: true });
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    this.pararReloj();
    window.removeEventListener("resize", this.handleResize);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
  }

  tick() {
    let t = this.state.tiempo;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempo: t + 1 });
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Mensajes</title>
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
            {this.state.miHistorial.length === 0 ? (
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
              <MensajesLista
                fixed={this.state.fixed}
                borrar={this.borrarHistorial}
                handleChange={this.buscarHistorial}
                keyDown={this.keyDown}
                anyadir={this.anyadirHistorialA}
                historial={
                  !this.state.filtrado
                    ? this.state.miHistorial
                    : this.state.historialFiltrado
                }
                busqueda={this.state.busqueda}
                borrarMensaje={this.borrarMensaje}
              />
            )}
          </div>
          <Notificacion
            mostrar={this.state.notif}
            mensaje={this.state.mensajeNotif}
            deshacer={false}
          />
        </div>
      </div>
    );
  }
}

export default Mensajes;
