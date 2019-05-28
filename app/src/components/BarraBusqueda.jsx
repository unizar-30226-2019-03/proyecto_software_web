/**
 * @fileoverview Fichero BarraBusqueda.jsx donde se encuentra la clase
 * que renderiza la barra de búsqueda, integrada en la barra de navegación.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../../node_modules/mdbreact/dist/mdbreact.js:MDBCol
 */

import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import { Redirect } from "react-router-dom";

/**
 * Clase que renderiza la barra de búsqueda, integrada en
 * la barra de navegación.
 * @extends Component
 */
class BarraBusqueda extends Component {
  /**
   * Construye el componente BarraBusqueda
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {String} props.nuevoTit Valor de la búsqueda realizada
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.nuevoTit === undefined ? "" : props.nuevoTit,
      buscar: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ buscar: false });
  }

  /**
   * Almacena el valor de lo escrito por el usuario.
   * @param {Event} e Evento que devuelve el elemento input
   */
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  /**
   * Si se ha pulsado enter y había algo que buscar,
   * se redirige a la página de búsqueda.
   * @param {Event} e Evento que devuelve el elemento input
   */
  keyPress(e) {
    if (e.keyCode === 13) {
      if (this.state.value.length > 0) {
        this.setState({ buscar: true });
      }
    }
  }

  render() {
    return this.state.buscar ? (
      <Redirect to={`/busqueda/${this.state.value}`} />
    ) : (
      <MDBCol md="6" className="mx-auto">
        <input
          id="input-form"
          className="form-control"
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
          type="text"
          value={this.state.value}
          placeholder="Buscar..."
          aria-label="Search"
        />
      </MDBCol>
    );
  }
}

export default BarraBusqueda;
