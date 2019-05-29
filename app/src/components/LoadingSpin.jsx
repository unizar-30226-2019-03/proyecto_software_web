/**
 * @fileoverview Fichero LoadingSpin.jsx donde se encuentra el componente
 * que renderiza el spin de carga de datos de la aplicación.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-loading-spin/lib/index.js:LoadingSpin
 */

import React from "react";
import LoadingSpin from "react-loading-spin";

/**
 * Renderiza el spin de carga de datos de la aplicación
 * @param {Object} props Propiedades del componente
 * @param {String} props.className Indica la clase CSS del componente
 */
export const LoadingSpinUniCast = props => (
  <div className={props.className}>
    <LoadingSpin
      duration="2s"
      width="2px"
      timingFunction="ease-in-out"
      size={props.size === undefined ? "18px" : props.size}
      primaryColor="#235da9"
      secondaryColor="lightgrey"
    />
  </div>
);
