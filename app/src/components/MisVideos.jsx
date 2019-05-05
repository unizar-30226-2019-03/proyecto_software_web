import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import icono from "../assets/favicon.ico";
import imagenPrueba from "../assets/landscape.jpg";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Menu } from "./ListaHorizontal";
import { getTime } from "../config/Procesar";
import { isSignedIn } from "../config/Auth";

const list = [
  {
    name: "item1",
    canal: "Asignatura A",
    image: imagenPrueba,
    duracion: getTime(500),
    rating: 98
  },
  {
    name: "item2",
    canal: "Asignatura B",
    image: imagenPrueba,
    duracion: getTime(600),
    rating: 98
  },
  {
    name: "item3",
    canal: "Asignatura C",
    image: imagenPrueba,
    duracion: getTime(700),
    rating: 92
  },
  {
    name: "item4",
    canal: "Asignatura D",
    image: imagenPrueba,
    duracion: getTime(800),
    rating: 88
  },
  {
    name: "item5",
    canal: "Asignatura E",
    image: imagenPrueba,
    duracion: getTime(900),
    rating: 77
  },
  {
    name: "item6",
    canal: "Asignatura F",
    image: imagenPrueba,
    duracion: getTime(1000),
    rating: 90
  },
  {
    name: "item7",
    canal: "Asignatura G",
    image: imagenPrueba,
    duracion: getTime(1100),
    rating: 84
  },
  {
    name: "item8",
    canal: "Asignatura H",
    image: imagenPrueba,
    duracion: getTime(1200),
    rating: 87
  },
  {
    name: "item9",
    canal: "Asignatura I",
    image: imagenPrueba,
    duracion: getTime(1300),
    rating: 93
  },
  {
    name: "item10",
    canal: "Asignatura J",
    image: imagenPrueba,
    duracion: getTime(1400),
    rating: 91
  },
  {
    name: "item11",
    canal: "Asignatura K",
    image: imagenPrueba,
    duracion: getTime(1500),
    rating: 91
  },
  {
    name: "item12",
    canal: "Asignatura L",
    image: imagenPrueba,
    duracion: getTime(1600),
    rating: 90
  }
];

class MisVideos extends Component {
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
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Asignatura</title>
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
            <div className="titulo-asignatura">
              <img
                src={icono}
                alt="icono asignatura"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="60"
                height="60"
              />
              Vídeos subidos
            </div>
            <div className="universidad">
              <Link to="/subir-video">
                <Button
                  style={{
                    backgroundColor: "#235da9",
                    borderColor: "#235da9"
                  }}
                >
                  Subir nuevo vídeo
                </Button>
              </Link>
            </div>
          </div>
          <div style={{ marginRight: "70px" }}>
            <div>
              <div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {Menu(list)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MisVideos;
