/**
 * @fileoverview Fichero Login.jsx donde se encuentra la clase
 * que renderiza la pantalla de login de la aplicación.
 *
 * @author UniCast
 *
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../../node_modules/react-bootstrap/Form.js:Form
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../config/Auth.jsx:signIn
 * @requires ../config/Auth.jsx:setUserRole
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/Auth.jsx:setUserPhoto
 * @requires ../config/UserAPI.jsx:getUser
 * @requires ../config/UserAPI.jsx:authUser
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import uni from "../assets/UnicastNombre.png";
import {
  signIn,
  setUserRole,
  isSignedIn,
  getUserRole,
  setUserPhoto
} from "../config/Auth";
import { getUser, authUser } from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Clase que gestiona la pantalla de login de la aplicación
 * @extends Component
 */
class Login extends Component {
  /**
   * Construye el componente Login
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Object} props.location Propiedades para la redirección desde el login
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      location: props.location,
      error: false,
      validado: -1,
      redirectSignIn: false,
      mostrarSpin: false
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

  /**
   * Inicia la sesión del usuario, si los datos son
   * incorrectos informa de ello.
   * @param {Event} event Evento que devuelve el formulario
   */
  handleSubmit = event => {
    const username = this.userID.current.value;
    const pass = this.pass.current.value;
    event.preventDefault();
    authUser(username, pass, data => {
      if (data === false) {
        if (this._isMounted) {
          this.setState({ error: true, mostrarSpin: false });
        }
      } else {
        signIn(data);
        getUser(data.id, user => {
          setUserRole(user.role);
          setUserPhoto(user.photo);
          if (this._isMounted) {
            this.setState({
              validado: user.role === "ROLE_ADMIN" ? 1 : 0
            });
          }
        });
      }
    });
  };

  render() {
    return this.state.redirectSignIn ? (
      <Redirect
        to={{ pathname: "/registro", state: this.state.location.state }}
      />
    ) : (
      <div>
        <Helmet>
          <title>UniCast</title>
        </Helmet>
        {this.state.validado === 0 ||
        (isSignedIn() && getUserRole() !== "ROLE_ADMIN") ? (
          this.state.location.state === undefined ? (
            <Redirect to={"/inicio"} />
          ) : (
            <Redirect to={this.state.location.state.url} />
          )
        ) : (
          <div>
            {this.state.validado === 1 ||
            (isSignedIn() && getUserRole() === "ROLE_ADMIN") ? (
              <Redirect to={"/administrador-crear"} />
            ) : (
              <div>
                <div className="login transform">
                  <img className="userIcon" src={uni} alt="UniCast" />
                  <Form
                    onSubmit={e => {
                      this.setState({ mostrarSpin: true });
                      this.handleSubmit(e);
                    }}
                  >
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
                    <div style={{ position: "relative" }}>
                      <Button className="boton-login" type="submit">
                        Iniciar Sesión
                      </Button>
                      {this.state.mostrarSpin ? (
                        <LoadingSpinUniCast className="spin-login" />
                      ) : null}
                    </div>
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
                      <span
                        onClick={() => {
                          if (this._isMounted) {
                            this.setState({ redirectSignIn: true });
                          }
                        }}
                        style={{
                          color: "#007bff",
                          textDecoration: "none",
                          cursor: "pointer"
                        }}
                      >
                        Registrarse
                      </span>
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
