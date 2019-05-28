/**
 * @fileoverview Fichero BarraNavegacion.jsx donde se encuentra la clase
 * que renderiza la barra de navegación de la aplicación, y la clase Notificacion
 * que renderiza una notificación recibida de nuevo mensaje o vídeo
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../../node_modules/react-bootstrap/NavBar.js:NavBar
 * @requires ../../node_modules/react-bootstrap/Nav.js:Nav
 * @requires ../../node_modules/react-icons/fa/FaBell.js:FaBell
 * @requires ../../node_modules/react-icons/fa/FaEnvelope.js:FaEnvelope
 * @requires ../../node_modules/react-icons/fa/FaBars.js:FaBars
 * @requires ./BarraBusqueda.jsx:BarraBusqueda
 * @requires ./BarraLateral.jsx:BarraLateral
 * @requires ../config/Auth.jsx:signOut
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserPhoto
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/NotificationAPI.jsx:getUserUncheckedNotifications
 * @requires ../config/NotificationAPI.jsx:checkNotification
 * @requires ../config/VideoAPI.jsx:getTimePassed
 * @requires ../config/UserAPI.jsx:getUser
 * @requires ../config/SubjectAPI.jsx:getSubjectById
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand from "../assets/imgUnicast.jpg";
import { Navbar, Nav } from "react-bootstrap";
import { FaBell, FaEnvelope, FaBars } from "react-icons/fa";
import BarraBusqueda from "./BarraBusqueda";
import BarraLateral from "./BarraLateral";
import { signOut, isSignedIn, getUserPhoto, getUserRole } from "../config/Auth";
import {
  getUserUncheckedNotifications,
  checkNotification
} from "../config/NotificationAPI";
import { getTimePassed } from "../config/VideoAPI";
import { getUser } from "../config/UserAPI";
import { getSubjectById } from "../config/SubjectAPI";

/**
 * Clase que gestiona una notificación individual, permitiendo
 * ser mostrada y revisada.
 * @extends Component
 */
class Notificacion extends Component {
  /**
   * Construye el componente Notificacion
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Date} props.now Timestamp del servidor
   * @param {Object} props.notif Notificación
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      unChecked: true,
      timeNow: props.now,
      notif: props.notif,
      mensaje: "",
      mostrarSpin: true
    };

    this.getUserNotif = this.getUserNotif.bind(this);
    this.getSubjectNotif = this.getSubjectNotif.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      if (this.props.notif.notificationCategory === "messages") {
        this.getUserNotif();
      } else {
        this.getSubjectNotif();
      }
    }
  }

  /**
   * Obtiene el usuario que ha enviado un
   * mensaje generando una notificación
   */
  getUserNotif() {
    getUser(this.props.notif.creatorId, data => {
      if (this._isMounted) {
        this.setState({ mensaje: data.username, mostrarSpin: false });
      }
    });
  }

