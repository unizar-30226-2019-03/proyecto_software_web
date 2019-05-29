/**
 * @fileoverview Fichero Asignaturas.jsx donde se encuentra la clase
 * que renderiza la pantalla de la lista de asignaturas de un usuario.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../../node_modules/react-bootstrap/ListGroup.js:ListGroup
 * @requires ../../node_modules/react-bootstrap/Dropdown.js:Dropdown
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../../node_modules/react-bootstrap/FormControl.js:FormControl
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ./CustomToggle.jsx:CustomToggle
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/UserAPI.jsx:getSubjectsOfUser
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { ListGroup, Dropdown, Button, FormControl } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import CustomToggle from "./CustomToggle";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
import { getSubjectsOfUser } from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Renderiza la información básica de una asignatura que sigue un
 * usuario (nombre, universidad y foto).
 * @param {Object} param0 Propiedades del componente
 * @param {String} param0.name Nombre de la asignatura
 * @param {String} param0.uni Nombre de la universidad de la asignatura
 * @param {String} param0.foto URI de la foto de la universidad
 * @param {Number} param0.id Id de la asignatura
 */
const ItemAsignatura = ({ nombre, uni, foto, id }) => {
  return (
    <Link to={`/asig/${id}`} style={{ color: "black", textDecoration: "none" }}>
      <ListGroup.Item className="fondo">
        <p className="asig">{nombre}</p>
        <p className="uni">{uni}</p>
        <img className="imagen" src={foto} alt="imagen asinatura" />
      </ListGroup.Item>
    </Link>
  );
};

/**
 * Renderiza todas las asignaturas que un usuario sigue.
 * @param {Array.<Object>} lista Lista de asignaturas de un usuario
 */
const ListaAsignaturas = lista =>
  lista.map(el => {
    const { name, university, id } = el;
    return (
      <ItemAsignatura
        nombre={name}
        uni={university === undefined ? "" : university.name}
        foto={university === undefined ? "" : university.photo}
        key={id}
        id={id}
      />
    );
  });

/**
 * Clase que gestiona la pantalla de las asignaturas que sigue
 * un usuario.
 * @extends Component
 */
class Asignaturas extends Component {
  /**
   * Construye el componente Asignaturas
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      filtro: "",
      asignaturas: [],
      mostrarSpin: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.cambiaFiltro = this.cambiaFiltro.bind(this);
    this.filtrar = this.filtrar.bind(this);
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

  /**
   * Obtiene todas las asignaturas que un usuario sigue.
   */
  getData() {
    getSubjectsOfUser(getUserID(), data => {
      if (this._isMounted) {
        this.setState({ asignaturas: data, mostrarSpin: false });
      }
    });
  }

  /**
   * Actualiza el valor por el que filtrar las asignaturas.
   * @param {Event} e Evento que devuelve el formulario
   */
  cambiaFiltro(e) {
    this.setState({ filtro: e.target.value.toLowerCase().trim() });
  }
  /**
   * Filtra la lista de asignaturas del usuario según el valor
   * escrito por el mismo.
   * @param {Array.<Object>} lista
   */
  filtrar(lista) {
    let asig = lista.filter(
      a => "" || a.name.toLowerCase().startsWith(this.state.filtro)
    );
    return asig;
  }

  /**
   * Ajusta el contenido a la barra lateral.
   * @param {Boolean} display Determina si desplazar contenido o no
   */
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
            url: `/asignaturas`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Mis Asignaturas | UniCast</title>
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
              {this.state.mostrarSpin ? (
                <LoadingSpinUniCast className="spin-ranking" />
              ) : asignaturasFiltradas.length === 0 ? (
                <div
                  style={{
                    color: "#00000080",
                    padding: "10px",
                    fontSize: "14px",
                    textAlign: "left"
                  }}
                >
                  Actualmente no sigue a ninguna asignatura, conforme siga
                  asignaturas aparecerán aquí.
                </div>
              ) : (
                listaAsign
              )}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Asignaturas;
