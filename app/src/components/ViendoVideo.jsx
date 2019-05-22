import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import Video from "./Video";
import {
  FaShareAlt,
  FaRegBookmark,
  FaRegStar,
  FaStar,
  FaStarHalf
} from "react-icons/fa";
import { getTime, putFavouritesFirst } from "../config/Process";
import Popup from "reactjs-popup";
import StarRatingComponent from "react-star-rating-component";
import { ContenidoPopUp } from "./ListaVertical";
import { Notificacion } from "./MisListas";
import { isSignedIn, getUserID, getUserRole } from "../config/Auth";
import {
  generadorColores,
  scrollFunc,
  getTimePassed,
  getVideo,
  getVideoSubject
} from "../config/VideoAPI";
import { getCommentsByVideo, addComment } from "../config/CommentsAPI";
import { getUser, getSubjectsOfUser } from "../config/UserAPI";
import {
  SubscribeSubject,
  UnsubscribeSubject,
  getProfessorsFromSubject
} from "../config/SubjectAPI";
import { updateDisplay, getVideoDisplay } from "../config/DisplayAPI";
import { addVote } from "../config/VoteAPI";
import {
  getUserReproductionLists,
  addVideotoReproductionList,
  deleteVideoFromReproductionList
} from "../config/ReproductionListAPI";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

const StarRating = ({ nombre, puntuacion, onStarClick, size }) => {
  return (
    <StarRatingComponent
      name={nombre}
      starCount={5}
      value={puntuacion}
      onStarClick={onStarClick}
      renderStarIcon={() => {
        return (
          <span>
            <FaStar size={size} />
          </span>
        );
      }}
      renderStarIconHalf={() => {
        return (
          <span>
            <span style={{ position: "absolute", zIndex: "-1" }}>
              <FaStar size={size} />
            </span>
            <span>
              <FaStarHalf size={size} color={"#ffb400"} />
            </span>
          </span>
        );
      }}
    />
  );
};

