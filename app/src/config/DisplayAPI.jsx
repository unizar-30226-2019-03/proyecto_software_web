/**
 * @fileoverview Funciones de la API del historial y reproducciones
 *
 * @author UniCast
 *
 * @requires ../../node_modules/swagger_unicast/dist/ApiClient.js:ApiClient
 * @requires ../../node_modules/swagger_unicast/dist/api/DisplayApi.js:DisplayApi
 * @requires ./Auth.jsx:getUserToken
 */

import ApiClient from "swagger_unicast/dist/ApiClient";
import { DisplayApi } from "swagger_unicast";
import { getUserToken } from "./Auth";

const defaultClient = ApiClient.instance;
const apiInstance = new DisplayApi();

/**
 * Obtiene una lista de vídeos reproducidos por el usuario
 * @param {Number} page Número de página a obtener
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getDisplaysByUser(page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: page, // Number | Número de la página a devolver
    sort: ["timestampLastTime,desc"], // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
    projection: "displayWithVideo" // String | Incluir si se quiere obtener tambien los videos en la respuesta
  };
  apiInstance.getDisplaysByUser(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Actualiza los segundos visualizados de un vídeo por un usuario
 * @param {Number} videoId ID del vídeo
 * @param {Number} secsFromBeg Segundos visualizados
 */
export function updateDisplay(videoId, secsFromBeg) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.updateDisplay(secsFromBeg, videoId, (error, data, response) => {
    if (error) {
      console.error(error);
    }
  });
}

/**
 * Borra del historial el vídeo
 * @param {Number} videoId ID del vídeo a borrar del historial
 * @param {Function} callback Función a ejecutar tras borrar vídeo
 */
export function deleteVideoFromDisplay(videoId, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.deleteDisplay(videoId, (error, data, response) => {
    if (error) {
      console.error(error);
      callback(false);
    } else {
      callback(true);
    }
  });
}

/**
 * Obtiene los datos de visualización para un usuario de un
 * vídeo concreto
 * @param {Number} videoId ID del vídeo
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getVideoDisplay(videoId, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.findByUserIdAndVideoId(videoId, opts, (error, data, response) => {
    if (error) {
      callback(false);
    } else {
      callback(data);
    }
  });
}
