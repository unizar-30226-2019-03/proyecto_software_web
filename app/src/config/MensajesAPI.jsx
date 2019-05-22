import ApiClient from "swagger_unicast/dist/ApiClient";
import { getUserToken } from "./Auth";
import MessageApi from "swagger_unicast/dist/api/MessageApi";

const apiInstance = new MessageApi();
const defaultClient = ApiClient.instance;

export function enviarMensaje(receiver, message) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.addMessage(receiver, message, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully. Returned data: " + data);
    }
  });
}

export function mensajesPropios(receiver, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "'no-cache, no-store, must-revalidate'", // String |
    pragma: "'no-cache'", // String |
    expires: "'0'", // String |
    page: 0, // Number | Número de la página a devolver
    sort: ["null"] // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
  };
  apiInstance.getMessagesToReceiver(receiver, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

export function mensajesRecibidos(sender, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: 0, // Number | Número de la página a devolver
    sort: ["null"] // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
  };
  apiInstance.getMessagesFromSender(sender, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}
