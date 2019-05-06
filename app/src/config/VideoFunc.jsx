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

/**
 * Devuelve un String indicando los minutos, horas, días, semanas, meses o años
 * transcurridos desde que se subió hasta el momento.
 * @param {Date} date1 Timestamp de un vídeo
 * @param {Date} now Tiempo actual del servidor
 */
export function getTimePassed(date1, now) {
  const diffMs = now - date1;
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins > 60) {
    const diffHrs = Math.floor(diffMs / 3600000);
    if (diffHrs > 24) {
      const diffDays = Math.floor(diffMs / 86400000);
      if (diffDays > 7) {
        const diffWeeks = Math.floor(diffMs / 604800000);
        if (diffWeeks > 4) {
          const diffMonths = Math.floor(diffMs / 2629800000);
          if (diffMonths > 12) {
            const diffYears = Math.floor(diffMs / 31556952000);
            return `${diffYears} años`;
          } else {
            return `${diffMonths} meses`;
          }
        } else {
          return `${diffWeeks} semanas`;
        }
      } else {
        return `${diffDays} días`;
      }
    } else {
      return `${diffHrs} horas`;
    }
  } else {
    return `${diffMins} minutos`;
  }
}

export function getScore(score) {
  return Math.round((score * 100) / 5);
}
