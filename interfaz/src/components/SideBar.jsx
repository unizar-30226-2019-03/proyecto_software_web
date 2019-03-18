import React, { Component } from "react";
import "./SideBar.css";

let globalState = { actives: ["active", "", "", ""] };

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = globalState;
  }

  componentWillUnmount() {
    globalState = this.state;
  }

  onItemSelection = index => {
    let oldIndex = this.state.actives.findIndex(i => i !== "");
    let newState = this.state.actives.slice();
    newState[oldIndex] = "";
    newState[index] = "active";
    this.setState({ actives: newState });
  };

  render() {
    return (
      <div className="sidebar">
        <a
          className={this.state.actives[0]}
          href="#home"
          id={"0"}
          onClick={() => this.onItemSelection("0")}
        >
          Inicio
        </a>
        <a
          className={this.state.actives[1]}
          href="#news"
          id={"1"}
          onClick={() => this.onItemSelection("1")}
        >
          Rankings
        </a>
        <a
          className={this.state.actives[2]}
          href="#contact"
          id={"2"}
          onClick={() => this.onItemSelection("2")}
        >
          Mis asignaturas
        </a>
        <a
          className={this.state.actives[3]}
          href="#about"
          id={"3"}
          onClick={() => this.onItemSelection("3")}
        >
          Mis listas
        </a>
        <a
          className={this.state.actives[4]}
          href="#about"
          id={"4"}
          onClick={() => this.onItemSelection("4")}
        >
          Historial
        </a>
      </div>
    );
  }
}

export default SideBar;
