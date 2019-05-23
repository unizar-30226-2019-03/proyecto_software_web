import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { ListGroup, Dropdown, Button, FormControl } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import CustomToggle from "./CustomToggle";
import { FaTrophy } from "react-icons/fa";
import { isSignedIn, getUserRole } from "../config/Auth";
import { getSubjectRanking } from "../config/SubjectAPI";
import { getScore } from "../config/VideoAPI";

class ItemAsignatura extends Component {
  render() {
    return (
      <Link
        to={`/asig/${this.props.id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <ListGroup.Item className="fondo">
          <p className="puestoRanking">
            {this.props.pos}.{" "}
            {this.props.trofeo !== null ? (
              <FaTrophy
                style={{ marginLeft: "10px" }}
                color={this.props.trofeo}
                size={25}
              />
            ) : null}
          </p>
          <p className="asigRank">{this.props.nombre}</p>
          <img
            className="imagenRank"
            src={this.props.uni === undefined ? "" : this.props.uni.photo}
            alt="imagen asinatura"
          />
          <p className="uniRank">
            {this.props.uni === undefined ? "" : this.props.uni.name}
          </p>
          <p className="puntuacion">{this.props.puntuacion}%</p>
        </ListGroup.Item>
      </Link>
    );
  }
}

const ListaAsignaturas = lista =>
  lista.map(el => {
    const { name, university, id, avgScore, position } = el;
    let trofeo = null;
    switch (position) {
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
        nombre={name}
        uni={university}
        key={id}
        id={id}
        pos={position}
        trofeo={trofeo}
        puntuacion={getScore(avgScore)}
      />
    );
  });

class Rankings extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      filtro: "",
      asignaturas: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.cambiaFiltro = this.cambiaFiltro.bind(this);
    this.filtrar = this.filtrar.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    getSubjectRanking(0, data => {
      const ranking = data.map((a, index) => {
        a.position = index + 1;
        return a;
      });
      if (this._isMounted) {
        this.setState({ asignaturas: ranking });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/rankings`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Ránkings | UniCast</title>
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
