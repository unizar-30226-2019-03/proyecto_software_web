import VideoApi from "swagger_unicast/dist/api/VideoApi";
import ApiClient from "swagger_unicast/dist/ApiClient";
import { getUserToken } from "./Auth";

const apiInstance = new VideoApi(); //Instancia de la API de vídeos
const defaultClient = ApiClient.instance;

/**
 * Genera un color aleatorio a partir del nombre del usuario
 * @param {String} usuario Nombre del usuario
 */
export function generadorColores(usuario) {
  var hash = 0;
  if (usuario.length === 0) return hash;
  for (let i = 0; i < usuario.length; i++) {
    hash = usuario.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var color = "#";
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

/**
 * Hace un scroll hasta la posición final del elemento sin
 * hacer un scroll completo en la pantalla.
 * @param {Element} elemento div a scrollear
 */
export function scrollFunc(elemento) {
  var docPos = f_scrollTop();
  elemento.scrollIntoView();
  window.scrollTo(0, docPos);
}

/**
 * Devuelve la posición hasta la que hacer scroll
 */
function f_scrollTop() {
  return f_filterResults(
    window.pageYOffset ? window.pageYOffset : 0,
    document.documentElement ? document.documentElement.scrollTop : 0,
    document.body ? document.body.scrollTop : 0
  );
}

/**
 * Calcula la posición correcta para hacer scroll
 * @param {Number} n_win Offset en la componente Y de la pantalla
 * @param {Number} n_docel Posición superior del elemento
 * @param {Number} n_body Posición superior del documento
 */
function f_filterResults(n_win, n_docel, n_body) {
  var n_result = n_win ? n_win : 0;
  if (n_docel && (!n_result || n_result > n_docel)) n_result = n_docel;
  return n_body && (!n_result || n_result > n_body) ? n_body : n_result;
}

/**
 * Devuelve un String indicando los minutos, horas, días, semanas, meses o años
 * transcurridos desde que se subió hasta el momento.
 * @param {Date} date1 Timestamp de un vídeo
 * @param {Date} now Tiempo actual del servidor
 */
export function getTimePassed(date1, now) {
  const diffMs = now - date1;
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins > 60) {
    const diffHrs = Math.floor(diffMs / 3600000);
    if (diffHrs > 24) {
      const diffDays = Math.floor(diffMs / 86400000);
      if (diffDays > 7) {
        const diffWeeks = Math.floor(diffMs / 604800000);
        if (diffWeeks > 4) {
          const diffMonths = Math.floor(diffMs / 2629800000);
          if (diffMonths > 12) {
            const diffYears = Math.floor(diffMs / 31556952000);
            return `${diffYears} años`;
          } else {
            return `${diffMonths} meses`;
          }
        } else {
          return `${diffWeeks} semanas`;
        }
      } else {
        return `${diffDays} días`;
      }
    } else {
      return `${diffHrs} horas`;
    }
  } else {
    return `${diffMins} minutos`;
  }
}

export function getScore(score) {
  return Math.round((score * 100) / 5);
}

/**
 * Crea un vídeo y lo guarda en el servidor.
 * @param {File} video Vídeo a subir
 * @param {File} img Miniatura del vídeo
 * @param {String} title Título del vídeo
 * @param {String} description Descripción del vídeo
 * @param {Number} subjectId ID de la asignatura del vídeo
 * @param {Function} f Función a ejecutar tras petición a la API
 */
export function UploadVideo(video, img, title, description, subjectId, f) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.addVideo(
    video,
    img,
    title,
    description,
    subjectId,
    (error, data, response) => {
      if (error) {
        f(false);
      } else {
        f(true);
      }
    }
  );
}

/**
 * Obtiene los vídeos un usuario, con un máximo
 * de 20 vídeos (dichos vídeos serán elegidos según la página especificada).
 * @param {Number} page Número de página a obtener
 * @param {Function} callback Función a ejecutar tras obtener los vídeos
 */
export function getVideosFromUploader(page, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  const opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    page: page, // Number | Número de la página a devolver
    sort: ["null"], // [String] | Parámetros en la forma `($propertyname,)+[asc|desc]?`
    projection: "videoWithSubject" // String | Incluir si se quiere obtener tambien la universidad y/o la asignatura en la respuesta
  };
  apiInstance.getVideosFromUploader(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      const now = ApiClient.parseDate(response.headers.date);
      callback(data._embedded.videos, now);
    }
  });
}

/**
 * Obtiene el vídeo con el id especificado
 * @param {Number} id ID del vídeo
 * @param {Function} callback Función a ejecutar tras obtener el vídeo
 */
export function getVideo(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  const opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "videoWithSubject" // String | Incluir si se quiere obtener tambien la universidad y/o la asignatura en la respuesta
  };

  apiInstance.getVideo(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      const now = ApiClient.parseDate(response.headers.date);
      callback(data, now);
    }
  });
}

/**
 * Obtiene la asignatura correspondiente al vídeo especificado
 * @param {Number} id ID del vídeo
 * @param {Function} callback Función a ejecutar tras obtener la asignatura
 */
export function getVideoSubject(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  const opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity" // String | Incluir si se quiere obtener tambien la universidad en la respuesta
  };
  apiInstance.getVideoSubject(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene todos los vídeos cuyo título contenga el título especificado
 * @param {String} title Título por el que buscar vídeos
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function findVideosContainingTitle(title, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "videoWithSubject", // String | Incluir si se quiere obtener tambien la universidad y/o la asignatura en la respuesta
    title: title // String | String a buscar en el titulo de videos
  };
  apiInstance.findVideosContainingTitle(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      const now = ApiClient.parseDate(response.headers.date);
      callback(data._embedded.videos, now);
    }
  });
}

/**
 * Borra un vídeo, solamente puede borrarlo el autor del vídeo
 * @param {Number} id ID del vídeo
 * @param {Function} callback Función a ejecutar tras borrar el vídeo
 */
export function deleteVideo(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  apiInstance.deleteVideo(id, (error, data, response) => {
    if (error) {
      console.error(error);
      callback(false);
    } else {
      console.log("API called successfully.");
      callback(true);
    }
  });
}
