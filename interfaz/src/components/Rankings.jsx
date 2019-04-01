import React, { Component } from "react";
import CustomNavBar from "./CustomNavBar";
import { Helmet } from "react-helmet";

class Rankings extends Component {
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
          <title>Ránkings</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar onChange={this.handleChange} activar={"rankings"} />
        <div
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "80px"
          }}
        >
          RANKINGS PAGEGEGEGEGE
        </div>
      </div>
    );
  }
}

export default Rankings;
