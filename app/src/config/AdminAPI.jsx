/**
 * @fileoverview Funciones de la API del administrador
 *
 * @author UniCast
 *
 * @requires ../../node_modules/swagger_unicast/dist/ApiClient.js:ApiClient
 * @requires ../../node_modules/swagger_unicast/dist/api/SubjectApi.js:SubjectApi
 * @requires ../../node_modules/swagger_unicast/dist/model/Subject2.js:Subject2
 * @requires ../../node_modules/swagger_unicast/dist/model/Degree2.js:Degree2
 * @requires ./Auth.jsx:getUserToken
 */

import ApiClient from "swagger_unicast/dist/ApiClient";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";
import Subject2 from "swagger_unicast/dist/model/Subject2";
import { Degree2 } from "swagger_unicast";
import { getUserToken } from "./Auth";

const defaultClient = ApiClient.instance;

/**
 * Busca un usuario y lo convierte a profesor
 * @param {String} username Nombre de usuario
 * @param {HTMLElement} form Formulario a resetear
 * @param {Function} handleShow Función a ejecutar
 * @param {UserApi} api API de usuario
 */
export function hacerProfesor(username, form, handleShow, api) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    username: username // String | Comienzo del username del usuario a buscar
  };
  api.findUserByUsername(opts, (error, data, response) => {
    if (error) {
      alert("El usuario introducido no existe");
    } else {
      api.makeProfessor(data.id, (error, data, response) => {
        if (error) {
          alert("No se ha podido hacer profesor al usuario " + username);
          console.error(error);
        } else {
          form.reset();
          handleShow();
        }
      });
    }
  });
}

/**
 *
 * Busca un usuario y lo convierte a usuario normal
 * @param {String} username Nombre de usuario
 * @param {HTMLElement} form Formulario a resetear
 * @param {Function} handleShow Función a ejecutar
 * @param {UserApi} api API de usuario
 */
export function borrarProfesor(username, form, handleShow, api) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    username: username // String | Comienzo del username del usuario a buscar
  };
  api.findUserByUsername(opts, (error, data, response) => {
    if (error) {
      alert("El usuario introducido no existe");
    } else {
      api.eraseProfessor(data.id, (error, data, response) => {
        if (error) {
          alert("No se ha podido borrar al profesor " + username);
          console.error(error);
        } else {
          form.reset();
          handleShow();
          console.log("API called successfully.");
        }
      });
    }
  });
}

/**
 *
 * Elimina la universidad que tenga el id especificado
 * @param {Number} uni ID de la universidad
 * @param {HTMLElement} form Formulario a resetear
 * @param {Function} handleShow Función a ejecutar
 * @param {UniversityApi} api API de universidad
 * @param {Function} callback Función a ejecutar tras realizar la operación
 */
export function borrarUniversidad(uni, form, handleShow, api, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  api.deleteUniversity(parseInt(uni), (error, data, response) => {
    if (error) {
      console.error(error);
      callback(false);
    } else {
      form.reset();
      handleShow();
      callback(true);
    }
  });
}

/**
 *
 * Elimina la asignatura que tenga el id especificado
 * @param {Number} sub ID de la asignatura
 * @param {HTMLElement} form Formulario a resetear
 * @param {Function} handleShow Función a ejecutar
 * @param {SubjectApi} api API de asignatura
 */
export function borrarAsignatura(sub, form, handleShow, api) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  api.deleteSubject(parseInt(sub), (error, data, response) => {
    if (error) {
      console.error(error);
      alert("No se ha podido borrar la asignatura");
    } else {
      form.reset();
      handleShow();
    }
  });
}

/**
 * Elimina la asociación de un profesor con una asignatura
 * @param {Number} sub ID de la asignatura
 * @param {Number} prof ID del profesor
 * @param {HTMLElement} form Formulario a resetear
 * @param {Function} handleShow Función a ejecutar
 * @param {SubjectApi} api API de asignatura
 */
export function borrarProfeAsignatura(sub, prof, form, handleShow, api) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();
  api.deleteProfessor(
    parseInt(sub),
    parseInt(prof),
    (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        form.reset();
        handleShow();
      }
    }
  );
}
/**
 * Crea la universidad cuyo nombre y foto son los especificados
 * en los parámetros. Si ya existe la universidad, muestra un
 * mensaje informando de que ya existía.
 * @param {String} uni Nombre de la universidad
 * @param {File} file Imagen de la universidad
 * @param {HTMLElement} form Formulario de entrada
 * @param {Function} handleShow Callback a ejecutar
 * @param {UniversityApi} api API de la universidad
 * @param {Function} callback Función a ejecutar tras crear la universidad
 */
export function crearUniversidad(uni, file, form, handleShow, api, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  api.addUniversity(uni, file, (error, data, response) => {
    if (error) {
      callback(false);
    } else {
      form.reset();
      handleShow();
      callback(true);
    }
  });
}

