import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserID } from "../config/Auth";
import Popup from "reactjs-popup";
import IconoAsignaturaUniversidad from "./IconoAsignaturaUniversidad";
import { getTime } from "../config/Process";
import {
  getTimePassed,
  getScore,
  getVideosFromUploader,
  deleteVideo
} from "../config/VideoAPI";
import { getUser } from "../config/UserAPI";
import { getSubjectById } from "../config/SubjectAPI";
import { FaEllipsisV } from "react-icons/fa";

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
    getSubjectById(parseInt(this.props.subject.id), data => {
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
        <div className="menu-item" style={{ position: "relative" }}>
          {this.state.mostrarOpciones ? (
            <div
              style={{
                fontSize: "12px",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.7)",
                textDecoration: "none",
                width: "fit-content",
                height: "fit-content",
                position: "absolute",
                right: "8px",
                top: "4px",
                borderRadius: "3px",
                zIndex: "100",
                cursor: "pointer"
              }}
            >
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="bottom left"
                arrow={false}
                contentStyle={{
                  width: "120px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "10px 10px",
                  border: "0",
                  marginTop: "10px",
                  zIndex: "1000",
                  boxShadow:
                    "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                }}
                trigger={<FaEllipsisV color={"white"} />}
              >
                <div
                  className="popup-borrar-video"
                  onClick={() => {
                    this.cerrarPopUp();
                    this.props.borrarVideo(parseInt(this.props.id));
                  }}
                >
                  BORRAR VÍDEO
                </div>
              </Popup>
            </div>
          ) : null}
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
                  this.state.asig.id === undefined ? "" : this.state.asig.id
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
const Menu = (list, now, borrarVideo) =>
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
        borrarVideo={borrarVideo}
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
    this.borrarVideo = this.borrarVideo.bind(this);
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

  borrarVideo(id) {
    deleteVideo(id, ok => {
      if (ok) {
        getVideosFromUploader(0, (videos, time) => {
          this.setState({
            listaVideos: videos,
            timestampNow: time
          });
        });
      } else {
        alert("No se ha podido borrar el vídeo " + id);
      }
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
                  {Menu(
                    this.state.listaVideos,
                    this.state.timestampNow,
                    this.borrarVideo
                  )}
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
