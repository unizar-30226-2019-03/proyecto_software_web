import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import User_img from "../assets/user.png";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import icono from "../assets/favicon.ico";
import { sesionValida } from "../App";

class CamposMostrar extends Component {
  renderCampo(nombre, contenido) {
    return (
      <div>
        <h6
          style={{
            float: "left"
          }}
        >
          <strong>{nombre}</strong>
        </h6>
        <h6
          style={{
            margin: "30px 40% 0 120px"
          }}
        >
          {contenido}
        </h6>
      </div>
    );
  }
  render() {
    return !sesionValida() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <div>
          <h6
            style={{
              float: "left"
            }}
          >
            <strong>Descripción:</strong>
          </h6>
          <div
            style={{
              margin: "40px 40% 0 120px"
            }}
          >
            <h6 style={{ textAlign: "justify" }}>
              Un texto es una composición de signos codificados en un sistema de
              escritura que forma una unidad de sentido. También es una
              composición de caracteres imprimibles generados por un algoritmo
              de cifrado que, aunque no tienen sentido para cualquier persona,
              sí puede ser descifrado por su destinatario original
            </h6>
          </div>
        </div>
        {this.renderCampo("Universidad:", "UNIZAR")}
        {this.renderCampo("Grado:", "Ingeniería Informática")}
      </div>
    );
  }
}

class Profesor extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(display) {
    if (display) {
      this.setState({
        contentMargin: "300px"
      });
    } else {
      this.setState({
        contentMargin: "70px"
      });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Perfil</title>
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
          <h5>David Solanas Sanz</h5>
          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                float: "left",
                padding: "0 60px 0 0"
              }}
            >
              <img
                src={User_img}
                alt="Foto de perfil"
                width="160px"
                height="160px"
              />
            </div>
            <div
              style={{
                padding: "20px 20px 0px 0px"
              }}
            >
              <div>
                <Link to="/mensajes" className="universidad">
                  <Button className="boton-filtro">Enviar un mensaje</Button>
                </Link>
              </div>
              <div
                style={{
                  padding: "40px 20px 0px 0px"
                }}
              >
                <h6
                  style={{
                    float: "left",
                    padding: "0 20px 0 0"
                  }}
                >
                  <strong>Nombre de usuario:</strong>
                </h6>
                <p>739999</p>
              </div>
              <div
                style={{
                  padding: "0px 20px 0px 0px"
                }}
              >
                <h6
                  style={{
                    float: "left",
                    padding: "0 20px 0 0"
                  }}
                >
                  <strong>Dirección de correo:</strong>
                </h6>
                <h6>davidsolanas@gmail.com</h6>
              </div>
            </div>
          </div>
          <CamposMostrar />
          <div>
            <h6
              style={{
                float: "left"
              }}
            >
              <strong>Asignaturas:</strong>
            </h6>
            <div
              style={{
                margin: "30px 40% 0 120px"
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <Link to="/asig/X">
                  <img
                    src={icono}
                    style={{ borderRadius: "50%" }}
                    height="40"
                    width="40"
                    alt="Canal"
                  />
                </Link>
                <Link
                  className="link-asignatura"
                  style={{ padding: "0 0 0 10px" }}
                  to="/asig/X"
                >
                  Asignatura concreta
                </Link>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Link to="/asig/X">
                  <img
                    src={icono}
                    style={{ borderRadius: "50%" }}
                    height="40"
                    width="40"
                    alt="Canal"
                  />
                </Link>
                <Link
                  className="link-asignatura"
                  style={{ padding: "0 0 0 10px" }}
                  to="/asig/X"
                >
                  Asignatura concreta
                </Link>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Link to="/asig/X">
                  <img
                    src={icono}
                    style={{ borderRadius: "50%" }}
                    height="40"
                    width="40"
                    alt="Canal"
                  />
                </Link>
                <Link
                  className="link-asignatura"
                  style={{ padding: "0 0 0 10px" }}
                  to="/asig/X"
                >
                  Asignatura concreta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profesor;
