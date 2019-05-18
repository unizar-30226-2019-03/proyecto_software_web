import React, { Component } from "react";
import ListaBusqueda from "./ListaBusqueda";
import { Notificacion } from "./Listas";
import { Helmet } from "react-helmet";
import BarraNavegacion from "./BarraNavegacion";
import { Redirect } from "react-router-dom";
import { isSignedIn } from "../config/Auth";
import { findVideosContainingTitle } from "../config/Video";
import { findSubjectsContainingName } from "../config/Subject";
import BusquedaAsignaturas from "./BusquedaAsignaturas";

const listasRepro = [
  "Lista de reproducción 1",
  "Lista de reproducción 2",
  "Lista de reproducción 3",
  "Lista de reproducción 4",
  "Lista de reproduccióndasds aadsasdsadasadsdasdasasddasdsaddsadas 5"
];

class ResultadoBusqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMargin: "300px",
      busqueda: this.props.match.params.valor,
      lista: [],
      listaAsignaturas: [],
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
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    this.buscarResultados(this.props.match.params.valor);
  }

  buscarResultados(titulo) {
    findVideosContainingTitle(titulo, (videos, time) => {
      this.setState({
        lista: videos,
        timeNow: time
      });
    });
    findSubjectsContainingName(titulo, data => {
      this.setState({ listaAsignaturas: data });
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

  anyadirVideoALista(nombreVideo, mensaje, lista, anyadir) {
    //Añadir o borrar de la lista lista, dependiendo del parametro anyadir
    if (anyadir) {
      //Añadir el video
    } else {
      //Borrar el video
    }
    this.setState({ notif: true, mensajeNotif: mensaje });
    this.iniciarReloj();
  }

  componentWillUnmount() {
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
              <ListaBusqueda
                lista={this.state.lista}
                anyadirALista={this.anyadirVideoALista}
                listaRepro={listasRepro}
                time={this.state.timeNow}
              />
            ) : (
              <BusquedaAsignaturas lista={this.state.listaAsignaturas} />
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
