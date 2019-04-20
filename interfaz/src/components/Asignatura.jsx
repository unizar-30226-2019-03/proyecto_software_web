import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import icono from "../assets/favicon.ico";
import imagenPrueba from "../assets/landscape.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Menu } from "./ListaHorizontal";

const profesores = [
  { foto: icono, nombre: "Jorge Pérez" },
  { foto: icono, nombre: "Javier Molina" },
  { foto: icono, nombre: "Juan García" }
];

const list = [
  { name: "item1", image: imagenPrueba },
  { name: "item2", image: imagenPrueba },
  { name: "item3", image: imagenPrueba },
  { name: "item4", image: imagenPrueba },
  { name: "item5", image: imagenPrueba },
  { name: "item6", image: imagenPrueba },
  { name: "item7", image: imagenPrueba },
  { name: "item8", image: imagenPrueba },
  { name: "item9", image: imagenPrueba },
  { name: "item10", image: imagenPrueba },
  { name: "item11", image: imagenPrueba },
  { name: "item12", image: imagenPrueba },
  { name: "item13", image: imagenPrueba },
  { name: "item14", image: imagenPrueba },
  { name: "item15", image: imagenPrueba },
  { name: "item16", image: imagenPrueba },
  { name: "item17", image: imagenPrueba },
  { name: "item18", image: imagenPrueba },
  { name: "item19", image: imagenPrueba },
  { name: "item20", image: imagenPrueba }
];

export const Profesor = ({ foto, nombre }) => {
  return (
    <div
      style={{ marginRight: "20px", textAlign: "center", marginBottom: "10px" }}
    >
      <Link
        to="/profesor/X"
        style={{ textDecoration: "none", color: "black", display: "flex" }}
      >
        <img
          src={foto}
          alt="profesor"
          width="30"
          height="30"
          style={{ borderRadius: "50%" }}
        />
        <p style={{ marginLeft: "10px", marginTop: "3px", fontWeight: "500" }}>
          {nombre}
        </p>
      </Link>
    </div>
  );
};

export const ListaProfesores = list =>
  list.map(el => {
    const { foto, nombre } = el;

    return <Profesor nombre={nombre} key={nombre} foto={foto} />;
  });

class Asignatura extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px"
    };
    this.handleChange = this.handleChange.bind(this);
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
          <title>Asignatura</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={"asignatura1"}
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
            <div className="titulo-asignatura">
              <img
                src={icono}
                alt="icono asignatura"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="60"
                height="60"
              />
              Asignatura concreta
            </div>
            <div className="universidad">
              <Button
                style={{
                  backgroundColor: "#235da9",
                  borderColor: "#235da9"
                }}
              >
                Seguir asignatura
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", marginRight: "70px" }}>
            <div style={{ flex: "85%" }}>
              <div>
                <p style={{ fontWeight: "550" }}>Vídeos subidos</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {Menu(list)}
                </div>
              </div>
            </div>
            <div className="profesores-asignatura" style={{ flex: "15%" }}>
              <div className="tit-prof">Profesorado</div>
              <div className="prof">{ListaProfesores(profesores)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Asignatura;
