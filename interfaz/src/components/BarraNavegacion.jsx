import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand from "../assets/imgUnicast.jpg";
import logo from "../assets/favicon.ico";
import { Navbar, Nav } from "react-bootstrap";
import { FaBell, FaEnvelope, FaBars } from "react-icons/fa";
import BarraBusqueda from "./BarraBusqueda";
import BarraLateral from "./BarraLateral";

class BarraNavegacion extends Component {
  /**
   * Constructor
   * @param none
   */
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      displaySide: this.props.displaySide,
      windowWidth: window.innerWidth,
      displayNotif: false,
      hide: this.props.hide
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
    this.resize = this.resize.bind(this);
    this.showDropdownNotif = this.showDropdownNotif.bind(this);
    this.hideDropdownNotif = this.hideDropdownNotif.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("click", this.hideDropdown);
    document.removeEventListener("click", this.hideDropdownNotif);
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

          <BarraBusqueda />

          <Nav className="ml-auto">
            <Nav.Item
              style={{
                color: "#00000080",
                width: "36px",
                marginLeft: "3px"
              }}
            >
              <div className="dropdown" style={{ top: "8px" }}>
                <FaBell size={20} onClick={this.showDropdownNotif} />
                {this.state.displayNotif ? (
                  <div className="dropdown-content">
                    <a href="#a">Video Nuevo1</a>
                    <a href="#a">Vídeo Nuevo2</a>
                    <a href="#a">Vídeo Nuevo3</a>
                    <a href="#a">Vídeo Nuevo4</a>
                    <a href="#a">Vídeo Nuevo5</a>
                    <a href="#a">Vídeo Nuevo6</a>
                    <a href="#a">Vídeo Nuevo7</a>
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
                  src={logo}
                  width="30"
                  height="30"
                  onClick={this.showDropdown}
                  style={{ borderRadius: "50%" }}
                />
                {this.state.displayMenu ? (
                  <div className="dropdown-content">
                    <Link to="/perfil">Mi perfil</Link>
                    <Link to="/" onClick={this.props.logOut}>
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
          />
        </div>
      </div>
    );
  }
}

export default BarraNavegacion;
