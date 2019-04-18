import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand from "../assets/imgUnicast.jpg";
import { Navbar, Nav } from "react-bootstrap";

class BarraAdmi extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" className="shadow-sm mb-5 bg-white" fixed="top">
          <Navbar.Brand style={{ marginLeft: "15px", height: "40px" }}>
            <Link to="/">
              <img
                alt="UniCast"
                src={brand}
                width="130"
                height="30"
                className="d-inline-block align-top"
              />{" "}
            </Link>
          </Navbar.Brand>

          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/administrador-crear">
                <button className="boton-nav-admi">Añadir elementos</button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/administrador-borrar">
                <button className="boton-nav-admi">Borrar elementos</button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" onClick={this.props.logOut}>
                <button className="boton-nav-admi">Cerrar sesión</button>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default BarraAdmi;
