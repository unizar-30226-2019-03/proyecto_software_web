/**
 * @fileoverview Fichero ResultadoBusqueda.jsx donde se encuentra la clase
 * que renderiza la pantalla de los resultados obtenidos tras una búsqueda
 * realizada por un usuario.
 *
 * @author UniCast
 *
 * @requires ./ListaBusqueda.jsx:ListaBusqueda
 * @requires ./MisListas.jsx:Notificacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/VideoAPI.jsx:findVideosContainingTitle
 * @requires ../config/SubjectAPI.jsx:findSubjectsContainingName
 * @requires ./BusquedaAsignaturas.jsx:BusquedaAsignaturas
 * @requires ../config/Process.jsx:putFavouritesFirst
 * @requires ../config/ReproductionListAPI.jsx:getUserReproductionLists
 * @requires ../config/ReproductionListAPI.jsx:addVideotoReproductionList
 * @requires ../config/ReproductionListAPI.jsx:deleteVideoFromReproductionList
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import ListaBusqueda from "./ListaBusqueda";
import { Notificacion } from "./MisListas";
import { Helmet } from "react-helmet";
import BarraNavegacion from "./BarraNavegacion";
import { Redirect } from "react-router-dom";
import { isSignedIn, getUserRole } from "../config/Auth";
import { findVideosContainingTitle } from "../config/VideoAPI";
import { findSubjectsContainingName } from "../config/SubjectAPI";
import BusquedaAsignaturas from "./BusquedaAsignaturas";
import { putFavouritesFirst } from "../config/Process";
import {
  getUserReproductionLists,
  addVideotoReproductionList,
  deleteVideoFromReproductionList
} from "../config/ReproductionListAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Clase que gestiona la pantalla de búsqueda de
 * vídeos y asignaturas en la aplicación.
 * @extends Component
 */
class ResultadoBusqueda extends Component {
  /**
   * Construye el componente ResultadoBusqueda
   *
   * @param {Object} props Propiedades para inicializar el componente
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      busqueda: props.match.params.valor,
      lista: [],
      listaAsignaturas: [],
      listasRepro: [],
      tiempo: 0,
      notif: false,
      mensajeNotif: "",
      asignaturas: false,
      timeNow: new Date(),
      mostrarSpin: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.anyadirVideoALista = this.anyadirVideoALista.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.buscarResultados = this.buscarResultados.bind(this);
    this.getReproductionLists = this.getReproductionLists.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.buscarResultados(this.props.match.params.valor);
      this.getReproductionLists();
    }
  }

  /**
   * Obtiene los vídeos y asignaturas cuyo título contenga
   * la cadena introducida por el usuario.
   * @param {String} titulo Título por el que buscar
   */
  buscarResultados(titulo) {
    findVideosContainingTitle(titulo, (videos, time) => {
      if (this._isMounted) {
        this.setState({
          lista: videos,
          timeNow: time
        });
      }
    });
    findSubjectsContainingName(titulo, data => {
      if (this._isMounted) {
        this.setState({ listaAsignaturas: data, mostrarSpin: false });
      }
    });
  }

