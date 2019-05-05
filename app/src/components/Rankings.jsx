import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { ListGroup, Dropdown, Button, FormControl } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import foto from "../assets/favicon.ico";
import CustomToggle from "./CustomToggle";
import { FaTrophy } from "react-icons/fa";
import { isSignedIn } from "../config/Auth";

const asignaturas = [
  {
    nombre: "Aprendizaje Automático",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "98%",
    posicion: 1
  },
  {
    nombre: "Proyecto Software",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "95%",
    posicion: 2
  },
  {
    nombre: "Bases de Datos I",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "90%",
    posicion: 3
  },
  {
    nombre: "Bases de Datos II",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "85%",
    posicion: 4
  },
  {
    nombre: "Administración de Sistemas I",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "82%",
    posicion: 5
  },
  {
    nombre: "Administración de Sistemas II",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "80%",
    posicion: 6
  },
  {
    nombre: "Inteligencia Artificial",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "78%",
    posicion: 7
  },
  {
    nombre: "Ingeniería del Software",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "77%",
    posicion: 8
  },
  {
    nombre: "Programación de Sistemas Concurrentes y Distribuidos",
    uni: "Universidad de Zaragoza",
    foto: foto,
    puntuacion: "73%",
    posicion: 9
  }
];

const ItemAsignatura = ({ nombre, uni, foto, pos, trofeo, puntuacion }) => {
  return (
    <Link to="/asig/1" style={{ color: "black", textDecoration: "none" }}>
      <ListGroup.Item className="fondo">
        <p className="puestoRanking">
          {pos}.{" "}
          {trofeo !== null ? (
            <FaTrophy style={{ marginLeft: "10px" }} color={trofeo} size={25} />
          ) : null}
        </p>
        <p className="asigRank">{nombre}</p>
        <img className="imagenRank" src={foto} alt="imagen asinatura" />
        <p className="uniRank">{uni}</p>
        <p className="puntuacion">{puntuacion}</p>
      </ListGroup.Item>
    </Link>
  );
};

const ListaAsignaturas = lista =>
  lista.map(el => {
    const { nombre, uni, foto, puntuacion, posicion } = el;
    let trofeo = null;
    switch (posicion) {
      case 1:
        trofeo = "#D4AF37";
        break;
      case 2:
        trofeo = "#C0C0C0";
        break;
      case 3:
        trofeo = "#CD7F32";
        break;

      default:
        break;
    }
    return (
      <ItemAsignatura
        nombre={nombre}
        uni={uni}
        foto={foto}
        key={nombre}
        pos={posicion}
        trofeo={trofeo}
        puntuacion={puntuacion}
      />
    );
  });

class Rankings extends Component {
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
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Ránkings</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={"rankings"}
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
              <h5>Ránking de Asignaturas</h5>
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

export default Rankings;
