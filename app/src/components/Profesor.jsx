/**
 * @fileoverview Fichero Profesor.jsx donde se encuentra la clase
 * que renderiza la pantalla de usuario de un profesor.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/UserAPI.jsx:getUser
 * @requires ../config/UserAPI.jsx:getUniversityOfUser
 * @requires ../config/UserAPI.jsx:getDegreeOfUser
 * @requires ../config/UserAPI.jsx:getSubjectsAsProfessor
 * @requires ../config/UserAPI.jsx:findUserProfessors
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import User_img from "../assets/user.png";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserRole, getUserID } from "../config/Auth";
import {
  getUser,
  getUniversityOfUser,
  getDegreeOfUser,
  getSubjectsAsProfessor,
  findUserProfessors
} from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Clase que renderiza los datos de un usuario para
 * mostrarlos.
 * @extends Component
 */
class CamposMostrar extends Component {
  renderCampo(nombre, contenido) {
    return (
      <div>
        <h6
          style={{
            float: "left"
          }}
        >
          <strong>{nombre}</strong>
        </h6>
        <h6
          style={{
            margin: "30px 40% 0 120px"
          }}
        >
          {contenido}
        </h6>
        <br />
      </div>
    );
  }
  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect to="/" />
    ) : (
      <div>
        <div>
          <h6
            style={{
              float: "left"
            }}
          >
            <strong>Descripción:</strong>
          </h6>
          <div
            style={{
              margin: "40px 40% 0 120px"
            }}
          >
            <h6 style={{ textAlign: "justify" }}>{this.props.description}</h6>
          </div>
          <br />
        </div>
        {this.renderCampo("Universidad:", this.props.uni)}
        {this.renderCampo("Grado:", this.props.degree)}
      </div>
    );
  }
}

/**
 * Clase que renderiza las asignaturas a las que pertenece
 * un profesor.
 * @extends Component
 */
