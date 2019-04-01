import React, { Component } from "react";
import logo from "../assets/favicon.ico";
import { Navbar, Nav } from "react-bootstrap";
import { FaBell, FaEnvelope, FaBars } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "../App.css";
import SideBar from "./SideBar";

class CustomNavBar extends Component {
  /**
   * Constructor
   * @param none
   */
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      displaySide: true,
      windowWidth: window.innerWidth,
      displayNotif: false,
      hide: false
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
    this.resize = this.resize.bind(this);
    this.showDropdownNotif = this.showDropdownNotif.bind(this);
    this.hideDropdownNotif = this.hideDropdownNotif.bind(this);
  }

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
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
            <Nav.Link>
              <FaBars size={20} onClick={this.showSideBar} />
            </Nav.Link>
          </Nav>

          <Navbar.Brand href="/inicio" style={{ marginLeft: "15px" }}>
            <img
              alt="holi"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {" UniCast"}
          </Navbar.Brand>

          <SearchBar />

          <Nav className="ml-auto">
            <Nav.Item
              style={{ color: "#00000080", width: "36px", marginLeft: "3px" }}
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

            <Nav.Link
              href="/mensajes"
              style={{ color: "#00000080", marginLeft: "0" }}
            >
              <FaEnvelope size={20} />
            </Nav.Link>

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
                    <a href="/perfil">Mi perfil</a>
                    <a href="/about">Información</a>
                    <a href="/">Cerrar Sesión</a>
                  </div>
                ) : null}
              </div>
            </Nav.Item>
          </Nav>
        </Navbar>
        <div>
          {this.state.displaySide ? (
            <SideBar activate={this.props.activar} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CustomNavBar;
