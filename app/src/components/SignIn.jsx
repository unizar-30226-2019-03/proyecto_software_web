/**
 * @fileoverview Fichero SignIn.jsx donde se encuentra la clase
 * que renderiza la pantalla de registro de la aplicación.
 *
 * @author UniCast
 *
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../../node_modules/react-bootstrap/Form.js:Form
 * @requires ../../node_modules/react-bootstrap/Col.js:Col
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../node_modules/swagger_unicast/dist/index.js:UserApi
 * @requires ../config/Process.jsx:checkFileExtensionImage
 * @requires ../config/Auth.jsx:signIn
 * @requires ../config/Auth.jsx:restriccionNombre
 * @requires ../config/Auth.jsx:restriccionUser
 * @requires ../config/Auth.jsx:emailPattern
 * @requires ../config/Auth.jsx:restriccion
 * @requires ../config/Auth.jsx:setUserRole
 * @requires ../config/Auth.jsx:setUserPhoto
 * @requires ../config/UniversityAPI.jsx:getUnivesities
 * @requires ../config/UniversityAPI.jsx:getDegreesFromUnivesity
 * @requires ../config/UserAPI.jsx:addUser
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import uni from "../assets/UnicastNombre.png";
import { UserApi } from "swagger_unicast";
import { checkFileExtensionImage } from "../config/Process";
import {
  signIn,
  restriccionNombre,
  restriccionUser,
  emailPattern,
  restriccion,
  setUserRole,
  setUserPhoto
} from "../config/Auth";
import {
  getUnivesities,
  getDegreesFromUnivesity
} from "../config/UniversityAPI";
import { addUser } from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Renderiza el formulario que permite registrar un usuario
 * @param {Function} handleSubmit Función que utiliza los datos guardados en el formulario para registrar al usuario
 * @param {String} nombre Referencia al nombre del nuevo usuario
 * @param {String} apellidos Referencia a los apellidos del nuevo usuario
 * @param {String} userID Referencia al nombre de usuario del nuevo usuario
 * @param {String} email Referencia al email del nuevo usuario
 * @param {String} passwd Referencia a la contraseña del nuevo usuario
 * @param {String} passwd2 Referencia a la contraseña a confirmar del nuevo usuario
 * @param {Object} estado Estado de errores en los datos introducidos
 */
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
      {estado.errorRegistro ? (
        <Form.Group
          style={{
            color: "red",
            fontSize: "13px",
            marginBottom: ".55rem"
          }}
        >
          No se ha podido realizar el registro, compruebe los datos.
        </Form.Group>
      ) : null}
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

/**
 * Renderiza el formulario que permite registrar un usuario
 * @param {Function} handleSubmit Función que utiliza los datos guardados en el formulario para registrar al usuario
 * @param {File} foto Referencia a la foto de perfil del nuevo usuario
 * @param {String} descripcion Referencia a la descripción del nuevo usuario
 * @param {Number} universidad Referencia a la universidad del nuevo usuario
 * @param {Number} carrera Referencia a la carrear del nuevo usuario
 * @param {Function} cancelar Función para cancelar el registro
 * @param {Boolean} errorFoto Indica si hay un error en la foto seleccionada
 * @param {Array.<Object>} universidades Lista de universidades de la aplicación
 * @param {Array.<Object>} carreras Lista de carreras de una universidad concreta
 * @param {Function} handleChangeUni Actualiza la lista de carreras según la universidad seleccionada
 * @param {Boolean} mostrarSpin Determina si mostrar o no el spin de carga mientras se registra el usuario
 * @param {Function} handleSpin Función que se ejecuta tras someter el formulario y controla el spin de carga
 */
