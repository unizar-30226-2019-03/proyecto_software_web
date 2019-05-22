import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import uni from "../assets/UnicastNombre.png";
import { UserApi } from "swagger_unicast";
import { signIn, setUserRole } from "../config/Auth";
import { getUser } from "../config/UserAPI";

class Login extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      location: this.props.location,
      error: false,
      validado: -1
    };
    this.userID = React.createRef();
    this.pass = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = event => {
    const userID = this.userID.current.value;
    const pass = this.pass.current.value;
    event.preventDefault();
    let apiInstance = new UserApi();
    apiInstance.authUser(userID, pass, (error, data, response) => {
      if (error) {
        if (this._isMounted) {
          this.setState({ error: true });
        }
      } else {
        signIn(data);
        getUser(data.id, user => {
          // validaeo será 1 si es admin, y 0 si es un usuario normal o profesor
          setUserRole(user.role);
          if (this._isMounted) {
            this.setState({ validado: user.role === "ROLE_ADMIN" ? 1 : 0 });
          }
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>UniCast</title>
        </Helmet>
        {this.state.validado === 0 ? (
          this.props.location.state === undefined ? (
            <Redirect to={"/inicio"} />
          ) : (
            <Redirect to={this.props.location.state.url} />
          )
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
                        <Form.Label
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginBottom: ".55rem"
                          }}
                        >
                          Nombre de usuario o contraseña incorrectos
                        </Form.Label>
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
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        required
                        ref={this.pass}
                        onChange={() => this.setState({ error: false })}
                        type="password"
                        placeholder="Contraseña"
                      />
                    </Form.Group>

                    <Button className="boton-login" type="submit">
                      Iniciar Sesión
                    </Button>
                    <p
                      className="textInfo"
                      to="/recuperacion"
                      style={{
                        color: "#00000080",
                        fontSize: "12px",
                        textAlign: "left",
                        paddingBottom: "0"
                      }}
                    >
                      UniCast - Servicio multimedia online orientado a
                      educación.
                    </p>
                    <p
                      className="textInfo"
                      style={{ textAlign: "left", padding: "5px 0px" }}
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
