/**
 * Devuelve la cadena str sin acentos
 * @param {String} str Cadena de texto a quitar acentos
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
 * Devuelve el tiempo t en formato mm:ss
 * @param {Number} t Tiempo en segundos
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
 * Comprueba si el fichero es una imagen, devuelve TRUE si lo es
 * y FALSE en caso contrario
 * @param {String} filename Nombre del fichero a subir
 */
export function checkFileExtensionImage(filename) {
  var ext = filename.split(".").pop();
  return ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "bmp";
}

/**
 * Comprueba si el fichero es un vídeo, devuelve TRUE si lo es
 * y FALSE en caso contrario
 * @param {String} filename Nombre del fichero a subir
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
 * @param {Array} data Array de listas de reproducción
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
 * @param {Array} a Array ordenada por timestamps A
 * @param {Array} b Array ordenada por timestamps B
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
 * @param {Array} newMessages Nuevos mensajes recibidos
 * @param {Array} oldMessages Mensajes del chat
 * @returns {Array} Mensajes nuevos y antiguos
 */
export function parseNewMessages(newMessages, oldMessages) {
  if (oldMessages.length === 0 && newMessages.length === 0) {
    return [];
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
