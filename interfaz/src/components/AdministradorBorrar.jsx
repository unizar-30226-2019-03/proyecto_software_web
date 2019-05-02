import React, { Component } from "react";
import BarraAdmi from "./BarraAdmi";
import { Helmet } from "react-helmet";
import { Button, Form, Col, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { isSignedIn } from "../config/Auth";

const FormularioProfesor = (handleProfesor, userID) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Borrar profesor</h6>
      <Form
        id="form-profesor"
        onSubmit={e =>
          handleProfesor(e, document.getElementById("form-profesor"))
        }
      >
        <Form.Group controlId="formGridUserID">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            required
            ref={userID}
          />
        </Form.Group>

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
      <h6>Borrar universidad</h6>
      <Form
        id="form-uni"
        onSubmit={e =>
          handleUniversidad(e, document.getElementById("form-uni"))
        }
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUni">
            <Form.Label>Universidad</Form.Label>
            <Form.Control as="select" ref={nombre}>
              <option>Universidad de Zaragoza</option>
              <option>Universidad de Alicante</option>
              <option>Universidad de Navarra</option>
              <option>Universidad de San Jorge</option>
            </Form.Control>
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

class FormularioAsignatura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uni: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.opcionesAsignaturas = this.opcionesAsignaturas.bind(this);
  }

  handleChange(event) {
    this.setState({ uni: event.target.value });
  }

  opcionesAsignaturas(nombre) {
    if (nombre === "Universidad de Zaragoza") {
      return (
        <Form.Control as="select" ref={this.props.nombre}>
          <option>Inteligencia Artificial</option>
          <option>Proyecto Software</option>
        </Form.Control>
      );
    } else if (nombre === "Universidad de Alicante") {
      return (
        <Form.Control as="select" ref={this.props.nombre}>
          <option>Derecho Penal</option>
          <option>Historia del derecho</option>
        </Form.Control>
      );
    } else if (nombre === "Universidad de San Jorge") {
      return (
        <Form.Control as="select" ref={this.props.nombre}>
          <option>Psiquiatría</option>
          <option>Oftalmología</option>
        </Form.Control>
      );
    }
  }

  render() {
    return (
      <div style={{ margin: "20px 20px 20px 20px" }}>
        <h6>Borrar asignatura</h6>
        <Form
          id="form-asignatura"
          onSubmit={e =>
            this.props.handleAsignatura(
              e,
              document.getElementById("form-asignatura"),
              this
            )
          }
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridUni">
              <Form.Label>Universidad</Form.Label>
              <Form.Control
                as="select"
                ref={this.props.uni}
                onChange={e => this.handleChange(e)}
                required
              >
                <option>Seleccionar...</option>
                <option>Universidad de Zaragoza</option>
                <option>Universidad de Alicante</option>
                <option>Universidad de San Jorge</option>
                <option>Universidad de Navarra</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAsign" required>
              <Form.Label>Asignatura</Form.Label>
              {this.opcionesAsignaturas(this.state.uni)}
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
  }
}

class FormularioProfeAsignatura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uni: "",
      asignatura: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.opcionesAsignaturas = this.opcionesAsignaturas.bind(this);
  }

  handleChange(event) {
    this.setState({ uni: event.target.value });
  }

  handleChangeProfes(event) {
    this.setState({ asignatura: event.target.value });
  }

  opcionesProfes(nombre) {
    if (nombre === "Inteligencia Artificial") {
      return (
        <Form.Control as="select" ref={this.props.user}>
          <option>jresano</option>
          <option>jsegarraflor</option>
        </Form.Control>
      );
    } else if (nombre === "Proyecto Software") {
      return (
        <Form.Control as="select" ref={this.props.user}>
          <option>ezpe</option>
          <option>unai</option>
        </Form.Control>
      );
    } else if (nombre === "Derecho Penal") {
      return (
        <Form.Control as="select" ref={this.props.user}>
          <option>jfabra</option>
          <option>jneira</option>
        </Form.Control>
      );
    }
  }

  opcionesAsignaturas(nombre) {
    if (nombre === "Universidad de Zaragoza") {
      return (
        <Form.Control
          as="select"
          ref={this.props.asignatura}
          onChange={e => this.handleChangeProfes(e)}
        >
          <option>Seleccionar...</option>
          <option>Inteligencia Artificial</option>
          <option>Proyecto Software</option>
        </Form.Control>
      );
    } else if (nombre === "Universidad de Alicante") {
      return (
        <Form.Control
          as="select"
          ref={this.props.asignatura}
          onChange={e => this.handleChangeProfes(e)}
        >
          <option>Seleccionar...</option>
          <option>Derecho Penal</option>
          <option>Historia del derecho</option>
        </Form.Control>
      );
    } else if (nombre === "Universidad de San Jorge") {
      return (
        <Form.Control
          as="select"
          ref={this.props.asignatura}
          onChange={e => this.handleChangeProfes(e)}
        >
          <option>Seleccionar...</option>
          <option>Psiquiatría</option>
          <option>Oftalmología</option>
        </Form.Control>
      );
    }
  }

  render() {
    return (
      <div style={{ margin: "20px 20px 20px 20px" }}>
        <h6>Borrar profesor de una asignatura</h6>
        <Form
          id="form-profeasignatura"
          onSubmit={e =>
            this.props.handleProfeAsignatura(
              e,
              document.getElementById("form-profeasignatura"),
              this
            )
          }
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridUni">
              <Form.Label>Universidad</Form.Label>
              <Form.Control
                as="select"
                ref={this.props.uni}
                onChange={e => this.handleChange(e)}
                required
              >
                <option>Seleccionar...</option>
                <option>Universidad de Zaragoza</option>
                <option>Universidad de Alicante</option>
                <option>Universidad de San Jorge</option>
                <option>Universidad de Navarra</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAsign" required>
              <Form.Label>Asignatura</Form.Label>
              {this.opcionesAsignaturas(this.state.uni)}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridUserID">
              <Form.Label>Nombre de usuario del profesor</Form.Label>
              {this.opcionesProfes(this.state.asignatura)}
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
  }
}

class AdministradorBorrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.userIDProf = React.createRef();
    this.nombreUni = React.createRef();
    this.uniAsig = React.createRef();
    this.nombreAsig = React.createRef();
    this.uniUn = React.createRef();
    this.asignUn = React.createRef();
    this.userUn = React.createRef();
    this.handleProfesor = this.handleProfesor.bind(this);
    this.handleUniversidad = this.handleUniversidad.bind(this);
    this.handleAsignatura = this.handleAsignatura.bind(this);
    this.handleProfeAsignatura = this.handleProfeAsignatura.bind(this);
    this.getBorder = this.getBorder.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
    const userID = this.userIDProf.current.value;
    //this.setState({ datosSubidos: true });
    console.log(userID);
    form.reset();
    this.handleShow();
  }
  handleUniversidad(event, form) {
    event.preventDefault();
    const nombre = this.nombreUni.current.value;
    //this.setState({ datosSubidos: true });
    console.log(nombre);
    form.reset();
    this.handleShow();
  }
  handleAsignatura(event, form, that) {
    event.preventDefault();
    if (
      this.uniAsig.current.value !== "Seleccionar..." &&
      this.nombreAsig.current !== null
    ) {
      const universidad = this.uniAsig.current.value;
      const asignatura = this.nombreAsig.current.value;
      //this.setState({ datosSubidos: true });
      console.log(universidad, asignatura);
      form.reset();
      this.handleShow();
      that.setState({ uni: "" });
    }
  }

  handleProfeAsignatura(event, form, that) {
    event.preventDefault();
    if (
      this.uniUn.current.value !== "Seleccionar..." &&
      this.asignUn.current !== null &&
      this.asignUn.current.value !== "Seleccionar..." &&
      this.userUn.current !== null
    ) {
      const universidad = this.uniUn.value;
      const asignatura = this.asignUn.current.value;
      const user = this.userUn.value;
      //this.setState({ datosSubidos: true });
      console.log(universidad, asignatura, user);
      form.reset();
      this.handleShow();
      that.setState({ uni: "", asignatura: "" });
    }
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Borrar</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraAdmi />
        <div
          className="transform"
          style={{
            marginTop: "80px",
            marginLeft: "100px",
            marginRight: "100px",
            marginDown: "80px"
          }}
        >
          <h5>Borrar elementos de la página</h5>
          <div className="boxed">
            {FormularioProfesor(this.handleProfesor, this.userIDProf)}
          </div>
          <div className="boxed" style={{ marginTop: "20px" }} id="a">
            {FormularioUniversidad(this.handleUniversidad, this.nombreUni)}
          </div>
          <div className="boxed" style={{ marginTop: "20px" }}>
            <FormularioAsignatura
              handleAsignatura={this.handleAsignatura}
              uni={this.uniAsig}
              nombre={this.nombreAsig}
            />
          </div>
          <div className="boxed" style={{ marginTop: "20px" }}>
            <FormularioProfeAsignatura
              handleProfeAsignatura={this.handleProfeAsignatura}
              uni={this.uniUn}
              asignatura={this.asignUn}
              user={this.userUn}
            />
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Elemento borrado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Se ha borrado correctamente de la base de datos
          </Modal.Body>
          <Modal.Footer>
            <Button className="boton-filtro" onClick={this.handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AdministradorBorrar;
