import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
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
import { FaEllipsisV } from "react-icons/fa";
import { Notificacion } from "./MisListas";

// One item component
// selected prop will be passed
class MiVideoItem extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      mostrarOpciones: false,
      popUp: false,
      mostrarNotif: false,
      mensaje: ""
    };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  abrirPopUp() {
    if (this._isMounted) {
      this.setState({ popUp: true });
    }
  }

  cerrarPopUp() {
    if (this._isMounted) {
      this.setState({ popUp: false, mostrarOpciones: false });
    }
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
          <Link
            to={`/video?id=${this.props.id}`}
            style={{ position: "relative" }}
          >
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
                  this.props.subject.id === undefined
                    ? ""
                    : this.props.subject.id
                }`}
                style={{ textDecoration: "none" }}
              >
                <IconoAsignaturaUniversidad
                  name={
                    this.props.subject.abbreviation === undefined
                      ? ""
                      : this.props.subject.abbreviation
                  }
                  image={
                    this.props.university === undefined
                      ? ""
                      : this.props.university.photo
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
                to={`/video?id=${this.props.id}`}
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
        university={el.university}
        borrarVideo={borrarVideo}
      />
    );
  });

class MisVideos extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      listaVideos: [],
      timestampNow: null,
      user: {},
      notif: false,
      mensajeNotif: "",
      tiempoNotif: 0,
      page: 0,
      moreVideos: false
    };
    this.getData = this.getData.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.borrarVideo = this.borrarVideo.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  getData() {
    getVideosFromUploader(0, (videos, time) => {
      if (this._isMounted) {
        this.setState({
          listaVideos: videos,
          timestampNow: time,
          page: 1,
          moreVideos: videos.length === 20
        });
      }
    });
    getUser(getUserID(), data => {
      if (this._isMounted) {
        this.setState({ user: data });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    if (offset >= height && this.state.moreVideos) {
      this.loadMoreVideos(this.state.page);
    }
  }

  loadMoreVideos(page) {
    getVideosFromUploader(page, (videos, time) => {
      if (this._isMounted) {
        this.setState({
          listaVideos: [...this.state.listaVideos, ...videos],
          page: page + 1,
          moreVideos: videos.length === 20
        });
      }
    });
  }

  borrarVideo(id) {
    deleteVideo(id, ok => {
      if (ok) {
        getVideosFromUploader(0, (videos, time) => {
          this.setState({
            listaVideos: videos,
            timestampNow: time,
            notif: true,
            mensajeNotif: "Vídeo borrado con éxito"
          });
        });
      } else {
        this.setState({
          notif: true,
          mensajeNotif:
            "No se ha podido borrar el vídeo, inténtelo más adelante"
        });
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

  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
  }

  tick() {
    let t = this.state.tiempoNotif;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempoNotif: t + 1 });
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
          <title>Mis Vídeos | UniCast</title>
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
                {this.state.listaVideos.length === 0 ? (
                  <div
                    style={{
                      color: "#00000080",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "left"
                    }}
                  >
                    Actualmente no has subido ningún vídeo, conforme subas
                    vídeos se irán guardando aquí.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {Menu(
                      this.state.listaVideos,
                      this.state.timestampNow,
                      this.borrarVideo
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Notificacion
            mostrar={this.state.notif}
            mensaje={this.state.mensajeNotif}
            deshacer={false}
          />
        </div>
      </div>
    );
  }
}

export default MisVideos;
