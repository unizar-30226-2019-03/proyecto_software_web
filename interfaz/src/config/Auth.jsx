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
  console.log(data.token);
  localStorage.setItem("userToken", data.token);
  localStorage.setItem("userID", data.id);
  return 0;
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
