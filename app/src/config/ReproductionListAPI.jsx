/**
 * @fileoverview Funciones de la API de las listas de reproducción
 *
 * @author UniCast
 *
 * @requires ../node_modules/swagger_unicast/dist/ApiClient.js:ApiClient
 * @requires ../node_modules/swagger_unicast/dist/api/ReproductionListApi.js:ReproductionListApi
 * @requires ./Auth.js:getUserToken
 */

import { ApiClient, ReproductionListApi } from "swagger_unicast";
import { getUserToken } from "./Auth";

const defaultClient = ApiClient.instance;
const apiInstance = new ReproductionListApi();

/**
 * Crea una nueva lista de reproducción con el nombre especificado
 * @param {String} name Nombre de la lista a crear
 * @param {Function} callback Función a ejecutar tras crear la lista
 */
export function addReproductionList(name, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.addReproductionList(name, (error, data, response) => {
    if (error) {
      console.error(error);
      callback(false);
    } else {
      callback(true, data);
    }
  });
}

/**
 * Añade un vídeo a una lista de reproducción
 * @param {Number} reproListId ID de la lista de reproducción
 * @param {Number} videoId ID del vídeo
 * @param {Function} callback Función a ejecutar tras añadir el vídeo
 */
export function addVideotoReproductionList(reproListId, videoId, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.addVideotoReproductionList(
    reproListId,
    videoId,
    (error, data, response) => {
      if (error) {
        console.error(error);
        callback(false);
      } else {
        callback(true);
      }
    }
  );
}

/**
 * Borra la lista de reproducción especificada
 * @param {Number} id ID de la lista de reproducción
 * @param {Function} callback Función a ejecutar tras borrar la lista
 */
export function deleteReproductionList(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.deleteReproductionList(id, (error, data, response) => {
    if (error) {
      console.error(error);
      callback(false);
    } else {
      callback(true);
    }
  });
}

/**
 * Borra un vídeo de una lista de reproducción
 * @param {Number} reproListId ID de la lista de reproducción
 * @param {Number} videoId ID del vídeo
 * @param {Function} callback Función a ejecutar tras borrar el vídeo de la lista de reproducción
 */
export function deleteVideoFromReproductionList(
  reproListId,
  videoId,
  callback
) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.deleteVideoFromReproductionList(
    reproListId,
    videoId,
    (error, data, response) => {
      if (error) {
        console.error(error);
        callback(false);
      } else {
        callback(true);
      }
    }
  );
}

/**
 * Obtiene la lista de listas de reproducción en las que está un vídeo
 * @param {Number} videoId ID del vídeo
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getReproductionListVideoIn(videoId, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getReproductionListVideoIn(
    videoId,
    opts,
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(data._embedded.reproductionLists);
      }
    }
  );
}

/**
 * Obtiene las listas de reproducción de un usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getUserReproductionLists(callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getUserReproductionLists(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data._embedded.reproductionLists);
    }
  });
}
