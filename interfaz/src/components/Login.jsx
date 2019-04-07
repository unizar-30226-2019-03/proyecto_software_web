import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import uni from "../assets/UnicastNombre.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { emailValido: -1, email: "", pass: "", passValida: -1 };
    this.email = React.createRef();
    this.pass = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBorder = this.getBorder.bind(this);
  }

  handleSubmit(event) {
    const email = this.email.current.value;
    const pass = this.pass.current.value;
    event.preventDefault();
    this.setState({ email: email, pass: pass });
    if (email === "david@gmail.com") {
      this.setState({ emailValido: 1 });
    } else {
      this.setState({ emailValido: 0 });
    }
    if (pass === "1234") {
      this.setState({ passValida: 1 });
    } else {
      this.setState({ passValida: 0 });
    }
    if ((email === "david@gmail.com") & (pass === "1234")) {
      this.props.logUser(email);
    }
  }

  getBorder(key) {
    switch (key) {
      case 0:
        return "1px solid red";
      default:
        return "";
    }
  }

  render() {
    let claseEmail = { border: this.getBorder(this.state.emailValido) };
    let clasePass = { border: this.getBorder(this.state.passValida) };
    return (
      <div>
        <Helmet>
          <title>UniCast</title>
        </Helmet>
        {(this.state.emailValido === 1) & (this.state.passValida === 1) ? (
          <Redirect to={"/inicio"} />
        ) : (
          <div>
            <div className="login transform">
              <img className="userIcon" src={uni} alt="UniCast" />
              <Form onSubmit={e => this.handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    ref={this.email}
                    style={claseEmail}
                  />
                  <Form.Text className="text-muted">
                    Nunca compartiremos tus datos.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Constraseña</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Constraseña"
                    ref={this.pass}
                    style={clasePass}
                  />
                </Form.Group>

                <Button className="boton-login" type="submit">
                  Iniciar Sesión
                </Button>
                <Link
                  className="textInfo"
                  to="/"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  ¿Has olvidado tu contraseña?
                </Link>
                <p
                  className="textInfo"
                  style={{ textAlign: "left", padding: "5 0px" }}
                >
                  ¿No tienes cuenta?{" "}
                  <Link
                    style={{ color: "#007bff", textDecoration: "none" }}
                    to="/registro"
                  >
                    Registrarse
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
