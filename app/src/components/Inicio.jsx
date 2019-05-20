import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import BarraNavegacion from "./BarraNavegacion";
import ListaHorizontal, { Menu } from "./ListaHorizontal";
import { Helmet } from "react-helmet";
import { isSignedIn, getUserID } from "../config/Auth";
import { getRecommendations, getVideosFromSubject } from "../config/VideoAPI";
import { getSubjectsOfUser } from "../config/UserAPI";

class Inicio extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      displayAll: false,
      asignaturas: [],
      videosAsignatura: [[]],
      recomendados: [],
      timeNow: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    getSubjectsOfUser(getUserID(), data => {
      data.map((asig, index) => {
        getVideosFromSubject(asig.id, 0, videos => {
          let newVideos = this.state.videosAsignatura.slice();
          newVideos[index] = videos;
          if (this._isMounted) {
            this.setState({ videosAsignatura: newVideos });
          }
        });
        return null;
      });
      if (this._isMounted) {
        this.setState({ asignaturas: data });
      }
    });
    getRecommendations((data, now) => {
      if (this._isMounted) {
        this.setState({ recomendados: data, timeNow: now });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
            <div style={{ display: "flex" }}>
              <h5 style={{ fontWeight: "bold" }}>Vídeos recomendados</h5>
              <div
                className="boton-ver-todos-inicio"
                onClick={() =>
                  this.setState({ displayAll: !this.state.displayAll })
                }
              >
                {this.state.displayAll ? "Ver menos" : "Ver todos"}
              </div>
            </div>
            {this.state.displayAll ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginBottom: "50px",
                  borderBottom: "1px solid lightgrey",
                  overflow: "hidden",
                  width: "93.45%"
                }}
              >
                {Menu(this.state.recomendados, this.state.timeNow)}
              </div>
            ) : (
              <ListaHorizontal
                list={this.state.recomendados}
                now={this.state.timeNow}
              />
            )}
          </div>
          {this.state.asignaturas.map((asig, index) => {
            return (
              <div key={asig.id}>
                <div style={{ marginBottom: ".5rem" }}>
                  <Link
                    to={`/asig/${asig.id}`}
                    style={{
                      fontSize: "1.25rem",
                      color: "black",
                      textDecoration: "none",
                      fontWeight: "bold"
                    }}
                  >
                    <div>
                      <img
                        src={
                          asig.university === undefined
                            ? ""
                            : asig.university.photo
                        }
                        alt={
                          asig.university === undefined
                            ? ""
                            : asig.university.name
                        }
                        width="35"
                        height="35"
                        style={{ borderRadius: "50%" }}
                      />{" "}
                      {asig.name}
                    </div>
                  </Link>
                </div>
                <ListaHorizontal
                  list={
                    this.state.videosAsignatura[index] === undefined
                      ? []
                      : this.state.videosAsignatura[index]
                  }
                  now={this.state.timeNow}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Inicio;
