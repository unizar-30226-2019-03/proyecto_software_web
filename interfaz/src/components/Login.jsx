import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import uni from "../assets/UnicastNombre.png";
import { UserApi } from "swagger_unicast";
import { signIn } from "../config/Auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      validado: -1
    };
    this.userID = React.createRef();
    this.pass = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBorder = this.getBorder.bind(this);
  }

  handleSubmit = event => {
    const userID = this.userID.current.value;
    const pass = this.pass.current.value;
    event.preventDefault();
    let apiInstance = new UserApi();
    apiInstance.authUser(userID, pass, (error, data, response) => {
      if (error) {
        this.setState({ error: true });
      } else {
        const validacion = signIn(data);
        // validacion será 1 si es admin, y 0 si es un usuario normal
        this.setState({ validado: validacion });
      }
    });
  };

  getBorder(key) {
    switch (key) {
      case 0:
        return "1px solid red";
      default:
        return "";
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>UniCast</title>
        </Helmet>
        {this.state.validado === 0 ? (
          <Redirect to={"/inicio"} />
        ) : (
          <div>
            {this.state.validado === 1 ? (
              <Redirect to={"/administrador-crear"} />
            ) : (
              <div>
                <div className="login transform">
                  <img className="userIcon" src={uni} alt="UniCast" />
                  <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                      {this.state.error ? (
                        <Form.Text style={{ color: "red" }}>
                          Nombre de usuario o contraseña incorrectos
                        </Form.Text>
                      ) : (
                        <Form.Label>Nombre de usuario</Form.Label>
                      )}

                      <Form.Control
                        required
                        ref={this.userID}
                        onChange={() => this.setState({ error: false })}
                        type="text"
                        placeholder="Nombre de usuario"
                      />
                      <Form.Text className="text-muted">
                        Nunca compartiremos tus datos.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Constraseña</Form.Label>
                      <Form.Control
                        required
                        ref={this.pass}
                        onChange={() => this.setState({ error: false })}
                        type="password"
                        placeholder="Constraseña"
                      />
                    </Form.Group>

                    <Button className="boton-login" type="submit">
                      Iniciar Sesión
                    </Button>
                    <Link
                      className="textInfo"
                      to="/recuperacion"
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
        )}
      </div>
    );
  }
}

export default Login;
