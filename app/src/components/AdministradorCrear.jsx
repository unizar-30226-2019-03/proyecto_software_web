import React, { Component } from "react";
import BarraAdmi from "./BarraAdmi";
import { Helmet } from "react-helmet";
import { Button, Form, Col, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { isSignedIn } from "../config/Auth";
import UniversityApi from "swagger_unicast/dist/api/UniversityApi";
import DegreeApi from "swagger_unicast/dist/api/DegreeApi";
import { checkFileExtensionImage } from "../config/Procesar";
import {
  crearUniversidad,
  crearCarreraYLigar,
  crearAsigYLigar
} from "../config/Admin";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";

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

const FormularioUniversidad = (handleUniversidad, nombre, fotoUni) => {
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
          <Form.Group as={Col} controlId="formGridNameUni">
            <Form.Label>Universidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              required
              ref={nombre}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridFotoUni">
          <Form.Label>Foto de la Universidad</Form.Label>
          <Form.Control type="file" accept="image/*" ref={fotoUni} required />
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

const FormularioCarrera = (handleCarrera, uni, carrera, universidades) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Añadir Carrera</h6>
      <Form
        id="form-carrera"
        onSubmit={e =>
          handleCarrera(e, document.getElementById("form-carrera"))
        }
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUniCarr">
            <Form.Label>Universidad</Form.Label>
            <Form.Control as="select" ref={uni}>
              {universidades.map(univ => {
                const { id, name } = univ;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCarrera">
            <Form.Label>Carrera</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              required
              ref={carrera}
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

const FormularioAsignatura = (
  handleAsignatura,
  uni,
  asignatura,
  asignatura_corto,
  universidades
) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Añadir asignatura</h6>
      <Form
        id="form-asignatura"
        onSubmit={e =>
          handleAsignatura(e, document.getElementById("form-asignatura"))
        }
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUni">
            <Form.Label>Universidad</Form.Label>
            <Form.Control as="select" ref={uni}>
              {universidades.map(univ => {
                const { id, name } = univ;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form.Row>
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
          <Form.Group as={Col} controlId="formGridAsignatura">
            <Form.Label>Nombre corto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              required
              ref={asignatura_corto}
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

class FormularioProfeAsignatura extends React.Component {
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
        <Form.Control as="select" ref={this.props.asignatura}>
          <option>Inteligencia Artificial</option>
          <option>Proyecto Software</option>
        </Form.Control>
      );
    } else if (nombre === "Universidad de Alicante") {
      return (
        <Form.Control as="select" ref={this.props.asignatura}>
          <option>Derecho Penal</option>
          <option>Historia del derecho</option>
        </Form.Control>
      );
    } else if (nombre === "Universidad de San Jorge") {
      return (
        <Form.Control as="select" ref={this.props.asignatura}>
          <option>Psiquiatría</option>
          <option>Oftalmología</option>
        </Form.Control>
      );
    }
  }

  render() {
    return (
      <div style={{ margin: "20px 20px 20px 20px" }}>
        <h6>Añadir profesor a asignatura</h6>
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
            <Form.Group as={Col} controlId="formGridUniProfe">
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
            <Form.Group as={Col} controlId="formGridUserIDProfe">
              <Form.Label>Nombre de usuario del profesor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                required
                ref={this.props.user}
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
  }
}

class AdministradorCrear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passValida: -1,
      show: false,
      listaCarreras: [],
      listaUniversidades: []
    };
    this.UniversityApi = new UniversityApi();
    this.DegreeApi = new DegreeApi();
    this.SubjectApi = new SubjectApi();
    this.nombreProf = React.createRef();
    this.apellidosProf = React.createRef();
    this.userIDProf = React.createRef();
    this.emailProf = React.createRef();
    this.passwdProf = React.createRef();
    this.passwd2Prof = React.createRef();
    this.nombreUni = React.createRef();
    this.fotoUni = React.createRef();
    this.nombreCarrera = React.createRef();
    this.uniAsig = React.createRef();
    this.uniCarr = React.createRef();
    this.nombreAsig = React.createRef();
    this.nombreCortoAsig = React.createRef();
    this.uniUn = React.createRef();
    this.asignUn = React.createRef();
    this.userUn = React.createRef();
    this.handleProfesor = this.handleProfesor.bind(this);
    this.handleUniversidad = this.handleUniversidad.bind(this);
    this.handleAsignatura = this.handleAsignatura.bind(this);
    this.handleCarrera = this.handleCarrera.bind(this);
    this.handleProfeAsignatura = this.handleProfeAsignatura.bind(this);
    this.getBorder = this.getBorder.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      name: "a" // String | String a buscar en el nombre
    };
    this.UniversityApi.findUniversitiesContaining(
      opts,
      (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log(data);
          this.setState({ listaUniversidades: data._embedded.universities });
        }
      }
    );
    opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0", // String |
      name: "a" // String | String a buscar en el nombre de carreras
    };
    this.DegreeApi.findDegreesContainingName(opts, (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        this.setState({ listaCarreras: data._embedded.degrees });
      }
    });
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
    const nombre = this.nombreProf.current.value;
    const apellidos = this.apellidosProf.current.value;
    const userID = this.userIDProf.current.value;
    const email = this.emailProf.current.value;
    const passwd = this.passwdProf.current.value;
    const passwd2 = this.passwd2Prof.current.value;
    if (passwd === passwd2) {
      //this.setState({ datosSubidos: true });
      console.log(nombre, apellidos, userID, email, passwd, passwd2);
      form.reset();
      this.handleShow();
    } else {
      this.setState({ passValida: 0 });
    }
  }
  handleUniversidad(event, form) {
    event.preventDefault();
    if (checkFileExtensionImage(this.fotoUni.current.value)) {
      const uni = this.nombreUni.current.value;
      const file = this.fotoUni.current.files[0];
      crearUniversidad(uni, file, form, this.handleShow, this.UniversityApi);
    } else {
      alert("Debe introducir una imágen válida");
    }
  }

  handleCarrera(event, form) {
    event.preventDefault();
    const uni = parseInt(this.uniCarr.current.value);
    const carrera = this.nombreCarrera.current.value;
    //Añadir carrera
    crearCarreraYLigar(this.DegreeApi, carrera, uni);
    form.reset();
    this.handleShow();
  }

  handleAsignatura(event, form) {
    event.preventDefault();
    const uni = parseInt(this.uniAsig.current.value);
    const subj = this.nombreAsig.current.value;
    const shortname = this.nombreCortoAsig.current.value;
    crearAsigYLigar(this.SubjectApi, subj, shortname, uni);
    form.reset();
    this.handleShow();
  }

  handleProfeAsignatura(event, form, that) {
    event.preventDefault();
    if (
      this.asignUn.current !== null &&
      this.uniUn.current.value !== "Seleccionar..."
    ) {
      const universidad = this.uniUn.value;
      const asignatura = this.asignUn.current.value;
      const user = this.userUn.value;
      //this.setState({ datosSubidos: true });
      console.log(universidad, asignatura, user);
      form.reset();
      this.handleShow();
      that.setState({ uni: "" });
    }
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Añadir</title>
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
          <h5>Añadir elementos a la página</h5>
          <div className="boxed">
            {FormularioProfesor(
              this.handleProfesor,
              this.nombreProf,
              this.apellidosProf,
              this.userIDProf,
              this.emailProf,
              this.passwdProf,
              this.passwd2Prof,
              { border: this.getBorder(this.state.passValida) }
            )}
          </div>
          <div className="boxed" style={{ marginTop: "20px" }} id="a">
            {FormularioUniversidad(
              this.handleUniversidad,
              this.nombreUni,
              this.fotoUni
            )}
          </div>
          <div className="boxed" style={{ marginTop: "20px" }} id="a">
            {FormularioCarrera(
              this.handleCarrera,
              this.uniCarr,
              this.nombreCarrera,
              this.state.listaUniversidades
            )}
          </div>
          <div className="boxed" style={{ marginTop: "20px" }}>
            {FormularioAsignatura(
              this.handleAsignatura,
              this.uniAsig,
              this.nombreAsig,
              this.nombreCortoAsig,
              this.state.listaUniversidades
            )}
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
            <Modal.Title>Elemento añadido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Se ha añadido correctamente a la base de datos
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

export default AdministradorCrear;
