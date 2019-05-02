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
  var minutos = Math.trunc(tiempoAux / 60);
  if (minutos < 10) {
    minutos = "0" + minutos.toString();
  } else {
    minutos = minutos.toString();
  }
  var segundos = tiempoAux % 60;
  if (segundos < 10) {
    segundos = "0" + segundos.toString();
  } else {
    segundos = segundos.toString();
  }
  return minutos + ":" + segundos;
}