/**
 * Si no existe la carrera, la crea y la asocia a la universidad
 * especificada. Si ya existía, asocia dicha carrera a la universidad.
 * @param {DegreeApi} DegreeApi API de las carreras
 * @param {String} carrera Nombre de la carrera
 * @param {Number} uni ID de la universidad
 */
export function crearCarreraYLigar(DegreeApi, carrera, uni) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let degree2 = new Degree2(carrera); // Degree2 | Carrera a añadir
  DegreeApi.addDegree(degree2, (error, data, response) => {
    if (error) {
      //console.error(error);
      //Ya existe, conseguir el id de la carrera
      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate", // String |
        pragma: "no-cache", // String |
        expires: "0", // String |
        name: carrera // String | Nombre a buscar
      };
      DegreeApi.findDegreesByName(opts, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          ligarUniCarr(uni, data.id, DegreeApi);
        }
      });
    } else {
      ligarUniCarr(uni, data.id, DegreeApi);
    }
  });
}

/**
 * Asocia la carrera y la universidad especificadas.
 * @param {Number} uniID ID de la universidad
 * @param {Number} carreraID ID de la carrera
 * @param {DegreeApi} DegreeApi API de las carreras
 */
function ligarUniCarr(uniID, carreraID, DegreeApi) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();
  //Ligar carrera a universidad
  DegreeApi.putDegreeUniversity(carreraID, uniID, (error, data, response) => {
    if (error) {
      console.error("error");
    } else {
      console.log("API called successfully.");
    }
  });
}

/**
 * Si no existe la asignatura, la crea y la asocia a la universidad
 * especificada. Si ya existía, asocia dicha asignatura a la universidad.
 * @param {SubjectApi} SubjectApi API de las asignaturas
 * @param {String} subject Nombre de la asignatura
 * @param {String} shortname Nombre abreviado de la asignatura
 * @param {Number} uni ID de la universidad
 */
export function crearAsigYLigar(SubjectApi, subject, shortname, uni) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let encontrado = false;
  let opts = {
    cacheControl: "no-cache, no-store, must-revalidate", // String |
    pragma: "no-cache", // String |
    expires: "0", // String |
    projection: "subjectWithUniversity", // String | Incluir si se quiere obtener tambien la universidad en la respuesta
    name: subject // String | Nombre a buscar
  };
  SubjectApi.findSubjectsByName(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      data._embedded.subjects.forEach(element => {
        if (element.university !== undefined && element.university.id === uni) {
          encontrado = true;
          console.log(encontrado);
        }
      });
    }
    if (encontrado) {
      alert("La asignatura ya existía para esa universidad");
    } else {
      let subject2 = new Subject2(subject, shortname.substr(0, 5)); // Subject2 | Asignatura a añadir
      SubjectApi.addSubject(subject2, (error, data, response) => {
        if (error) {
          //console.error(error);
          //Ya existe, buscarla y ligarla
          let opts = {
            cacheControl: "no-cache, no-store, must-revalidate", // String |
            pragma: "no-cache", // String |
            expires: "0", // String |
            projection: "subjectWithUniversity", // String | Incluir si se quiere obtener tambien la universidad en la respuesta
            name: subject // String | Nombre a buscar
          };
          SubjectApi.findSubjectsByName(opts, (error, data, response) => {
            if (error) {
              console.error(error);
            } else {
              console.log(data);
              let id = 0;
              data._embedded.subjects.forEach(element => {
                if (element.university === undefined) {
                  id = parseInt.element.id;
                }
              });
              ligarUniAsig(uni, id, SubjectApi);
            }
          });
        } else {
          ligarUniAsig(uni, data.id, SubjectApi);
        }
      });
    }
  });
}

/**
 * Liga la asignatura especificada a la universidad
 * especificada.
 * @param {Number} uni ID de la universidad
 * @param {Number} subject ID de la asignatura
 * @param {SubjectApi} SubjectApi API de las asignaturas
 */
function ligarUniAsig(uni, subject, SubjectApi) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();
  SubjectApi.putUniversity(subject, uni, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
    }
  });
}

/**
 * Asigna la asignatura especificada al usuario especificado
 * @param {Number} idUser ID del usuario
 * @param {Number} idSubj ID de la asignatura
 * @param {SubjectApi} SubjectApi API de las asignaturas
 * @param {Function} callback Función a ejecutar tras añadir profesor
 */
export function addProfessor(idUser, idSubj, SubjectApi, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  SubjectApi.addProfessor(idSubj, idUser, (error, data, response) => {
    if (error) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

/**
 * Elimina la asociación de un usuario con una asignatura
 * @param {Number} userId ID del usuario
 * @param {Number} subjectId ID de la asignatura
 * @param {Function} callback Función a ejecutar tras
 */
export function deleteProfessor(userId, subjectId, callback) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let apiInstance = new SubjectApi();
  apiInstance.deleteProfessor(subjectId, userId, (error, data, response) => {
    if (error) {
      console.error(error);
      callback(false);
    } else {
      callback(true);
    }
  });
}
