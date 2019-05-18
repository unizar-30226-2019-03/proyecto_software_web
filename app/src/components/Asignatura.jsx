import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import imagenPrueba from "../assets/landscape.jpg";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Menu } from "./ListaHorizontal";
import { getTime } from "../config/Process";
import { isSignedIn, getUserID } from "../config/Auth";
import {
  SubscribeSubject,
  UnsubscribeSubject,
  getSubjectById,
  getProfessorsFromSubject
} from "../config/Subject";
import { getUser, getSubjectsOfUser } from "../config/User";
import { Notificacion } from "./Listas";

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

export const Profesor = ({ user }) => {
  return (
    <div
      style={{
        marginRight: "20px",
        textAlign: "center",
        marginBottom: "10px"
      }}
    >
      <Link
        to={`/profesor/${user.id}`}
        style={{ textDecoration: "none", color: "black", display: "flex" }}
      >
        <img
          src={user.photo}
          alt="profesor"
          width="30"
          height="30"
          style={{ borderRadius: "50%" }}
        />
        <p style={{ marginLeft: "10px", marginTop: "3px", fontWeight: "500" }}>
          {user.username}
        </p>
      </Link>
    </div>
  );
};

export const ListaProfesores = list =>
  list.map(el => {
    return <Profesor user={el} key={el.id} />;
  });

class Asignatura extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      siguiendoAsig: false,
      user: {},
      asig: {},
      notif: false,
      mensajeNotif: "",
      tiempoNotif: 0,
      profesores: []
    };
    this.seguirAsig = this.seguirAsig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    getUser(getUserID(), data => {
      this.setState({ user: data });
    });
    getSubjectById(parseInt(this.props.match.params.id), data => {
      this.setState({ asig: data });
      getSubjectsOfUser(getUserID(), subjects => {
        const found = subjects.find(s => {
          return s.id === data.id;
        });
        //Si no la ha encontrado -> No sigue la asignatura
        this.setState({
          siguiendoAsig: found === undefined ? false : true
        });
      });
    });
    getProfessorsFromSubject(parseInt(this.props.match.params.id), data => {
      console.log(data);
      this.setState({ profesores: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    getUser(getUserID(), data => {
      this.setState({ user: data });
    });
    getSubjectById(parseInt(nextProps.match.params.id), data => {
      this.setState({ asig: data });
      getSubjectsOfUser(getUserID(), subjects => {
        const found = subjects.find(s => {
          return s.id === data.id;
        });
        //Si no la ha encontrado -> No sigue la asignatura
        this.setState({
          siguiendoAsig: found === undefined ? false : true
        });
      });
    });
  }

  componentWillUnmount() {
    this.pararReloj();
  }

  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
  }

  tick() {
    let t = this.state.tiempoNotif;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempoNotif: t + 1 });
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }

  seguirAsig() {
    !this.state.siguiendoAsig
      ? SubscribeSubject(this.state.asig.id, ok => {
          if (ok) {
            this.setState({
              siguiendoAsig: !this.state.siguiendoAsig,
              notif: true,
              mensajeNotif: `Siguiendo a ${this.state.asig.name}`
            });
            this.iniciarReloj();
          }
        })
      : UnsubscribeSubject(this.state.asig.id, ok => {
          if (ok) {
            this.setState({
              siguiendoAsig: !this.state.siguiendoAsig,
              notif: true,
              mensajeNotif: `Dejando de seguir a ${this.state.asig.name}`
            });
            this.iniciarReloj();
          }
        });
  }

  render() {
    const photo =
      this.state.asig.university === undefined
        ? ""
        : this.state.asig.university.photo;
    const nombreAsig =
      this.state.asig.name === undefined ? "" : this.state.asig.name;
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
          activar={nombreAsig}
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
                src={photo}
                alt="icono asignatura"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="60"
                height="60"
              />
              {nombreAsig}
            </div>
            <div className="universidad">
              <Button
                onClick={this.seguirAsig}
                style={{
                  backgroundColor: "#235da9",
                  borderColor: "#235da9"
                }}
              >
                {this.state.siguiendoAsig
                  ? "DEJAR DE SEGUIR"
                  : "SEGUIR ASIGNATURA"}
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", marginRight: "70px" }}>
            <div style={{ flex: "85%" }}>
              <div>
                <p style={{ fontWeight: "550" }}>Vídeos subidos</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {Menu(list)}
                </div>
              </div>
            </div>
            <div className="profesores-asignatura" style={{ flex: "15%" }}>
              <div className="tit-prof">Profesorado</div>
              <div className="prof">
                {ListaProfesores(this.state.profesores)}
              </div>
            </div>
          </div>
          <Notificacion
            mostrar={this.state.notif}
            mensaje={this.state.mensajeNotif}
            deshacer={false}
          />
        </div>
      </div>
    );
  }
}

export default Asignatura;
