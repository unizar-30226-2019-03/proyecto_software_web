import React, { Component } from "react";
import CustomNavBar from "./CustomNavBar";
import { Helmet } from "react-helmet";

class Mensajes extends Component {
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
          <title>Mensajes</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={""}
        />
        <div
          className="transform"
          style={{ marginLeft: this.state.contentMargin, marginTop: "80px" }}
        >
          MENSAJES PAGEGEGEGEGE
        </div>
      </div>
    );
  }
}

export default Mensajes;
