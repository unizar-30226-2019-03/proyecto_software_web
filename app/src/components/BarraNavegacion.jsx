import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand from "../assets/imgUnicast.jpg";
import { Navbar, Nav } from "react-bootstrap";
import { FaBell, FaEnvelope, FaBars } from "react-icons/fa";
import BarraBusqueda from "./BarraBusqueda";
import BarraLateral from "./BarraLateral";
import { signOut, getUserID, isSignedIn } from "../config/Auth";
import { getUser } from "../config/UserAPI";
import {
  getUserUncheckedNotifications,
  checkNotification
} from "../config/NotificationAPI";
import { getTimePassed } from "../config/VideoAPI";

class Notificacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unChecked: true,
      timeNow: this.props.now,
      notif: this.props.notif
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ timeNow: newProps.now, notif: newProps.notif });
  }

  render() {
    return (
      <div>
        {this.state.notif.notificationCategory === "videos" ? (
          <div
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
              Nuevo vídeo subido
            </span>
            <span
              style={{
                marginLeft: "20px",
                color: "#00000080",
                fontSize: "12px"
              }}
            >
              Hace{" "}
              {getTimePassed(this.state.notif.timestamp, this.state.timeNow)}
            </span>
          </div>
        ) : (
          <div
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
            Nuevo mensaje recibido
            <span
              style={{
                marginLeft: "10px",
                color: "#00000080",
                fontSize: "12px"
              }}
            >
              Hace{" "}
              {getTimePassed(this.state.notif.timestamp, this.state.timeNow)}
            </span>
          </div>
        )}
      </div>
    );
  }
}

class BarraNavegacion extends Component {
  /**
   * Constructor
   * @param none
   */
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      displayMenu: false,
      displaySide: this.props.displaySide,
      windowWidth: window.innerWidth,
      displayNotif: false,
      hide: this.props.hide,
      busqueda: this.props.nuevoTit,
      user: {},
      unCheckedNotifications: [],
      bolaNotif: false,
      tiempoCheck: 0,
      timeNow: new Date()
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
    this.resize = this.resize.bind(this);
    this.getData = this.getData.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.showDropdownNotif = this.showDropdownNotif.bind(this);
    this.hideDropdownNotif = this.hideDropdownNotif.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  getData() {
    getUser(getUserID(), data => {
      if (this._isMounted) {
        this.setState({ user: data });
      }
    });
  }

  getNotifications() {
    getUserUncheckedNotifications(0, (data, now) => {
      if (this._isMounted) {
        if (!this.state.displayNotif) {
          this.setState({ unCheckedNotifications: data, timeNow: now });
          if (data.length > 0) {
            this.setState({ bolaNotif: true });
          }
        }
        this.iniciarReloj();
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
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

  showSideBar() {
    this.props.onChange(!this.state.displaySide);
    this.setState({ displaySide: !this.state.displaySide });
    if (this.state.windowWidth <= 991 && !this.state.displaySide) {
      this.setState({ hide: false });
    } else {
      this.setState({ hide: !this.state.hide });
    }
  }

  showDropdown(event) {
    event.preventDefault();
    this.setState({ displayMenu: !this.state.displayMenu }, () => {
      document.addEventListener("click", this.hideDropdown);
    });
  }

  showDropdownNotif(event) {
    event.preventDefault();
    this.setState({ displayNotif: !this.state.displayNotif }, () => {
      document.addEventListener("click", this.hideDropdownNotif);
    });
  }

  hideDropdown() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdown);
    });
  }

  hideDropdownNotif() {
    this.setState({ displayNotif: false }, () => {
      document.removeEventListener("click", this.hideDropdownNotif);
    });
  }

  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
  }

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
                  src={this.state.user.photo}
                  width="30"
                  height="30"
                  onClick={this.showDropdown}
                  style={{ borderRadius: "50%" }}
                />
                {this.state.displayMenu ? (
                  <div className="dropdown-content">
                    <Link to="/perfil">Mi perfil</Link>
                    {this.state.user.role === "ROLE_PROFESSOR" ? (
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
