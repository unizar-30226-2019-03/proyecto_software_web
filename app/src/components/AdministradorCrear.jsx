import React, { Component } from "react";
import BarraAdmi from "./BarraAdmi";
import { Helmet } from "react-helmet";
import { Button, Form, Col, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {
  isSignedIn
} from "../config/Auth";
import UniversityApi from "swagger_unicast/dist/api/UniversityApi";
import DegreeApi from "swagger_unicast/dist/api/DegreeApi";
import UserApi from "swagger_unicast/dist/api/UserApi";
import { checkFileExtensionImage } from "../config/Process";
import {
  crearUniversidad,
  crearCarreraYLigar,
  crearAsigYLigar,
  addProfessor, 
  hacerProfesor
} from "../config/AdminAPI";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";
import {
  getSubjectsFromUniveristy,
  getUnivesities
} from "../config/UniversityAPI";
import { getUserByUsername } from "../config/UserAPI";

const FormularioProfesor = (
  handleProfesor,
  userID
) => {
  return (
    <div style={{ margin: "20px 20px 20px 20px" }}>
      <h6>Convertir usuario en profesor</h6>
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
          <Form.Group as={Col} controlId="formGridAsignaturaCorto">
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
      uni: -1,
      asignaturas: [],
      showAsig: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //Buscar asignaturas según la universidad
    const uni = parseInt(event.target.value);
    if (uni !== -1) {
      getSubjectsFromUniveristy(uni, data => {
        this.setState({ asignaturas: data });
      });
      this.setState({ showAsig: true });
    } else {
      this.setState({ showAsig: false, asignaturas: [] });
    }
    this.setState({ uni: uni });
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
                <option value={-1}>Elegir universidad...</option>
                {this.props.universidades.map(univ => {
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
            <Form.Group as={Col} controlId="formGridAsign" required>
              <Form.Label>Asignatura</Form.Label>
              {this.state.showAsig ? (
                <Form.Control as="select" ref={this.props.asignatura}>
                  {this.state.asignaturas.map(asig => {
                    const { id, name } = asig;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Form.Control>
              ) : null}
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
      show: false,
      listaCarreras: [],
      listaUniversidades: []
    };
    this.UniversityApi = new UniversityApi();
    this.DegreeApi = new DegreeApi();
    this.SubjectApi = new SubjectApi();
    this.UserApi = new UserApi();
    this.userIDProf = React.createRef();
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
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    getUnivesities(0, data => {
      this.getAllUniversities(data._embedded.universities, 1);
    });
  }

  getAllUniversities(unis, page) {
    if (unis.length < 20) {
      this.setState({ listaUniversidades: unis });
    } else {
      getUnivesities(page, data => {
        const newData = [...unis, ...data._embedded.universities];
        this.getAllUniversities(newData, page + 1);
      });
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleProfesor(event, form) {
    event.preventDefault();
    const userID = this.userIDProf.current.value;
    hacerProfesor(userID, form, this.handleShow, this.UserApi);
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

    const universidad = parseInt(this.uniUn.current.value);
    if (universidad !== -1 || this.asignUn.current !== null) {
      const asignatura = parseInt(this.asignUn.current.value);
      if (!isNaN(asignatura)) {
        const user = this.userUn.current.value;
        getUserByUsername(user, data => {
          if (data === false || data.length === 0) {
            alert("El usuario especificado no existe");
          } else {
            addProfessor(data[0].id, asignatura, this.SubjectApi);
            form.reset();
            this.handleShow();
            that.setState({ uni: -1 });
          }
        });
      } else {
        alert("Introduzca una asignatura");
      }
    } else {
      alert("Debe introrucir todos los campos");
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
              this.userIDProf
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
              universidades={this.state.listaUniversidades}
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
