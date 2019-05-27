import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Menu } from "./ListaHorizontal";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
import {
  SubscribeSubject,
  UnsubscribeSubject,
  getSubjectById,
  getProfessorsFromSubject
} from "../config/SubjectAPI";
import { getUser, getSubjectsOfUser } from "../config/UserAPI";
import { Notificacion } from "./MisListas";
import { getVideosFromSubject } from "../config/VideoAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

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
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      siguiendoAsig: false,
      user: {},
      asig: {},
      notif: false,
      mensajeNotif: "",
      tiempoNotif: 0,
      page: 0,
      profesores: [],
      videos: [],
      timeNow: new Date(),
      moreVideos: false,
      updateSubject: false,
      mostrarSpin: true
    };
    this.seguirAsig = this.seguirAsig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.loadMoreVideos = this.loadMoreVideos.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  getData(subjectId) {
    getUser(getUserID(), data => {
      if (this._isMounted) {
        this.setState({ user: data });
      }
    });
    getSubjectById(subjectId, data => {
      if (this._isMounted) {
        this.setState({ asig: data });
      }
      getSubjectsOfUser(getUserID(), subjects => {
        const found = subjects.find(s => {
          return s.id === data.id;
        });
        //Si no la ha encontrado -> No sigue la asignatura
        if (this._isMounted) {
          this.setState({
            siguiendoAsig: found === undefined ? false : true
          });
        }
      });
    });
    getProfessorsFromSubject(subjectId, data => {
      if (this._isMounted) {
        this.setState({ profesores: data });
      }
    });
    getVideosFromSubject(subjectId, 0, (data, time) => {
      if (this._isMounted) {
        this.setState({
          videos: data,
          timeNow: time,
          page: 1,
          moreVideos: data.length === 20,
          mostrarSpin: false
        });
      }
    });
  }

  loadMoreVideos() {
    if (this.state.moreVideos) {
      getVideosFromSubject(this.state.asig.id, this.state.page, data => {
        if (this._isMounted) {
          this.setState({
            videos: [...this.state.videos, ...data],
            page: this.state.page + 1,
            moreVideos: data.length === 20
          });
        }
      });
    }
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData(parseInt(this.props.match.params.id));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mostrarSpin: true });
    this.getData(parseInt(nextProps.match.params.id));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
  }

  /**
   * Pone el reloj a 0 y lo inicia
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
   * suma un tick (suma 1 a tiempo)
   * Si tiempo==3,pone tiempo a 0 y para el reloj
   */
  tick() {
    let t = this.state.tiempoNotif;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempoNotif: t + 1, updateSubject: false });
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  /**
   * Si no se sigue a la asignatura, relaciona al usuario con la asignatura. Si se ha realizado correctamente,
   * pone siguiendoAsig y notif a true, pone "Siguiendo a ..."(la asignatura) en mensajeNotif, e inicia el reloj.
   * Si no sigue a la asignatura, elimina la relación del usuario con la asignatura. Si se ha realizado correctamente,
   * pone siguiendoAsig a false, notif a true y en mensajeNotif pone "Dejando de seguir a ..."(la asignatura), e inicia el reloj.
   */
  seguirAsig() {
    !this.state.siguiendoAsig
      ? SubscribeSubject(this.state.asig.id, ok => {
          if (ok) {
            this.setState({
              siguiendoAsig: !this.state.siguiendoAsig,
              notif: true,
              updateSubject: true,
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
              updateSubject: true,
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
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/asig/${this.props.match.params.id}`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Asignatura | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={nombreAsig}
          displaySide={true}
          hide={false}
          updateSubject={this.state.updateSubject}
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
                {this.state.mostrarSpin ? (
                  <LoadingSpinUniCast className="spin-ranking" />
                ) : this.state.videos.length === 0 ? (
                  <div
                    style={{
                      color: "#00000080",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "left"
                    }}
                  >
                    Esta asignatura no tiene vídeos, conforme suban vídeos se
                    irán guardando aquí.
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {Menu(this.state.videos, this.state.timeNow)}
                    </div>
                    <div
                      onClick={() => this.loadMoreVideos()}
                      className="cargar-mas-boton-asig zoom-item"
                      style={{
                        visibility: this.state.moreVideos ? "visible" : "hidden"
                      }}
                    >
                      Cargar más
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="profesores-asignatura" style={{ flex: "15%" }}>
              <div className="tit-prof">Profesorado</div>
              {this.state.mostrarSpin ? (
                <LoadingSpinUniCast className="spin-ranking" />
              ) : this.state.profesores.length === 0 ? (
                <div
                  style={{
                    color: "#00000080",
                    padding: "10px",
                    fontSize: "14px",
                    textAlign: "left"
                  }}
                >
                  Esta asignatura no tiene profesores asociados.
                </div>
              ) : (
                <div className="prof">
                  {ListaProfesores(this.state.profesores)}
                </div>
              )}
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
