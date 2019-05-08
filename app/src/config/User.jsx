import { ApiClient } from "swagger_unicast";
import { getUserToken } from "./Auth";
import UserApi from "swagger_unicast/dist/api/UserApi";

/**
 * Busca al usuario con nombre username y ejecuta el callback
 * tras obtener dicho usuario.
 * @param {String} username Nombre de usuario del usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getUserByUsername(username, callback) {
  let defaultClient = ApiClient.instance;
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let apiInstance = new UserApi();
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
