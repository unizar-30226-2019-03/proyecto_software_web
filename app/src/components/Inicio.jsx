/**
 * @fileoverview Fichero Inicio.jsx donde se encuentra la clase
 * que renderiza la pantalla de inicio de la aplicación.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ./ListaHorizontal.jsx:ListaHorizontal
 * @requires ./ListaHorizontal.jsx:Menu
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/VideoAPI.jsx:getRecommendations
 * @requires ../config/VideoAPI.jsx:getVideosFromSubject
 * @requires ../config/VideoAPI.jsx:findTrendingVideos
 * @requires ../config/UserAPI.jsx:getSubjectsOfUser
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import BarraNavegacion from "./BarraNavegacion";
import ListaHorizontal, { Menu } from "./ListaHorizontal";
import { Helmet } from "react-helmet";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
import {
  getRecommendations,
  getVideosFromSubject,
  findTrendingVideos
} from "../config/VideoAPI";
import { getSubjectsOfUser } from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Clase que gestiona la pantalla de inicio de la aplicación
 * @extends Component
 */
class Inicio extends Component {
  /**
   * Construye el componente Inicio
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      displayAll: false,
      displayTrending: false,
      asignaturas: [],
      videosAsignatura: [[]],
      recomendados: [],
      trending: [],
      timeNow: new Date(),
      spinRecom: true,
      spinPopulares: true,
      spinAsignaturas: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  /**
   * Obtiene las asignaturas del usuario y obtiene los videos de esas asignaturas.
   * Obtiene los videos recomendados para el usuario, y obtiene los videos que son tendencia.
   */
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
        this.setState({ asignaturas: data, spinAsignaturas: false });
      }
    });
    getRecommendations((data, now) => {
      if (this._isMounted) {
        this.setState({ recomendados: data, timeNow: now, spinRecom: false });
      }
    });
    findTrendingVideos(0, data => {
      if (this._isMounted) {
        this.setState({ trending: data, spinPopulares: false });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Ajusta el contenido a la barra lateral.
   * @param {Boolean} display Determina si desplazar contenido o no
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/inicio`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Inicio | UniCast</title>
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
              <h5 style={{ fontWeight: "bold" }}>
                Vídeos populares de la última semana
              </h5>
              <div
                className="boton-ver-todos-inicio"
                onClick={() =>
                  this.setState({
                    displayTrending: !this.state.displayTrending
                  })
                }
              >
                {this.state.displayTrending ? "Ver menos" : "Ver todos"}
              </div>
            </div>
            {!this.state.spinPopulares ? (
              this.state.displayTrending ? (
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
                  {Menu(this.state.trending, this.state.timeNow)}
                </div>
              ) : (
                <ListaHorizontal
                  list={this.state.trending}
                  now={this.state.timeNow}
                />
              )
            ) : (
              <div
                style={{
                  color: "#00000080",
                  padding: "10px",
                  fontSize: "14px",
                  textAlign: "left",
                  marginBottom: "50px",
                  borderBottom: "1px solid lightgrey",
                  width: "93.45%",
                  position: "relative"
                }}
              >
                <LoadingSpinUniCast className="spin-inicio" />
              </div>
            )}
          </div>
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
                {this.state.recomendados.length === 0 ? (
                  <div
                    style={{
                      color: "#00000080",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "left"
                    }}
                  >
                    Actualmente no tiene recomendaciones, conforme haga uso de
                    la aplicación se le recomendarán vídeos según sus gustos.
                  </div>
                ) : (
                  Menu(this.state.recomendados, this.state.timeNow)
                )}
              </div>
            ) : this.state.recomendados.length === 0 ? (
              <div style={{ position: "relative" }}>
                {!this.state.spinRecom ? (
                  <div
                    style={{
                      color: "#00000080",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "left",
                      marginBottom: "50px",
                      borderBottom: "1px solid lightgrey",
                      width: "93.45%"
                    }}
                  >
                    Actualmente no tiene recomendaciones, conforme haga uso de
                    la aplicación se le recomendarán vídeos según sus gustos.
                  </div>
                ) : (
                  <div
                    style={{
                      color: "#00000080",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "left",
                      marginBottom: "50px",
                      borderBottom: "1px solid lightgrey",
                      width: "93.45%",
                      position: "relative"
                    }}
                  >
                    <LoadingSpinUniCast className="spin-inicio" />
                  </div>
                )}
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
                {this.state.videosAsignatura[index] === undefined ? (
                  <div
                    style={{
                      color: "#00000080",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "left",
                      marginBottom: "50px",
                      borderBottom: "1px solid lightgrey",
                      width: "93.45%",
                      position: "relative"
                    }}
                  >
                    <LoadingSpinUniCast className="spin-inicio" />
                  </div>
                ) : this.state.videosAsignatura[index].length === 0 ? (
                  <div
                    style={{
                      color: "#00000080",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "left",
                      marginBottom: "50px",
                      borderBottom: "1px solid lightgrey",
                      width: "93.45%"
                    }}
                  >
                    En estos momentos no hay ningún vídeo subido de esta
                    asignatura.
                  </div>
                ) : (
                  <ListaHorizontal
                    list={this.state.videosAsignatura[index]}
                    now={this.state.timeNow}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Inicio;
