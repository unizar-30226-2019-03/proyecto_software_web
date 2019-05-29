/**
 * @fileoverview Fichero SubirVideo.jsx donde se encuentra la clase
 * que renderiza la pantalla de subir un nuevo vídeo.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../../node_modules/react-bootstrap/Form.js:Form
 * @requires ../../node_modules/react-bootstrap/Col.js:Col
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/Process.jsx:checkFileExtensionImage
 * @requires ../config/Process.jsx:checkFileExtensionVideo
 * @requires ../config/VideoAPI.jsx:UploadVideo
 * @requires ../config/UserAPI.jsx:getSubjectsAsProfessor
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
import {
  checkFileExtensionImage,
  checkFileExtensionVideo
} from "../config/Process";
import { UploadVideo } from "../config/VideoAPI";
import { getSubjectsAsProfessor } from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Renderiza el formulario que permite subir un nuevo vídeo
 * @param {Function} handleSubmit Función que utiliza los datos guardados en el formulario para subir un vídeo
 * @param {String} titulo Referencia al título del vídeo
 * @param {File} miniatura Referencia a la imagen de portada del vídeo
 * @param {String} descripcion Referencia a la descripción del vídeo
 * @param {File} video Referencia al archivo de vídeo a subir
 * @param {Number} asignatura Referencia a la asignatura del vídeo (y profesor)
 * @param {Number} img_valida Determina si la imagen introducida es válida
 * @param {Number} video_valido Determina si el vídeo introducido es válido
 * @param {Array.<Object>} listaAsignaturas Lista de asignaturas del profesor
 * @param {Boolean} mostrarSpin Parámetro que indica si mostrar un spin de carga o no
 * @param {Function} handleSpin Función que se ejecuta tras someter el formulario y controla el spin de carga
 */
const FormularioDatos = (
  handleSubmit,
  titulo,
  miniatura,
  descripcion,
  video,
  asignatura,
  img_valida,
  video_valido,
  listaAsignaturas,
  mostrarSpin,
  handleSpin
) => {
  return (
    <div style={{ margin: "0 20% 0 0" }}>
      <Form
        onSubmit={e => {
          handleSubmit(e);
          handleSpin();
        }}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título del vídeo..."
              required
              ref={titulo}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridAsingatura">
            <Form.Label>Asignatura del vídeo</Form.Label>
            {false ? (
              <Form.Control as="select" ref={asignatura}>
                {listaAsignaturas.map(asig => {
                  return <option key={asig}>{asig}</option>;
                })}
              </Form.Control>
            ) : (
              <Form.Control as="select" ref={asignatura}>
                {listaAsignaturas.map(asig => {
                  const { id, name } = asig;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </Form.Control>
            )}
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridMiniatura">
          <Form.Label className={img_valida === 0 ? "text-danger" : ""}>
            {img_valida === 0
              ? "Introduzca un formato de imagen válido"
              : "Miniatura del video"}
          </Form.Label>
          <Form.Control type="file" accept="image/*" ref={miniatura} required />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            style={{ resize: "none" }}
            ref={descripcion}
            placeholder="Descripción del vídeo..."
            required
          />
        </Form.Group>
        <Form.Group controlId="formGridVideo">
          <Form.Label className={video_valido === 0 ? "text-danger" : ""}>
            {video_valido === 0
              ? "Introduzca un formato de imagen válido"
              : "Vídeo"}
          </Form.Label>
          <Form.Control type="file" accept="video/*" ref={video} required />
        </Form.Group>
        <Button
          className="boton-filtro"
          type="submit"
          style={{ float: "right", width: "130px", position: "relative" }}
        >
          Confirmar
          {mostrarSpin ? (
            <LoadingSpinUniCast className="spin-editar-perfil" />
          ) : null}
        </Button>
      </Form>
      <Link to="/perfil">
        <Button
          className="boton-filtro"
          style={{ float: "left", marginBottom: "20px" }}
        >
          Cancelar
        </Button>
      </Link>
    </div>
  );
};

/**
 * Clase que gestiona la pantalla de subir un nuevo vídeo.
 * @extends Component
 */
class SubirVideo extends Component {
  /**
   * Construye el componente SubirVideo
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
      datosSubidos: false,
      img_valida: -1,
      video_valido: -1,
      listaAsignaturas: [],
      error: false,
      mostrarSpin: false
    };
    this.titulo = React.createRef();
    this.miniatura = React.createRef();
    this.descripcion = React.createRef();
    this.video = React.createRef();
    this.asignatura = React.createRef();
    this.getData = this.getData.bind(this);
    this.handleSpin = this.handleSpin.bind(this);
    this.handleSubmitDatos = this.handleSubmitDatos.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Obtiene la lista de asignaturas en las que
   * está un profesor.
   */
  getData() {
    getSubjectsAsProfessor(getUserID(), asignaturas => {
      if (this._isMounted) {
        this.setState({ listaAsignaturas: asignaturas });
      }
    });
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
   * Dependiendo de los datos introducidos por el usuario
   * se mostrará el spin de carga o si hay error no se mostrará
   * nada.
   */
  handleSpin() {
    const miniatura = this.miniatura.current.value;
    const video = this.video.current.value;
    if (
      this._isMounted &&
      checkFileExtensionVideo(video) &&
      checkFileExtensionImage(miniatura)
    ) {
      this.setState({ mostrarSpin: true });
    }
  }

  /**
   * Comprueba que los datos introducidos por el usuario son válidos.
   * De ser así, sube el vídeo.
   * @param {Event} event Evento que devuelve el formulario
   */
  handleSubmitDatos(event) {
    event.preventDefault();
    const titulo = this.titulo.current.value;
    const descripcion = this.descripcion.current.value;
    const miniatura = this.miniatura.current.value;
    const video = this.video.current.value;
    let img_valida = this.state.img_valida;
    let video_valido = this.state.video_valido;
    let ok = true;
    if (!checkFileExtensionImage(miniatura)) {
      ok = false;
      img_valida = 0;
    }
    if (!checkFileExtensionVideo(video)) {
      ok = false;
      video_valido = 0;
    }
    if (ok) {
      UploadVideo(
        this.video.current.files[0],
        this.miniatura.current.files[0],
        titulo,
        descripcion,
        parseInt(this.asignatura.current.value),
        ok => {
          if (ok) {
            if (this._isMounted) {
              this.setState({ datosSubidos: true });
            }
          } else {
            if (this._isMounted) {
              this.setState({ error: true, mostrarSpin: false });
            }
          }
        }
      );
    } else {
      if (this._isMounted) {
        this.setState({
          video_valido: video_valido,
          img_valida: img_valida
        });
      }
    }
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

  render() {
    return !isSignedIn() || getUserRole() !== "ROLE_PROFESSOR" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/perfil`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Subir Video | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        {this.state.datosSubidos ? (
          <Redirect to={"/perfil"} />
        ) : (
          <div>
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
              <h5 style={{ color: this.state.error ? "red" : "black" }}>
                {this.state.error
                  ? "No se ha podido subir el vídeo"
                  : "Subir vídeo"}
              </h5>
              <img style={{ display: "none" }} id="output" alt="pep" />
              <div>
                {FormularioDatos(
                  this.handleSubmitDatos,
                  this.titulo,
                  this.miniatura,
                  this.descripcion,
                  this.video,
                  this.asignatura,
                  this.state.img_valida,
                  this.state.video_valido,
                  this.state.listaAsignaturas,
                  this.state.mostrarSpin,
                  this.handleSpin
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SubirVideo;