const Profesor = ({ user }) => {
  return (
    <div style={{ marginRight: "20px", textAlign: "center" }}>
      <Link
        to={`/profesor/${user.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img
          src={user.photo}
          alt="profesor"
          width="40"
          height="40"
          style={{ borderRadius: "50%" }}
        />
        <p>{user.username}</p>
      </Link>
    </div>
  );
};

const ListaProfesores = list =>
  list.map(el => {
    return <Profesor user={el} key={el.id} />;
  });

class ViendoVideo extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "15%",
      user: {},
      totalComentarios: [],
      listasRepro: [],
      obtenerNuevosComentarios: false,
      obteniendoComentarios: false,
      comentarios: [],
      fijarComentarios: false,
      alturaComentarios: 0,
      anchuraComentarios: 0,
      tiempoVideo: 0,
      notif: false,
      mensajeNotif: "",
      tiempoNotif: 0,
      popUpGuardar: false,
      popUpPuntuar: false,
      popUpCompartir: false,
      calidad: 2.5,
      adecuacion: 2.5,
      claridad: 2.5,
      asig: {},
      video: {},
      timeNow: null,
      page: 0,
      siguiendoAsig: false,
      tiempoInicial: 0,
      profesores: []
    };
    this.getData = this.getData.bind(this);
    this.getReproductionLists = this.getReproductionLists.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.recogerComentarios = this.recogerComentarios.bind(this);
    this.recibirEstadoVideo = this.recibirEstadoVideo.bind(this);
    this.irAUltimoComentario = this.irAUltimoComentario.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.comentar = this.comentar.bind(this);
    this.guardarVideo = this.guardarVideo.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
    this.onStarClickAdecuacion = this.onStarClickAdecuacion.bind(this);
    this.onStarClickCalidad = this.onStarClickCalidad.bind(this);
    this.onStarClickClaridad = this.onStarClickClaridad.bind(this);
    this.puntuar = this.puntuar.bind(this);
    this.obtenerComentarios = this.obtenerComentarios.bind(this);
    this.obtenerAsignaturaUni = this.obtenerAsignaturaUni.bind(this);
    this.seguirAsig = this.seguirAsig.bind(this);
    this.comentario = React.createRef();
  }

  getData() {
    getUser(getUserID(), user => {
      if (this._isMounted) {
        this.setState({ user: user });
      }
    });
    const id = this.props.location.search.split("=")[1];
    getVideo(parseInt(id), (video, time) => {
      if (this._isMounted) {
        getVideoDisplay(video.id, data => {
          if (data !== false) {
            if (this._isMounted) {
              if (data.secsFromBeg >= video.seconds - 1) {
                this.setState({
                  video: video,
                  timeNow: time,
                  tiempoInicial: 0
                });
              } else {
                this.setState({
                  video: video,
                  timeNow: time,
                  tiempoInicial: data.secsFromBeg
                });
              }
            }
          } else {
            this.setState({
              video: video,
              timeNow: time,
              tiempoInicial: 0
            });
          }
        });
      }
      this.obtenerAsignaturaUni(video);
      this.obtenerComentarios(video, this.state.page);
    });
  }

  getReproductionLists() {
    getUserReproductionLists(data => {
      if (this._isMounted) {
        const sortedData = putFavouritesFirst(data);
        this.setState({ listasRepro: sortedData });
      }
    });
  }

  recogerComentarios(tiempoInicio, tiempoFin, lista) {
    const res = this.state.totalComentarios.filter(
      com => com.tiempo >= tiempoInicio && com.tiempo <= tiempoFin
    );
    res.forEach(e => {
      if (!lista.includes(e)) {
        lista.push(e);
      }
    });
    return lista;
  }

  irAUltimoComentario() {
    if (!this.state.fijarComentarios) {
      const e = this.state.comentarios[this.state.comentarios.length - 1];
      if (e !== undefined) {
        var elmnt = document.getElementById(e.usuario + e.tiempo);
        if (elmnt !== null) {
          scrollFunc(elmnt);
        }
      }
    }
  }

  recibirEstadoVideo(estado) {
    var nuevosComentarios = this.state.comentarios.slice();
    const ultimoComentario = nuevosComentarios[nuevosComentarios.length - 1];
    const currentTime = Math.floor(estado.currentTime);
    if (ultimoComentario === undefined) {
      nuevosComentarios = this.recogerComentarios(
        0,
        currentTime,
        nuevosComentarios
      );
    } else {
      nuevosComentarios = this.recogerComentarios(
        ultimoComentario.tiempo,
        currentTime,
        nuevosComentarios
      );
    }
    const altura =
      document.getElementById("div-comentarios").clientHeight -
      document.getElementById("cabecera-comentarios").clientHeight -
      document.getElementById("zona-escribir-comentarios").clientHeight -
      10;
    if (currentTime > this.state.tiempoVideo) {
      updateDisplay(this.state.video.id, currentTime);
    }
    this.setState({
      comentarios: nuevosComentarios,
      alturaComentarios: altura,
      anchuraComentarios: document.getElementById("div-comentarios")
        .clientWidth,
      tiempoVideo: currentTime
    });
  }

  componentDidUpdate() {
    if (
      this.state.obtenerNuevosComentarios &&
      !this.state.obteniendoComentarios
    ) {
      this.setState({ obteniendoComentarios: true });
      this.obtenerComentarios(this.state.video, this.state.page + 1);
    }
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
      this.getReproductionLists();
    }
  }

  obtenerComentarios(video, page) {
    getCommentsByVideo(video.id, page, comentarios => {
      let obtenerMas = false;
      if (comentarios.length === 20) {
        obtenerMas = true;
      }
      if (this._isMounted) {
        this.setState({
          totalComentarios: [...this.state.totalComentarios, ...comentarios],
          page: page,
          obtenerNuevosComentarios: obtenerMas,
          obteniendoComentarios: false
        });
      }
    });
  }

  obtenerAsignaturaUni(video) {
    getVideoSubject(video.id, asig => {
      if (this._isMounted) {
        this.setState({ asig: asig });
      }
      getProfessorsFromSubject(asig.id, data => {
        if (this._isMounted) {
          this.setState({ profesores: data });
        }
      });
      getSubjectsOfUser(getUserID(), subjects => {
        const found = subjects.find(s => {
          return s.id === asig.id;
        });
        //Si no la ha encontrado -> No sigue la asignatura
        if (this._isMounted) {
          this.setState({ siguiendoAsig: found === undefined ? false : true });
        }
      });
    });
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "320px" });
    } else {
      this.setState({ contentMargin: "15%" });
    }
  }

  handleScroll(e) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
    if (bottom) {
      this.setState({ fijarComentarios: false });
    } else {
      this.setState({ fijarComentarios: true });
    }
  }

  comentar(e) {
    const comentario = this.comentario.current.value;
    if (comentario.length > 0) {
      if (e.keyCode === 13) {
        //Enviar comentario
        var nuevosComentarios = this.state.comentarios.slice();
        const usuario = this.state.user.username;
        const tiempo = this.state.tiempoVideo;
        const color = generadorColores(usuario);
        nuevosComentarios.push({ tiempo, comentario, usuario, color });
        this.comentario.current.value = "";
        this.setState({ comentarios: nuevosComentarios });
        // Subir comentario al servidor
        addComment(comentario, tiempo, this.state.video.id);
        e.preventDefault();
      }
    }
  }

  guardarVideo(idLista, mensaje, anyadir, callback) {
    const idVideo = this.state.video.id;
    if (anyadir) {
      //Añadir el video
      addVideotoReproductionList(idLista, idVideo, ok => {
        if (ok) {
          this.setState({
            notif: true,
            mensajeNotif: mensaje
          });
          callback(true);
        } else {
          this.setState({
            notif: true,
            mensajeNotif: "No se ha podido añadir a la lista"
          });
          callback(false);
        }
      });
    } else {
      //Borrar el video
      deleteVideoFromReproductionList(idLista, idVideo, ok => {
        if (ok) {
          this.setState({
            notif: true,
            mensajeNotif: mensaje
          });
          callback(true);
        } else {
          this.setState({
            notif: true,
            mensajeNotif: "No se ha podido borrar de la lista"
          });
          callback(false);
        }
      });
    }
    this.iniciarReloj();
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

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
  }

  onStarClickClaridad(nextValue, prevValue, name, e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    this.setState({ claridad: nextValue });
  }

  onStarClickCalidad(nextValue, prevValue, name, e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    this.setState({ calidad: nextValue });
  }

  onStarClickAdecuacion(nextValue, prevValue, name, e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    this.setState({ adecuacion: nextValue });
  }

  puntuar() {
    addVote(
      this.state.video.id,
      this.state.adecuacion,
      this.state.claridad,
      this.state.calidad,
      exito => {
        if (exito) {
          this.setState({ notif: true, mensajeNotif: "Voto registrado!" });
        } else {
          this.setState({
            notif: true,
            mensajeNotif: "Ya has votado este vídeo"
          });
        }
        this.iniciarReloj();
      }
    );
  }

  seguirAsig() {
    !this.state.siguiendoAsig
      ? SubscribeSubject(this.state.asig.id, ok => {
          if (ok) {
            this.setState({
              siguiendoAsig: !this.state.siguiendoAsig,
              notif: true,
              mensajeNotif: `Siguiendo a ${this.state.asig.name}`
            });
            this.iniciarReloj();
          }
        })
      : UnsubscribeSubject(this.state.asig.id, ok => {
          if (ok) {
            this.setState({
              siguiendoAsig: !this.state.siguiendoAsig,
              notif: true,
              mensajeNotif: `Dejando de seguir a ${this.state.asig.name}`
            });
            this.iniciarReloj();
          }
        });
  }

  render() {
    const photo =
      this.state.asig.university === undefined
        ? ""
        : this.state.asig.university.photo;
    const currentUrl = window.location.href;
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/video?id=${this.props.location.search.split("=")[1]}`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>UniCast | Vídeo</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          displaySide={false}
          hide={true}
        />
        <div
          className="transform"
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "70px",
            display: "flex"
          }}
        >
          <div className="reproductor">
            <Video
              src={this.state.video.url}
              thumbnailUrl={this.state.video.thumbnailUrl}
              enviarEstado={this.recibirEstadoVideo}
              time={this.state.tiempoInicial}
            />
            <div className="datos-video">
              <p className="titulo-video">{this.state.video.title}</p>
              <div style={{ display: "flex" }}>
                <p className="fecha-subida-video">
                  Subido hace{" "}
                  {getTimePassed(
                    this.state.video.timestamp,
                    this.state.timeNow
                  )}
                </p>
                <div
                  style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "0",
                    top: "-5px"
                  }}
                >
                  <Popup
                    open={this.state.popUpPuntuar}
                    onOpen={() =>
                      this.setState({
                        popUpPuntuar: true,
                        popUpGuardar: false,
                        popUpCompartir: false
                      })
                    }
                    onClose={() => this.setState({ popUpPuntuar: false })}
                    arrow={false}
                    position="top left"
                    contentStyle={{
                      width: "250px",
                      zIndex: "1000",
                      maxHeight: "300px",
                      overflow: "scroll",
                      padding: "16px 20px",
                      border: "0",
                      marginTop: "10px",
                      boxShadow:
                        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                    }}
                    trigger={
                      <div
                        style={{
                          color: "black",
                          textDecoration: "none",
                          float: "left",
                          cursor: "pointer",
                          marginRight: "20px"
                        }}
                      >
                        <p
                          style={{
                            marginRight: "5px",
                            float: "left",
                            color: "#00000080",
                            fontWeight: "500",
                            fontSize: "18px"
                          }}
                        >
                          Valorar
                        </p>
                        <FaRegStar size={30} color={"#00000080"} />
                      </div>
                    }
                  >
                    <div>
                      <div
                        style={{
                          borderBottom: "1px solid lightgrey",
                          fontWeight: "450"
                        }}
                      >
                        Puntuar vídeo...
                      </div>
                      <div
                        style={{
                          paddingTop: "15px",
                          fontSize: "14px",
                          borderBottom: "1px solid lightgrey"
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              marginTop: "2px",
                              marginRight: "10px",
                              fontWeight: "500"
                            }}
                          >
                            Claridad:
                          </div>
                          <div style={{ marginLeft: "auto", marginRight: "0" }}>
                            <StarRating
                              nombre="claridad"
                              puntuacion={this.state.claridad}
                              onStarClick={this.onStarClickClaridad}
                              size={20}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              marginTop: "2px",
                              marginRight: "10px",
                              fontWeight: "500"
                            }}
                          >
                            Calidad:
                          </div>
                          <div style={{ marginLeft: "auto", marginRight: "0" }}>
                            <StarRating
                              nombre="calidad"
                              puntuacion={this.state.calidad}
                              onStarClick={this.onStarClickCalidad}
                              size={20}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              marginTop: "2px",
                              marginRight: "10px",
                              fontWeight: "500"
                            }}
                          >
                            Adecuación:
                          </div>
                          <div style={{ marginLeft: "auto", marginRight: "0" }}>
                            <StarRating
                              nombre="adecuacion"
                              puntuacion={this.state.adecuacion}
                              onStarClick={this.onStarClickAdecuacion}
                              size={20}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          paddingTop: "15px",
                          fontSize: "14px",
                          cursor: "pointer",
                          float: "right",
                          color: "#235da9"
                        }}
                        onClick={() => {
                          this.puntuar();
                          this.setState({ popUpPuntuar: false });
                        }}
                      >
                        Puntuar
                      </div>
                    </div>
                  </Popup>
                  <Popup
                    open={this.state.popUpCompartir}
                    onOpen={() =>
                      this.setState({
                        popUpCompartir: true,
                        popUpGuardar: false,
                        popUpPuntuar: false
                      })
                    }
                    onClose={() => this.setState({ popUpCompartir: false })}
                    arrow={false}
                    position="top left"
                    contentStyle={{
                      width: "270px",
                      zIndex: "1000",
                      maxHeight: "300px",
                      overflow: "scroll",
                      padding: "16px 20px",
                      border: "0",
                      marginTop: "10px",
                      boxShadow:
                        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                    }}
                    trigger={
                      <FaShareAlt
                        size={30}
                        color={"#00000080"}
                        style={{ marginRight: "20px", cursor: "pointer" }}
                      />
                    }
                  >
                    <div>
                      <div
                        style={{
                          borderBottom: "1px solid lightgrey",
                          marginBottom: "10px"
                        }}
                      >
                        Compartir
                      </div>
                      <div className="share-container">
                        <div className="share">
                          <FacebookShareButton
                            url={currentUrl}
                            quote={"Vídeo Unicast: " + this.state.video.title}
                            className="share-button"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <div className="share-name">Facebook</div>
                        </div>
                        <div className="share">
                          <TwitterShareButton
                            url={currentUrl}
                            title={"Vídeo Unicast: " + this.state.video.title}
                            className="share-button"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <div className="share-name">Twitter</div>
                        </div>
                        <div className="share">
                          <LinkedinShareButton
                            url={currentUrl}
                            className="share-button"
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                          <div className="share-name">Linkedin</div>
                        </div>
                        <div className="share">
                          <PinterestShareButton
                            url={currentUrl}
                            media={
                              this.state.video.thumbnailUrl === undefined
                                ? ""
                                : this.state.video.thumbnailUrl
                            }
                            description={
                              "Vídeo Unicast: " + this.state.video.title
                            }
                            className="share-button"
                          >
                            <PinterestIcon size={32} round />
                          </PinterestShareButton>
                          <div className="share-name">Pinterest</div>
                        </div>
                        <div className="share">
                          <RedditShareButton
                            url={currentUrl}
                            title={"Vídeo Unicast: " + this.state.video.title}
                            className="share-button"
                          >
                            <RedditIcon size={32} round />
                          </RedditShareButton>
                          <div className="share-name">Reddit</div>
                        </div>
                        <div className="share">
                          <EmailShareButton
                            url={currentUrl}
                            subject={"Vídeo Unicast: " + this.state.video.title}
                            body={"Mira este vídeo!\n"}
                            className="share-button"
                          >
                            <EmailIcon size={32} round />
                            <div className="share-name">Email</div>
                          </EmailShareButton>
                        </div>
                      </div>
                    </div>
                  </Popup>
                  <Popup
                    open={this.state.popUpGuardar}
                    onOpen={() =>
                      this.setState({
                        popUpGuardar: true,
                        popUpCompartir: false,
                        popUpPuntuar: false
                      })
                    }
                    onClose={() => this.setState({ popUpGuardar: false })}
                    arrow={false}
                    position="top left"
                    contentStyle={{
                      width: "250px",
                      zIndex: "1000",
                      maxHeight: "300px",
                      overflow: "scroll",
                      padding: "16px 20px",
                      border: "0",
                      marginTop: "10px",
                      boxShadow:
                        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                    }}
                    trigger={
                      <FaRegBookmark
                        size={30}
                        color={"#00000080"}
                        style={{ cursor: "pointer" }}
                      />
                    }
                  >
                    <ContenidoPopUp
                      video={this.state.video.title}
                      videoId={this.state.video.id}
                      listaRepro={this.state.listasRepro}
                      enviarPadre={this.guardarVideo}
                      actualizarListas={this.getReproductionLists}
                    />
                  </Popup>
                </div>
              </div>
            </div>
            <div className="datos-video">
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <Link to={`/asig/${this.state.asig.id}`}>
                  <img
                    src={photo}
                    style={{ borderRadius: "50%" }}
                    height="40"
                    width="40"
                    alt="Canal"
                  />
                </Link>
                <Link
                  className="nombre-canal"
                  to={`/asig/${this.state.asig.id}`}
                >
                  {this.state.asig.name}
                </Link>
                <Button className="boton-seguir" onClick={this.seguirAsig}>
                  {this.state.siguiendoAsig
                    ? "DEJAR DE SEGUIR"
                    : "SEGUIR ASIGNATURA"}
                </Button>
              </div>
              <div style={{ marginLeft: "48px" }}>
                <p style={{ fontSize: "15px" }}>
                  {this.state.video.description}
                </p>
              </div>
              <div style={{ marginLeft: "48px" }}>
                <p style={{ fontWeight: "550" }}>Profesores de la asignatura</p>
                <div style={{ display: "flex" }}>
                  {ListaProfesores(this.state.profesores)}
                </div>
              </div>
            </div>
          </div>
          <div
            className="coment"
            id={"div-comentarios"}
            style={{
              flex: "30%",
              margin: "0px 30px",
              borderRadius: "3px",
              border: "1px solid lightgrey",
              height: "0",
              paddingBottom: "51.25%"
            }}
          >
            <div
              id="cabecera-comentarios"
              style={{
                borderBottom: "1px solid lightgrey",
                fontSize: "16px",
                padding: "10px 20px",
                fontWeight: "500"
              }}
            >
              Comentarios en vivo
            </div>
            <div
              className="comentarios"
              style={{
                padding: "20px 20px 0",
                overflowY: "scroll",
                maxWidth: `${this.state.anchuraComentarios}px`,
                maxHeight: `${this.state.alturaComentarios}px`,
                fontSize: "14px"
              }}
              onScroll={this.handleScroll}
            >
              {this.state.comentarios.map(e => {
                const { tiempo, comentario, usuario, color } = e;
                return (
                  <div
                    key={usuario + tiempo}
                    id={usuario + tiempo}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      width: "100%"
                    }}
                  >
                    <div
                      style={{
                        flex: "10%",
                        marginRight: "5px"
                      }}
                    >
                      <span style={{ fontSize: "12px" }}>
                        {getTime(tiempo)}
                      </span>
                    </div>
                    <div
                      style={{
                        flex: "90%",
                        overflowWrap: "break-word",
                        width: "10%"
                      }}
                    >
                      <span
                        style={{
                          marginRight: "5px",
                          color: color,
                          fontWeight: "bold"
                        }}
                      >
                        {usuario}:
                      </span>
                      <span>{comentario}</span>
                    </div>
                  </div>
                );
              })}
              {this.irAUltimoComentario()}
            </div>
            <div id="zona-escribir-comentarios" className="escribir-coment">
              <div
                style={{
                  height: "100%",
                  padding: "10px 20px"
                }}
              >
                <textarea
                  onKeyDown={this.comentar}
                  ref={this.comentario}
                  style={{
                    border: "0",
                    width: "100%",
                    fontSize: "14px",
                    resize: "none",
                    outline: "none"
                  }}
                  placeholder={`Publicar comentario en ${getTime(
                    this.state.tiempoVideo
                  )}`}
                />
              </div>
            </div>
          </div>
        </div>
        <Notificacion
          mostrar={this.state.notif}
          mensaje={this.state.mensajeNotif}
          deshacer={false}
        />
      </div>
    );
  }
}

export default ViendoVideo;
