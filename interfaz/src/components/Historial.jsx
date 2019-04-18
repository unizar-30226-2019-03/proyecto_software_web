import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVertical from "./ListaVertical";
import imagenPrueba from "../assets/landscape.jpg";

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

const HistorialLista = ({
  fixed,
  borrar,
  anyadir,
  handleChange,
  keyDown,
  historial,
  busqueda
}) => {
  return (
    <div>
      {!fixed ? (
        <div style={{ display: "block", marginRight: "70px" }}>
          <div className="profesores-asignatura">
            <input
              onChange={handleChange}
              onKeyDown={keyDown}
              defaultValue={busqueda}
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
              onClick={borrar}
              className="tit-prof"
            >
              BORRAR TODO EL HISTORIAL
            </div>
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
              onClick={anyadir}
              className="tit-prof"
            >
              AÑADIR TODOS LOS VÍDEOS A
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "25px"
              }}
            >
              <ListaVertical lista={historial} />
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
                <ListaVertical lista={historial} />
              </div>
            </div>
          </div>
          <div
            className="profesores-asignatura"
            style={{ position: "fixed", right: "70px" }}
          >
            <input
              onChange={handleChange}
              onKeyDown={keyDown}
              defaultValue={busqueda}
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
              onClick={borrar}
              className="tit-prof"
            >
              BORRAR TODO EL HISTORIAL
            </div>
            <div
              style={{ cursor: "pointer", fontSize: "14px" }}
              onClick={anyadir}
              className="tit-prof"
            >
              AÑADIR TODOS LOS VÍDEOS A
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HistorialFiltrado = ({
  fixed,
  borrar,
  anyadir,
  handleChange,
  keyDown,
  historial,
  busqueda
}) => {
  return (
    <div>
      {!fixed ? (
        <div style={{ display: "block", marginRight: "70px" }}>
          <div className="profesores-asignatura">
            <input
              onChange={handleChange}
              onKeyDown={keyDown}
              defaultValue={busqueda}
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
              onClick={borrar}
              className="tit-prof"
            >
              BORRAR TODO EL HISTORIAL
            </div>
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
              onClick={anyadir}
              className="tit-prof"
            >
              AÑADIR TODOS LOS VÍDEOS A
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "25px"
              }}
            >
              {historial.length > 0 ? (
                <ListaVertical lista={historial} />
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
                {historial.length > 0 ? (
                  <ListaVertical lista={historial} />
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
              onChange={handleChange}
              onKeyDown={keyDown}
              defaultValue={busqueda}
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
              onClick={borrar}
              className="tit-prof"
            >
              BORRAR TODO EL HISTORIAL
            </div>
            <div
              style={{ cursor: "pointer", fontSize: "14px" }}
              onClick={anyadir}
              className="tit-prof"
            >
              AÑADIR TODOS LOS VÍDEOS A
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

class Historial extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      fixed: window.innerWidth >= 900,
      busqueda: "",
      miHistorial: list,
      historialFiltrado: [],
      filtrado: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.borrarHistorial = this.borrarHistorial.bind(this);
    this.buscarHistorial = this.buscarHistorial.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.anyadirHistorialA = this.anyadirHistorialA.bind(this);
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

  handleResize() {
    if (this.state.miHistorial.length > 0) {
      if (window.innerWidth <= 900) {
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
            <HistorialLista
              fixed={this.state.fixed}
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              anyadir={this.anyadirHistorialA}
              historial={this.state.miHistorial}
              busqueda={this.state.busqueda}
            />
          ) : (
            <HistorialFiltrado
              fixed={this.state.fixed}
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              anyadir={this.anyadirHistorialA}
              historial={this.state.historialFiltrado}
              busqueda={this.state.busqueda}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Historial;
