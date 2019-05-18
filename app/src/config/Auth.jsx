/**
 * Expresión regular del correo electrónico
 */
export const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Expresión regular de la contraseña
 */
export const restriccion = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})/;

/**
 * Expresión regular del nombre real del usuario
 */
export const restriccionNombre = /^([A-Za-z\u00C0-\u017F]+(([ -][a-zA-Z\u00C0-\u017F])?[a-zA-Z\u00C0-\u017F]*)*){3,}$/;

/**
 * Expresión regular del nombre de usuario
 */
export const restriccionUser = /^(\w+){3,}/;

/**
 *  Borra todos los datos de autenticación del usuario
 *  del navegador, lo que provocará el cierre de sesión.
 */
export function signOut() {
  localStorage.clear();
}

/**
 * Guarda el Token de sesión del usuario y el id para que el
 * usuario pueda iniciar sesión en la aplicación.
 * @param {Token} data Contiene el Token de sesión y el id del usuario
 */
export function signIn(data) {
  localStorage.setItem("userToken", data.token);
  localStorage.setItem("userID", data.id);
}

/**
 * Devuelve TRUE si el usuario está loggeado (su Token está almacenado
 * en la sesión), y FALSE en caso contrario.
 */
export function isSignedIn() {
  const userToken = localStorage.getItem("userToken");
  return userToken ? true : false;
}

/**
 * Devuelve el Token de sesión del usuario.
 */
export function getUserToken() {
  return localStorage.getItem("userToken");
}

/**
 * Devuelve el ID único del usuario.
 */
export function getUserID() {
  return localStorage.getItem("userID");
}
