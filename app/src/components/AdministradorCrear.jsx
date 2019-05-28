/**
 * @fileoverview Fichero AdministradorCrear.jsx donde se encuentra la clase
 * que renderiza la página de crear elementos de la aplicación del adeministrador
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-helmet/Helmet.js:Helmet
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../../node_modules/react-bootstrap/Form.js:Form
 * @requires ../../node_modules/react-bootstrap/Col.js:Col
 * @requires ../../node_modules/react-bootstrap/Modal.js:Modal
 * @requires ../../node_modules/swagger_unicast/dist/api/UniversityApi.js:UniversityApi
 * @requires ../../node_modules/swagger_unicast/dist/api/DegreeApi.js:DegreeApi
 * @requires ../../node_modules/swagger_unicast/dist/api/UserApi.js:UserApi
 * @requires ../../node_modules/swagger_unicast/dist/api/SubjectApi.js:SubjectApi
 * @requires ./BarraAdmi.jsx:BarraAdmi
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/AdminAPI.jsx:crearUniversidad
 * @requires ../config/AdminAPI.jsx:crearCarreraYLigar
 * @requires ../config/AdminAPI.jsx:crearAsigYLigar
 * @requires ../config/AdminAPI.jsx:addProfessor
 * @requires ../config/AdminAPI.jsx:hacerProfesor
 * @requires ../config/UserAPI.jsx:getUserByUsername
 * @requires ../config/UniversityAPI.jsx:getSubjectsFromUniversity
 * @requires ../config/UniversityAPI.jsx:getUniversities
 * @requires ../config/Process.jsx:checkFileExtensionImage
 */
