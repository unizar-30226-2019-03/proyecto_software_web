import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import User_img from "../assets/user.png";
import { Button, Form } from "react-bootstrap";
import Popup from "reactjs-popup";
import Link from "react-router-dom/Link";

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
      </div>
    );
  }
  render() {
    return (
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
            <h6 style={{ textAlign: "justify" }}>
              Un texto es una composición de signos codificados en un sistema de
              escritura que forma una unidad de sentido. También es una
              composición de caracteres imprimibles generados por un algoritmo
              de cifrado que, aunque no tienen sentido para cualquier persona,
              sí puede ser descifrado por su destinatario original
            </h6>
          </div>
        </div>
        {this.renderCampo("Universidad:", "UNIZAR")}
        {this.renderCampo("Grado:", "Ingeniería Informática")}
        {this.renderCampo("Intereses:", "Inteligencia Artificial, IoT")}
      </div>
    );
  }
}

class Perfil extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      popUp: false,
      popUpValidado: false,
      pass: "",
      passValida: -1
    };
    this.pass = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBorder = this.getBorder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  handleSubmit(event) {
    const pass = this.pass.current.value;
    event.preventDefault();
    this.setState({ pass: pass });
    if (pass === "1234") {
      this.setState({ passValida: 1 });
    } else {
      this.setState({ passValida: 0 });
    }
    if (pass === "1234") {
      this.props.logOut();
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

  abrirPopUp() {
    this.setState({ popUp: true });
  }

  cerrarPopUp() {
    this.setState({ popUp: false, popUpValidado: false });
  }

  getBorder(key) {
    switch (key) {
      case 0:
        return "1px solid red";
      default:
        return "";
    }
  }

  render() {
    let clasePass = { border: this.getBorder(this.state.passValida) };
    return (
      <div>
        <Helmet>
          <title>Perfil</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
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
          <h5>David Solanas Sanz</h5>
          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                float: "left",
                padding: "0 60px 0 0"
              }}
            >
              <img
                src={User_img}
                alt="Foto de perfil"
                width="160px"
                height="160px"
              />
            </div>
            <div>
              <div
                style={{
                  padding: "20px 20px 0px 0px",
                  float: "left"
                }}
              >
                <Link to="/editar-perfil" className="universidad">
                  <Button className="boton-filtro">Editar perfil</Button>
                </Link>
              </div>
              <div
                style={{
                  padding: "20px 20px 0px 0px"
                }}
              >
                <Link to="/subir-video" className="universidad">
                  <Button className="boton-filtro">Subir vídeo</Button>
                </Link>
              </div>
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
                <p>739999</p>
              </div>
              <div
                style={{
                  padding: "0px 20px 0px 0px"
                }}
              >
                <h6
                  style={{
                    float: "left",
                    padding: "0 20px 0 0"
                  }}
                >
                  <strong>Dirección de correo:</strong>
                </h6>
                <h6>davidsolanas@gmail.com</h6>
              </div>
            </div>
          </div>
          <CamposMostrar />
          <div
            style={{
              padding: "30px 20px 0px 0px"
            }}
          />
          <Popup
            open={this.state.popUp}
            onOpen={this.abrirPopUp}
            onClose={this.cerrarPopUp}
            trigger={
              <div
                style={{
                  padding: "20px 20px 0px 0px"
                }}
              >
                <div className="universidad">
                  <Button className="btn-danger">Borrar cuenta</Button>
                </div>
              </div>
            }
            modal={true}
          >
            <div className="popup">
              <div className="titulo">Confirmación borrado</div>
              <p style={{ textAlign: "justify", marginTop: "20px" }}>
                ¿Está seguro de que desea borrar la cuenta?
              </p>
              <p style={{ textAlign: "justify" }}>
                Todos los datos que haya almacenado en la aplicación serán
                borrados
              </p>
              <p style={{ textAlign: "justify" }}>
                Introduzca la contraseña de su cuenta para confirmar
              </p>
              <Form
                className="form"
                onSubmit={e => {
                  this.handleSubmit(e);
                }}
              >
                <Form.Group controlId="password">
                  <Form.Control
                    required
                    type="password"
                    ref={this.pass}
                    placeholder="Contraseña..."
                    style={clasePass}
                  />
                </Form.Group>
                <Button
                  className="btn-danger"
                  type="submit"
                  style={{ float: "left" }}
                >
                  Confirmar borrado
                </Button>
              </Form>
              <Button
                className="boton-filtro"
                style={{ float: "right" }}
                onClick={() => {
                  this.cerrarPopUp();
                }}
              >
                Cancelar
              </Button>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}

export default Perfil;
