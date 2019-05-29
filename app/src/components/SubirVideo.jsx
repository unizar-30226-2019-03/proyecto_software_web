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

class SubirVideo extends Component {
  constructor() {
    super();
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
