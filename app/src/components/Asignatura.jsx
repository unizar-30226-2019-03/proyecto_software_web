/**
 * @fileoverview Fichero Asignatura.jsx donde se encuentra la clase
 * que renderiza la pantalla de una asignatura concreta.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ./ListaHorizontal.jsx:Menu
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/SubjectAPI.jsx:SubscribeSubject
 * @requires ../config/SubjectAPI.jsx:UnsubscribeSubject
 * @requires ../config/SubjectAPI.jsx:getSubjectById
 * @requires ../config/SubjectAPI.jsx:getProfessorsFromSubject
 * @requires ../config/UserAPI.jsx:getSubjectsOfUser
 * @requires ./MisListas.jsx:Notificacion
 * @requires ../config/VideoAPI.jsx:getVideosFromSubject
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

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
import { getSubjectsOfUser } from "../config/UserAPI";
import { Notificacion } from "./MisListas";
import { getVideosFromSubject } from "../config/VideoAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Renderiza la información relativa a un profesor de forma vertical para la
 * pantalla Asignatura.
 * @param {Object} param0 Propiedades del componente
 * @param {Object} param0.user Profesor asociado
 */
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

/**
 * Renderiza todos los profesores de la asignatura de forma vertical.
 * @param {Array.<Object>} list Lista de profesores de la asignatura
 */
export const ListaProfesores = list =>
  list.map(el => {
    return <Profesor user={el} key={el.id} />;
  });

/**
 * Clase que gestiona la pantalla de una asignatura concreta.
 * @extends Component
 */
class Asignatura extends Component {
  /**
   * Construye el componente Asignatura
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
      siguiendoAsig: false,
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
      mostrarSpin: true,
      mostrarSpinFoto: true
    };
    this.seguirAsig = this.seguirAsig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.loadMoreVideos = this.loadMoreVideos.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  /**
   * Obtiene la asignatura asociada al id, las asignaturas
   * del usuario que visita la asignatura para comprobar si
   * sigue dicha asignatura o no, los profesores
   * asociados a la asignatura y por último los vídeos subidos de la
   * asignatura.
   * @param {Number} subjectId ID de la asignatura
   */
  getData(subjectId) {
    getSubjectById(subjectId, data => {
      if (this._isMounted) {
        this.setState({ asig: data, mostrarSpinFoto: false });
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

  /**
   * Carga los siguiente vídeos de la asignatura si es necesario.
   */
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
   * Resetea el reloj y lo inicializa para ejecutar la función
   * Asignatura.tick() una vez por segundo.
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
    let t = this.state.tiempoNotif;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempoNotif: t + 1, updateSubject: false });
  }

  /**
   * Ajusta el contenido a la barra lateral.
   * @param {Boolean} display Determina si desplazar contenido o no
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  /**
   * Si el usuario no seguía la asignatura, relaciona el usuario con la asignatura
   * y se informa de ello. Si el usuario ya seguía la asignatura, elimina la
   * relación del usuario con la asignatura y se informa de ello.
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
          <title>{`${this.state.asig.name} | UniCast`}</title>
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
            {this.state.mostrarSpinFoto ? (
              <LoadingSpinUniCast className="titulo-asignatura" />
            ) : (
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
            )}
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
