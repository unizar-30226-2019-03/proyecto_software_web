/**
 * @fileoverview Funciones de la API de las asignaturas
 *
 * @author UniCast
 *
 * @requires ../node_modules/swagger_unicast/dist/ApiClient.js:ApiClient
 * @requires ../node_modules/swagger_unicast/dist/api/SubjectApi.js:SubjectApi
 * @requires ./Auth.js:getUserToken
 */

import ApiClient from "swagger_unicast/dist/ApiClient";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";
import { getUserToken } from "./Auth";

const apiInstance = new SubjectApi();
const defaultClient = ApiClient.instance;

/**
 * Obtiene la asignatura con el id especificado
 * @param {Number} id ID de la asignatura
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getSubjectById(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity" // String | Incluir si se quiere obtener tambien la universidad en la respuesta
  };
  apiInstance.getSubjectById(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene la asignatura con el nombre especificado
 * @param {String} name Nombre de la asignatura
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function findSubjectByName(name, callback) {
  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity", // String | Incluir si se quiere obtener tambien la universidad en la respuesta
    name: name // String | Nombre a buscar
  };
  apiInstance.findSubjectsByName(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Busca asignaturas cuyo nombre contenga la cadena name
 * @param {String} name Nombre a buscar
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function findSubjectsContainingName(name, callback) {
  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity", // String | Incluir si se quiere obtener tambien la universidad en la respuesta
    name: name // String | String a buscar en el nombre de asignaturas
  };
  apiInstance.findSubjectsContainingName(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data._embedded.subjects);
    }
  });
}

/**
 * Relaciona el usuario con la asignatura
 * @param {Number} subjectId ID de la asignatura
 * @param {Boolean} ack TRUE si éxito, FALSE si error
 */
export function SubscribeSubject(subjectId, ack) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.followSubject(subjectId, (error, data, response) => {
    if (error) {
      console.error(error);
      ack(false);
    } else {
      ack(true);
    }
  });
}

/**
 * Elimina la relación del usuario con la asignatura
 * @param {Number} subjectId ID de la asignatura
 * @param {Boolean} ack TRUE si éxito, FALSE si error
 */
export function UnsubscribeSubject(subjectId, ack) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.unfollowSubject(subjectId, (error, data, response) => {
    if (error) {
      console.error(error);
      ack(false);
    } else {
      ack(true);
    }
  });
}

/**
 * Obtiene los profesores asociados a una asignatura
 * @param {Number} id ID de la asignatura
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getProfessorsFromSubject(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getProfessorsFromSubject(
    parseInt(id),
    opts,
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(data._embedded.users);
      }
    }
  );
}

/**
 * Obtiene el ránking de asignaturas
 * @param {Number} page Número de página
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getSubjectRanking(page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity", // String | Incluir si se quiere obtener tambien la universidad en la respuesta
    page: page // Number | Número de la página a devolver
  };
  apiInstance.getSubjectRanking(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data._embedded.subjects);
    }
  });
}
