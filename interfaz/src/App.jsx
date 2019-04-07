import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Asignaturas from "./components/Asignaturas";
import Rankings from "./components/Rankings";
import Historial from "./components/Historial";
import Listas from "./components/Listas";
import Perfil from "./components/Perfil";
import Mensajes from "./components/Mensajes";
import Notificaciones from "./components/Notificaciones";
import Asignatura from "./components/Asignatura";
import Login from "./components/Login";
import SignIn from "./components/SignIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: document.cookie };
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
              ) : (
                <Home logOut={this.logOut} />
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
                <Home logOut={this.logOut} />
              ) : (
                <Redirect to={"/"} />
              )
            }
          />
          <Route
            path={"/about"}
            render={() =>
              this.state.user !== "" ? (
                <About logOut={this.logOut} />
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
        </Switch>
      </Router>
    );
  }
}

export default App;
