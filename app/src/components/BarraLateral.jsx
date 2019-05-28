/**
 * @fileoverview Fichero BarraLateral.jsx donde se encuentra la clase
 * que renderiza la barra lateral de la aplicación, integrada en
 * la barra de navegación.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../config/UserAPI.jsx:getSubjectsOfUser
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/Auth.jsx:isSignedIn
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSubjectsOfUser } from "../config/UserAPI";
import { getUserID, isSignedIn } from "../config/Auth";

/**
 * Clase que renderiza la barra lateral, integrada en la
 * barra de navegación.
 * @extends Component
 */
class BarraLateral extends Component {
  /**
   * Construye el componente BarraLateral
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Boolean} props.show Indica si mostrar o no la barra lateral
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      activar: props.show,
      asigs: []
    };
    this.active = this.active.bind(this);
    this.getData = this.getData.bind(this);
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
   * Obtiene las asignaturas que un usuario sigue.
   */
  getData() {
    getSubjectsOfUser(getUserID(), data => {
      if (this._isMounted) {
        this.setState({ asigs: data });
      }
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ activar: newProps.show });
    if (
      newProps.updateSubject !== undefined &&
      newProps.updateSubject === true &&
      this.props.updateSubject === false
    ) {
      this.getData();
    }
  }

  /**
   * Devuelve la cadena active si la página actual coincide
   * con el parámetro de entrada
   * @param {String} name Nombre de la asignatura
   *
   * @returns {String} Clase del elemento HTML
   */
  active(name) {
    if (name === this.props.activate) {
      return "active";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div
        className={
          this.state.activar ? "sidebar transform" : "sidebar active transform"
        }
      >
        <div>
          <Link className={this.active("inicio")} to="/inicio">
            Inicio
          </Link>
          <Link className={this.active("rankings")} to="/rankings">
            Rankings
          </Link>
          <Link className={this.active("asignaturas")} to="/asignaturas">
            Mis asignaturas
          </Link>
          <Link className={this.active("listas")} to="/listas">
            Mis listas
          </Link>
          <Link className={this.active("historial")} to="/historial">
            Historial
          </Link>
        </div>
        <div className="asignaturas">
          <h4>Asignaturas</h4>
          {this.state.asigs.map(a => {
            return (
              <Link
                key={a.id}
                className={this.active(a.name)}
                to={`/asig/${a.id}`}
              >
                {a.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BarraLateral;
