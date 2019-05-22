import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button, Form } from "react-bootstrap";
import Popup from "reactjs-popup";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
import {
  getUser,
  getUniversityOfUser,
  getDegreeOfUser
} from "../config/UserAPI";

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
            <h6 style={{ textAlign: "justify" }}>{this.props.description}</h6>
          </div>
        </div>
        <br />
        {this.renderCampo("Universidad:", this.props.uni)}
        {this.renderCampo("Grado:", this.props.degree)}
      </div>
    );
  }
}

class Perfil extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      popUp: false,
      popUpValidado: false,
      pass: "",
      passValida: -1,
      user: {},
      uni: {},
      degree: {}
    };
    this.pass = React.createRef();
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
    this.getUniFromUser = this.getUniFromUser.bind(this);
    this.getDegreeFromUser = this.getDegreeFromUser.bind(this);
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

  getData() {
    getUser(getUserID(), data => {
      if (this._isMounted) {
        this.setState({ user: data });
      }
      this.getUniFromUser(data.id);
      this.getDegreeFromUser(data.id);
    });
  }

  getUniFromUser(id) {
    getUniversityOfUser(id, data => {
      if (this._isMounted) {
        this.setState({ uni: data });
      }
    });
  }

  getDegreeFromUser(id) {
    getDegreeOfUser(id, data => {
      if (this._isMounted) {
        this.setState({ degree: data });
      }
    });
  }

  handleSubmit(event) {
    //const pass = this.pass.current.value;
    event.preventDefault();
    //Comprobar contraseña con la BD y si es correcto borrar
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

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Perfil</title>
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
          <h5>{`${this.state.user.name} ${this.state.user.surnames}`}</h5>
          <div>
            <div style={{ marginTop: "40px" }}>
              <div
                style={{
                  float: "left",
                  padding: "0 60px 0 0"
                }}
              >
                <img
                  src={this.state.user.photo}
                  alt="Foto de perfil"
                  width="160px"
                  height="160px"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div>
                <div
                  style={{
                    padding: "20px 20px 0px 0px",
                    float: "left",
                    marginBottom: "10px"
                  }}
                >
                  <Link to="/editar-perfil" className="universidad">
                    <Button className="boton-filtro">Editar perfil</Button>
                  </Link>
                </div>
                {this.state.user.role === "ROLE_PROFESSOR" ? (
                  <div
                    style={{
                      padding: "20px 20px 0px 0px"
                    }}
                  >
                    <Link to="/subir-video" className="universidad">
                      <Button className="boton-filtro">Subir vídeo</Button>
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "20px 20px 0px 0px",
                      visibility: "hidden"
                    }}
                  >
                    a
                  </div>
                )}

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
                  <p>{this.state.user.username}</p>
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
                  <h6>{this.state.user.email}</h6>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "80px" }}>
            <CamposMostrar
              description={this.state.user.description}
              uni={this.state.uni.name}
              degree={this.state.degree.name}
            />
          </div>
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
            contentStyle={{ padding: "15px" }}
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
                    style={{
                      border: this.state.passValida !== 0 ? "" : "1px solid red"
                    }}
                  />
                </Form.Group>
                <Button
                  className="btn-danger"
                  type="submit"
                  style={{ float: "right" }}
                >
                  Confirmar borrado
                </Button>
              </Form>
              <Button
                className="boton-filtro"
                style={{ float: "left" }}
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
