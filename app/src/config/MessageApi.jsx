import { ApiClient } from "swagger_unicast";
import MessageApi from "swagger_unicast/dist/api/MessageApi";
import { getUserToken } from "./Auth";

const defaultClient = ApiClient.instance;
const apiInstance = new MessageApi();

/**
 * Envía un mensaje al usuario especificado
 * @param {Number} receiverId ID del receptor del mensaje
 * @param {String} text Cuerpo del mensaje
 * @param {Function} callback Función a ejecutar tras enviar el mensaje
 */
export function addMessage(receiverId, text, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.addMessage(receiverId, text, (error, data, response) => {
    if (error) {
      callback(false);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene la lista de los últimos mensajes recibidos de cada chat del
 * usuario.
 * @param {Function} callback Función a ejecutar tras obtener los mensajes
 */
export function getLastMessages(callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getLastMessages(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data._embedded.messages);
    }
  });
}

/**
 * Obtiene la lista de mensajes del remitente especificado
 * @param {Number} senderId ID del remitente
 * @param {Number} page Página a obtener
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getMessagesFromSender(senderId, page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: page, // Number | Número de la página a devolver
    sort: ["null"] // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
  };
  apiInstance.getMessagesFromSender(senderId, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene la lista de mensajes enviados al destinatario especificado
 * @param {Number} receiverId ID del destinatario
 * @param {Number} page Página a obtener
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getMessagesToReceiver(receiverId, page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: page, // Number | Número de la página a devolver
    sort: ["null"] // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
  };
  apiInstance.getMessagesToReceiver(
    receiverId,
    opts,
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(data);
      }
    }
  );
}
