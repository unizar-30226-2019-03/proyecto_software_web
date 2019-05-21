import React, { Component } from "react";
import ListaBusqueda from "./ListaBusqueda";
import { Notificacion } from "./MisListas";
import { Helmet } from "react-helmet";
import BarraNavegacion from "./BarraNavegacion";
import { Redirect } from "react-router-dom";
import { isSignedIn } from "../config/Auth";
import { findVideosContainingTitle } from "../config/VideoAPI";
import { findSubjectsContainingName } from "../config/SubjectAPI";
import BusquedaAsignaturas from "./BusquedaAsignaturas";
import { putFavouritesFirst } from "../config/Process";
import {
  getUserReproductionLists,
  addVideotoReproductionList,
  deleteVideoFromReproductionList
} from "../config/ReproductionListAPI";

class ResultadoBusqueda extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      busqueda: this.props.match.params.valor,
      lista: [],
      listaAsignaturas: [],
      listasRepro: [],
      tiempo: 0,
      notif: false,
      mensajeNotif: "",
      asignaturas: false,
      timeNow: new Date()
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
    this.buscarResultados(this.props.match.params.valor);
    this.getReproductionLists();
  }

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
        this.setState({ listaAsignaturas: data });
      }
    });
  }

  getReproductionLists() {
    getUserReproductionLists(data => {
      if (this._isMounted) {
        const sortedData = putFavouritesFirst(data);
        this.setState({ listasRepro: sortedData });
      }
    });
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
  }

  tick() {
    let t = this.state.tiempo;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempo: t + 1 });
  }

  anyadirVideoALista(idVideo, mensaje, idLista, anyadir, callback) {
    //Añadir o borrar de la lista lista, dependiendo del parametro anyadir
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
    this.buscarResultados(newProps.match.params.valor);
    this.setState({ busqueda: newProps.match.params.valor });
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Resultados Búsqueda</title>
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
              this.state.lista.length > 0 ? (
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
