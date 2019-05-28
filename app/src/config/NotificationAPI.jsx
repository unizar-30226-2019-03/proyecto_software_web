/**
 * @fileoverview Funciones de la API de las notificaciones
 *
 * @author UniCast
 *
 * @requires ../../node_modules/swagger_unicast/dist/ApiClient.js:ApiClient
 * @requires ../../node_modules/swagger_unicast/dist/api/NotificationApi.js:NotificationApi
 * @requires ./Auth.jsx:getUserToken
 */

import ApiClient from "swagger_unicast/dist/ApiClient";
import NotificationApi from "swagger_unicast/dist/api/NotificationApi";
import { getUserToken } from "./Auth";

const defaultClient = ApiClient.instance;
const apiInstance = new NotificationApi();

/**
 * Marca una notificación como revisada
 * @param {Number} notificationId ID de la notificación
 * @param {Function} callback Función a ejecutar tras revisar la notificación
 */
export function checkNotification(notificationId, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();
  apiInstance.checkNotification(notificationId, (error, data, response) => {
    if (error) {
      console.error(error);
      if (callback !== undefined) {
        callback(false);
      }
    } else {
      if (callback !== undefined) {
        callback(true);
      }
    }
  });
}

/**
 * Obtiene las notificaciones de un usuario, tanto las revisadas
 * como las que no lo han sido.
 * @param {Number} page Página a devolver
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getUserNotifications(page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: page // Number | Número de la página a devolver
  };
  apiInstance.getUserNotifications(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene las notificaciones no revisadas de un usuario
 * @param {Number} page Página a obtener
 * @param {Function} callback Función a ejecutar tras obtener las notificaciones
 */
export function getUserUncheckedNotifications(page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: page // Number | Número de la página a devolver
  };
  apiInstance.getUserUncheckedNotifications(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      const now = ApiClient.parseDate(response.headers.date);
      callback(data._embedded.usersAreNotified, now);
    }
  });
}
