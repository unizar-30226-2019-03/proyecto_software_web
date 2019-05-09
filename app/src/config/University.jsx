import ApiClient from "swagger_unicast/dist/ApiClient";
import { getUserToken } from "./Auth";
import { UniversityApi } from "swagger_unicast";

const apiInstance = new UniversityApi();

/**
 * Busca todas las asignaturas de la universidad dada y ejecuta
 * la función callback si hay éxito en la operación
 * @param {Number} id ID de la universidad
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getSubjectsFromUniveristy(id, callback) {
  let defaultClient = ApiClient.instance;
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getSubjecstFromUniversity(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data._embedded.subjects);
    }
  });
}