  /**
   * Obtiene la asignatura que ha subido un
   * vídeo generando una notificación
   */
  getSubjectNotif() {
    getSubjectById(this.props.notif.creatorId, data => {
      if (this._isMounted) {
        this.setState({ mensaje: data.name, mostrarSpin: false });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {this.state.notif.notificationCategory === "videos" ? (
          <Link
            to={`/asig/${this.state.notif.creatorId}`}
            onMouseEnter={() => {
              checkNotification(this.state.notif.id, ok => {
                if (ok) {
                  this.setState({ unChecked: false });
                }
              });
            }}
            style={{
              position: "relative"
            }}
          >
            <span
              className="notificacion-mensaje"
              style={{
                visibility: this.state.unChecked ? "visible" : "hidden"
              }}
            />
            <span
              style={{
                width: "155px",
                display: "inline-block"
              }}
            >
              {this.state.mostrarSpin
                ? "Cargando..."
                : `Nuevo vídeo de ${this.state.mensaje}`}
            </span>
            <span
              style={{
                marginLeft: "20px",
                color: "#00000080",
                fontSize: "12px"
              }}
            >
              {this.state.mostrarSpin
                ? null
                : `Hace 
              ${getTimePassed(this.state.notif.timestamp, this.state.timeNow)}`}
            </span>
          </Link>
        ) : (
          <Link
            to={`/chat/${this.state.notif.creatorId}`}
            onMouseEnter={() => {
              checkNotification(this.state.notif.id, ok => {
                if (ok) {
                  this.setState({ unChecked: false });
                }
              });
            }}
            style={{
              position: "relative"
            }}
          >
            <span
              className="notificacion-mensaje"
              style={{
                visibility: this.state.unChecked ? "visible" : "hidden"
              }}
            />
            {this.state.mostrarSpin
              ? "Cargando..."
              : `Nuevo mensaje de ${this.state.mensaje}`}
            <span
              style={{
                marginLeft: "10px",
                color: "#00000080",
                fontSize: "12px"
              }}
            >
              {this.state.mostrarSpin
                ? null
                : `Hace 
              ${getTimePassed(this.state.notif.timestamp, this.state.timeNow)}`}
            </span>
          </Link>
        )}
      </div>
    );
  }
}

/**
 * Clase que gestiona la barra de navegación, controlando a su
 * vez la barra lateral y la barra de búsqueda
 * @extends Component
 */
class BarraNavegacion extends Component {
  /**
   * Construye el componente BarraNavegacion
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Boolean} props.displaySide Indica si mostrar la barra lateral o no
   * @param {Boolean} props.hide Indica si el usuario ha pulsado esconder barra lateral
   * @param {String} props.nuevoTit Texto introducido para realizar la búsqueda de resultados
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      displayMenu: false,
      displaySide: props.displaySide,
      windowWidth: window.innerWidth,
      displayNotif: false,
      hide: props.hide,
      busqueda: props.nuevoTit,
      unCheckedNotifications: [],
      bolaNotif: false,
      tiempoCheck: 0,
      timeNow: new Date()
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
    this.resize = this.resize.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.showDropdownNotif = this.showDropdownNotif.bind(this);
    this.hideDropdownNotif = this.hideDropdownNotif.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  /**
   * Obtiene las notificaciones no revisadas de
   * un usuario
   */
  getNotifications() {
    getUserUncheckedNotifications(0, (data, now) => {
      if (!this.state.displayNotif) {
        if (this.props.onChat !== undefined) {
          const idCreator = parseInt(this.props.onChat);
          var newNotifications = [];
          data.forEach(elmnt => {
            const notif = elmnt.notification;
            if (notif.notificationCategory !== "messages") {
              newNotifications.push(elmnt);
            } else {
              if (notif.creatorId !== idCreator) {
                newNotifications.push(elmnt);
              } else {
                //Check notification
                checkNotification(notif.id);
              }
            }
          });
          if (this._isMounted) {
            this.setState({
              unCheckedNotifications: newNotifications,
              timeNow: now
            });
            if (newNotifications.length > 0) {
              this.setState({ bolaNotif: true });
            }
          }
        } else {
          if (this._isMounted) {
            this.setState({ unCheckedNotifications: data, timeNow: now });
            if (data.length > 0) {
              this.setState({ bolaNotif: true });
            }
          }
        }
      }
      this.iniciarReloj();
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getNotifications();
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("click", this.hideDropdown);
    document.removeEventListener("click", this.hideDropdownNotif);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ busqueda: newProps.nuevoTit });
  }

  /**
   * Dependiendo del ancho de la pantalla y si el usuario
   * ha pulsado esconder barra lateral o no, muestra o esconde
   * la barra lateral.
   */
  resize() {
    let currentWidthNav = window.innerWidth <= 991;
    if (currentWidthNav && this.state.windowWidth > 991) {
      this.props.onChange(false);
      this.setState({ displaySide: false });
    } else if (
      !this.state.hide &&
      !currentWidthNav &&
      this.state.windowWidth <= 991
    ) {
      this.setState({ displaySide: true });
      this.props.onChange(true);
    }
    this.setState({ windowWidth: window.innerWidth });
  }

  /**
   * Gestiona el mostrado de la barra lateral tras click del
   * usuario.
   */
  showSideBar() {
    this.props.onChange(!this.state.displaySide);
    this.setState({ displaySide: !this.state.displaySide });
    if (this.state.windowWidth <= 991 && !this.state.displaySide) {
      this.setState({ hide: false });
    } else {
      this.setState({ hide: !this.state.hide });
    }
  }

  /**
   * Muestra u oculta el dropdown del icono del usuario y añade
   * un EventListener para cuando se pulse fuera del dropdown se
   * cierre automáticamente.
   * @param {Event} event Evento al pulsar en el icono de usuario
   */
  showDropdown(event) {
    event.preventDefault();
    this.setState({ displayMenu: !this.state.displayMenu }, () => {
      document.addEventListener("click", this.hideDropdown);
    });
  }

  /**
   * Muestra u oculta el dropdown de las notificaciones y añade
   * un EventListener para cuando se pulse fuera del dropdown se
   * cierre automáticamente.
   * @param {Event} event Evento al pulsar en el icono de notificaciones
   */
  showDropdownNotif(event) {
    event.preventDefault();
    this.setState({ displayNotif: !this.state.displayNotif }, () => {
      document.addEventListener("click", this.hideDropdownNotif);
    });
  }

  /**
   * Muestra el dropdown del icono de usuario y elimina el
   * EventListener creado.
   */
  hideDropdown() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdown);
    });
  }

  /**
   * Oculta el dropdown del icono de usuario y elimina el
   * EventListener creado.
   */
  hideDropdownNotif() {
    this.setState({ displayNotif: false }, () => {
      document.removeEventListener("click", this.hideDropdownNotif);
    });
  }
  /**
   * Resetea el reloj y lo inicializa para ejecutar la función
   * BarraNavegacion.tick() una vez por segundo.
   */
  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  /**
   * Detiene la ejecución del reloj.
   */
  pararReloj() {
    clearInterval(this.timerID);
  }
  /**
   * Suma un tick y si han pasado 5 ticks (5 segundos)
   * busca nuevas notificaciones y resetea el reloj.
   */
  tick() {
    let t = this.state.tiempoCheck;
    if (t === 5) {
      t = -1;
      this.pararReloj();
      this.getNotifications();
    }
    this.setState({ tiempoCheck: t + 1 });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" className="shadow-sm mb-5 bg-white" fixed="top">
          <Nav>
            <Nav.Link onClick={this.showSideBar}>
              <FaBars size={20} />
            </Nav.Link>
          </Nav>

          <Navbar.Brand style={{ marginLeft: "15px", height: "40px" }}>
            <Link to="/inicio">
              <img
                alt="UniCast"
                src={brand}
                width="130"
                height="30"
                className="d-inline-block align-top"
              />{" "}
            </Link>
          </Navbar.Brand>

          <BarraBusqueda nuevoTit={this.state.busqueda} />

          <Nav className="ml-auto">
            <Nav.Item
              style={{
                color: "#00000080",
                width: "36px",
                marginLeft: "3px"
              }}
            >
              <div
                className="dropdown"
                style={{ top: "8px" }}
                onClick={() => this.setState({ bolaNotif: false })}
              >
                <div style={{ position: "relative" }}>
                  <FaBell size={20} onClick={this.showDropdownNotif} />
                  <span
                    className="notificacion"
                    style={{
                      visibility: !this.state.bolaNotif ? "hidden" : "visible"
                    }}
                  >
                    {/*console.log(this.state.unCheckedNotifications)*/}
                    {this.state.unCheckedNotifications.length}
                  </span>
                </div>
                {this.state.displayNotif ? (
                  <div className="dropdown-content" style={{ width: "340px" }}>
                    {this.state.unCheckedNotifications.length === 0 ? (
                      <div
                        style={{
                          color: "#00000080",
                          fontSize: "12px"
                        }}
                      >
                        No hay nuevas notificaciones disponibles, ya las ha
                        revisado todas ellas.
                      </div>
                    ) : (
                      this.state.unCheckedNotifications.map(elmnt => {
                        const notif = elmnt.notification;
                        return (
                          <Notificacion
                            key={notif.id}
                            notif={notif}
                            now={this.state.timeNow}
                          />
                        );
                      })
                    )}
                  </div>
                ) : null}
              </div>
            </Nav.Item>

            <Nav.Item
              style={{
                marginLeft: "0",
                display: "block",
                padding: ".5rem .5rem"
              }}
            >
              <Link to="/mensajes" style={{ color: "#00000080" }}>
                <FaEnvelope size={20} />
              </Link>
            </Nav.Item>

            <Nav.Item
              style={{
                color: "#00000080",
                width: "36px",
                marginLeft: "10px"
              }}
            >
              <div className="dropdown" style={{ top: "5px" }}>
                <img
                  alt="usuario"
                  src={getUserPhoto()}
                  width="30"
                  height="30"
                  onClick={this.showDropdown}
                  style={{ borderRadius: "50%" }}
                />
                {this.state.displayMenu ? (
                  <div className="dropdown-content">
                    <Link to="/perfil">Mi perfil</Link>
                    {getUserRole() === "ROLE_PROFESSOR" ? (
                      <Link to="/mis-videos">Mis vídeos</Link>
                    ) : null}
                    <Link to="/" onClick={() => signOut()}>
                      Cerrar Sesión
                    </Link>
                  </div>
                ) : null}
              </div>
            </Nav.Item>
          </Nav>
        </Navbar>
        <div>
          <BarraLateral
            activate={this.props.activar}
            show={this.state.displaySide ? "active" : ""}
            updateSubject={this.props.updateSubject}
          />
        </div>
      </div>
    );
  }
}

export default BarraNavegacion;
