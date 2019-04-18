import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVertical from "./ListaVertical";

const HistorialFixed = ({ borrar, anyadir, handleChange, keyDown }) => {
  return (
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
            <ListaVertical />
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
  );
};

const HistorialPequenyo = ({ borrar, anyadir, handleChange, keyDown }) => {
  return (
    <div style={{ display: "block", marginRight: "70px" }}>
      <div className="profesores-asignatura">
        <input
          onChange={handleChange}
          onKeyDown={keyDown}
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
          <ListaVertical />
        </div>
      </div>
    </div>
  );
};

class Historial extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      fixed: window.innerWidth >= 900,
      busqueda: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.borrarHistorial = this.borrarHistorial.bind(this);
    this.buscarHistorial = this.buscarHistorial.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.anyadirHistorialA = this.anyadirHistorialA.bind(this);
  }

  borrarHistorial() {
    alert("BORRAR TODO :O");
  }

  anyadirHistorialA() {
    alert("AÑADIR A LISTA");
  }

  buscarHistorial(e) {
    e.preventDefault();
    this.setState({ busqueda: e.target.value });
  }

  keyDown(e) {
    if (e.keyCode === 13) {
      alert("Filtrar con búsqueda: " + this.state.busqueda);
    }
  }

  handleResize() {
    if (window.innerWidth <= 900) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
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
          </div>
          {this.state.fixed ? (
            <HistorialFixed
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              anyadir={this.anyadirHistorialA}
            />
          ) : (
            <HistorialPequenyo
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              anyadir={this.anyadirHistorialA}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Historial;
