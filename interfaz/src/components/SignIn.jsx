import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import uni from "../assets/UnicastNombre.png";
import { UserApi } from "swagger_unicast";

const FormularioDatos = (
  handleSubmit,
  nombre,
  apellidos,
  userID,
  email,
  passwd,
  passwd2,
  estado
) => {
  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridName">
          {estado.nombreInvalido ? (
            <Form.Label
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: ".55rem"
              }}
            >
              Nombre inválido
            </Form.Label>
          ) : (
            <Form.Label>Nombre*</Form.Label>
          )}

          <Form.Control
            type="text"
            placeholder="Nombre"
            required
            ref={nombre}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSurname">
          {estado.apellidoInvalido ? (
            <Form.Label
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: ".55rem"
              }}
            >
              Apellidos inválidos
            </Form.Label>
          ) : (
            <Form.Label>Apellidos*</Form.Label>
          )}
          <Form.Control
            type="text"
            placeholder="Apellidos"
            required
            ref={apellidos}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridUserID">
        {estado.userInvalido ? (
          <Form.Label
            style={{
              color: "red",
              fontSize: "12px",
              marginBottom: ".57rem"
            }}
          >
            Nombre de usuario inválido
          </Form.Label>
        ) : (
          <Form.Label>Nombre de usuario*</Form.Label>
        )}
        <Form.Control
          type="text"
          placeholder="Nombre de usuario"
          required
          ref={userID}
        />
      </Form.Group>

      <Form.Group controlId="formGridEmail">
        {estado.emailInvalido ? (
          <Form.Label
            style={{
              color: "red",
              fontSize: "12px",
              marginBottom: ".57rem"
            }}
          >
            Correo electrónico inválido
          </Form.Label>
        ) : (
          <Form.Label>Correo electrónico*</Form.Label>
        )}
        <Form.Control
          placeholder="ejemplo@gmail.com"
          type="email"
          required
          ref={email}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridPasswd">
          {estado.passNoValida ? (
            <Form.Label
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: ".57rem"
              }}
            >
              Contraseña inválida
            </Form.Label>
          ) : estado.passNoIguales ? (
            <Form.Label
              style={{
                color: "red",
                fontSize: "12px",
                marginBottom: ".57rem"
              }}
            >
              Contraseñas no iguales
            </Form.Label>
          ) : (
            <Form.Label>Contraseña*</Form.Label>
          )}
          <Form.Control
            placeholder="Contraseña"
            type="password"
            required
            ref={passwd}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPasswd2">
          <Form.Label>Confirmar contraseña*</Form.Label>
          <Form.Control
            placeholder="Confirmación"
            type="password"
            required
            ref={passwd2}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group id="formGridInfo">
        <Form.Text className="text-muted">
          Utiliza 8 caracteres como mínimo con letras y números para la
          contraseña. <br />
          (*) Los datos con asterisco son obligatorios.
        </Form.Text>
      </Form.Group>
      <Button className="boton-signin" type="submit">
        Siguiente
      </Button>
      <p
        className=""
        style={{
          textAlign: "left",
          fontSize: "14px",
          float: "left"
        }}
      >
        ¿Ya tienes cuenta?{" "}
        <Link style={{ color: "#007bff", textDecoration: "none" }} to="/">
          Iniciar Sesión
        </Link>
      </p>
    </Form>
  );
};

