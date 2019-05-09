import ApiClient from "swagger_unicast/dist/ApiClient";
import { getUserToken } from "./Auth";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";

const apiInstance = new SubjectApi();
const defaultClient = ApiClient.instance;

/**
 * Relaciona el usuario con la asignatura
 * @param {Number} userId ID del usuario
 * @param {Number} subjectId ID de la asignatura
 */
export function SubscribeSubject(userId, subjectId) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.putUser(subjectId, userId, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
    }
  });
}

/**
 * Elimina la relación del usuario con la asignatura
 * @param {Number} userId ID del usuario
 * @param {Number} subjectId ID de la asignatura
 */
export function UnsubscribeSubject(userId, subjectId) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = "YOUR ACCESS TOKEN";

  apiInstance.deleteUserFromSubject(
    userId,
    subjectId,
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log("API called successfully.");
      }
    }
  );
}
