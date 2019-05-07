import { getUserToken } from "./Auth";
import ApiClient from "swagger_unicast/dist/ApiClient";
import { Degree2 } from "swagger_unicast";

/**
 *
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
      console.error(error);
    } else {
      form.reset();
      handleShow();
    }
  });
}

/**
 *
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
 *
 * @param {Number} uniID ID de la universidad
 * @param {Number} carreraID ID de la carrera
 * @param {DegreeApi} DegreeApi API de las carreras
 */
export function ligarUniCarr(uniID, carreraID, DegreeApi) {
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
