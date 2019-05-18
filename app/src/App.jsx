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
import MensajesProfes from "./components/MensajesProfes";
import Chat from "./components/Chat";
import MisVideos from "./components/MisVideos";
import { isSignedIn } from "./config/Auth";

/**
 * Clase raíz, esta clase se encarga de renderizar todas las páginas
 * de la aplicación.
 */
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (!isSignedIn() ? <Login /> : <Inicio />)}
          />
          <Route path={"/registro"} component={SignIn} />
          <Route path={"/inicio"} component={Inicio} />
          <Route path={"/subir-video"} component={SubirVideo} />
          <Route path={"/mis-videos"} component={MisVideos} />

          <Route path={"/profesor/:id"} component={Profesor} />
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
          <Route path={"/mensajes-profesores"} component={MensajesProfes} />
          <Route path={"/mensajes"} component={Mensajes} />
          <Route path={"/asig/:id"} component={Asignatura} />
          <Route path={"/video/:id"} component={ViendoVideo} />
          <Route path={"/recuperacion"} component={RecuperarPass} />
          <Route path={"/chat/:nombre"} component={Chat} />
          <Route path={"/busqueda/:valor"} component={ResultadoBusqueda} />
        </Switch>
      </Router>
    );
  }
}

export default App;
