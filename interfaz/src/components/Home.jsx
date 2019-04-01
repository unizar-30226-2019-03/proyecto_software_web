import React, { Component } from "react";
import CustomNavBar from "./CustomNavBar";
import { Helmet } from "react-helmet";
import HorizList from "./HorizList";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "270px"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "270px" });
    } else {
      this.setState({ contentMargin: "50px" });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Inicio</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar onChange={this.handleChange} activar={"inicio"} />
        <div
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "80px"
          }}
        >
          <div>
            <div style={{ marginLeft: "28px" }}>
              <h5>Vídeos subidos recientemente</h5>
            </div>
            <HorizList useArrows={this.state.contentMargin === "270px"} />
          </div>
          <div>
            <div style={{ marginLeft: "28px" }}>
              <h5>Asignatura X</h5>
            </div>
            <HorizList useArrows={this.state.contentMargin === "270px"} />
          </div>
          <div>
            <div style={{ marginLeft: "28px" }}>
              <h5>Asignatura Y</h5>
            </div>
            <HorizList useArrows={this.state.contentMargin === "270px"} />
          </div>
          <div>
            <div style={{ marginLeft: "28px" }}>
              <h5>Asignatura Z</h5>
            </div>
            <HorizList useArrows={this.state.contentMargin === "270px"} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
