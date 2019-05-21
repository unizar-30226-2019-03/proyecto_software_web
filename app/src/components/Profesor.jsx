import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import User_img from "../assets/user.png";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import icono from "../assets/favicon.ico";
import { isSignedIn } from "../config/Auth";
import {
  getUser,
  getUniversityOfUser,
  getDegreeOfUser,
  getSubjectsUniAsProfessor
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
        <br />
      </div>
    );
  }
  render() {
    return !isSignedIn() ? (
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

class AsignaturasProf extends Component {
  renderSubject(subject) {
    const foto =
      subject.university === undefined ? "" : subject.university.photo;
    return (
      <div style={{ marginBottom: "10px" }}>
        {console.log(subject)}
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
          {this.props.sub.forEach(subject => {
            this.renderSubject(subject);
          })}
        </div>
      </div>
    );
  }
}

class Profesor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMargin: "300px",
      prof: "",
      sub: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getUniFromUser = this.getUniFromUser.bind(this);
    this.getDegreeFromUser = this.getDegreeFromUser.bind(this);
    this.saveSubjects = this.saveSubjects.bind(this);
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

  componentWillMount() {
    getUser(this.props.match.params.id, data => {
      this.setState({ prof: data });
      this.getUniFromUser(Number.parseInt(data.id));
      this.getDegreeFromUser(data.id);
      getSubjectsUniAsProfessor(data.id, this.saveSubjects);
    });
  }
  getUniFromUser(id) {
    getUniversityOfUser(id, data => {
      this.setState({ uni: data });
    });
  }
  getDegreeFromUser(id) {
    getDegreeOfUser(id, data => {
      this.setState({ degree: data });
    });
  }
  saveSubjects(data) {
    this.setState({ sub: data });
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
    const correo =
      this.state.prof.correo === undefined ? "" : this.state.prof.correo;
    const descr =
      this.state.prof.description === undefined
        ? ""
        : this.state.prof.description;
    const uni = this.state.uni === undefined ? "" : this.state.uni;
    const degree = this.state.degree === undefined ? "" : this.state.degree;
    return (
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
              <div>
                <Link
                  to={`/chat/${this.props.match.params.id}`}
                  className="universidad"
                >
                  <Button className="boton-filtro">Enviar un mensaje</Button>
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
                <p>{user_nom}</p>
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
                <h6>{correo}</h6>
              </div>
            </div>
          </div>
          <br />
          <CamposMostrar description={descr} uni={uni} degree={degree} />
          <AsignaturasProf sub={this.state.sub} />
        </div>
      </div>
    );
  }
}

export default Profesor;
