import React, { Component } from "react";
import BarraAdmi from "./BarraAdmi";
import { Helmet } from "react-helmet";
import { Button, Form, Col, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { isSignedIn, getUserRole } from "../config/Auth";
import UniversityApi from "swagger_unicast/dist/api/UniversityApi";
import DegreeApi from "swagger_unicast/dist/api/DegreeApi";
import UserApi from "swagger_unicast/dist/api/UserApi";
import {
  borrarUniversidad,
  borrarProfesor,
  borrarProfeAsignatura
} from "../config/AdminAPI";
import SubjectApi from "swagger_unicast/dist/api/SubjectApi";
import {
  getSubjectsFromUniveristy,
  getUnivesities
} from "../config/UniversityAPI";
import { getProfessorsFromSubject } from "../config/SubjectAPI";

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

const FormularioUniversidad = (handleUniversidad, idUni, lista) => {
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
            <Form.Control as="select" ref={idUni} required>
              <option value={-1}>Elegir universidad...</option>
              {lista.map(univ => {
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
      uni: "",
      asignaturas: []
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
            <Form.Group as={Col} controlId="formGridUniAsign">
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
            <Form.Group as={Col} controlId="formGridAsignAsign" required>
              <Form.Label>Asignatura</Form.Label>
              {this.state.showAsig ? (
                <Form.Control as="select" ref={this.props.asignatura}>
                  <option value={-1}>Elegir asignatura...</option>
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
      asignatura: "",
      asignaturas: [],
      profesores: []
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
    this.setState({ uni: uni, showProfe: false });
  }

  handleChangeProfes(event) {
    //Buscar asignaturas según la universidad
    const asignatura = parseInt(event.target.value);
    if (asignatura !== null && asignatura !== -1) {
      getProfessorsFromSubject(asignatura, data => {
        this.setState({ profesores: data });
      });
      this.setState({ showProfe: true });
    } else {
      this.setState({ showProfe: false, profesores: [] });
    }
    this.setState({ asignatura: asignatura });
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
            <Form.Group as={Col} controlId="formGridAsignProfe" required>
              <Form.Label>Asignatura</Form.Label>
              {this.state.showAsig ? (
                <Form.Control
                  as="select"
                  ref={this.props.asignatura}
                  onChange={e => this.handleChangeProfes(e)}
                >
                  <option value={-1}>Elegir asignatura...</option>
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
            <Form.Group as={Col} controlId="formGridProfeProfe" required>
              <Form.Label>Nombre de usuario del profesor</Form.Label>
              {console.log(this.props)}
              {this.state.showProfe ? (
                <Form.Control as="select" ref={this.props.user}>
                  <option value={-1}>Elegir profesor...</option>
                  {this.state.profesores.map(profe => {
                    const id = profe.id;
                    const username = profe.username;
                    return (
                      <option key={id} value={id}>
                        {username}
                      </option>
                    );
                  })}
                </Form.Control>
              ) : null}
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
      show: false,
      listaUniversidades: []
    };
    this.UniversityApi = new UniversityApi();
    this.DegreeApi = new DegreeApi();
    this.SubjectApi = new SubjectApi();
    this.UserApi = new UserApi();
    this.userIDProf = React.createRef();
    this.idUni = React.createRef();
    this.uniAsig = React.createRef();
    this.nombreAsig = React.createRef();
    this.uniUn = React.createRef();
    this.asignUn = React.createRef();
    this.userUn = React.createRef();
    this.handleProfesor = this.handleProfesor.bind(this);
    this.handleUniversidad = this.handleUniversidad.bind(this);
    this.handleAsignatura = this.handleAsignatura.bind(this);
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
    borrarProfesor(userID, form, this.handleShow, this.UserApi);
  }
  handleUniversidad(event, form) {
    event.preventDefault();
    const uni = this.idUni.current.value;
    borrarUniversidad(uni, form, this.handleShow, this.UniversityApi);
  }
  handleAsignatura(event, form, that) {
    event.preventDefault();
    if (
      this.uniAsig.current.value !== "-1" &&
      this.nombreAsig.current !== null &&
      this.nombreAsig.current !== "-1"
    ) {
      const asignatura = this.nombreAsig.current.value;
      //this.setState({ datosSubidos: true });
      borrarUniversidad(
        Number.parseInt(asignatura),
        form,
        this.handleShow,
        this.UniversityApi
      );
      that.setState({ uni: "" });
    }
  }

  handleProfeAsignatura(event, form, that) {
    event.preventDefault();
    if (
      this.uniUn.current.value !== "-1" &&
      this.asignUn.current !== null &&
      this.asignUn.current.value !== "-1" &&
      this.userUn.current !== null &&
      this.userUn.current.value !== "-1"
    ) {
      const asignatura = this.asignUn.current.value;
      const user = this.userUn.current.value;
      borrarProfeAsignatura(
        asignatura,
        user,
        form,
        this.handleShow,
        SubjectApi
      );
      that.setState({ uni: "", asignatura: "" });
    }
  }

  render() {
    return !isSignedIn() || getUserRole() !== "ROLE_ADMIN" ? (
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
            {FormularioUniversidad(
              this.handleUniversidad,
              this.idUni,
              this.state.listaUniversidades
            )}
          </div>
          <div className="boxed" style={{ marginTop: "20px" }}>
            <FormularioAsignatura
              handleAsignatura={this.handleAsignatura}
              uni={this.uniAsig}
              asignatura={this.nombreAsig}
              universidades={this.state.listaUniversidades}
            />
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
