import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { ListGroup, Dropdown, Button, FormControl } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import CustomToggle from "./CustomToggle";
import { isSignedIn, getUserID } from "../config/Auth";
import { getSubjectsOfUser } from "../config/User";

const ItemAsignatura = ({ nombre, uni, foto }) => {
  return (
    <Link
      to={`/asig/${nombre}`}
      style={{ color: "black", textDecoration: "none" }}
    >
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
    const { name, university, id } = el;
    return (
      <ItemAsignatura
        nombre={name}
        uni={university.name}
        foto={university.photo}
        key={id}
      />
    );
  });

class Asignaturas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      filtro: "",
      asignaturas: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.cambiaFiltro = this.cambiaFiltro.bind(this);
    this.filtrar = this.filtrar.bind(this);
  }

  componentWillMount() {
    getSubjectsOfUser(getUserID(), data => {
      this.setState({ asignaturas: data });
    });
  }

  cambiaFiltro(e) {
    this.setState({ filtro: e.target.value.toLowerCase().trim() });
  }

  filtrar(lista) {
    let asig = lista.filter(
      a => "" || a.name.toLowerCase().startsWith(this.state.filtro)
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
    const asignaturasFiltradas = this.filtrar(this.state.asignaturas);
    const listaAsign = ListaAsignaturas(asignaturasFiltradas);
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Mis Asignaturas</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
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
