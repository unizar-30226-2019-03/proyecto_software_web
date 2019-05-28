/**
 * @fileoverview Funciones auxiliares para el procesado de cadenas y listas
 *
 * @author UniCast
 */

/**
 * Devuelve la cadena str sin acentos
 * @param {String} str Cadena de texto a quitar acentos
 *
 * @returns {String} Cadena sin acentos
 */
export function RemoveAccents(str) {
  var accents =
    "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
  var accentsOut =
    "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  str = str.split("");
  var strLen = str.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(str[i])) !== -1) {
      str[i] = accentsOut[x];
    }
  }
  return str.join("");
}

/**
 * Devuelve el tiempo t en formato hh:mm:ss
 * @param {Number} t Tiempo en segundos
 *
 * @returns {String} Duración total en formato hh:mm:ss
 */
export function getTime(t) {
  const tiempoAux = Math.trunc(t);
  var minutos = Math.trunc(tiempoAux / 60) % 60;
  var horas = Math.trunc(tiempoAux / 3600);
  if (minutos < 10) {
    minutos = "0" + minutos.toString();
    horas = "";
  } else {
    if (horas > 0) {
      horas = horas < 10 ? "0" + horas.toString() : horas.toString();
    } else {
      horas = "";
    }
    minutos = minutos.toString();
  }
  var segundos = tiempoAux % 60;
  if (segundos < 10) {
    segundos = "0" + segundos.toString();
  } else {
    segundos = segundos.toString();
  }
  return horas === ""
    ? minutos + ":" + segundos
    : horas + ":" + minutos + ":" + segundos;
}

/**
 * Comprueba si el fichero es una imagen.
 * @param {String} filename Nombre del fichero a subir
 *
 * @returns {Boolean} true si es una imagen
 */
export function checkFileExtensionImage(filename) {
  var ext = filename.split(".").pop();
  return ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "bmp";
}

/**
 * Comprueba si el fichero es un vídeo.
 * @param {String} filename Nombre del fichero a subir
 *
 * @returns {Boolean} true si es un vídeo
 */
export function checkFileExtensionVideo(filename) {
  var ext = filename.split(".").pop();
  return (
    ext === "mp4" ||
    ext === "mov" ||
    ext === "3gp" ||
    ext === "wma" ||
    ext === "flv" ||
    ext === "avi"
  );
}

/**
 * Coloca la lista de reproducción de favoritos en primer lugar
 * @param {Array.<Object>} data Array de listas de reproducción
 *
 * @returns {Array.<Object>} Lista ordenada
 */
export function putFavouritesFirst(data) {
  const i = data.findIndex(e => {
    return e.name === "Favoritos";
  });
  var t1 = data[i];
  data[i] = data[0];
  data[0] = t1;
  return data;
}

/**
 * Mezcla los dos arrays de forma ordenada descendiente por timestamps
 * @param {Array.<Object>} a Array ordenada por timestamps A
 * @param {Array.<Object>} b Array ordenada por timestamps B
 *
 * @returns {Array.<Object>} Array mezclado por orden descendiente
 */
export function mergeSortedArray(a, b) {
  var tempArray = [];
  var ia = 0,
    ib = 0;
  while (ia < a.length || ib < b.length) {
    if (typeof a[ia] === "undefined") {
      tempArray.push(b[ib++]);
    } else if (typeof b[ib] === "undefined") {
      tempArray.push(a[ia++]);
    } else if (a[ia].timestamp < b[ib].timestamp) {
      tempArray.push(b[ib++]);
    } else {
      tempArray.push(a[ia++]);
    }
  }
  return tempArray;
}

/**
 * Añade los nuevos mensajes a los mensajes del chat
 * @param {Array.<Object>} newMessages Nuevos mensajes recibidos
 * @param {Array.<Object>} oldMessages Mensajes del chat
 *
 * @returns {Array.<Object>} Mensajes nuevos y antiguos
 */
export function parseNewMessages(newMessages, oldMessages) {
  if (oldMessages.length === 0 && newMessages.length === 0) {
    return oldMessages;
  }
  if (oldMessages.length === 0 && newMessages.length > 0) {
    return newMessages;
  }
  if (newMessages[0].id === oldMessages[0].id) {
    return oldMessages;
  } else {
    let i = 0;
    var aux = [];
    while (newMessages[i].id !== oldMessages[0].id) {
      aux.push(newMessages[i]);
      i++;
    }
    return [...aux, ...oldMessages];
  }
}

/**
 * Devuelve una cadena indicando el tiempo en el que un mensaje
 * fue enviado según su marca temporal
 * @param {Date} timestamp Marca temporal de un mensaje
 *
 * @returns {String} Fecha
 */
export function parsearFecha(timestamp) {
  var aux = timestamp.toISOString().split("Z");
  aux = aux[0];
  aux = aux.split("T");
  var fecha = aux[0];
  var hora = aux[1];
  hora = hora.split(":");
  var minutos = hora[1];
  hora = (parseInt(hora[0]) + 2) % 24;
  var horaTotal = (hora === 0 ? "00" : hora.toString()) + ":" + minutos;
  var diaActual = parseInt(String(new Date().getDate()).padStart(2, "0"));
  var mesActual = new Date().getMonth() + 1;
  var anyoActual = new Date().getFullYear();
  fecha = fecha.split("-");
  var anyo = parseInt(fecha[0]);
  var mes = parseInt(fecha[1]);
  var dia = hora !== 0 ? parseInt(fecha[2]) : parseInt(fecha[2]) + 1;

  var preludio = "";
  if (mesActual === mes && anyoActual === anyo) {
    if (esAyer(dia, mes, anyo, diaActual, mesActual, anyoActual)) {
      preludio = "Ayer";
    } else if (dia !== diaActual) {
      preludio = dia + "/" + mes + "/" + anyo;
    }
  }
  return preludio + " " + horaTotal;
}

/**
 * Devuelve true si es un año bisiesto
 * @param {Number} anyo Año
 *
 * @returns {Boolean} true si es bisiesto
 */
export function esBisiesto(anyo) {
  return (anyo % 4 === 0 && anyo % 100 !== 0) || anyo % 400 === 0;
}

/**
 * Devuelve el número de días que tiene un mes en un año
 * @param {Number} mes Mes del año
 * @param {Number} anyo Año
 *
 * @returns {Number} Número de días del mes actual
 */
export function diasDelMes(mes, anyo) {
  if (mes === 2) {
    if (esBisiesto(anyo)) {
      return 29;
    } else {
      return 28;
    }
  } else {
    if (mes === 8) {
      return 31;
    } else {
      if (mes % 2 === 1) {
        return 31;
      } else {
        return 30;
      }
    }
  }
}

/**
 * Devuelve true si el día del mensaje es un día anterior al actual
 * @param {Number} dia Día del mensaje
 * @param {Number} mes Mes del mensaje
 * @param {Number} anyo Año del mensaje
 * @param {Number} diaActual Día actual
 * @param {Number} mesActual Mes actual
 * @param {Number} anyoActual Año actual
 *
 * @returns {Boolean} true si el día corresponde al día anterior al actual
 */
export function esAyer(dia, mes, anyo, diaActual, mesActual, anyoActual) {
  if (mes === mesActual && anyo === anyoActual && dia + 1 === diaActual) {
    return true;
  } else {
    if (mes + 1 === mesActual && anyo === anyoActual) {
      return dia === diasDelMes(mes, anyo) && diaActual === 1;
    } else {
      if (anyo + 1 === anyoActual && mes === 12 && mesActual === 1) {
        return dia === 31 && diaActual === 1;
      } else {
        return false;
      }
    }
  }
}
