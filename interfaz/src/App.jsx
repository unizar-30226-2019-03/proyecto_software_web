import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import Inicio from "./components/Inicio";
import Informacion from "./components/Informacion";
import Asignaturas from "./components/Asignaturas";
import EditarPerfil from "./components/EditarPerfil";
import SubirVideo from "./components/SubirVideo";
import Rankings from "./components/Rankings";
import Historial from "./components/Historial";
import Listas from "./components/Listas";
import Perfil from "./components/Perfil";
import Mensajes from "./components/Mensajes";
import Notificaciones from "./components/Notificaciones";
import Asignatura from "./components/Asignatura";
import AdministradorCrear from "./components/AdministradorCrear";
import AdministradorBorrar from "./components/AdministradorBorrar";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import ViendoVideo from "./components/ViendoVideo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: document.cookie.split("=")[1] };
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  setUser(newUser) {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = `user=${newUser};` + expires;
    this.setState({ user: newUser });
  }

  logOut() {
    document.cookie = `user=${
      this.state.user
    }; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.setState({ user: "" });
  }

  componentWillUnmount() {
    this.setState({ user: "" });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            render={() =>
              this.state.user === "" ? (
                <Login logUser={this.setUser} />
              ) : this.state.user === "admin@gmail.com" ? (
                <AdministradorCrear logOut={this.logOut} />
              ) : (
                <Inicio logOut={this.logOut} />
              )
            }
          />
          <Route
            path={"/registro"}
            render={() => <SignIn logUser={this.setUser} />}
          />
          <Route
            path={"/inicio"}
            render={() =>
              this.state.user !== "" ? (
                <Inicio logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/info"}
            render={() =>
              this.state.user !== "" ? (
                <Informacion logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/subir-video"}
            render={() =>
              this.state.user !== "" ? (
                <SubirVideo logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/administrador-crear"}
            render={() =>
              this.state.user === "admin@gmail.com" ? (
                <AdministradorCrear logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/administrador-borrar"}
            render={() =>
              this.state.user === "admin@gmail.com" ? (
                <AdministradorBorrar logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/asignaturas"}
            render={() =>
              this.state.user !== "" ? (
                <Asignaturas logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/editar-perfil"}
            render={() =>
              this.state.user !== "" ? (
                <EditarPerfil logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/rankings"}
            render={() =>
              this.state.user !== "" ? (
                <Rankings logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/historial"}
            render={() =>
              this.state.user !== "" ? (
                <Historial logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/listas"}
            render={() =>
              this.state.user !== "" ? (
                <Listas logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/perfil"}
            render={() =>
              this.state.user !== "" ? (
                <Perfil logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/notificaciones"}
            render={() =>
              this.state.user !== "" ? (
                <Notificaciones logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/mensajes"}
            render={() =>
              this.state.user !== "" ? (
                <Mensajes logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/asig"}
            render={() =>
              this.state.user !== "" ? (
                <Asignatura logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/video"}
            render={() =>
              this.state.user !== "" ? (
                <ViendoVideo logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
