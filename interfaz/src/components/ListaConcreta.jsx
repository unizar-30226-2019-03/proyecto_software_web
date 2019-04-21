import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVertical from "./ListaVertical";
import imagenPrueba from "../assets/landscape.jpg";
import { Notificacion } from "./Listas";
import { RemoveAccents } from "./Historial";
import Popup from "reactjs-popup";
import { getTime } from "./ViendoVideo";
import { sesionValida } from "../App";

const list = [
  {
    name: "La paradoja de los Gemelos RESUELTA!",
    canal: "Asignatura A",
    image: imagenPrueba,
    duracion: getTime(500)
  },
  {
    name: "La tierra no gira en círculos aleredor del SOL",
    canal: "Asignatura B",
    image: imagenPrueba,
    duracion: getTime(600)
  },
  {
    name: "¿ Cómo será el futuro de la física ?",
    canal: "Asignatura C",
    image: imagenPrueba,
    duracion: getTime(700)
  },
  {
    name: "10 cosas que no sabías del SISTEMA SOLAR",
    canal: "Asignatura D",
    image: imagenPrueba,
    duracion: getTime(800)
  },
  {
    name: "Física: ¿ Heroína o villana ?",
    canal: "Asignatura E",
    image: imagenPrueba,
    duracion: getTime(900)
  },
  {
    name: "¿ Hasta donde llega el SISTEMA SOLAR ?",
    canal: "Asignatura F",
    image: imagenPrueba,
    duracion: getTime(1000)
  },
  {
    name: "Las 8 ecuaciones más importantes de la física",
    canal: "Asignatura G",
    image: imagenPrueba,
    duracion: getTime(1100)
  },
  {
    name: "La psicología de los genios",
    canal: "Asignatura H",
    image: imagenPrueba,
    duracion: getTime(1200)
  },
  {
    name: "Superhéroes y radioactividad",
    canal: "Asignatura I",
    image: imagenPrueba,
    duracion: getTime(1300)
  }
];

const listasRepro = [
  "Lista de reproducción 1",
  "Lista de reproducción 2",
  "Lista de reproducción 3",
  "Lista de reproducción 4",
  "Lista de reproduccióndasds aadsasdsadasadsdasdasasddasdsaddsadas 5"
];

class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = { popUp: false };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
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
                  color: "#00000080"
                }}
                placeholder={"Buscar en la lista de reproducción"}
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
                    BORRAR LA LISTA COMPLETA
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
                    Una vez eliminada no habrá vuelta atrás.
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
                <ListaVertical
                  lista={this.props.historial}
                  anyadirALista={this.props.anyadirVideoALista}
                  borrar={this.props.borrarVideo}
                  listaRepro={listasRepro}
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
                  <ListaVertical
                    lista={this.props.historial}
                    anyadirALista={this.props.anyadirVideoALista}
                    borrar={this.props.borrarVideo}
                    listaRepro={listasRepro}
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
                  color: "#00000080"
                }}
                placeholder={"Buscar en la lista de reproducción"}
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
                    BORRAR LA LISTA COMPLETA
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
                    Una vez eliminada no habrá vuelta atrás.
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

class ListaFiltrada extends Component {
  constructor(props) {
    super(props);
    this.state = { popUp: false };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
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
                  color: "#00000080"
                }}
                placeholder={"Buscar en la lista de reproducción"}
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
                    BORRAR LA LISTA COMPLETA
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
                    Una vez eliminada no habrá vuelta atrás.
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
                {this.props.historial.length > 0 ? (
                  <ListaVertical
                    lista={this.props.historial}
                    anyadirALista={this.props.anyadirVideoALista}
                    borrar={this.props.borrarVideo}
                    listaRepro={listasRepro}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    Ningún título coincide con la consulta.
                  </div>
                )}
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
                  {this.props.historial.length > 0 ? (
                    <ListaVertical
                      lista={this.props.historial}
                      anyadirALista={this.props.anyadirVideoALista}
                      borrar={this.props.borrarVideo}
                      listaRepro={listasRepro}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: "14px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      Ningún título coincide con la consulta.
                    </div>
                  )}
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
                  color: "#00000080"
                }}
                placeholder={"Buscar en la lista de reproducción"}
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
                    BORRAR LA LISTA COMPLETA
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
                    Una vez eliminada no habrá vuelta atrás.
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

class ListaBorrada extends Component {
  constructor(props) {
    super(props);
    this.state = { popUp: false };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
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
                  color: "#00000080"
                }}
                placeholder={"Buscar en la lista de reproducción"}
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
                    BORRAR LA LISTA COMPLETA
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
                    Una vez eliminada no habrá vuelta atrás.
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
                {this.props.historial.length > 0 ? (
                  <ListaVertical
                    lista={this.props.historial}
                    anyadirALista={this.props.anyadirVideoALista}
                    borrar={this.props.borrarVideo}
                    listaRepro={listasRepro}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    Ningún título coincide con la consulta.
                  </div>
                )}
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
                  {this.props.historial.length > 0 ? (
                    <ListaVertical
                      lista={this.props.historial}
                      anyadirALista={this.props.anyadirVideoALista}
                      borrar={this.props.borrarVideo}
                      listaRepro={listasRepro}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: "14px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      Ningún título coincide con la consulta.
                    </div>
                  )}
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
                  color: "#00000080"
                }}
                placeholder={"Buscar en la lisa de reproducción"}
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
                    BORRAR LA LISTA COMPLETA
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
                    Una vez eliminada no habrá vuelta atrás.
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

