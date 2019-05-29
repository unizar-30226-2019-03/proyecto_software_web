/**
 * @fileoverview Fichero MensajesProfes.jsx donde se encuentra la clase
 * que renderiza la pantalla de la lista de profesores de un usuario.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ./ListaVerticalProfes.jsx:ListaVerticalProfes
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/UserAPI.jsx:findUserProfessors
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVerticalProfes from "./ListaVerticalProfes";
import { Redirect, Link } from "react-router-dom";
import { isSignedIn, getUserRole, getUserID } from "../config/Auth";
import { findUserProfessors } from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Clase que gestiona la lista de profesores de un usuario.
 * @extends Component
 */
class ProfesoresLista extends Component {
  /**
   * Construye el componente ProfesoresLista
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.profesores Lista de profesores de un usuario
   */
  constructor(props) {
    super(props);
    this.state = { listaProfesores: props.profesores };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listaProfesores: nextProps.profesores });
  }

  render() {
    return (
      <div>
        <div style={{ display: "block", marginRight: "70px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "25px"
            }}
          >
            <ListaVerticalProfes lista={this.state.listaProfesores} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Clase que gestiona la pantalla de la lista de profesores
 * de un usuario.
 * @extends Component
 */
class MensajesProfes extends Component {
  /**
   * Construye el componente MensajesProfes.
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
      profesores: [],
      mostrarSpin: true
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Obtiene todos los profesores del usuario.
   */
  getData() {
    findUserProfessors(0, data => {
      if (data.length === 20) {
        this.getAllProfessors(1, data);
      } else {
        //Eliminamos el propio profesor (si lo es)
        const index = data.findIndex(p => {
          return p.id === getUserID();
        });
        if (index !== -1) {
          data.splice(index, 1);
        }
        if (this._isMounted) {
          this.setState({
            profesores: data,
            mostrarSpin: false
          });
        }
      }
    });
  }

  /**
   * Obtiene todos los profesores de un usuario y los va apilando
   * en la lista professors para ser alamcenada cuando se obtengan todos.
   * @param {Number} page Página de profesores a obtener
   * @param {Array.<Object>} professors Lista de profesores de un usuario
   */
  getAllProfessors(page, professors) {
    if (professors.length < 20 * page) {
      if (this._isMounted) {
        this.setState({ profesores: professors });
      }
    } else {
      findUserProfessors(page, data => {
        const newData = [...professors, ...data];
        this.getAllProfessors(newData, page + 1);
      });
    }
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData(0);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Ajusta el contenido a la barra lateral.
   * @param {Boolean} display Determina si desplazar contenido o no
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/mensajes-profesores`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Profesores | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={""}
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
          <div style={{ marginBottom: "10px" }}>
            <Link
              to="/mensajes"
              className="link-mensajes"
              style={{ textDecoration: "none", color: "black" }}
            >
              {"Mensajes"}
            </Link>
            <Link
              to="/mensajes-profesores"
              className="link-mensajes-activo"
              style={{ color: "black" }}
            >
              {"Profesores"}
            </Link>
          </div>
          {this.state.mostrarSpin ? (
            <LoadingSpinUniCast className="spin-ranking" />
          ) : this.state.profesores.length === 0 ? (
            <div
              style={{
                color: "#00000080",
                padding: "10px",
                fontSize: "14px",
                textAlign: "center"
              }}
            >
              Lista vacía, conforme añadas asignaturas, sus profesores irán
              apareciendo aqui.
            </div>
          ) : (
            <ProfesoresLista profesores={this.state.profesores} />
          )}
        </div>
      </div>
    );
  }
}

export default MensajesProfes;
