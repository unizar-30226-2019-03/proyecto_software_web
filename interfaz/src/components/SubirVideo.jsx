import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { isSignedIn, getUserToken } from "../config/Auth";
import {
  checkFileExtensionImage,
  checkFileExtensionVideo
} from "../config/Procesar";
import { SubjectApi, ApiClient, VideoApi } from "swagger_unicast";

const FormularioDatos = (
  handleSubmit,
  titulo,
  miniatura,
  descripcion,
  video,
  asignatura,
  img_valida,
  video_valido,
  listaAsignaturas
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
            {console.log(listaAsignaturas)}
            {false ? (
              <Form.Control as="select" ref={asignatura}>
                {listaAsignaturas.map(asig => {
                  return <option key={asig}>{asig}</option>;
                })}
              </Form.Control>
            ) : (
              <Form.Control as="select" ref={asignatura}>
                <option>Proyecto Software</option>
                <option>Inteligencia Artificial</option>
                <option>Aprendizaje Automático</option>
                <option>Algoritmia Básica</option>
              </Form.Control>
            )}
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
      video_valido: -1,
      listaAsignaturas: []
    };
    this.titulo = React.createRef();
    this.miniatura = React.createRef();
    this.descripcion = React.createRef();
    this.video = React.createRef();
    this.asignatura = React.createRef();
    this.handleSubmitDatos = this.handleSubmitDatos.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();
    let apiInstance = new SubjectApi();
    let opts = {
      page: 56 // Number | Numero de la página a devolver
    };
    apiInstance.getSubjects(opts, (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({ listaAsignaturas: data });
      }
    });
  }

  handleSubmitDatos(event) {
    event.preventDefault();
    const titulo = this.titulo.current.value;
    const miniatura = this.miniatura.current.value;
    const descripcion = this.descripcion.current.value;
    const video = this.video.current.value;
    const asignatura = this.asignatura.current.value;
    if (!checkFileExtensionImage(miniatura)) {
      this.setState({ img_valida: 0 });
    } else if (!checkFileExtensionVideo(video)) {
      this.setState({ video_valido: 0 });
    } else {
      let apiInstance = new VideoApi();
      let subjectId = 789;
      apiInstance.addVideo(
        video,
        titulo,
        descripcion,
        subjectId,
        (error, data, response) => {
          if (error) {
            console.error(error);
          } else {
            console.log("API called successfully.");
            this.setState({ datosSubidos: true });
          }
        }
      );
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
    return !isSignedIn() ? (
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
                  this.state.video_valido,
                  this.state.listaAsignaturas
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
