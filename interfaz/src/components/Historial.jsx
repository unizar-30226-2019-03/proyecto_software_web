import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVertical from "./ListaVertical";

const HistorialFixed = () => {
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
        <div
          style={{ cursor: "pointer", fontSize: "14px" }}
          onClick={() => alert("e")}
          className="tit-prof"
        >
          BORRAR TODO EL HISTORIAL
        </div>
        <div
          style={{ cursor: "pointer", fontSize: "14px" }}
          onClick={() => alert("e")}
          className="tit-prof"
        >
          AÑADIR TODOS LOS VÍDEOS A
        </div>
      </div>
    </div>
  );
};

const HistorialPequenyo = () => {
  return (
    <div style={{ display: "block", marginRight: "70px" }}>
      <div className="profesores-asignatura">
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
          onClick={() => alert("e")}
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
          onClick={() => alert("e")}
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
      fixed: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
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
          {this.state.fixed ? HistorialFixed() : HistorialPequenyo()}
        </div>
      </div>
    );
  }
}

export default Historial;
