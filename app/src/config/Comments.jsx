import { getUserToken } from "./Auth";
import { ApiClient, CommentApi } from "swagger_unicast";
import { generadorColores } from "./Video";

const apiInstance = new CommentApi();
const defaultClient = ApiClient.instance;

/**
 * Obtiene los comentarios del vídeo especificado.
 * @param {Number} id ID del vídeo
 * @param {Number} page Número de página a recuperar
 * @param {Function} callback Función a ejecutar tras obtener comentarios
 */
export function getCommentsByVideo(id, page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: page, // Number | Número de la página a devolver
    sort: ["null"], // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
    projection: "commentWithUser" // String | Incluir si se quiere obtener tambien el usuario que ha hecho el comentario
  };
  apiInstance.getCommentsByVideo(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      let com = data._embedded.comments.map(c => {
        const t = c.secondsFromBeginning;
        const text = c.text;
        const user = "david";
        const color = generadorColores(user);
        return { tiempo: t, comentario: text, usuario: user, color: color };
      });
      callback(com);
    }
  });
}

/**
 * Añade un comentario al vídeo especificado
 * @param {String} comment Comentario a añadir
 * @param {Number} time Segundos transcurridos desde el comienzo del vídeo
 * @param {Number} id ID del vídeo
 */
export function addComment(comment, time, id) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();
  apiInstance.addComment(
    comment,
    Math.floor(time),
    id,
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    }
  );
}
