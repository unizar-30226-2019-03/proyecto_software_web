import React, { Component } from "react";
import { Link } from "react-router-dom";

class BarraLateral extends Component {
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
          <Link className={this.active("asignatura1")} to="/asig/a1">
            Asignatura 1
          </Link>
          <Link className={this.active("asignatura2")} to="/asig/a2">
            Asignatura 2
          </Link>
          <Link className={this.active("asignatura3")} to="/asig/a3">
            Asignatura 3
          </Link>
          <Link className={this.active("asignatura4")} to="/asig/a4">
            Asignatura 4
          </Link>
          <Link className={this.active("asignatura5")} to="/asig/a5">
            Asignatura 5
          </Link>
          <Link className={this.active("asignatura6")} to="/asig/a6">
            Asignatura 6
          </Link>
          <Link className={this.active("asignatura7")} to="/asig/a7">
            Asignatura 7
          </Link>
          <Link className={this.active("asignatura8")} to="/asig/a8">
            Asignatura 8
          </Link>
          <Link className={this.active("asignatura9")} to="/asig/a9">
            Asignatura 9
          </Link>
          <Link className={this.active("asignatura10")} to="/asig/a10">
            Asignatura 10
          </Link>
        </div>
      </div>
    );
  }
}

export default BarraLateral;
