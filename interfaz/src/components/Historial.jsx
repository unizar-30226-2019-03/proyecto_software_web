import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVertical from "./ListaVertical";
import imagenPrueba from "../assets/landscape.jpg";
import Popup from "reactjs-popup";
import { FormCheck } from "react-bootstrap";
import { Notificacion } from "./Listas";

const list = [
  {
    name: "La paradoja de los Gemelos RESUELTA!",
    canal: "Asignatura A",
    image: imagenPrueba
  },
  {
    name: "La tierra no gira en círculos aleredor del SOL",
    canal: "Asignatura B",
    image: imagenPrueba
  },
  {
    name: "¿ Cómo será el futuro de la física ?",
    canal: "Asignatura C",
    image: imagenPrueba
  },
  {
    name: "10 cosas que no sabías del SISTEMA SOLAR",
    canal: "Asignatura D",
    image: imagenPrueba
  },
  {
    name: "Física: ¿ Heroína o villana ?",
    canal: "Asignatura E",
    image: imagenPrueba
  },
  {
    name: "¿ Hasta donde llega el SISTEMA SOLAR ?",
    canal: "Asignatura F",
    image: imagenPrueba
  },
  {
    name: "Las 8 ecuaciones más importantes de la física",
    canal: "Asignatura G",
    image: imagenPrueba
  },
  {
    name: "La psicología de los genios",
    canal: "Asignatura H",
    image: imagenPrueba
  },
  {
    name: "Superhéroes y radioactividad",
    canal: "Asignatura I",
    image: imagenPrueba
  }
];

const listasRepro = [
  "Lista de reproducción 1",
  "Lista de reproducción 2",
  "Lista de reproducción 3",
  "Lista de reproducción 4",
  "Lista de reproduccióndasds aadsasdsadasadsdasdasasddasdsaddsadas 5"
];

function RemoveAccents(str) {
  var accents =
    "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
  var accentsOut =
    "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  str = str.split("");
  var strLen = str.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(str[i])) !== -1) {
      str[i] = accentsOut[x];
    }
  }
  return str.join("");
}

class ContenidoPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listas: this.props.listaRepro,
      anyadido: false,
      lista: "",
      tiempo: 0,
      mensaje: "",
      crearLista: false,
      nombreNuevaLista: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
    this.actualizarNuevaLista = this.actualizarNuevaLista.bind(this);
    this.crearLista = this.crearLista.bind(this);
  }

  handleChange(e) {
    const item = e.target.value;
    const isChecked = e.target.checked;
    if (!isChecked) {
      //Eliminar De la lista item
      this.setState({
        anyadido: true,
        lista: "",
        mensaje: `ELIMINADO HISTORIAL DE ${item.toUpperCase()}`
      });
      this.iniciarReloj();
      console.log("Eliminar de: ", item);
    } else {
      //Añadir a la lista item
      this.setState({
        anyadido: true,
        lista: item,
        mensaje: `AÑADIDO HISTORIAL A ${item.toUpperCase()}`
      });
      this.iniciarReloj();
      console.log("Añadir a: ", item);
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
      this.setState({ anyadido: false });
    }
    this.setState({ tiempo: t + 1 });
  }

  actualizarNuevaLista(e) {
    e.preventDefault();
    this.setState({ nombreNuevaLista: e.target.value });
  }

  crearLista(e) {
    if (e.keyCode === 13) {
      //CREAR LA LISTA
      const item = this.state.nombreNuevaLista;
      var nuevasListas = this.state.listas.slice();
      nuevasListas.push(item);
      this.setState({
        nombreNuevaLista: "",
        crearLista: false,
        listas: nuevasListas
      });
    }
  }

  render() {
    return (
      <div>
        <div style={{ borderBottom: "1px solid lightgrey", fontWeight: "450" }}>
          Añadir historial a...
        </div>
        <div
          style={{
            paddingTop: "15px",
            fontSize: "14px",
            borderBottom: "1px solid lightgrey"
          }}
        >
          {this.state.listas.map(lista => {
            return (
              <FormCheck id={lista} key={lista}>
                <FormCheck.Input
                  type={"checkbox"}
                  value={lista}
                  onChange={this.handleChange}
                />
                <FormCheck.Label
                  style={{
                    marginBottom: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {lista}
                </FormCheck.Label>
              </FormCheck>
            );
          })}
        </div>
        <div
          style={{ paddingTop: "15px", fontSize: "14px", cursor: "default" }}
          onClick={() => this.setState({ crearLista: true })}
        >
          {!this.state.crearLista ? (
            "+ Crear nueva lista"
          ) : (
            <input
              style={{ border: "0", borderBottom: "1px solid lightgrey" }}
              placeholder="Nueva lista..."
              onChange={this.actualizarNuevaLista}
              onKeyDown={this.crearLista}
            />
          )}
        </div>
        <Notificacion
          mostrar={this.state.anyadido}
          mensaje={this.state.mensaje}
          deshacer={false}
        />
      </div>
    );
  }
}
class HistorialLista extends Component {
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
                placeholder={"Buscar en el historial de reproducción"}
              />
              <div
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical"
                }}
                onClick={this.props.borrar}
                className="tit-prof"
              >
                BORRAR TODO EL HISTORIAL
              </div>
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="right center"
                arrow={false}
                contentStyle={{
                  width: "250px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  border: "0",
                  marginLeft: "10px",
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
                    onClick={this.props.anyadir}
                    className="tit-prof"
                  >
                    AÑADIR TODOS LOS VÍDEOS A
                  </div>
                }
              >
                <ContenidoPopUp listaRepro={listasRepro} />
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
                placeholder={"Buscar en el historial de reproducción"}
              />
              <div
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={this.props.borrar}
                className="tit-prof"
              >
                BORRAR TODO EL HISTORIAL
              </div>
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
                    style={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={this.props.anyadir}
                    className="tit-prof"
                  >
                    AÑADIR TODOS LOS VÍDEOS A
                  </div>
                }
              >
                <ContenidoPopUp listaRepro={listasRepro} />
              </Popup>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class HistorialFiltrado extends Component {
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
                placeholder={"Buscar en el historial de reproducción"}
              />
              <div
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical"
                }}
                onClick={this.props.borrar}
                className="tit-prof"
              >
                BORRAR TODO EL HISTORIAL
              </div>
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="right center"
                arrow={false}
                contentStyle={{
                  width: "250px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  border: "0",
                  marginLeft: "10px",
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
                    onClick={this.props.anyadir}
                    className="tit-prof"
                  >
                    AÑADIR TODOS LOS VÍDEOS A
                  </div>
                }
              >
                <ContenidoPopUp listaRepro={listasRepro} />
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
                placeholder={"Buscar en el historial de reproducción"}
              />
              <div
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={this.props.borrar}
                className="tit-prof"
              >
                BORRAR TODO EL HISTORIAL
              </div>
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
                    style={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={this.props.anyadir}
                    className="tit-prof"
                  >
                    AÑADIR TODOS LOS VÍDEOS A
                  </div>
                }
              >
                <ContenidoPopUp listaRepro={listasRepro} />
              </Popup>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class HistorialListaBorrado extends Component {
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
                placeholder={"Buscar en el historial de reproducción"}
              />
              <div
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical"
                }}
                onClick={this.props.borrar}
                className="tit-prof"
              >
                BORRAR TODO EL HISTORIAL
              </div>
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="right center"
                arrow={false}
                contentStyle={{
                  width: "250px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  border: "0",
                  marginLeft: "10px",
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
                    onClick={this.props.anyadir}
                    className="tit-prof"
                  >
                    AÑADIR TODOS LOS VÍDEOS A
                  </div>
                }
              >
                <ContenidoPopUp listaRepro={listasRepro} />
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
                placeholder={"Buscar en el historial de reproducción"}
              />
              <div
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={this.props.borrar}
                className="tit-prof"
              >
                BORRAR TODO EL HISTORIAL
              </div>
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
                    style={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={this.props.anyadir}
                    className="tit-prof"
                  >
                    AÑADIR TODOS LOS VÍDEOS A
                  </div>
                }
              >
                <ContenidoPopUp listaRepro={listasRepro} />
              </Popup>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class Historial extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      fixed: window.innerWidth >= 970,
      busqueda: "",
      miHistorial: list,
      historialFiltrado: [],
      filtrado: false,
      borrado: false,
      nombreBorrado: "",
      tiempo: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.borrarHistorial = this.borrarHistorial.bind(this);
    this.buscarHistorial = this.buscarHistorial.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.anyadirHistorialA = this.anyadirHistorialA.bind(this);
    this.borrarVideo = this.borrarVideo.bind(this);
    this.anyadirVideoALista = this.anyadirHistorialA.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  borrarHistorial() {
    this.setState({ miHistorial: [], fixed: false });
  }

  anyadirHistorialA() {
    if (this.state.miHistorial.length > 0) {
      alert("AÑADIR A LISTA");
    }
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

  anyadirVideoALista(nombreVideo) {}

  borrarVideo(nombreVideo) {
    var nuevoHistorial = this.state.miHistorial.slice();
    const index = nuevoHistorial.findIndex(e => e.name === nombreVideo);
    nuevoHistorial.splice(index, 1);
    this.setState({
      miHistorial: nuevoHistorial,
      borrado: true,
      nombreBorrado: nombreVideo
    });
    this.iniciarReloj();
    if (this.state.filtrado) {
      //Borrar también de filtrado
      var nuevoFiltrado = this.state.historialFiltrado.slice();
      const index2 = nuevoFiltrado.findIndex(e => e.name === nombreVideo);
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
      this.setState({ borrado: false });
    }
    this.setState({ tiempo: t + 1 });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Historial</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={"historial"}
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
                Historial de reproducciones
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
              Historial vacío, conforme visualices vídeos se irán guardando
              aquí.
            </div>
          ) : !this.state.filtrado ? (
            !this.state.borrado ? (
              <HistorialLista
                fixed={this.state.fixed}
                borrar={this.borrarHistorial}
                handleChange={this.buscarHistorial}
                keyDown={this.keyDown}
                anyadir={this.anyadirHistorialA}
                historial={this.state.miHistorial}
                busqueda={this.state.busqueda}
                borrarVideo={this.borrarVideo}
                anyadirVideoALista={this.anyadirVideoALista}
              />
            ) : (
              <HistorialListaBorrado
                fixed={this.state.fixed}
                borrar={this.borrarHistorial}
                handleChange={this.buscarHistorial}
                keyDown={this.keyDown}
                anyadir={this.anyadirHistorialA}
                historial={this.state.miHistorial}
                busqueda={this.state.busqueda}
                borrarVideo={this.borrarVideo}
                anyadirVideoALista={this.anyadirVideoALista}
              />
            )
          ) : !this.state.borrado ? (
            <HistorialFiltrado
              fixed={this.state.fixed}
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              anyadir={this.anyadirHistorialA}
              historial={this.state.historialFiltrado}
              busqueda={this.state.busqueda}
              borrarVideo={this.borrarVideo}
              anyadirVideoALista={this.anyadirVideoALista}
            />
          ) : (
            <HistorialListaBorrado
              fixed={this.state.fixed}
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              anyadir={this.anyadirHistorialA}
              historial={this.state.historialFiltrado}
              busqueda={this.state.busqueda}
              borrarVideo={this.borrarVideo}
              anyadirVideoALista={this.anyadirVideoALista}
            />
          )}
        </div>
        <Notificacion
          mostrar={this.state.borrado}
          mensaje={`Vídeo ${this.state.nombreBorrado.toUpperCase()} eliminado del historial`}
          deshacer={false}
        />
      </div>
    );
  }
}

export default Historial;
