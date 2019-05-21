import { getUserToken } from "./Auth";
import ApiClient from "swagger_unicast/dist/ApiClient";
import { Degree2 } from "swagger_unicast";
import Subject2 from "swagger_unicast/dist/model/Subject2";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";

const defaultClient = ApiClient.instance;
/**
 * 
 */
export function hacerProfesor(username, form, handleShow, api){
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  let opts = {
    cacheControl: "'no-cache, no-store, must-revalidate'", // String |
    pragma: "'no-cache'", // String |
    expires: "'0'", // String |
    username: username // String | Comienzo del username del usuario a buscar
  };
  api.findUsersContainingUsername(opts, (error, data, response) => {
    if (error) {
      alert("Errorsito");
    } else {
      console.log(data);
    }
  });
 /* api.makeProfessor(userId, (error, data, response) => {
    if (error) {
      alert("El nombre de usuario es incorrecto");
      console.log(error);
      console.log(userId);
    } else {
      form.reset();
      handleShow();
    }
  });*/
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
 */
export function crearUniversidad(uni, file, form, handleShow, api) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  api.addUniversity(uni, file, (error, data, response) => {
    if (error) {
      alert("La universidad " + uni + " ya existe");
    } else {
      form.reset();
      handleShow();
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

  let subject2 = new Subject2(subject, shortname.substr(0, 5)); // Subject2 | Asignatura a añadir
  SubjectApi.addSubject(subject2, (error, data, response) => {
    if (error) {
      //console.error(error);
      //Ya existe, buscarla y ligarla
      let opts = {
        cacheControl: "no-cache, no-store, must-revalidate", // String |
        pragma: "no-cache", // String |
        expires: "0", // String |
        name: subject // String | Nombre a buscar
      };
      SubjectApi.findSubjectsByName(opts, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          ligarUniAsig(uni, data.id, SubjectApi);
        }
      });
    } else {
      ligarUniAsig(uni, data.id, SubjectApi);
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
 */
export function addProfessor(idUser, idSubj, SubjectApi) {
  // Configure Bearer (JWT) access token for authorization: bearerAuth
  let bearerAuth = defaultClient.authentications["bearerAuth"];
  bearerAuth.accessToken = getUserToken();

  SubjectApi.addProfessor(idSubj, idUser, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
    }
  });
}

/**
 * Borra la asociación de un usuario con una asignatura
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
