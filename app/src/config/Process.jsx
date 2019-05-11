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