const FormularioInfo = (
  handleSubmit,
  foto,
  descripcion,
  universidad,
  carrera,
  cancelar,
  errorFoto,
  universidades,
  carreras,
  handleChangeUni,
  mostrarSpin,
  handleSpin
) => {
  return (
    <Form
      onSubmit={e => {
        handleSubmit(e);
        handleSpin();
      }}
    >
      <Form.Group controlId="formGridUni">
        <Form.Label>¿En qué universidad estudias?</Form.Label>
        <Form.Control
          as="select"
          ref={universidad}
          onChange={e => handleChangeUni(e)}
        >
          <option value={0}>Elige una universidad...</option>
          {universidades.map(e => {
            const { id, name } = e;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formGridCarrera">
        <Form.Label>¿Qué carrera?</Form.Label>
        <Form.Control as="select" ref={carrera}>
          <option value={0}>Elige una carrera...</option>
          {carreras.map(e => {
            const { id, name } = e;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formGridFoto">
        {errorFoto ? (
          <Form.Label
            style={{
              color: "red",
              fontSize: "12px",
              marginBottom: ".57rem"
            }}
          >
            Debe introducir una imagen
          </Form.Label>
        ) : (
          <Form.Label>Foto de usuario*</Form.Label>
        )}
        <Form.Control type="file" ref={foto} required />
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
        {mostrarSpin ? <LoadingSpinUniCast className="spin-signin" /> : null}
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

/**
 * Clase que gestiona la pantalla de registro de un usuario
 * en el sistema.
 * @extends Component
 */
class SignIn extends Component {
  /**
   * Construye el componente SignIn.
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      datosValidados: false,
      infoValidada: false,
      passNoIguales: false,
      passNoValida: false,
      nombreInvalido: false,
      apellidoInvalido: false,
      userInvalido: false,
      emailInvalido: false,
      errorFoto: false,
      error: false,
      nombre: "",
      apellidos: "",
      email: "",
      userID: "",
      pass: "",
      listaUniversidades: [],
      listaCarreras: [],
      page: 0,
      mostrarSpin: false
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
    this.getData = this.getData.bind(this);
    this.handleSubmitDatos = this.handleSubmitDatos.bind(this);
    this.handleChangeUni = this.handleChangeUni.bind(this);
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.back = this.back.bind(this);
    this.getAllUniversities = this.getAllUniversities.bind(this);
    this.handleSpin = this.handleSpin.bind(this);
  }

  /**
   * Obtiene todas las universidades.
   */
  getData() {
    getUnivesities(0, data => {
      if (data._embedded.universities.length === 20) {
        this.getAllUniversities(data._embedded.universities, 1);
      } else {
        if (this._isMounted) {
          this.setState({ listaUniversidades: data._embedded.universities });
        }
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Obtiene todas las universidades almacenadas en el sistema
   * @param {Array.<Object>} unis Lista de universidades
   * @param {Number} page Página de universidades a obtener
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
   * Cancela el registro y vuelve a la pantalla para introducir
   * los datos de nuevo.
   */
  back() {
    this.setState({ datosValidados: false, infoValidada: false });
  }

  /**
   * Comprueba los datos introducidos, si cumplen con las restricciones
   * se avanza a la página para introducir la información no sensible
   * del usuario.
   * @param {Event} event Evento que devuelve el formulario
   */
  handleSubmitDatos(event) {
    event.preventDefault();
    let ok = true;
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
      this.setState({
        datosValidados: true,
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        userID: userID,
        pass: pass,
        error: false
      });
    }
  }

  /**
   * Actualiza la lista de carreras cuando hay un
   * cambio en la universidad seleccionada.
   * @param {Event} e Evento que devuelve el formulario
   */
  handleChangeUni(e) {
    const uniId = parseInt(e.target.value);
    getDegreesFromUnivesity(uniId, data => {
      this.setState({ listaCarreras: data });
    });
  }

  /**
   * Comprueba los datos introducidos por el usuario y si son
   * correctos se procede a registrar el usuario, si se produce
   * algún fallo, se redirige a la pantalla principal del registro
   * y se informa de ello.
   * @param {Event} event Evento que devuelve el formulario
   */
  handleSubmitInfo(event) {
    event.preventDefault();
    let ok = true;

    if (!checkFileExtensionImage(this.foto.current.value)) {
      ok = false;
      if (this._isMounted) {
        this.setState({ errorFoto: true });
      }
    } else {
      if (this._isMounted) {
        this.setState({ errorFoto: false });
      }
    }

    if (ok) {
      const descripcion = this.descripcion.current.value;
      const universidad = parseInt(this.universidad.current.value);
      const carrera = parseInt(this.carrera.current.value);
      let apiInstance = new UserApi();
      addUser(
        this.state.userID,
        this.state.pass,
        this.state.nombre,
        this.state.apellidos,
        this.state.email,
        descripcion,
        universidad,
        carrera,
        this.foto.current.files[0],
        data => {
          if (data === false) {
            if (this._isMounted) {
              this.setState({
                mostrarSpin: false,
                error: true,
                datosValidados: false
              });
            }
          } else {
            apiInstance.authUser(
              data.username,
              this.state.pass,
              (error, data2, response) => {
                if (error) {
                  if (this._isMounted) {
                    this.setState({ mostrarSpin: false });
                  }
                } else {
                  signIn(data2);
                  setUserRole(data.role);
                  setUserPhoto(data.photo);
                  if (this._isMounted) {
                    this.setState({ infoValidada: true, error: false });
                  }
                }
              }
            );
          }
        }
      );
    }
  }

  /**
   * Controla el mostrado del spin de carga
   */
  handleSpin() {
    if (this._isMounted) {
      this.setState({ mostrarSpin: true });
    }
  }

  render() {
    const estadoValidacion = {
      errorRegistro: this.state.error,
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
        {!this.state.error &&
        this.state.datosValidados &&
        this.state.infoValidada ? (
          this.props.location.state === undefined ? (
            <Redirect to={"/inicio"} />
          ) : (
            <Redirect to={this.props.location.state.url} />
          )
        ) : (
          <div>
            <div className="signin transform">
              <img className="img-signin" src={uni} alt="UniCast" />
              {!this.state.datosValidados
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
                    this.back,
                    this.state.errorFoto,
                    this.state.listaUniversidades,
                    this.state.listaCarreras,
                    this.handleChangeUni,
                    this.state.mostrarSpin,
                    this.handleSpin
                  )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SignIn;
