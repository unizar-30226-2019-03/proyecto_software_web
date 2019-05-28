/**
 * @fileoverview Fichero BarraNavegacion.jsx donde se encuentra la clase
 * que renderiza la barra de navegación de la aplicación, y la clase Notificacion
 * que renderiza una notificación recibida de nuevo mensaje o vídeo
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ./Video.jsx:Video
 * @requires ../../node_modules/react-icons/fa/FaShareAlt.js:FaShareAlt
 * @requires ../../node_modules/react-icons/fa/FaRegBookmark.js:FaRegBookmark
 * @requires ../../node_modules/react-icons/fa/FaRegStar.js:FaRegStar
 * @requires ../../node_modules/react-icons/fa/FaStar.js:FaStar
 * @requires ../../node_modules/react-icons/fa/FaStarHalf.js:FaStarHalf
 * @requires ../config/Process.jsx:getTime
 * @requires ../config/Process.jsx:putFavouritesFirst
 * @requires ../../node_modules/reactjs-popup/reactjs-popup.js:Popup
 * @requires ../../node_modules/react-star-rating-component/dist/react-star-rating-component.js:StarRatingComponent
 * @requires ./ListaVertical.jsx:ContenidoPopUp
 * @requires ./MisListas.jsx:Notificacion
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserID
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/VideoAPI.jsx:generadorColores
 * @requires ../config/VideoAPI.jsx:scrollFunc
 * @requires ../config/VideoAPI.jsx:getTimePassed
 * @requires ../config/VideoAPI.jsx:getVideo
 * @requires ../config/CommentsAPI.jsx:getCommentsByVideo
 * @requires ../config/CommentsAPI.jsx:addComment
 * @requires ../config/UserAPI.jsx:getUser
 * @requires ../config/UserAPI.jsx:getSubjectsOfUser
 * @requires ../config/SubjectAPI.jsx:SubscribeSubject
 * @requires ../config/SubjectAPI.jsx:UnsubscribeSubject
 * @requires ../config/SubjectAPI.jsx:getProfessorsFromSubject
 * @requires ../config/DisplayAPI.jsx:updateDisplay
 * @requires ../config/DisplayAPI.jsx:getVideoDisplay
 * @requires ../config/VoteAPI.jsx:addVote
 * @requires ../config/ReproductionListAPI.jsx:getUserReproductionLists
 * @requires ../config/ReproductionListAPI.jsx:addVideotoReproductionList
 * @requires ../config/ReproductionListAPI.jsx:deleteVideoFromReproductionList
 * @requires ../../node_modules/react-share/es/FacebookShareButton.js:FacebookShareButton
 * @requires ../../node_modules/react-share/es/FacebookIcon.js:FacebookIcon
 * @requires ../../node_modules/react-share/es/LinkedinShareButton.js:LinkedinShareButton
 * @requires ../../node_modules/react-share/es/LinkedinIcon.js:LinkedinIcon
 * @requires ../../node_modules/react-share/es/PinterestShareButton.js:PinterestShareButton
 * @requires ../../node_modules/react-share/es/PinterestIcon.js:PinterestIcon
 * @requires ../../node_modules/react-share/es/RedditShareButton.js:RedditShareButton
 * @requires ../../node_modules/react-share/es/RedditIcon.js:RedditIcon
 * @requires ../../node_modules/react-share/es/TwitterShareButton.js:TwitterShareButton
 * @requires ../../node_modules/react-share/es/TwitterIcon.js:TwitterIcon
 * @requires ../../node_modules/react-share/es/EmailShareButton.js:EmailShareButton
 * @requires ../../node_modules/react-share/es/EmailIcon.js:EmailIcon
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

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
  getVideo
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
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Renderiza las cinco estrellas para realizar la votación de un vídeo.
 * @param {Object} param0 Propiedades del componente
 * @param {String} param0.nombre Nombre del parámetro a votar
 * @param {Number} param0.puntuacion Puntuación dada por el usuario
 * @param {Function} param0.onStarClick Función a ejecutar trás pulsar una estrella
 * @param {Number} param0.size Tamaño de las estrellas a mostrar
 */
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

/**
 * Renderiza la información relativa a un profesor para la pantalla de ViendoVídeo
 * @param {Object} param0 Propiedades del componente
 * @param {Object} param0.user Profesor asociado
 */
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

/**
 * Renderiza todos los profesores de una asignatura.
 * @param {Array.<Object>} list Lista de profesores de una asignatura
 */
const ListaProfesores = list =>
  list.map(el => {
    return <Profesor user={el} key={el.id} />;
  });

/**
 * Clase que gestiona la pantalla de ver un vídeo de
 * una asignatura.
 * @extends Component
 */
