import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activar: this.props.show };
    this.active = this.active.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ activar: newProps.show });
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
      <div
        className={
          this.state.activar ? "sidebar transform" : "sidebar active transform"
        }
      >
        <div>
          <Link className={this.active("inicio")} to="/inicio">
            Inicio
          </Link>
          <Link className={this.active("rankings")} to="/rankings">
            Rankings
          </Link>
          <Link className={this.active("asignaturas")} to="/asignaturas">
            Mis asignaturas
          </Link>
          <Link className={this.active("listas")} to="/listas">
            Mis listas
          </Link>
          <Link className={this.active("historial")} to="/historial">
            Historial
          </Link>
        </div>
        <div className="asignaturas">
          <h4>Asignaturas</h4>
          <Link className={this.active("asignatura1")} to="/asig">
            Asignatura 1
          </Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