class AsignaturasProf extends Component {
  /**
   * Construye el componente AsignaturasProf
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.sub Lista de asignaturas de un profesor
   */
  constructor(props) {
    super(props);
    this.state = { sub: props.sub };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ sub: newProps.sub });
  }

  render() {
    return (
      <div>
        <h6
          style={{
            float: "left"
          }}
        >
          <strong>Asignaturas:</strong>
        </h6>
        <div
          style={{
            margin: "30px 40% 0 120px"
          }}
        >
          {this.state.sub.map(subject => {
            const foto =
              subject.university === undefined ? "" : subject.university.photo;
            return (
              <div key={subject.id} style={{ marginBottom: "10px" }}>
                <Link to={`/asig/${subject.id}`}>
                  <img
                    src={foto}
                    style={{ borderRadius: "50%" }}
                    height="40"
                    width="40"
                    alt="Canal"
                  />
                </Link>
                <Link
                  className="link-asignatura"
                  style={{ padding: "0 0 0 10px" }}
                  to={`/asig/${subject.id}`}
                >
                  {subject.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

/**
 * Clase que gestiona la pantalla de usuario de un profesor.
 * @extends Component
 */
class Profesor extends Component {
  /**
   * Construye el componente Profesor
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      prof: "",
      sub: [],
      esProfe: false,
      profesores: [],
      mostrarSpin: true
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkProfessor = this.checkProfessor.bind(this);
    this.getUniFromUser = this.getUniFromUser.bind(this);
    this.getDegreeFromUser = this.getDegreeFromUser.bind(this);
  }

  /**
   * Ajusta el contenido a la barra lateral.
   * @param {Boolean} display Determina si desplazar contenido o no
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
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
   * Obtiene el profesor, su universidad, su carrera
   * y las asignaturas del profesor. Además comprueba
   * que el usuario sea un profesor.
   */
  getData() {
    getUser(this.props.match.params.id, data => {
      if (this._isMounted) {
        this.setState({ prof: data });
      }
      this.getUniFromUser(parseInt(data.id));
      this.getDegreeFromUser(data.id);
      getSubjectsAsProfessor(data.id, data => {
        if (this._isMounted) {
          this.setState({ sub: data });
        }
      });
      this.checkProfessor([], 0);
    });
  }

  /**
   * Comprueba que el perfil visualizado es el de un profesor.
   * @param {Array.<Object>} professors Lista de profesores
   * @param {Number} page Página de profesores a obtener
   */
  checkProfessor(professors, page) {
    if (professors.length < 20 * page) {
      var esProfe = false;
      professors.forEach(p => {
        if (p.id === parseInt(this.props.match.params.id)) {
          esProfe = true;
        }
      });
      if (this._isMounted) {
        this.setState({ esProfe: esProfe, mostrarSpin: false });
      }
    } else {
      findUserProfessors(page, data => {
        const newProfessors = [...professors, ...data];
        this.checkProfessor(newProfessors, page + 1);
      });
    }
  }

  /**
   * Obtiene la universidad del usuario.
   * @param {Number} id Id del usuario
   */
  getUniFromUser(id) {
    getUniversityOfUser(id, data => {
      if (this._isMounted) {
        this.setState({ uni: data.name });
      }
    });
  }

  /**
   * Obtiene la carrera del usuario.
   * @param {Number} id Id del usuario
   */
  getDegreeFromUser(id) {
    getDegreeOfUser(id, data => {
      if (this._isMounted) {
        this.setState({ degree: data.name });
      }
    });
  }

  /**
   * Renderiza un botón para enviar un mensaje privado dependiendo
   * de si el usuario es un profesor o no.
   * @param {Boolean} esProfe Determina si el usuario es profesor o no
   */
  renderButton(esProfe) {
    if (esProfe) {
      return (
        <div>
          <Link
            to={`/chat/${this.props.match.params.id}`}
            className="universidad"
          >
            <Button className="boton-filtro">Enviar un mensaje</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div
          style={{
            color: "#00000080",
            fontSize: "14px",
            textAlign: "left"
          }}
        >
          Sigue alguna asignatura de este profesor para poder enviarle un
          mensaje.
        </div>
      );
    }
  }

  render() {
    const nombre =
      this.state.prof.name === undefined ? "" : this.state.prof.name;
    const apellidos =
      this.state.prof.surnames === undefined ? "" : this.state.prof.surnames;
    const user_nom =
      this.state.prof.username === undefined ? "" : this.state.prof.username;
    const foto =
      this.state.prof.photo === undefined ? User_img : this.state.prof.photo;
    const descr =
      this.state.prof.description === undefined
        ? ""
        : this.state.prof.description;
    const uni = this.state.uni === undefined ? "" : this.state.uni;
    const degree = this.state.degree === undefined ? "" : this.state.degree;
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/profesor/${this.props.match.params.id}`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Profesor | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
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
          {this.state.mostrarSpin ? (
            <LoadingSpinUniCast className="spin-ranking" />
          ) : (
            <div>
              <h5>
                {nombre} {apellidos}
              </h5>
              <div style={{ marginTop: "40px" }}>
                <div
                  style={{
                    float: "left",
                    padding: "0 60px 0 0"
                  }}
                >
                  <img
                    src={foto}
                    alt="Foto de perfil"
                    width="160px"
                    height="160px"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div
                  style={{
                    padding: "20px 20px 0px 0px"
                  }}
                >
                  {parseInt(this.props.match.params.id) === getUserID() &&
                  this.state.esProfe
                    ? null
                    : this.renderButton(this.state.esProfe)}

                  <div
                    style={{
                      padding: "40px 20px 0px 0px"
                    }}
                  >
                    <h6
                      style={{
                        float: "left",
                        padding: "0 20px 0 0"
                      }}
                    >
                      <strong>Nombre de usuario:</strong>
                    </h6>
                    <p>{user_nom}</p>
                  </div>
                </div>
              </div>
              <br />
              <CamposMostrar description={descr} uni={uni} degree={degree} />
              <AsignaturasProf sub={this.state.sub} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profesor;
