import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { ListGroup, Dropdown, Button, FormControl } from "react-bootstrap";
import Link from "react-router-dom/Link";
import foto from "../assets/favicon.ico";
import CustomToggle from "./CustomToggle";

const asignaturas = [
  {
    nombre: "Aprendizaje Automático",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Proyecto Software",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Bases de Datos I",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Bases de Datos II",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Administración de Sistemas I",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Administración de Sistemas II",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Inteligencia Artificial",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Ingeniería del Software",
    uni: "Universidad de Zaragoza",
    foto: foto
  },
  {
    nombre: "Programación de Sistemas Concurrentes y Distribuidos",
    uni: "Universidad de Zaragoza",
    foto: foto
  }
];

const ItemAsignatura = ({ nombre, uni, foto }) => {
  return (
    <Link to="/asig/1" style={{ color: "black", textDecoration: "none" }}>
      <ListGroup.Item className="fondo">
        <p className="asig">{nombre}</p>
        <p className="uni">{uni}</p>
        <img className="imagen" src={foto} alt="imagen asinatura" />
      </ListGroup.Item>
    </Link>
  );
};

const ListaAsignaturas = lista =>
  lista.map(el => {
    const { nombre, uni, foto } = el;
    return (
      <ItemAsignatura nombre={nombre} uni={uni} foto={foto} key={nombre} />
    );
  });

class Asignaturas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      filtro: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.cambiaFiltro = this.cambiaFiltro.bind(this);
    this.filtrar = this.filtrar.bind(this);
  }

  cambiaFiltro(e) {
    this.setState({ filtro: e.target.value.toLowerCase().trim() });
  }

  filtrar(lista) {
    let asig = lista.filter(
      a => "" || a.nombre.toLowerCase().startsWith(this.state.filtro)
    );
    return asig;
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  render() {
    const asignaturasFiltradas = this.filtrar(asignaturas);
    const listaAsign = ListaAsignaturas(asignaturasFiltradas);
    return (
      <div>
        <Helmet>
          <title>Mis Asignaturas</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={"asignaturas"}
          displaySide={true}
          hide={false}
        />
        <div
          className="transform"
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "80px"
          }}
        >
          <div className="listado-asignaturas">
            <div
              style={{
                borderBottom: "1px solid lightgrey",
                marginRight: "70px"
              }}
            >
              <h5>Mis asignaturas</h5>
            </div>

            <ListGroup variant="flush" className="lista">
              <Dropdown style={{ marginBottom: "5px" }} drop={"right"}>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <Button className="boton-filtro">
                    Filtrar por asignaturas
                  </Button>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ marginTop: "-40px" }}>
                  <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    style={{ cursor: "text" }}
                    placeholder="Escribe para filtrar..."
                    onChange={this.cambiaFiltro}
                  />
                </Dropdown.Menu>
              </Dropdown>
              {listaAsign}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Asignaturas;
