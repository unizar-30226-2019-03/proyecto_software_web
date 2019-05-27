import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
import {
  getUser,
  getUniversityOfUser,
  getDegreeOfUser
} from "../config/UserAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

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
      pass: "",
      passValida: -1,
      user: {},
      uni: {},
      degree: {},
      mostrarSpin: true
    };
    this.pass = React.createRef();
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        this.setState({ degree: data, mostrarSpin: false });
      }
    });
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
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
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
          <title>Perfil | UniCast</title>
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
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Perfil;
