import { ApiClient } from "swagger_unicast";
import { getUserToken } from "./Auth";
import UserApi from "swagger_unicast/dist/api/UserApi";

const apiInstance = new UserApi(); //Instancia de la API de usuarios
const defaultClient = ApiClient.instance;

/**
 * Obtiene el usuario con el id especificado
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener el usuario
 */
export function getUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Busca al usuario con nombre username y ejecuta el callback
 * tras obtener dicho usuario.
 * @param {String} username Nombre de usuario del usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getUserByUsername(username, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "'no-cache, no-store, must-revalidate'", // String |
    pragma: "'no-cache'", // String |
    expires: "'0'", // String |
    username: username // String | Comienzo del username del usuario a buscar
  };
  apiInstance.findUsersStartsWithUsername(opts, (error, data, response) => {
    if (error) {
      callback(false);
    } else {
      callback(data._embedded.users);
    }
  });
}

/**
 * Obtiene la universidad asociada al usuario
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getUniversityOfUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getUniversityOfUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene la carrera asociada al usuario
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getDegreeOfUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getDegreeOfUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene las asignaturas del usuario especificado
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener las asignaturas
 */
export function getSubjectsOfUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity" // String | Incluir si se quiere obtener tambien la universidad en la respuesta
  };
  apiInstance.getSubjectsOfUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data._embedded.subjects);
    }
  });
}
