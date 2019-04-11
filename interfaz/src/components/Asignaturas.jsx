import React, { Component } from "react";
import CustomNavBar from "./CustomNavBar";
import { Helmet } from "react-helmet";
import { ListGroup, Dropdown, Button } from "react-bootstrap";
import Link from "react-router-dom/Link";
import foto from "../assets/favicon.ico";
import CustomMenu from "./CustomMenu";
import CustomToggle from "./CustomToggle";

class Asignaturas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Mis Asignaturas</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={"asignaturas"}
        />
        <div
          className="transform"
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "80px"
          }}
        >
          <div className="listado-asignaturas">
            <h5>Mis asignaturas</h5>

            <ListGroup variant="flush" className="lista">
              <Dropdown style={{ marginBottom: "5px" }}>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <Button className="boton-filtro">
                    Filtrar por asignaturas
                  </Button>
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                  <Dropdown.Item eventKey="1">
                    Aprendizaje Automático
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">Proyecto Software</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Bases de Datos II</Dropdown.Item>
                  <Dropdown.Item eventKey="1">
                    Administración de sistemas
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Link
                to="/asig/1"
                style={{ color: "black", textDecoration: "none" }}
              >
                <ListGroup.Item className="fondo">
                  <p className="asig">Aprendizaje Automático</p>
                  <p className="uni">Universidad de Zaragoza</p>
                  <img className="imagen" src={foto} alt="imagen asinatura" />
                </ListGroup.Item>
              </Link>
              <Link
                to="/asig/2"
                style={{ color: "black", textDecoration: "none" }}
              >
                <ListGroup.Item className="fondo">
                  <p className="asig">Proyecto Software</p>
                  <p className="uni">Universidad de Zaragoza</p>
                  <img className="imagen" src={foto} alt="imagen asinatura" />
                </ListGroup.Item>
              </Link>
              <Link
                to="/asig/3"
                style={{ color: "black", textDecoration: "none" }}
              >
                <ListGroup.Item className="fondo">
                  <p className="asig">Bases de Datos II</p>
                  <p className="uni">Universidad de Zaragoza</p>
                  <img className="imagen" src={foto} alt="imagen asinatura" />
                </ListGroup.Item>
              </Link>
              <Link
                to="/asig/4"
                style={{ color: "black", textDecoration: "none" }}
              >
                <ListGroup.Item className="fondo">
                  <p className="asig">Administración de sistemas</p>
                  <p className="uni">Universidad de Zaragoza</p>
                  <img className="imagen" src={foto} alt="imagen asinatura" />
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Asignaturas;
