import React, { Component } from "react";
import CustomNavBar from "./CustomNavBar";
import { Helmet } from "react-helmet";

class Listas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "230px"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "230px" });
    } else {
      this.setState({ contentMargin: "0px" });
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Mis Listas</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar onChange={this.handleChange} activar={"listas"} />
        <div
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "55px"
          }}
        >
          MIS LISTAS PAGEGEGEGEGE
        </div>
      </div>
    );
  }
}

export default Listas;