import React, { Component } from "react";
import BarraAdmi from "./BarraAdmi";
import { Helmet } from "react-helmet";
import { Button, Form, Col, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { isSignedIn, getUserRole } from "../config/Auth";
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

/**
 * Renderiza  el formulario que permite convertir a un usuario en profesor
 * @param {Function} handleProfesor Función que utiliza los datos guardados en el formulario para añadir el profesor
 * @param {String} userID Almacena el nombre de usuario del profesor
 */
const FormularioProfesor = (handleProfesor, userID) => {
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

/**
 * Renderiza el formulario que permite añadir una universidad
 * @param {Function} handleUniversidad Función que utiliza los datos guardados en el formulario para añadir la universidad
 * @param {String} nombre Almacena el nombre
 * @param {String} fotoUni Ruta de la imagen de la universidad
 */
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

/**
 * Renderiza el formulario que permite añadir una carrera
 * @param {Function} handleCarrera Función que utiliza los datos guardados en el formulario para añadir la carrera
 * @param {String} uni Almacena el id de la universidad
 * @param {String} carrera Almacena el nombre de la carrera a guardar
 * @param {Object} universidades Lista de universidades guardadas
 */
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
              <option value={-1}>Elegir universidad...</option>
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

/**
 * Renderiza el formulario que permite añadir una asignatura
 * @param {Function} handleAsignatura Función que utiliza los datos guardados en el formulario para añadir la asignatura
 * @param {String} uni Almacena el id de la universidad
 * @param {String} asignatura Nombre de la asignatura
 * @param {String} asignatura_corto Abreviatura de la asignatura
 * @param {Object} universidades Lista de universidades guardadas
 */
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
              <option value={-1}>Elegir universidad...</option>
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

/**
 * Clase que renderiza un formulario que permite añadir un profesor a una asignatura
 * @extends Component
 */
class FormularioProfeAsignatura extends Component {
  /**
   * Construye el componente FormularioProfeAsignatura
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Object} props.universidades Lista de universidades
   */
  constructor(props) {
    super(props);
    this.state = {
      uni: -1,
      asignaturas: [],
      showAsig: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Busca todas las asignaturas de la universidad deseada.
   * Si se ha realizado correctamente, actualiza asignaturas con dichas asignaturas, y asigna true a showAsig.
   * Si la universidad no tiene un valor válido (es -1), asigna false a showAsig y a asignaturas un array vacío.
   * @param {Event} event Evento que devuelve el formulario
   */
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

/**
 * Clase que renderiza la pagina de crear del administrador
 * @extends Component
 */
class AdministradorCrear extends Component {
  /**
   * Construye el componente AdministradorCrear
   *
   * @param {Object} props Propiedades para inicializar el componente
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      show: false,
      listaCarreras: [],
      listaUniversidades: []
    };
    /**
     * Api de las universidades
     * @type {Object}
     */
    this.UniversityApi = new UniversityApi();
    /**
     * Api de las carreras
     * @type {Object}
     */
    this.DegreeApi = new DegreeApi();
    /**
     * Api de las asignaturas
     * @type {Object}
     */
    this.SubjectApi = new SubjectApi();
    /**
     * Api de los usuarios
     * @type {Object}
     */
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
    this.getData = this.getData.bind(this);
    this.handleProfesor = this.handleProfesor.bind(this);
    this.handleUniversidad = this.handleUniversidad.bind(this);
    this.handleAsignatura = this.handleAsignatura.bind(this);
    this.handleCarrera = this.handleCarrera.bind(this);
    this.handleProfeAsignatura = this.handleProfeAsignatura.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Obtiene la lista de universidades añadidas.
   */
  getData() {
    getUnivesities(0, data => {
      this.getAllUniversities(data._embedded.universities, 1);
    });
  }

  /**
   * Obtiene la lista de universidades añadidas
   * @param {Object} unis Lista de universidades recogidas hasta la página solicitada
   * @param {Number} page Número de página de la petición
   */
  getAllUniversities(unis, page) {
    if (unis.length < 20 * page) {
      if (this._isMounted) {
        this.setState({ listaUniversidades: unis });
      }
    } else {
      getUnivesities(page, data => {
        const newData = [...unis, ...data._embedded.universities];
        this.getAllUniversities(newData, page + 1);
      });
    }
  }
  /**
   * Cierra el modal (Pop-up)
   */
  handleClose() {
    this.setState({ show: false });
  }

  /**
   * Abre el modal (Pop-up)
   */
  handleShow() {
    this.setState({ show: true });
  }
  /**
   * Busca el usuario con id userID y lo convierte en profesor
   * @param {Event} event Evento que devuelve el formulario
   * @param {HTMLElement} form Formulario de añadir profesor
   */
  handleProfesor(event, form) {
    event.preventDefault();
    const userID = this.userIDProf.current.value;
    hacerProfesor(userID, form, this.handleShow, this.UserApi);
  }
  /**
   * Si fotoUni es una imagen, crea una universidad con nombre nombreUnin, imagen fotoUni,
   * formulario de entrada form, API UniversityApi.
   * @param {Event} event Evento que devuelve el formulario
   * @param {HTMLElement} form Formulario de añadir universidad
   */
  handleUniversidad(event, form) {
    event.preventDefault();
    if (checkFileExtensionImage(this.fotoUni.current.value)) {
      const uni = this.nombreUni.current.value;
      const file = this.fotoUni.current.files[0];
      crearUniversidad(
        uni,
        file,
        form,
        this.handleShow,
        this.UniversityApi,
        ok => {
          if (ok) {
            this.getData();
          } else {
            alert("La universidad " + uni + " ya existe");
          }
        }
      );
    } else {
      alert("Debe introducir una imágen válida");
    }
  }
  /**
   * Si uniCarr es distinto a -1, si no existe la carrera de nombre nombreCarrera, la crea y la asocia a la universidad uniCarr.
   * Si ya existía, asocia dicha carrera a la universidad.
   * @param {Event} event Evento que devuelve el formulario
   * @param {HTMLElement} form Formulario de añadir carrera
   */
  handleCarrera(event, form) {
    event.preventDefault();
    const uni = parseInt(this.uniCarr.current.value);
    if (uni !== -1) {
      const carrera = this.nombreCarrera.current.value;
      //Añadir carrera
      crearCarreraYLigar(this.DegreeApi, carrera, uni);
      form.reset();
      this.handleShow();
    }
  }
  /**
   * Si no existe la asignatura nombreAsig, la crea y la asocia a la universidad
   * uniAsig. Si ya existía, asocia dicha asignatura a la universidad uniAsig.
   * @param {Event} event Evento que devuelve el formulario
   * @param {HTMLElement} form Formulario de añadir asignatura
   */
  handleAsignatura(event, form) {
    event.preventDefault();
    const uni = parseInt(this.uniAsig.current.value);
    if (uni !== -1) {
      const subj = this.nombreAsig.current.value;
      const shortname = this.nombreCortoAsig.current.value;
      crearAsigYLigar(this.SubjectApi, subj, shortname, uni);
      form.reset();
      this.handleShow();
    }
  }
  /**
   * Si uniUn es correcto (distinto de -1) y asignUn no es null, si existe el usuario userUn,
   * asigna dicha asignatura a dicho usuario.
   * @param {Event} event Evento que devuelve el formulario
   * @param {HTMLElement} form Formulario de añadir profesor a asignatura
   * @param {*} that
   */
  handleProfeAsignatura(event, form, that) {
    event.preventDefault();

    const universidad = parseInt(this.uniUn.current.value);
    if (
      universidad !== -1 ||
      (this.asignUn.current !== null && this.asignUn.current.value !== "-1")
    ) {
      const asignatura = parseInt(this.asignUn.current.value);
      if (!isNaN(asignatura)) {
        const user = this.userUn.current.value;
        getUserByUsername(user, data => {
          if (
            data === false ||
            data.length === 0 ||
            data.role === "ROLE_USER"
          ) {
            alert("El usuario especificado no existe");
          } else {
            addProfessor(data.id, asignatura, this.SubjectApi, ok => {
              if (ok) {
                form.reset();
                this.handleShow();
                that.setState({ uni: -1 });
              } else {
                alert(
                  "No se ha podido relacionar el profesor con la asignatura"
                );
              }
            });
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
    return !isSignedIn() || getUserRole() !== "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/administrador-crear`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Administrador | UniCast</title>
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
            {FormularioProfesor(this.handleProfesor, this.userIDProf)}
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