  /**
   * Obtiene las listas de reproducción de un usuario.
   */
  getReproductionLists() {
    getUserReproductionLists(data => {
      if (this._isMounted) {
        const sortedData = putFavouritesFirst(data);
        this.setState({ listasRepro: sortedData });
      }
    });
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

  /**
   * Resetea el reloj y lo inicializa para ejecutar la función
   * ResultadoBusqueda.tick() una vez por segundo.
   */
  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  /**
   * Detiene la ejecución del reloj
   */
  pararReloj() {
    clearInterval(this.timerID);
  }

  /**
   * Suma un tick y si han pasado 3 ticks (3 segundos)
   * quita la notificación de pantalla.
   */
  tick() {
    let t = this.state.tiempo;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempo: t + 1 });
  }

  /**
   * Añade o quita el video seleccionado a la lista de videos elegida
   * por el usuario.
   * @param {Number} idVideo Id del video a añadir o quitar
   * @param {String} mensaje Mensaje de notificación al añadir
   * @param {Number} idLista Id de la lista de videos a la que añadir o quitar el video nombreVideo
   * @param {Boolean} anyadir Si es true añade, si es false quita a la lista
   * @param {Function} callback Función a ejecutar tras añadir/quitar el vídeo a la lista
   */
  anyadirVideoALista(idVideo, mensaje, idLista, anyadir, callback) {
    if (anyadir) {
      //Añadir el video
      addVideotoReproductionList(idLista, idVideo, ok => {
        if (ok) {
          this.setState({
            notif: true,
            mensajeNotif: mensaje
          });
          callback(true);
        } else {
          this.setState({
            notif: true,
            mensajeNotif: "No se ha podido añadir a la lista"
          });
          callback(false);
        }
      });
    } else {
      //Borrar el video
      deleteVideoFromReproductionList(idLista, idVideo, ok => {
        if (ok) {
          this.setState({
            notif: true,
            mensajeNotif: mensaje
          });
          callback(true);
        } else {
          this.setState({
            notif: true,
            mensajeNotif: "No se ha podido borrar de la lista"
          });
          callback(false);
        }
      });
    }
    this.iniciarReloj();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
  }

  componentWillReceiveProps(newProps) {
    this.setState({ busqueda: newProps.match.params.valor, mostrarSpin: true });
    this.buscarResultados(newProps.match.params.valor);
  }

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/busqueda/${this.props.match.params.valor}`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Búsqueda | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={""}
          displaySide={true}
          hide={false}
          nuevoTit={this.state.busqueda}
        />
        <div
          className="transform"
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "80px"
          }}
        >
          <div style={{ marginRight: "70px" }}>
            <div
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid lightgrey"
              }}
            >
              <h5>
                Resultados de la búsqueda:{" "}
                <span style={{ fontWeight: "bold", color: "#235da9" }}>
                  {this.state.busqueda}
                </span>
              </h5>
            </div>
            <div style={{ marginBottom: "20px", display: "flex" }}>
              <div
                onClick={() => this.setState({ asignaturas: false })}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  fontWeight: !this.state.asignaturas ? "550" : "300",
                  textDecoration: !this.state.asignaturas ? "underline" : "none"
                }}
              >
                Videos
              </div>
              <div
                onClick={() => this.setState({ asignaturas: true })}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  fontWeight: this.state.asignaturas ? "550" : "300",
                  textDecoration: this.state.asignaturas ? "underline" : "none"
                }}
              >
                Asignaturas
              </div>
            </div>
            {!this.state.asignaturas ? (
              this.state.mostrarSpin ? (
                <LoadingSpinUniCast className="spin-ranking" />
              ) : this.state.lista.length > 0 ? (
                <ListaBusqueda
                  lista={this.state.lista}
                  anyadirALista={this.anyadirVideoALista}
                  listaRepro={this.state.listasRepro}
                  time={this.state.timeNow}
                  actualizarListas={this.getReproductionLists}
                />
              ) : (
                <div style={{ color: "#00000080", fontSize: "13px" }}>
                  Ningún vídeo coincide con la búsqueda, por favor pruebe otro
                  nombre por el que buscar.
                </div>
              )
            ) : this.state.mostrarSpin ? (
              <LoadingSpinUniCast className="spin-ranking" />
            ) : this.state.listaAsignaturas.length > 0 ? (
              <BusquedaAsignaturas lista={this.state.listaAsignaturas} />
            ) : (
              <div style={{ color: "#00000080", fontSize: "13px" }}>
                Ninguna asignatura coincide con la búsqueda, por favor pruebe
                otro nombre por el que buscar.
              </div>
            )}
            <Notificacion
              mostrar={this.state.notif}
              mensaje={this.state.mensajeNotif}
              deshacer={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ResultadoBusqueda;
