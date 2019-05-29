import React from "react";

/**
 * Número máximo de caracteres a mostrar
 * @constant
 *
 * @type {Number}
 */
const MAX_CHAR_NAME = 5;

/**
 * Renderiza el icono de la asignatura de un vídeo
 *
 * @param {Object} param0 Propiedades del componente
 * @param {String} param0.image URI de la foto de la universidad
 * @param {String} param0.name Nombre de la asignatura
 */
const IconoAsignaturaUniversidad = ({ image, name }) => {
  return (
    <div className="container">
      <img src={image} className="universidadIcon" alt="icono asignatura" />
      <div className="nombreContainer">
        <div className="asignaturaNombre">
          {name.length > MAX_CHAR_NAME
            ? name.substring(0, MAX_CHAR_NAME)
            : name}
        </div>
      </div>
    </div>
  );
};

export default IconoAsignaturaUniversidad;
