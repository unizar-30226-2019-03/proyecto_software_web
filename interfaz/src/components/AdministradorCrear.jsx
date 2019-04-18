import React, { Component } from "react";
import BarraAdmi from "./BarraAdmi";
import { Helmet } from "react-helmet";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const FormularioProfesor = (
  handleProfesor,
  nombre,
  apellidos,
  userID,
  email,
  passwd,
  passwd2,
  clasePass
) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Añadir profesor</h6>
      <Form
        id="form-profesor"
        onSubmit={e =>
          handleProfesor(e, document.getElementById("form-profesor"))
        }
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              required
              ref={nombre}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos"
              required
              ref={apellidos}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridUserID">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            required
            ref={userID}
          />
        </Form.Group>

        <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="ejemplo@gmail.com"
            type="email"
            required
            ref={email}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPasswd">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              placeholder="Contraseña"
              type="password"
              required
              ref={passwd}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPasswd2">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              placeholder="Confirmación"
              type="password"
              required
              ref={passwd2}
              style={clasePass}
            />
          </Form.Group>
        </Form.Row>
        <Button className="boton-filtro" type="reset">
          Cancelar
        </Button>
        <Button
          className="boton-filtro"
          style={{ float: "right" }}
          type="submit"
        >
          Confirmar
        </Button>
      </Form>
    </div>
  );
};

const FormularioUniversidad = (handleUniversidad, nombre) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Añadir universidad</h6>
      <Form
        id="form-uni"
        onSubmit={e =>
          handleUniversidad(e, document.getElementById("form-uni"))
        }
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Universidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              required
              ref={nombre}
            />
          </Form.Group>
        </Form.Row>
        <Button className="boton-filtro" type="reset">
          Cancelar
        </Button>
        <Button
          className="boton-filtro"
          style={{ float: "right" }}
          type="submit"
        >
          Confirmar
        </Button>
      </Form>
    </div>
  );
};

const FormularioCarrera = (handleCarrera, nombre) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Añadir carrera</h6>
      <Form
        id="form-carrera"
        onSubmit={e =>
          handleCarrera(e, document.getElementById("form-carrera"))
        }
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCarrera">
            <Form.Label>Carrera</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              required
              ref={nombre}
            />
          </Form.Group>
        </Form.Row>
        <Button className="boton-filtro" type="reset">
          Cancelar
        </Button>
        <Button
          className="boton-filtro"
          style={{ float: "right" }}
          type="submit"
        >
          Confirmar
        </Button>
      </Form>
    </div>
  );
};

const FormularioAsignatura = (handleAsignatura, carrera, asignatura) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Añadir asignatura</h6>
      <Form
        id="form-asignatura"
        onSubmit={e =>
          handleAsignatura(e, document.getElementById("form-asignatura"))
        }
      >
        <Form.Group as={Col} controlId="formGridCarrera">
          <Form.Label>Carrera</Form.Label>
          <Form.Control as="select" ref={carrera}>
            <option>Ingeniería Informática</option>
            <option>Derecho</option>
            <option>Medicina</option>
            <option>Administración de Empresas</option>
          </Form.Control>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridAsignatura">
            <Form.Label>Asignatura</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              required
              ref={asignatura}
            />
          </Form.Group>
        </Form.Row>
        <Button className="boton-filtro" type="reset">
          Cancelar
        </Button>
        <Button
          className="boton-filtro"
          style={{ float: "right" }}
          type="submit"
        >
          Confirmar
        </Button>
      </Form>
    </div>
  );
};

class AdministradorCrear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passValida: -1,
      datosSubidos: false
    };
    this.nombre = React.createRef();
    this.apellidos = React.createRef();
    this.userID = React.createRef();
    this.email = React.createRef();
    this.passwd = React.createRef();
    this.passwd2 = React.createRef();
    this.carrera = React.createRef();
    this.asignatura = React.createRef();
    this.handleProfesor = this.handleProfesor.bind(this);
    this.handleUniversidad = this.handleUniversidad.bind(this);
    this.handleCarrera = this.handleCarrera.bind(this);
    this.handleAsignatura = this.handleAsignatura.bind(this);
    this.getBorder = this.getBorder.bind(this);
  }

  getBorder(key) {
    switch (key) {
      case 0:
        return "1px solid red";
      default:
        return "";
    }
  }

  handleProfesor(event, form) {
    event.preventDefault();
    const nombre = this.nombre.current.value;
    const apellidos = this.apellidos.current.value;
    const userID = this.userID.current.value;
    const email = this.email.current.value;
    const passwd = this.passwd.current.value;
    const passwd2 = this.passwd2.current.value;
    if (passwd === passwd2) {
      //this.setState({ datosSubidos: true });
      console.log(nombre, apellidos, userID, email, passwd, passwd2);
      form.reset();
    } else {
      this.setState({ passValida: 0 });
    }
  }
  handleUniversidad(event, form) {
    event.preventDefault();
    const nombre = this.nombre.current.value;
    //this.setState({ datosSubidos: true });
    console.log(nombre);
    form.reset();
  }
  handleCarrera(event, form) {
    event.preventDefault();
    const nombre = this.nombre.current.value;
    //this.setState({ datosSubidos: true });
    console.log(nombre);
    form.reset();
  }
  handleAsignatura(event, form) {
    event.preventDefault();
    const carrera = this.carrera.current.value;
    const asignatura = this.asignatura.current.value;
    //this.setState({ datosSubidos: true });
    console.log(carrera, asignatura);
    form.reset();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Añadir</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        {this.state.datosSubidos ? (
          <Redirect to={"/administrador-crear"} />
        ) : (
          <div>
            <BarraAdmi logOut={this.props.logOut} />
            <div
              className="transform"
              style={{
                marginTop: "80px",
                marginLeft: "100px",
                marginRight: "100px",
                marginDown: "80px"
              }}
            >
              <h5>Añadir elementos a la página</h5>
              <div className="boxed">
                {FormularioProfesor(
                  this.handleProfesor,
                  this.nombre,
                  this.apellidos,
                  this.userID,
                  this.email,
                  this.passwd,
                  this.passwd2,
                  { border: this.getBorder(this.state.passValida) }
                )}
              </div>
              <div className="boxed" style={{ marginTop: "20px" }} id="a">
                {FormularioUniversidad(this.handleUniversidad, this.nombre)}
              </div>
              <div className="boxed" style={{ marginTop: "20px" }}>
                {FormularioCarrera(this.handleCarrera, this.nombre)}
              </div>
              <div className="boxed" style={{ marginTop: "20px" }}>
                {FormularioAsignatura(
                  this.handleAsignatura,
                  this.carrera,
                  this.asignatura
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AdministradorCrear;
