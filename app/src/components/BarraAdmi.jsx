/**
 * @fileoverview Fichero BarraAdmi.jsx donde se encuentra la clase
 * que renderiza la barra de navegación del administrador.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../../node_modules/react-bootstrap/NavBar.js:NavBar
 * @requires ../../node_modules/react-bootstrap/Nav.js:Nav
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../config/Auth.jsx:signOut
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand from "../assets/imgUnicast.jpg";
import { Navbar, Nav, Button } from "react-bootstrap";
import { signOut } from "../config/Auth";

/**
 * Clase que gestiona la barra de navegación
 * del administrador.
 * @extends Component
 */
class BarraAdmi extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" className="shadow-sm mb-5 bg-white" fixed="top">
          <Navbar.Brand style={{ marginLeft: "15px", height: "40px" }}>
            <Link to="/administrador-crear">
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
                <Button
                  variant="link"
                  style={{ color: "#00000080", textDecoration: "none" }}
                >
                  Añadir elementos
                </Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/administrador-borrar">
                <Button
                  variant="link"
                  style={{ color: "#00000080", textDecoration: "none" }}
                >
                  Borrar elementos
                </Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" onClick={() => signOut()}>
                <Button
                  variant="link"
                  style={{ color: "#00000080", textDecoration: "none" }}
                >
                  Cerrar sesión
                </Button>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default BarraAdmi;
