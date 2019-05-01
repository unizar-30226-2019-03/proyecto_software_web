import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import icono from "../assets/favicon.ico";
import imagenPrueba from "../assets/landscape.jpg";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Menu } from "./ListaHorizontal";
import { sesionValida, getTime } from "../App";

const profesores = [
  { foto: icono, nombre: "Jorge Pérez" },
  { foto: icono, nombre: "Javier Molina" },
  { foto: icono, nombre: "Juan García" }
];

const list = [
  {
    name: "item1",
    canal: "Asignatura A",
    image: imagenPrueba,
    duracion: getTime(500),
    rating: "98%"
  },
  {
    name: "item2",
    canal: "Asignatura B",
    image: imagenPrueba,
    duracion: getTime(600),
    rating: "98.2%"
  },
  {
    name: "item3",
    canal: "Asignatura C",
    image: imagenPrueba,
    duracion: getTime(700),
    rating: "92%"
  },
  {
    name: "item4",
    canal: "Asignatura D",
    image: imagenPrueba,
    duracion: getTime(800),
    rating: "88%"
  },
  {
    name: "item5",
    canal: "Asignatura E",
    image: imagenPrueba,
    duracion: getTime(900),
    rating: "77.9%"
  },
  {
    name: "item6",
    canal: "Asignatura F",
    image: imagenPrueba,
    duracion: getTime(1000),
    rating: "90%"
  },
  {
    name: "item7",
    canal: "Asignatura G",
    image: imagenPrueba,
    duracion: getTime(1100),
    rating: "84%"
  },
  {
    name: "item8",
    canal: "Asignatura H",
    image: imagenPrueba,
    duracion: getTime(1200),
    rating: "87.7%"
  },
  {
    name: "item9",
    canal: "Asignatura I",
    image: imagenPrueba,
    duracion: getTime(1300),
    rating: "93%"
  },
  {
    name: "item10",
    canal: "Asignatura J",
    image: imagenPrueba,
    duracion: getTime(1400),
    rating: "91%"
  },
  {
    name: "item11",
    canal: "Asignatura K",
    image: imagenPrueba,
    duracion: getTime(1500),
    rating: "91.1%"
  },
  {
    name: "item12",
    canal: "Asignatura L",
    image: imagenPrueba,
    duracion: getTime(1600),
    rating: "90%"
  }
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
    return !sesionValida() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Asignatura</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={this.props.match.params.nombre}
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
              {this.props.match.params.nombre}
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