const FormularioInfo = (
  handleSubmit,
  foto,
  descripcion,
  universidad,
  carrera,
  cancelar
) => {
  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group controlId="formGridUni">
        <Form.Label>¿En qué universidad estudias?</Form.Label>
        <Form.Control as="select" ref={universidad}>
          <option>Elige una universidad...</option>
          <option>Universidad de Zaragoza</option>
          <option>Universidad de Madrid</option>
          <option>Universidad de Valencia</option>
          <option>Universidad de Barcelona</option>
          <option>Otra...</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formGridCarrera">
        <Form.Label>¿Qué carrera?</Form.Label>
        <Form.Control as="select" ref={carrera}>
          <option>Elige una carrera...</option>
          <option>Ingeniería Informática</option>
          <option>Medicina</option>
          <option>Derecho</option>
          <option>Veterinaria</option>
          <option>Otra...</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formGridFoto">
        <Form.Label>Foto de usuario</Form.Label>
        <Form.Control type="file" ref={foto} />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          style={{ resize: "none" }}
          ref={descripcion}
        />
      </Form.Group>
      <Button className="boton-signin-reg" type="submit">
        Registrarse
      </Button>
      <p
        className=""
        style={{
          textAlign: "left",
          fontSize: "14px",
          float: "left"
        }}
      >
        <Link
          style={{ color: "#007bff", textDecoration: "none" }}
          to="/registro"
          onClick={cancelar}
        >
          Volver atrás
        </Link>
      </p>
    </Form>
  );
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datosValidados: false,
      infoValidada: false,
      passNoIguales: false,
      passNoValida: false,
      nombreInvalido: false,
      apellidoInvalido: false,
      userInvalido: false,
      emailInvalido: false
    };
    this.nombre = React.createRef();
    this.apellidos = React.createRef();
    this.email = React.createRef();
    this.userID = React.createRef();
    this.pass = React.createRef();
    this.pass2 = React.createRef();
    this.foto = React.createRef();
    this.descripcion = React.createRef();
    this.universidad = React.createRef();
    this.carrera = React.createRef();
    this.handleSubmitDatos = this.handleSubmitDatos.bind(this);
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.back = this.back.bind(this);
  }

  back() {
    this.setState({ datosValidados: false, infoValidada: false });
  }

  handleSubmitDatos(event) {
    event.preventDefault();
    let ok = true;
    let emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let restriccion = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})/;
    let restriccionNombre = /^([A-Za-z\u00C0-\u017F]+(([ -][a-zA-Z\u00C0-\u017F])?[a-zA-Z\u00C0-\u017F]*)*){3,}$/;
    let restriccionUser = /^(\w+){3,}/;
    const pass = this.pass.current.value;
    const pass2 = this.pass2.current.value;
    const nombre = this.nombre.current.value;
    const apellidos = this.apellidos.current.value;
    const userID = this.userID.current.value;
    const email = this.email.current.value;

    //Comporobar nombre y apellidos
    if (!nombre.match(restriccionNombre)) {
      ok = false;
      this.setState({ nombreInvalido: true });
    } else {
      this.setState({ nombreInvalido: false });
    }
    if (!apellidos.match(restriccionNombre)) {
      ok = false;
      this.setState({ apellidoInvalido: true });
    } else {
      this.setState({ apellidoInvalido: false });
    }

    //Comprobar nombre de usuario
    if (!userID.match(restriccionUser)) {
      ok = false;
      this.setState({ userInvalido: true });
    } else {
      this.setState({ userInvalido: false });
    }

    // Comprobar email
    if (!email.match(emailPattern)) {
      ok = false;
      this.setState({ emailInvalido: true });
    } else {
      this.setState({ emailInvalido: false });
    }

    //Comprobar passwords
    if (pass.match(restriccion)) {
      if (pass !== pass2) {
        ok = false;
        this.setState({ passNoIguales: true, passNoValida: false });
      } else {
        this.setState({ passNoIguales: false, passNoValida: false });
      }
    } else {
      ok = false;
      this.setState({ passNoValida: true });
    }

    if (ok) {
      this.setState({ datosValidados: true });
    }
  }

  handleSubmitInfo(event) {
    event.preventDefault();
    const foto = this.foto.current.value;
    const descripcion = this.descripcion.current.value;
    const universidad = this.universidad.current.value;
    const carrera = this.universidad.current.value;
    console.log(foto + descripcion + universidad + carrera);
    this.setState({ infoValidada: true });
    //AQUI SE REGISTRARA EL USUARIO
    console.log("USUARIO REGISTRADO");
  }

  render() {
    const estadoValidacion = {
      passNoIguales: this.state.passNoIguales,
      passNoValida: this.state.passNoValida,
      nombreInvalido: this.state.nombreInvalido,
      apellidoInvalido: this.state.apellidoInvalido,
      userInvalido: this.state.userInvalido,
      emailInvalido: this.state.emailInvalido
    };
    return (
      <div>
        <Helmet>
          <title>Crea tu cuenta de UniCast</title>
        </Helmet>
        {this.state.datosValidados & this.state.infoValidada ? (
          <Redirect to={"/inicio"} />
        ) : (
          <div>
            <div className="signin transform">
              <img className="img-signin" src={uni} alt="UniCast" />
              {this.state.datosValidados
                ? FormularioDatos(
                    this.handleSubmitDatos,
                    this.nombre,
                    this.apellidos,
                    this.userID,
                    this.email,
                    this.pass,
                    this.pass2,
                    estadoValidacion
                  )
                : FormularioInfo(
                    this.handleSubmitInfo,
                    this.foto,
                    this.descripcion,
                    this.universidad,
                    this.carrera,
                    this.back
                  )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SignIn;
