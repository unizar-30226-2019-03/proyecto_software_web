import ApiClient from "swagger_unicast/dist/ApiClient";
import { getUserToken } from "./Auth";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";

const apiInstance = new SubjectApi();
const defaultClient = ApiClient.instance;

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
