import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import BarraNavegacion from "./BarraNavegacion";
import ListaHorizontal from "./ListaHorizontal";
import { Helmet } from "react-helmet";
import { isSignedIn } from "../config/Auth";

class Inicio extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Aumenta o dimsinuye el margen izquierdo del contenido de la
   * página dependiendo del parámetro display
   * @param {Boolean} display Determina si aumentar o disminuir margen
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Inicio</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={"inicio"}
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
          <div>
            <div>
              <h5 style={{ fontWeight: "bold" }}>
                Vídeos subidos recientemente
              </h5>
            </div>
            <ListaHorizontal />
          </div>
          <div>
            <div>
              <Link
                to="/asig/aX"
                style={{
                  fontSize: "1.25rem",
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Asignatura X
              </Link>
            </div>
            <ListaHorizontal />
          </div>
          <div>
            <div>
              <Link
                to="/asig/aY"
                style={{
                  fontSize: "1.25rem",
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Asignatura Y
              </Link>
            </div>
            <ListaHorizontal />
          </div>
          <div>
            <div>
              <Link
                to="/asig/aZ"
                style={{
                  fontSize: "1.25rem",
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Asignatura Z
              </Link>
            </div>
            <ListaHorizontal />
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;