import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import uni from "../assets/UnicastNombre.png";

class RecuperarPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recuperado: false,
      email: ""
    };
    this.email = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const email = this.email.current.value;
    event.preventDefault();
    //Enviar email de recuperación
    this.setState({ recuperado: true, email: email });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Recuperar contraseña</title>
        </Helmet>
        <div>
          <div className="recuperacion transform">
            <img className="userIcon" src={uni} alt="UniCast" />
            {!this.state.recuperado ? (
              <Form onSubmit={e => this.handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    ref={this.email}
                  />
                  <Form.Text className="text-muted">
                    Enviaremos un correo de recuperación con su nueva contraseña
                    al email indicado.
                  </Form.Text>
                </Form.Group>

                <Button className="boton-recuperacion" type="submit">
                  Recuperar contraseña
                </Button>
                <Link
                  className="textInfo"
                  to="/"
                  style={{
                    color: "#007bff",
                    textDecoration: "none"
                  }}
                >
                  Volver atrás
                </Link>
              </Form>
            ) : (
              <div>
                <div style={{ textAlign: "left", marginTop: "50px" }}>
                  Hemos enviado un correo con la nueva contraseña a la dirección
                  de correo electrónico {this.state.email.toUpperCase()}
                </div>
                <div style={{ textAlign: "left", marginTop: "20px" }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    Volver
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RecuperarPass;
