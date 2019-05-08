import { getUserToken } from "./Auth";
import ApiClient from "swagger_unicast/dist/ApiClient";
import { Degree2 } from "swagger_unicast";
import Subject2 from "swagger_unicast/dist/model/Subject2";

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
  let defaultClient = ApiClient.instance;
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
  let defaultClient = ApiClient.instance;
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
          console.log(data);
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
  let defaultClient = ApiClient.instance;
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
  let defaultClient = ApiClient.instance;
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
  let defaultClient = ApiClient.instance;
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
