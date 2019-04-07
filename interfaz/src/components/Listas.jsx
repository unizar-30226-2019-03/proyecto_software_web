import React, { Component } from "react";
import CustomNavBar from "./CustomNavBar";
import { Helmet } from "react-helmet";

class Listas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Mis Listas</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={"listas"}
        />
        <div
          className="transform"
          style={{ marginLeft: this.state.contentMargin, marginTop: "80px" }}
        >
          MIS LISTAS PAGEGEGEGEGE
        </div>
      </div>
    );
  }
}

export default Listas;
