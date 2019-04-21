import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { sesionValida } from "../App";

const FormularioDatos = (
  handleSubmit,
  titulo,
  miniatura,
  descripcion,
  video,
  asignatura,
  img_valida,
  video_valido
) => {
  return (
    <div style={{ margin: "0 20% 0 0" }}>
      <Form onSubmit={e => handleSubmit(e)}>
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
            <Form.Control as="select" ref={asignatura}>
              <option>Proyecto Software</option>
              <option>Inteligencia Artificial</option>
              <option>Aprendizaje Automático</option>
              <option>Algoritmia Básica</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridMiniatura">
          <Form.Label>Foto de miniatura del video</Form.Label>
          <Form.Control type="file" accept="image/*" ref={miniatura} required />
        </Form.Group>
        {img_valida === 0 ? (
          <p class="text-danger">Introduzca un formato de imagen válido</p>
        ) : (
          ""
        )}
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
          <Form.Label>Vídeo</Form.Label>
          <Form.Control type="file" accept="video/*" ref={video} required />
        </Form.Group>
        {video_valido === 0 ? (
          <p class="text-danger">Introduzca un formato de imagen válido</p>
        ) : (
          ""
        )}
        <Button
          className="boton-filtro"
          type="submit"
          style={{ float: "left" }}
        >
          Confirmar
        </Button>
      </Form>
      <Link to="/perfil">
        <Button
          className="boton-filtro"
          style={{ float: "right", marginBottom: "20px" }}
        >
          Cancelar
        </Button>
      </Link>
    </div>
  );
};

class SubirVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMargin: "300px",
      datosSubidos: false,
      img_valida: -1,
      video_valido: -1
    };
    this.titulo = React.createRef();
    this.miniatura = React.createRef();
    this.descripcion = React.createRef();
    this.video = React.createRef();
    this.asignatura = React.createRef();
    this.handleSubmitDatos = this.handleSubmitDatos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkFileExtensionImage = this.checkFileExtensionImage.bind(this);
    this.checkFileExtensionVideo = this.checkFileExtensionVideo.bind(this);
  }
  checkFileExtensionImage(filename) {
    var ext = filename.split(".").pop();
    return ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "bmp";
  }
  checkFileExtensionVideo(filename) {
    var ext = filename.split(".").pop();
    return (
      ext === "mp4" ||
      ext === "mov" ||
      ext === "3gp" ||
      ext === "wma" ||
      ext === "flv" ||
      ext === "avi"
    );
  }
  handleSubmitDatos(event) {
    event.preventDefault();
    const titulo = this.titulo.current.value;
    const miniatura = this.miniatura.current.value;
    const descripcion = this.descripcion.current.value;
    const video = this.video.current.value;
    const asignatura = this.asignatura.current.value;
    if (!this.checkFileExtensionImage(miniatura)) {
      this.setState({ img_valida: 0 });
    } else if (!this.checkFileExtensionVideo(video)) {
      this.setState({ video_valido: 0 });
    } else {
      this.setState({ datosSubidos: true });
      console.log(titulo, miniatura, descripcion, video, asignatura);
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
    return !sesionValida() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Subir Video</title>
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
              <h5>Subir Vídeo</h5>
              <div>
                {FormularioDatos(
                  this.handleSubmitDatos,
                  this.titulo,
                  this.miniatura,
                  this.descripcion,
                  this.video,
                  this.asignatura,
                  this.state.img_valida,
                  this.state.video_valido
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
