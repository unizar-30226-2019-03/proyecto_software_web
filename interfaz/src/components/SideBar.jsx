import React, { Component } from "react";
import "./SideBar.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.active = this.active.bind(this);
  }

  active(name) {
    if (name === this.props.activate) {
      return "active";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="sidebar">
        <div>
          <a className={this.active("inicio")} href="/inicio">
            Inicio
          </a>
          <a className={this.active("rankings")} href="/rankings">
            Rankings
          </a>
          <a className={this.active("asignaturas")} href="/asignaturas">
            Mis asignaturas
          </a>
          <a className={this.active("listas")} href="/listas">
            Mis listas
          </a>
          <a className={this.active("historial")} href="/historial">
            Historial
          </a>
        </div>
        <div className="asignaturas">
          <h4>Asignaturas</h4>
          <a className={this.active("asignatura1")} href="/subj">
            Asignatura 1
          </a>
        </div>
      </div>
    );
  }
}

export default SideBar;