class ListaConcreta extends Component {
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
      videoBorrado: null,
      tiempo: 0,
      mensajeNotif: "",
      borrado: false,
      deshacer: false,
      borradoCompleto: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.borrarHistorial = this.borrarHistorial.bind(this);
    this.buscarHistorial = this.buscarHistorial.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.anyadirVideoALista = this.anyadirVideoALista.bind(this);
    this.borrarVideo = this.borrarVideo.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
    this.deshacer = this.deshacer.bind(this);
  }

  deshacer() {
    const { v, index, index2 } = this.state.videoBorrado;
    var nuevoHistorial = this.state.miHistorial.slice();
    nuevoHistorial.splice(index, 0, v);
    this.setState({
      videoBorrado: null,
      miHistorial: nuevoHistorial,
      notif: false,
      borrado: false
    });
    if (index2 !== -1) {
      //Deshacer en el filtrado también
      var nuevoHistorialFiltrado = this.state.historialFiltrado.slice();
      nuevoHistorialFiltrado.splice(index2, 0, v);
      this.setState({ historialFiltrado: nuevoHistorialFiltrado });
    }
    clearInterval(this.timerID);
  }

  borrarHistorial() {
    //Borrar la lista en el servidor
    this.setState({ borradoCompleto: true });
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
          const { name, canal, image } = e;
          for (let index = 0; index < palabras.length; index++) {
            const element = palabras[index];
            if (
              RemoveAccents(name)
                .toLowerCase()
                .includes(RemoveAccents(element).toLowerCase())
            ) {
              resultado.push({ name, canal, image });
              break;
            }
          }
        });
        this.setState({ historialFiltrado: resultado, filtrado: true });
      }
    }
  }

  anyadirVideoALista(nombreVideo, mensaje, lista, anyadir) {
    //Añadir o borrar de la lista lista, dependiendo del parametro anyadir
    if (anyadir) {
      //Añadir el video
    } else {
      //Borrar el video
    }
    this.setState({ notif: true, mensajeNotif: mensaje, deshacer: false });
    this.iniciarReloj();
  }

  borrarVideo(nombreVideo) {
    var nuevoHistorial = this.state.miHistorial.slice();
    const index = nuevoHistorial.findIndex(e => e.name === nombreVideo);
    const v = nuevoHistorial[index];
    var index2 = -1;
    nuevoHistorial.splice(index, 1);
    this.setState({
      miHistorial: nuevoHistorial,
      notif: true,
      deshacer: true,
      borrado: true,
      videoBorrado: { v, index, index2 },
      mensajeNotif: `Vídeo ${nombreVideo.toUpperCase()} eliminado de la lista`
    });
    this.iniciarReloj();
    if (this.state.filtrado) {
      //Borrar también de filtrado
      var nuevoFiltrado = this.state.historialFiltrado.slice();
      index2 = nuevoFiltrado.findIndex(e => e.name === nombreVideo);
      if (index2 !== -1) {
        //Borrarlo
        nuevoFiltrado.splice(index2, 1);
        this.setState({
          historialFiltrado: nuevoFiltrado,
          videoBorrado: { v, index, index2 }
        });
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
      this.setState({ contentMargin: "70px" });
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
      this.setState({ notif: false, borrado: false });
    }
    this.setState({ tiempo: t + 1 });
  }

  render() {
    return !sesionValida() ? (
      <Redirect to="/" />
    ) : (
      <div>
        {this.state.borradoCompleto ? (
          <Redirect to="/listas" />
        ) : (
          <div>
            <Helmet>
              <title>Lista</title>
              <style>{"body { background-color: #fafafa; }"}</style>
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
              <div className="cabecera-asignatura">
                <div>
                  <h5 style={{ fontWeight: "bold" }}>
                    {this.props.match.params.nombre}
                  </h5>
                </div>
              </div>{" "}
              {this.state.miHistorial.length === 0 ? (
                <div
                  style={{
                    color: "#00000080",
                    padding: "10px",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                >
                  Lista vacía, añade vídeos a esta lista para agurparlos.
                </div>
              ) : !this.state.filtrado ? (
                !this.state.borrado ? (
                  <Lista
                    fixed={this.state.fixed}
                    borrar={this.borrarHistorial}
                    handleChange={this.buscarHistorial}
                    keyDown={this.keyDown}
                    historial={this.state.miHistorial}
                    busqueda={this.state.busqueda}
                    borrarVideo={this.borrarVideo}
                    anyadirVideoALista={this.anyadirVideoALista}
                  />
                ) : (
                  <ListaBorrada
                    fixed={this.state.fixed}
                    borrar={this.borrarHistorial}
                    handleChange={this.buscarHistorial}
                    keyDown={this.keyDown}
                    historial={this.state.miHistorial}
                    busqueda={this.state.busqueda}
                    borrarVideo={this.borrarVideo}
                    anyadirVideoALista={this.anyadirVideoALista}
                  />
                )
              ) : !this.state.borrado ? (
                <ListaFiltrada
                  fixed={this.state.fixed}
                  borrar={this.borrarHistorial}
                  handleChange={this.buscarHistorial}
                  keyDown={this.keyDown}
                  historial={this.state.historialFiltrado}
                  busqueda={this.state.busqueda}
                  borrarVideo={this.borrarVideo}
                  anyadirVideoALista={this.anyadirVideoALista}
                />
              ) : (
                <ListaBorrada
                  fixed={this.state.fixed}
                  borrar={this.borrarHistorial}
                  handleChange={this.buscarHistorial}
                  keyDown={this.keyDown}
                  historial={this.state.historialFiltrado}
                  busqueda={this.state.busqueda}
                  borrarVideo={this.borrarVideo}
                  anyadirVideoALista={this.anyadirVideoALista}
                />
              )}
            </div>
            <Notificacion
              mostrar={this.state.notif}
              mensaje={this.state.mensajeNotif}
              deshacer={this.state.deshacer}
              handleClick={this.deshacer}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ListaConcreta;
