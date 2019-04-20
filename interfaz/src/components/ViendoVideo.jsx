import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Video from "./Video";
import vid from "../assets/VideoPrueba.mp4";
import { FaShareAlt, FaRegBookmark, FaRegStar } from "react-icons/fa";
import icono from "../assets/favicon.ico";

const profesores = [
  { foto: icono, nombre: "Jorge" },
  { foto: icono, nombre: "Javier" },
  { foto: icono, nombre: "Juan" }
];

const Profesor = ({ foto, nombre }) => {
  return (
    <div style={{ marginRight: "20px", textAlign: "center" }}>
      <Link to="/profesor/X" style={{ textDecoration: "none", color: "black" }}>
        <img
          src={foto}
          alt="profesor"
          width="40"
          height="40"
          style={{ borderRadius: "50%" }}
        />
        <p>{nombre}</p>
      </Link>
    </div>
  );
};

const ListaProfesores = list =>
  list.map(el => {
    const { foto, nombre } = el;

    return <Profesor nombre={nombre} key={nombre} foto={foto} />;
  });

class ViendoVideo extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "15%",
      user: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (document.cookie !== undefined) {
      let userCookie = document.cookie;
      let userID = userCookie.split("=")[1];
      this.setState({ user: userID });
    }
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "320px" });
    } else {
      this.setState({ contentMargin: "15%" });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Inicio</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
          onChange={this.handleChange}
          displaySide={false}
          hide={true}
        />
        <div
          className="transform"
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "70px"
          }}
        >
          <div className="reproductor">
            <Video src={vid} />
            <div className="datos-video">
              <p className="titulo-video">
                Vídeo de prueba de página Viendo Vídeo
              </p>
              <div style={{ display: "flex" }}>
                <p className="fecha-subida-video">Subido hace X tiempo</p>
                <div
                  style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "0",
                    top: "-5px"
                  }}
                >
                  <div
                    style={{
                      color: "black",
                      textDecoration: "none",
                      float: "left",
                      cursor: "pointer",
                      marginRight: "20px"
                    }}
                  >
                    <p
                      style={{
                        marginRight: "5px",
                        float: "left",
                        color: "#00000080",
                        fontWeight: "500",
                        fontSize: "18px"
                      }}
                    >
                      Valorar
                    </p>
                    <FaRegStar size={30} color={"#00000080"} />
                  </div>
                  <FaShareAlt
                    size={30}
                    color={"#00000080"}
                    style={{ marginRight: "20px", cursor: "pointer" }}
                  />
                  <FaRegBookmark
                    size={30}
                    color={"#00000080"}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
            <div className="datos-video">
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <Link to="/asig/X">
                  <img
                    src={icono}
                    style={{ borderRadius: "50%" }}
                    height="40"
                    width="40"
                    alt="Canal"
                  />
                </Link>
                <Link className="nombre-canal" to="/asig/X">
                  Asignatura concreta
                </Link>
                <Button className="boton-seguir">SEGUIR ASIGNATURA</Button>
              </div>
              <div style={{ marginLeft: "48px" }}>
                <p style={{ fontSize: "15px" }}>
                  Descripción del vídeo que le haya puesto el correspondiente
                  profesor, Descripción, Descripción, Descripción, Descripción,
                  Descripción, Descripción, Descripción, Descripción,
                  Descripción, Descripción.
                </p>
              </div>
              <div style={{ marginLeft: "48px" }}>
                <p style={{ fontWeight: "550" }}>Profesores de la asignatura</p>
                <div style={{ display: "flex" }}>
                  {ListaProfesores(profesores)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>COMENTARIOS</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViendoVideo;