class ViendoVideo extends Component {
  /**
   * Construye el componente ViendoVideo
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
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
      university: {},
      video: {},
      timeNow: null,
      page: 0,
      siguiendoAsig: false,
      tiempoInicial: 0,
      profesores: [],
      mostrarSpinIcono: true,
      mostrarSpinProfesores: true
    };
    this.getData = this.getData.bind(this);
    this.getReproductionLists = this.getReproductionLists.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
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

  /**
   * Obtiene el usuario que visualiza el vídeo,
   * el vídeo a visualizar, los profesores asociados
   * a la asignatura del vídeo y por último
   * los comentarios que se han hecho en el vídeo
   */
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
                  asig: video.subject,
                  university: video.university,
                  timeNow: time,
                  tiempoInicial: 0,
                  mostrarSpinIcono: false
                });
              } else {
                this.setState({
                  video: video,
                  asig: video.subject,
                  university: video.university,
                  timeNow: time,
                  tiempoInicial: data.secsFromBeg,
                  mostrarSpinIcono: false
                });
              }
            }
          } else {
            this.setState({
              video: video,
              timeNow: time,
              asig: video.subject,
              university: video.university,
              tiempoInicial: 0,
              mostrarSpinIcono: false
            });
          }
        });
      }
      this.obtenerAsignaturaUni(video.subject);
      this.obtenerComentarios(video, this.state.page);
    });
  }

  /**
   * Obtiene las listas de reproducción de un usuario y
   * coloca en primera posición la lista Favoritos.
   */
  getReproductionLists() {
    getUserReproductionLists(data => {
      if (this._isMounted) {
        const sortedData = putFavouritesFirst(data);
        this.setState({ listasRepro: sortedData });
      }
    });
  }
  /**
   * Para cada comentario cuyo tiempo esta entre tiempoInicio y tiempoFin,
   * si no esta incluido en la lista lista, lo añade.
   * @param {Number} tiempoInicio Marca temporal límite por abajo
   * @param {Number} tiempoFin Marca temporal límite por arriba
   * @param {Array.<Object>} lista Lista de comentarios
   *
   * @returns {Array.<Object>} Lista con los nuevos comentarios
   */
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

  /**
   * Hace scroll hasta la posición del último comentario en
   * la casilla de comentarios en vivo
   */
  irAUltimoComentario() {
    if (!this.state.fijarComentarios) {
      var elmnt = document.getElementById(
        `comment${this.state.comentarios.length - 1}`
      );
      if (elmnt !== null) {
        scrollFunc(elmnt);
      }
    }
  }

  /**
   * Actualiza la altura y anchura de los comentarios en vivo
   * según aumenta o disminuye el tamaño de la pantalla
   */
  handleResize() {
    const altura =
      document.getElementById("div-comentarios").clientHeight -
      document.getElementById("cabecera-comentarios").clientHeight -
      document.getElementById("zona-escribir-comentarios").clientHeight -
      10;

    this.setState({
      alturaComentarios: altura,
      anchuraComentarios: document.getElementById("div-comentarios").clientWidth
    });
  }

  /**
   * Recibe el estado actual del vídeo, actualiza los comentarios
   * según el tiempo transcurrido, envía tiempo actual de visualización
   * al servidor para futura sincronización y registrar la visualización y
   * actualiza el tamaño de los comentarios en vivo.
   * @param {Object} estado Estado actual del vídeo
   * @param {Number} estado.currentTime Tiempo actual transcurrido desde el inicio
   */
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

    if (currentTime > this.state.tiempoVideo) {
      updateDisplay(this.state.video.id, currentTime);
    }
    const altura =
      document.getElementById("div-comentarios").clientHeight -
      document.getElementById("cabecera-comentarios").clientHeight -
      document.getElementById("zona-escribir-comentarios").clientHeight -
      10;

    this.setState({
      comentarios: nuevosComentarios,
      tiempoVideo: currentTime,
      alturaComentarios: altura,
      anchuraComentarios: document.getElementById("div-comentarios").clientWidth
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

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
      this.getReproductionLists();
    }
  }
  /**
   * Obtiene los comentarios de la página solicitada del video
   * @param {Object} video Vídeo a visualizar
   * @param {Number} page Número de página a recuperar
   */
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
  /**
   * Obtiene los profesores de la asignatura y comprueba si el usuario
   * sigue o no a la asignatura asociada al vídeo.
   * @param {Object} video Vídeo a visualizar
   */
  obtenerAsignaturaUni(asig) {
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
        this.setState({
          siguiendoAsig: found === undefined ? false : true,
          mostrarSpinProfesores: false
        });
      }
    });
  }

  /**
   * Ajusta el contenido a la barra lateral
   * @param {Boolean} display Determina si desplazar contenido o no
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "320px" });
    } else {
      this.setState({ contentMargin: "15%" });
    }
  }

  /**
   * Si se hace scroll hasta el último comentario los comentarios
   * no se fijan, si el usuario hace scroll para ver un comentario
   * éstos se quedan fijos.
   * @param {Event} e Evento que devuelve el div de comentarios
   */
  handleScroll(e) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
    this.setState({ fijarComentarios: !bottom });
  }

  /**
   * Cuando se haya pulsado enter, si el nuevo comentario no es vacío,
   * añade el nuevo comentario al vídeo con la marca temporal correspondiente
   * @param {Event} e Evento que devuelve el formulario
   */
  comentar(e) {
    const comentario = this.comentario.current.value;
    if (comentario.length > 0) {
      if (e.keyCode === 13) {
        var nuevosComentarios = this.state.comentarios.slice();
        const usuario = this.state.user.username;
        const tiempo = this.state.tiempoVideo;
        const color = generadorColores(usuario);
        nuevosComentarios.push({ tiempo, comentario, usuario, color });
        this.comentario.current.value = "";
        this.setState({
          comentarios: nuevosComentarios,
          fijarComentarios: false
        });
        addComment(comentario, tiempo, this.state.video.id);
        e.preventDefault();
      }
    }
  }
  /**
   * Si anyadir=true, añade el video al lsita lista; en caso contrario, lo borra. Además
   * muestra una notificación informando de la operación realizada.
   * @param {Number} idLista ID de la lista de reproducción
   * @param {String} mensaje Mensaje a mostrar en el popup informativo
   * @param {Boolean} anyadir True si añadir a la lista, false si borrar de la lista
   * @param {Function} callback Función a ejecutar para mostrar el feedback
   */
  guardarVideo(idLista, mensaje, anyadir, callback) {
    const idVideo = this.state.video.id;
    if (anyadir) {
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
  /**
   * Resetea el reloj y lo inicializa para ejecutar la función
   * ViendoVideo.tick() una vez por segundo.
   */
  iniciarReloj() {
    this.pararReloj();
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  /**
   * Detiene la ejecución del reloj
   */
  pararReloj() {
    clearInterval(this.timerID);
  }
  /**
   * Suma un tick y si han pasado 3 ticks (3 segundos)
   * quita la notificación de pantalla.
   */
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
    window.removeEventListener("resize", this.handleResize);
  }

  /**
   * Actualiza la valoración de claridad indicada por el usuario
   * @param {Number} nextValue Valor entre 0 y 5 correspondiente a la claridad
   * @param {Number} prevValue Valor anterior de claridad
   * @param {String} name Nombre del parámetro a puntuar
   * @param {Event} e Evento que devuelve el formulario
   */
  onStarClickClaridad(nextValue, prevValue, name, e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    this.setState({ claridad: nextValue });
  }

  /**
   * Actualiza la valoración de calidad indicada por el usuario
   * @param {Number} nextValue Valor entre 0 y 5 correspondiente a la calidad
   * @param {Number} prevValue Valor anterior de calidad
   * @param {String} name Nombre del parámetro a puntuar
   * @param {Event} e Evento que devuelve el formulario
   */
  onStarClickCalidad(nextValue, prevValue, name, e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    this.setState({ calidad: nextValue });
  }

  /**
   * Actualiza la valoración de adecuación indicada por el usuario
   * @param {Number} nextValue Valor entre 0 y 5 correspondiente a la adecuación
   * @param {Number} prevValue Valor anterior de adecuación
   * @param {String} name Nombre del parámetro a puntuar
   * @param {Event} e Evento que devuelve el formulario
   */
  onStarClickAdecuacion(nextValue, prevValue, name, e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }
    this.setState({ adecuacion: nextValue });
  }
  /**
   * Añade la puntuación de claridad, calidad y adecuación actual a los votos
   * e informa al usuario de ello con una notificación. Si se produce algún error
   * muestra un mensaje informando de ello.
   */
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
            mensajeNotif: "Error, intente votar el vídeo en otro momento"
          });
        }
        this.iniciarReloj();
      }
    );
  }
  /**
   * Si el usuario no seguía la asignatura, relaciona el usuario
   * con la asignatura y se informa de ello.
   * Si el usuario ya seguía la asignatura, elimina la relación
   * del usuario con la asignatura y se informa de ello.
   */
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
          <title>{`${this.state.video.title} | UniCast`}</title>
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
                {this.state.mostrarSpinIcono ? (
                  <LoadingSpinUniCast className="nombre-canal" />
                ) : (
                  <div>
                    <Link to={`/asig/${this.state.asig.id}`}>
                      <img
                        src={this.state.university.photo}
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
                  </div>
                )}
                {this.state.mostrarSpinProfesores ? (
                  <div style={{ marginRight: "0", marginLeft: "auto" }}>
                    <LoadingSpinUniCast />
                  </div>
                ) : (
                  <Button className="boton-seguir" onClick={this.seguirAsig}>
                    {this.state.siguiendoAsig
                      ? "DEJAR DE SEGUIR"
                      : "SEGUIR ASIGNATURA"}
                  </Button>
                )}
              </div>
              <div style={{ marginLeft: "48px" }}>
                <p style={{ fontSize: "15px" }}>
                  {this.state.video.description}
                </p>
              </div>
              {this.state.mostrarSpinProfesores ? (
                <LoadingSpinUniCast className="spin-ranking" />
              ) : (
                <div style={{ marginLeft: "48px" }}>
                  <p style={{ fontWeight: "550" }}>
                    Profesores de la asignatura
                  </p>
                  <div style={{ display: "flex" }}>
                    {ListaProfesores(this.state.profesores)}
                  </div>
                </div>
              )}
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
              {this.state.comentarios.map((e, index) => {
                const { tiempo, comentario, usuario, color } = e;
                return (
                  <div
                    key={`comment${index}`}
                    id={`comment${index}`}
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
