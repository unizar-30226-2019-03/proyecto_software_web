import { ApiClient, VoteApi } from "swagger_unicast";
import { getUserToken } from "./Auth";

const defaultClient = ApiClient.instance;
const apiInstance = new VoteApi();

/**
 * Añade un voto a un vídeo
 * @param {Number} videoId ID del vídeo
 * @param {Number} suitability Adecuación
 * @param {Number} clarity Claridad
 * @param {Number} quality Calidad
 * @param {Function} callback Función a ejecutar tras votar
 */
export function addVote(videoId, suitability, clarity, quality, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.addVote(
    videoId,
    Math.floor(suitability),
    Math.floor(clarity),
    Math.floor(quality),
    (error, data, response) => {
      if (error) {
        callback(false);
      } else {
        callback(true);
      }
    }
  );
}
