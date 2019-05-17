import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserID } from "../config/Auth";

import IconoAsignaturaUniversidad from "./IconoAsignaturaUniversidad";
import { getTime } from "../config/Process";
import {
  getTimePassed,
  getScore,
  getVideosFromUploader
} from "../config/Video";
import VideoApi from "swagger_unicast/dist/api/VideoApi";
import { getUser } from "../config/User";
import { findSubjectByName } from "../config/Subject";

// One item component
// selected prop will be passed
class MiVideoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asig: {},
      mostrarOpciones: false,
      popUp: false,
      mostrarNotif: false,
      mensaje: ""
    };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  abrirPopUp() {
    this.setState({ popUp: true });
  }

  cerrarPopUp() {
    this.setState({ popUp: false, mostrarOpciones: false });
  }

  componentWillMount() {
    findSubjectByName(this.props.subject.name, data => {
      this.setState({ asig: data });
    });
  }

  render() {
    return (
      <div
        onMouseEnter={() => {
          this.setState({ mostrarOpciones: true });
        }}
        onMouseLeave={() => {
          this.setState({ mostrarOpciones: false });
          this.cerrarPopUp();
        }}
      >
        <div className="menu-item">
          <Link to={`/video/${this.props.id}`} style={{ position: "relative" }}>
            <img
              src={this.props.img}
              width="210"
              height="118"
              alt={this.props.title}
            />
            <div
              style={{
                color: "white",
                fontSize: "12px",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.7)",
                textDecoration: "none",
                width: "fit-content",
                height: "fit-content",
                position: "absolute",
                right: "4px",
                top: "49px",
                borderRadius: "3px",
                zIndex: "100"
              }}
            >
              {this.props.duracion}
            </div>
            {this.props.showRating ? (
              <div
                style={{
                  color: this.props.rating >= 50 ? "#228B22" : "#DC143C",
                  fontSize: "12px",
                  textAlign: "center",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  textDecoration: "none",
                  width: "40px",
                  height: "fit-content",
                  position: "absolute",
                  left: "4px",
                  top: "49px",
                  borderRadius: "3px",
                  zIndex: "100"
                }}
              >
                {this.props.rating + "%"}
              </div>
            ) : null}
          </Link>
          <div style={{ height: "32px" }}>
            <div style={{ float: "left", marginTop: "5px" }}>
              <Link
                to={`/asig/${
                  this.state.asig.name === undefined ? "" : this.state.asig.name
                }`}
                style={{ textDecoration: "none" }}
              >
                <IconoAsignaturaUniversidad
                  name={
                    this.state.asig.abbreviation === undefined
                      ? ""
                      : this.state.asig.abbreviation
                  }
                  image={
                    this.state.asig.university === undefined
                      ? ""
                      : this.state.asig.university.photo
                  }
                />
              </Link>
            </div>
            <div
              style={{
                marginLeft: "75px",
                height: "32px",
                lineHeight: "normal"
              }}
            >
              {" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflowWrap: "break-word",
                  fontWeight: "bold"
                }}
                to={`/video/${this.props.id}`}
              >
                {this.props.title}
              </Link>
            </div>
          </div>
          <div
            className="fecha-subida"
            style={{ marginLeft: "0", marginTop: "2px" }}
          >
            Subido hace {this.props.timestamp}
          </div>
        </div>
      </div>
    );
  }
}

// All items component
// Important! add unique key
const Menu = (list, now) =>
  list.map(el => {
    const { title, url, id, thumbnailUrl, score, timestamp, seconds } = el;

    return (
      <MiVideoItem
        title={title}
        id={id}
        url={url}
        key={title}
        img={thumbnailUrl}
        canal={title}
        duracion={getTime(seconds)}
        rating={getScore(score)}
        timestamp={getTimePassed(timestamp, now)}
        showRating={score === null ? false : true}
        subject={el.subject}
      />
    );
  });

class MisVideos extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      listaVideos: [],
      timestampNow: null,
      user: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.videoApi = new VideoApi();
  }

  componentWillMount() {
    getVideosFromUploader(0, (videos, time) => {
      this.setState({
        listaVideos: videos,
        timestampNow: time
      });
    });
    getUser(getUserID(), data => {
      this.setState({ user: data });
    });
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Asignatura</title>
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
          <div className="cabecera-asignatura">
            <div className="titulo-asignatura">
              <img
                src={this.state.user.photo}
                alt="icono asignatura"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="60"
                height="60"
              />
              Vídeos subidos
            </div>
            <div className="universidad">
              <Link to="/subir-video">
                <Button
                  style={{
                    backgroundColor: "#235da9",
                    borderColor: "#235da9"
                  }}
                >
                  Subir nuevo vídeo
                </Button>
              </Link>
            </div>
          </div>
          <div style={{ marginRight: "70px" }}>
            <div>
              <div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {Menu(this.state.listaVideos, this.state.timestampNow)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MisVideos;
