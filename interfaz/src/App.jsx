import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import SinSesion from "./components/SinSesion";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={"/"} component={SinSesion} />
            <Route path={"/inicio"} component={Home} />
            <Route path={"/about"} component={About} />
            <Route path={"/asignaturas"} component={Asignaturas} />
            <Route path={"/rankings"} component={Rankings} />
            <Route path={"/historial"} component={Historial} />
            <Route path={"/listas"} component={Listas} />
            <Route path={"/perfil"} component={Perfil} />
            <Route path={"/notificaciones"} component={Notificaciones} />
            <Route path={"/mensajes"} component={Mensajes} />
            <Route path={"/subj"} component={Asignatura} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
