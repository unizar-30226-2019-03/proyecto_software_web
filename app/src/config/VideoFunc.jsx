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
