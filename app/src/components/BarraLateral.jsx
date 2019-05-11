import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSubjectsOfUser } from "../config/User";
import { getUserID } from "../config/Auth";

class BarraLateral extends Component {
  constructor(props) {
    super(props);
    this.state = { activar: this.props.show, asigs: [] };
    this.active = this.active.bind(this);
  }

  componentWillMount() {
    getSubjectsOfUser(getUserID(), data => {
      const asigs = data.map(a => {
        a.name = a.name.split(":")[0];
        return a;
      });
      this.setState({ asigs: asigs });
    });
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
          {this.state.asigs.map(a => {
            return (
              <Link
                key={a.id}
                className={this.active(a.name)}
                to={`/asig/${a.name}`}
              >
                {a.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BarraLateral;
