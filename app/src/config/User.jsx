import { ApiClient } from "swagger_unicast";
import { getUserToken } from "./Auth";
import UserApi from "swagger_unicast/dist/api/UserApi";

const apiInstance = new UserApi(); //Instancia de la API de usuarios
const defaultClient = ApiClient.instance;

/**
 * Crea el usuario especificado en el servidor
 * @param {String} username Nombre de usuario del nuevo usuario
 * @param {String} password Contraseña del nuevo usuario
 * @param {String} name Nombre del nuevo usuario
 * @param {String} surnames Apellidos del nuevo usuario
 * @param {String} email Email del nuevo usuario
 * @param {String} description Descripción del nuevo usuario
 * @param {Number} universityId ID de la universidad del nuevo usuario
 * @param {Number} degreeId ID del grado del nuevo usuario
 * @param {File} photo Foto de perfil del nuevo usuario
 * @param {Function} callback Función a ejecutar tras crear usuario
 */
export function addUser(
  username,
  password,
  name,
  surnames,
  email,
  description,
  universityId,
  degreeId,
  photo,
  callback
) {
  apiInstance.addUser(
    username,
    password,
    name,
    surnames,
    email,
    description,
    universityId,
    degreeId,
    photo,
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(data);
      }
    }
  );
}

/**
 * Actualiza el usuario según los datos pasados como parámetros
 * @param {String} username Nuevo nombre de usuario
 * @param {String} password Nueva contraseña
 * @param {String} email Nuevo email
 * @param {String} description Nueva descripción
 * @param {String} name Nuevo nombre
 * @param {String} surnames Nuevos apellidos
 * @param {Number} universityId Nueva universidad
 * @param {Number} degreeId Nuevo grado
 * @param {File} photo Nueva foto de perfil
 * @param {Function} callback Función a ejecutar tras acutalizar el usuario
 */
export function updateUser(
  username,
  password,
  email,
  description,
  name,
  surnames,
  universityId,
  degreeId,
  photo,
  callback
) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();
  let opts = {
    username: username, // String | Nuevo nombre del usuario
    password: password, // String | Nueva contraseña del usuario
    email: email, // String | Nuevo email del usuario
    description: description, // String | Nueva descripción para el usuario
    name: name, // String | Nuevo nombre para el usuario
    surnames: surnames, // String | Nuevos apellidos para el usuario
    universityId: universityId, // Number | Nueva universidad del usuario
    degreeId: degreeId, // Number | Nueva carrera del usuario
    photo: photo // File | Nueva foto del usuario
  };

  if (photo === undefined) {
    delete opts.photo;
  }
  if (universityId === 0) {
    delete opts.universityId;
  }
  if (degreeId === 0) {
    delete opts.degreeId;
  }
  if (password === "") {
    delete opts.password;
  }
  console.log(opts);
  apiInstance.updateUser(opts, (error, data, response) => {
    if (error) {
      console.error(error);
      callback(false);
    } else {
      callback(true);
    }
  });
}

/**
 * Obtiene el usuario con el id especificado
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener el usuario
 */
export function getUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Busca al usuario con nombre username y ejecuta el callback
 * tras obtener dicho usuario.
 * @param {String} username Nombre de usuario del usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getUserByUsername(username, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

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

/**
 * Obtiene la universidad asociada al usuario
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getUniversityOfUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getUniversityOfUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene la carrera asociada al usuario
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener los datos
 */
export function getDegreeOfUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0" // String |
  };
  apiInstance.getDegreeOfUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data);
    }
  });
}

/**
 * Obtiene las asignaturas del usuario especificado
 * @param {Number} id ID del usuario
 * @param {Function} callback Función a ejecutar tras obtener las asignaturas
 */
export function getSubjectsOfUser(id, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity" // String | Incluir si se quiere obtener tambien la universidad en la respuesta
  };
  apiInstance.getSubjectsOfUser(id, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      callback(data._embedded.subjects);
    }
  });
}
