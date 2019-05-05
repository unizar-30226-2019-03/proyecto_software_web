import React from "react";

let MAX_CHAR_NAME = 5;

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
