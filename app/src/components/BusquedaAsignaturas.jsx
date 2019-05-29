/**
 * @fileoverview Fichero Asignaturas.jsx donde se encuentra la clase
 * que renderiza la pantalla de la lista de asignaturas de un usuario.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * Renderiza la información relativa a una asignatura para la pantalla
 * de búsqueda.
 * @param {Object} param0 Propiedades del componente
 * @param {Object} param0.subject Asignatura
 */
const MenuItem = ({ subject }) => {
  return (
    <div
      style={{
        marginBottom: "16px",
        display: "flex"
      }}
    >
      <div>
        <Link
          to={`/asig/${subject.id}`}
          style={{ display: "flex", color: "black", textDecoration: "none" }}
        >
          <img
            src={
              subject.university === undefined ? "" : subject.university.photo
            }
            width="125"
            height="125"
            style={{ borderRadius: "50%" }}
            alt={subject.name}
          />
          <div
            style={{
              fontWeight: "400",
              fontSize: "20px",
              marginLeft: "30px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              marginTop: "45px",
              marginBottom: "45px"
            }}
          >
            {subject.name === undefined ? "" : subject.name} -{" "}
            {subject.university === undefined ? "" : subject.university.name}
          </div>
        </Link>
      </div>
      <div
        style={{
          marginRight: "0",
          marginLeft: "auto",
          marginTop: "45px",
          marginBottom: "45px"
        }}
      >
        <Link
          to={`/asig/${subject.id}`}
          className="universidad"
          style={{ textDecoration: "none" }}
        >
          <Button
            className="boton-filtro"
            style={{
              whiteSpace: "nowrap"
            }}
          >
            Ir a Asignatura
          </Button>
        </Link>
      </div>
    </div>
  );
};

/**
 * Renderiza las asignaturas que coinciden con la búsqueda del usuario
 * @param {Array.<Object>} list Lista de asignaturas a mostrar
 */
const Menu = list =>
  list.map(el => {
    return <MenuItem subject={el} key={el.id} />;
  });

/**
 * Clase que muestra las asignaturas cuyo nombre coincide
 * con la búsqueda realizada por el usuario.
 * @extends Component
 */
class BusquedaAsignaturas extends Component {
  /**
   * Construye el componente BusquedaAsignaturas
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} lista Lista de asignaturas recuperadas
   */
  constructor(props) {
    super(props);
    this.menu = Menu(props.lista);
  }

  componentWillReceiveProps(nextProps) {
    this.menu = Menu(nextProps.lista);
  }

  render() {
    return <div>{this.menu}</div>;
  }
}

export default BusquedaAsignaturas;
