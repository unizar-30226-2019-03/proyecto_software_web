import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import User_img from "../assets/user.png";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

const FormularioDatos = (
  handleSubmit,
  nombre,
  apellidos,
  userID,
  email,
  passwd,
  passwd2,
  foto,
  descripcion,
  universidad,
  carrera,
  asignaturas,
  clasePass
) => {
  return (
    <div style={{ margin: "0 20% 0 0" }}>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              type="text"
              defaultValue="David"
              required
              ref={nombre}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Apellidos*</Form.Label>
            <Form.Control
              type="text"
              defaultValue="Solanas Sanz"
              required
              ref={apellidos}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridUserID">
          <Form.Label>Nombre de usuario*</Form.Label>
          <Form.Control
            type="text"
            defaultValue="739999"
            required
            ref={userID}
          />
        </Form.Group>

        <Form.Group controlId="formGridEmail">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            defaultValue="davidsolanas@gmail.com"
            type="email"
            required
            ref={email}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPasswd">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              defaultValue="1234"
              type="password"
              required
              ref={passwd}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPasswd2">
            <Form.Label>Confirmar contraseña*</Form.Label>
            <Form.Control
              defaultValue="1234"
              type="password"
              required
              ref={passwd2}
              style={clasePass}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUni">
            <Form.Label>¿En qué universidad estudias?</Form.Label>
            <Form.Control as="select" ref={universidad}>
              <option>Universidad de Zaragoza</option>
              <option>Universidad de Madrid</option>
              <option>Universidad de Valencia</option>
              <option>Universidad de Barcelona</option>
              <option>Otra...</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCarrera">
            <Form.Label>¿Qué carrera?</Form.Label>
            <Form.Control as="select" ref={carrera}>
              <option>Ingeniería Informática</option>
              <option>Medicina</option>
              <option>Derecho</option>
              <option>Veterinaria</option>
              <option>Otra...</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridAsignaturas">
          <Form.Label>¿Qué asignaturas te interesan?</Form.Label>
          <Form.Control
            type="text"
            defaultValue="Inteligencia Artificial, IoT"
            ref={asignaturas}
          />
        </Form.Group>
        <div
          style={{
            float: "right",
            padding: "0 60px 0 0"
          }}
        >
          <img src={User_img} alt="Foto de perfil" width="60px" height="60px" />
        </div>
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
            defaultValue="Un texto es una composición de signos codificados en un sistema de
                      escritura que forma una unidad de sentido. También es una
                  composición de caracteres imprimibles generados por un algoritmo
                  de cifrado que, aunque no tienen sentido para cualquier persona,
                  sí puede ser descifrado por su destinatario original"
          />
        </Form.Group>
        <Button
          className="boton-filtro"
          type="submit"
          style={{ float: "left" }}
        >
          Confirmar
        </Button>
      </Form>
      <Link to="/perfil">
        <Button
          className="boton-filtro"
          style={{ float: "right", marginBottom: "20px" }}
        >
          Cancelar
        </Button>
      </Link>
    </div>
  );
};

class EditarPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMargin: "300px",
      datosValidados: false,
      passValida: -1
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
    this.asignaturas = React.createRef();
    this.handleSubmitDatos = this.handleSubmitDatos.bind(this);
    this.getBorder = this.getBorder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmitDatos(event) {
    event.preventDefault();
    const nombre = this.nombre.current.value;
    const apellidos = this.apellidos.current.value;
    const userID = this.userID.current.value;
    const email = this.email.current.value;
    const pass = this.pass.current.value;
    const pass2 = this.pass2.current.value;
    const foto = this.foto.current.value;
    const descripcion = this.descripcion.current.value;
    const universidad = this.universidad.current.value;
    const carrera = this.universidad.current.value;
    const asignaturas = this.asignaturas.current.value;
    if (pass === pass2) {
      this.setState({ datosValidados: true });
      console.log(
        nombre,
        apellidos,
        userID,
        email,
        foto,
        descripcion,
        universidad,
        carrera,
        asignaturas
      );
    } else {
      this.setState({ passValida: 0 });
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
  handleChange(display) {
    if (display) {
      this.setState({
        contentMargin: "300px"
      });
    } else {
      this.setState({
        contentMargin: "70px"
      });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Editar Perfil</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        {this.state.datosValidados ? (
          <Redirect to={"/perfil"} />
        ) : (
          <div>
            <BarraNavegacion
              logOut={this.props.logOut}
              onChange={this.handleChange}
              activar={""}
              displaySide={true}
              hide={false}
            />
            <div
              className="transform"
              style={{
                marginLeft: this.state.contentMargin,
                marginTop: "80px"
              }}
            >
              <h5>Editar perfil</h5>
              <div>
                {FormularioDatos(
                  this.handleSubmitDatos,
                  this.nombre,
                  this.apellidos,
                  this.userID,
                  this.email,
                  this.pass,
                  this.pass2,
                  this.foto,
                  this.descripcion,
                  this.universidad,
                  this.carrera,
                  this.asignaturas,
                  { border: this.getBorder(this.state.passValida) }
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditarPerfil;
