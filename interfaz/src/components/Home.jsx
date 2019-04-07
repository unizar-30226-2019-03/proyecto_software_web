import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomNavBar from "./CustomNavBar";
import HorizList from "./HorizList";
import { Helmet } from "react-helmet";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      user: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (document.cookie !== undefined) {
      let userCookie = document.cookie;
      let userID = userCookie.split("=")[1];
      this.setState({ user: userID });
    }
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Inicio</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <CustomNavBar
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={"inicio"}
        />
        <div
          className="transform"
          style={{ marginLeft: this.state.contentMargin, marginTop: "80px" }}
        >
          <div>
            <div>
              <h5>Vídeos subidos recientemente</h5>
            </div>
            <HorizList />
          </div>
          <div>
            <div>
              <Link
                to="/asig/aX"
                style={{
                  fontSize: "1.25rem",
                  color: "black",
                  textDecoration: "none"
                }}
              >
                Asignatura X
              </Link>
            </div>
            <HorizList />
          </div>
          <div>
            <div>
              <Link
                to="/asig/aY"
                style={{
                  fontSize: "1.25rem",
                  color: "black",
                  textDecoration: "none"
                }}
              >
                Asignatura Y
              </Link>
            </div>
            <HorizList />
          </div>
          <div>
            <div>
              <Link
                to="/asig/aZ"
                style={{
                  fontSize: "1.25rem",
                  color: "black",
                  textDecoration: "none"
                }}
              >
                Asignatura Z
              </Link>
            </div>
            <HorizList />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
