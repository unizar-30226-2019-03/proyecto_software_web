import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Inicio from "./components/Inicio";
import Asignaturas from "./components/Asignaturas";
import EditarPerfil from "./components/EditarPerfil";
import SubirVideo from "./components/SubirVideo";
import Rankings from "./components/Rankings";
import Historial from "./components/Historial";
import Listas from "./components/Listas";
import Perfil from "./components/Perfil";
import Mensajes from "./components/Mensajes";
import Asignatura from "./components/Asignatura";
import AdministradorCrear from "./components/AdministradorCrear";
import AdministradorBorrar from "./components/AdministradorBorrar";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import ViendoVideo from "./components/ViendoVideo";
import RecuperarPass from "./components/RecuperarPass";
import Profesor from "./components/Profesor";
import ListaConcreta from "./components/ListaConcreta";
import ResultadoBusqueda from "./components/ResultadoBusqueda";

/**
 * Crea una cookie de sesión para el usuario con correo newUser
 * @param {*} newUser Correo electrónico del usuario registrado
 */
export function setUser(newUser) {
  var d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = `user=${newUser};` + expires;
}

/**
 * Borra la cookie de sesión del usuario
 * @param {*} usuario Nombre de la cookie de sesión
 */
export function logOut(usuario) {
  document.cookie = `user=${usuario}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

/**
 * Devuelve cierto si y solo si hay una cookie de sesión
 * creada, es decir, si el usuario se ha loggeado previamente
 */
export function sesionValida() {
  return document.cookie !== "";
}

/**
 * Devuelve el nombre asociado a la cookie de sesión
 */
export function getUser() {
  return document.cookie.split("=")[1];
}

class App extends Component {
  componentWillUnmount() {
    logOut(getUser());
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            render={() =>
              !sesionValida() ? (
                <Login />
              ) : getUser() === "admin@gmail.com" ? (
                <AdministradorCrear />
              ) : (
                <Inicio />
              )
            }
          />
          <Route path={"/registro"} component={SignIn} />
          <Route path={"/inicio"} component={Inicio} />
          <Route path={"/subir-video"} component={SubirVideo} />

          <Route path={"/profesor"} component={Profesor} />
          <Route path={"/administrador-crear"} component={AdministradorCrear} />
          <Route
            path={"/administrador-borrar"}
            component={AdministradorBorrar}
          />
          <Route path={"/asignaturas"} component={Asignaturas} />
          <Route path={"/editar-perfil"} component={EditarPerfil} />
          <Route path={"/rankings"} component={Rankings} />
          <Route path={"/historial"} component={Historial} />
          <Route path={"/listas"} component={Listas} />
          <Route path={"/lista/:nombre"} component={ListaConcreta} />
          <Route path={"/perfil"} component={Perfil} />

          <Route path={"/mensajes"} component={Mensajes} />
          <Route path={"/asig/:nombre"} component={Asignatura} />
          <Route path={"/video/:nombreVideo"} component={ViendoVideo} />
          <Route path={"/recuperacion"} component={RecuperarPass} />
          <Route path={"/busqueda/:valor"} component={ResultadoBusqueda} />
        </Switch>
      </Router>
    );
  }
}

export default App;
