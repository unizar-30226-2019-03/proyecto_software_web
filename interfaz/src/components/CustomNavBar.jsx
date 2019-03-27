import React, { Component } from "react";
import logo from "../assets/favicon.ico";
import { Navbar, Nav } from "react-bootstrap";
import { FaBell, FaEnvelope, FaUser, FaBars } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "./DropDown.css";
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
      hide: false
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showSideBar = this.showSideBar.bind(this);
    this.resize = this.resize.bind(this);
    this.changeDropdownPage = this.changeDropdownPage.bind(this);
  }

  changeDropdownPage(newUrl) {
    window.location = newUrl;
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

  hideDropdown() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdown);
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
            <Nav.Link href="/notificaciones">
              <FaBell size={20} />
            </Nav.Link>
            <Nav.Link href="/mensajes">
              <FaEnvelope size={20} />
            </Nav.Link>
            <Nav.Item style={{ color: "#00000080", width: "36px" }}>
              <div className="dropdown" style={{ top: "5px" }}>
                <FaUser size={25} onClick={this.showDropdown} />
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
