/**
 * @fileoverview Fichero CustomToggle.jsx donde se encuentra la clase
 * que gestiona el filtro de rankings de asignaturas y la lista de las
 * asignaturas de un usuario.
 *
 * @author UniCast
 */

import React, { Component } from "react";

/**
 * Clase que gestiona el filtro de asignaturas de las pantallas
 * Mis Asignaturas y Ránking Asignaturas.
 * @extends Component
 */
class CustomToggle extends Component {
  /**
   * Construye el componente CustomToggle
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Object} context Contexto de ejecución
   */
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Gestiona una acción al pulsar un elemento del filtro.
   * @param {Event} e Evento que devuelve el formulario
   */
  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a href="#a" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export default CustomToggle;
