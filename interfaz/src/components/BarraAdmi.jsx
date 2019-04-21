import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand from "../assets/imgUnicast.jpg";
import { Navbar, Nav, Button } from "react-bootstrap";
import { logOut, getUser } from "../App";

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
              <Link to="/" onClick={() => logOut(getUser())}>
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
