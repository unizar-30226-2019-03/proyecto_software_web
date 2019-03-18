import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import CustomNavBar from "./CustomNavBar";
import { Helmet } from "react-helmet";

class Home extends Component {
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
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar onChange={this.handleChange} />
        <div
          style={{ marginLeft: this.state.contentMargin, marginTop: "55px" }}
        >
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default Home;
