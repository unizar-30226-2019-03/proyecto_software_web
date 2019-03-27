import React, { Component } from "react";
import { MDBCol } from "mdbreact";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      //ESTO CAMBIA DE PÁGINA window.location = "/";
    }
  }

  render() {
    return (
      <MDBCol md="6" className="mx-auto">
        <input
          className="form-control"
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
          type="text"
          placeholder="Buscar..."
          aria-label="Search"
        />
      </MDBCol>
    );
  }
}

export default SearchBar;
