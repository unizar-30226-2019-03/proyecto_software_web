import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import { Redirect } from "react-router-dom";

class BarraBusqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.nuevoTit === undefined ? "" : this.props.nuevoTit,
      buscar: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  /**
   * Pone buscar a false
   * @param {*} newProps 
   */
  componentWillReceiveProps(newProps) {
    this.setState({ buscar: false });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  /**
   * Si se ha pulsado el enter, si length>0, pone buscar a true
   * @param {*} e 
   */
  keyPress(e) {
    if (e.keyCode === 13) {
      //ESTO CAMBIA DE PÁGINA window.location = "/";
      if (this.state.value.length > 0) {
        this.setState({ buscar: true });
      }
    }
  }

  render() {
    return this.state.buscar ? (
      <Redirect to={`/busqueda/${this.state.value}`} />
    ) : (
      <MDBCol md="6" className="mx-auto">
        <input
          id="input-form"
          className="form-control"
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
          type="text"
          value={this.state.value}
          placeholder="Buscar..."
          aria-label="Search"
        />
      </MDBCol>
    );
  }
}

export default BarraBusqueda;
