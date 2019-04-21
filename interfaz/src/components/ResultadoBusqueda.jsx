import React, { Component } from "react";
import ListaBusqueda from "./ListaBusqueda";
import imagenPrueba from "../assets/landscape.jpg";
import { Notificacion } from "./Listas";
import { Helmet } from "react-helmet";
import BarraNavegacion from "./BarraNavegacion";

const list = [
  {
    name: "La paradoja de los Gemelos RESUELTA!",
    canal: "Asignatura A",
    image: imagenPrueba
  },
  {
    name: "La tierra no gira en círculos aleredor del SOL",
    canal: "Asignatura B",
    image: imagenPrueba
  },
  {
    name: "¿ Cómo será el futuro de la física ?",
    canal: "Asignatura C",
    image: imagenPrueba
  },
  {
    name: "10 cosas que no sabías del SISTEMA SOLAR",
    canal: "Asignatura D",
    image: imagenPrueba
  },
  {
    name: "Física: ¿ Heroína o villana ?",
    canal: "Asignatura E",
    image: imagenPrueba
  },
  {
    name: "¿ Hasta donde llega el SISTEMA SOLAR ?",
    canal: "Asignatura F",
    image: imagenPrueba
  },
  {
    name: "Las 8 ecuaciones más importantes de la física",
    canal: "Asignatura G",
    image: imagenPrueba
  },
  {
    name: "La psicología de los genios",
    canal: "Asignatura H",
    image: imagenPrueba
  },
  {
    name: "Superhéroes y radioactividad",
    canal: "Asignatura I",
    image: imagenPrueba
  }
];

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
      tiempo: 0,
      notif: false,
      mensajeNotif: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.anyadirVideoALista = this.anyadirVideoALista.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    //Aquí se recogerá la búsqueda realizada
    this.setState({ lista: list });
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

  render() {
    return (
      <div>
        <Helmet>
          <title>Resultados Búsqueda</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
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
            <ListaBusqueda
              lista={this.state.lista}
              anyadirALista={this.anyadirVideoALista}
              borrar={this.props.borrarVideo}
              listaRepro={listasRepro}
            />
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
