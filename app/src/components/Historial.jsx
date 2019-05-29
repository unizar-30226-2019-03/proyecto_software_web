/**
 * @fileoverview Fichero Historial.jsx donde se encuentra la clase
 * que renderiza la pantalla del historial de reproducciones de un
 * usuario concreto.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../../node_modules/reactjs-popup/reactjs-popup.js:Popup
 * @requires ./MisListas.jsx:Notificacion
 * @requires ../config/Process.jsx:RemoveAccents
 * @requires ../config/Process.jsx:putFavouritesFirst
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/DisplayAPI.jsx:getDisplaysByUser
 * @requires ../config/DisplayAPI.jsx:deleteVideoFromDisplay
 * @requires ./ListaVertical.jsx:ListaVertical
 * @requires ../config/ReproductionListAPI.jsx:addVideotoReproductionList
 * @requires ../config/ReproductionListAPI.jsx:deleteVideoFromReproductionList
 * @requires ../config/ReproductionListAPI.jsx:getUserReproductionLists
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import { Notificacion } from "./MisListas";
import { RemoveAccents, putFavouritesFirst } from "../config/Process";
import { isSignedIn, getUserRole } from "../config/Auth";
import {
  getDisplaysByUser,
  deleteVideoFromDisplay
} from "../config/DisplayAPI";
import ListaVertical from "./ListaVertical";
import {
  addVideotoReproductionList,
  deleteVideoFromReproductionList,
  getUserReproductionLists
} from "../config/ReproductionListAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Clase que gestiona el historial de reproducciones de
 * un usuario.
 * @extends Component
 */
class HistorialLista extends Component {
  /**
   * Construye el componente HistorialLista
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.listasRepro Listas de reproducción de un usuario
   * @param {Array.<Object>} props.historial Lista de vídeos visualizados por un usuario
   */
  constructor(props) {
    super(props);
    this.state = {
      popUp: false,
      listasRepro: props.listasRepro,
      listaVideos: props.historial.map(e => {
        return e.video;
      })
    };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listaVideos: nextProps.historial.map(e => {
        return e.video;
      }),
      listasRepro: nextProps.listasRepro
    });
  }

  /**
   * Abre el pop-up para borrar el historial completo.
   */
  abrirPopUp() {
    this.setState({ popUp: true });
  }

  /**
   * Cierra el pop-up para borrar el historial completo.
   */
  cerrarPopUp() {
    this.setState({ popUp: false });
  }

  render() {
    return (
      <div>
        {!this.props.fixed ? (
          <div style={{ display: "block", marginRight: "70px" }}>
            <div className="profesores-asignatura">
              <input
                onChange={this.props.handleChange}
                onKeyDown={this.props.keyDown}
                defaultValue={this.props.busqueda}
                style={{
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  backgroundColor: "#fafafa",
                  borderWidth: "0px 0px 1px 0px",
                  borderColor: "lightgrey",
                  width: "calc(100% - 67%)",
                  color: "#00000080",
                  outline: "none"
                }}
                placeholder={"Buscar en el historial de reproducción"}
              />
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="bottom left"
                arrow={false}
                contentStyle={{
                  width: "250px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  marginTop: "10px",
                  border: "0",
                  zIndex: "1000",
                  boxShadow:
                    "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                }}
                trigger={
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      width: "fit-content"
                    }}
                    className="tit-prof"
                  >
                    BORRAR TODO EL HISTORIAL
                  </div>
                }
              >
                <div style={{ padding: "5px 10px" }}>
                  <div
                    style={{
                      fontWeight: "550",
                      fontSize: "16px",
                      borderBottom: "1px solid lightgrey"
                    }}
                  >
                    ¿Estás seguro?
                  </div>
                  <div style={{ fontSize: "13px", paddingTop: "10px" }}>
                    Una vez eliminada no habrá vuelta atrás.
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                      width: "fit-content",
                      height: "fit-content",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      this.cerrarPopUp();
                      this.props.borrar();
                    }}
                  >
                    Sí, eliminar
                  </div>
                </div>
              </Popup>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "25px"
                }}
              >
                <ListaVertical
                  lista={this.state.listaVideos}
                  anyadirALista={this.props.anyadirVideoALista}
                  borrar={this.props.borrarVideo}
                  listaRepro={this.state.listasRepro}
                  actualizarListas={this.props.actualizarListas}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", marginRight: "70px" }}>
            <div style={{ paddingRight: "300px" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "25px"
                  }}
                >
                  <ListaVertical
                    lista={this.state.listaVideos}
                    anyadirALista={this.props.anyadirVideoALista}
                    borrar={this.props.borrarVideo}
                    listaRepro={this.state.listasRepro}
                    actualizarListas={this.props.actualizarListas}
                  />
                </div>
              </div>
            </div>
            <div
              className="profesores-asignatura"
              style={{ position: "fixed", right: "70px" }}
            >
              <input
                onChange={this.props.handleChange}
                onKeyDown={this.props.keyDown}
                defaultValue={this.props.busqueda}
                style={{
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  backgroundColor: "#fafafa",
                  borderWidth: "0px 0px 1px 0px",
                  borderColor: "lightgrey",
                  width: "100%",
                  color: "#00000080",
                  outline: "none"
                }}
                placeholder={"Buscar en el historial de reproducción"}
              />
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                repositionOnResize
                position="bottom center"
                arrow={false}
                contentStyle={{
                  width: "250px",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  border: "0",
                  marginTop: "10px",
                  zIndex: "1000",
                  boxShadow:
                    "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)"
                }}
                trigger={
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                    className="tit-prof"
                  >
                    BORRAR TODO EL HISTORIAL
                  </div>
                }
              >
                <div style={{ padding: "5px 10px" }}>
                  <div
                    style={{
                      fontWeight: "550",
                      fontSize: "16px",
                      borderBottom: "1px solid lightgrey"
                    }}
                  >
                    ¿Estás seguro?
                  </div>
                  <div style={{ fontSize: "13px", paddingTop: "10px" }}>
                    Una vez eliminada no habrá vuelta atrás.
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                      width: "fit-content",
                      height: "fit-content",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      this.cerrarPopUp();
                      this.props.borrar();
                    }}
                  >
                    Sí, eliminar
                  </div>
                </div>
              </Popup>
            </div>
          </div>
        )}
      </div>
    );
  }
}

/**
 * Clase que gestiona la pantalla del historial de
 * reproducciones de un usuario.
 * @extends Component
 */
class Historial extends Component {
  /**
   * Construye el componente Historial
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      fixed: window.innerWidth >= 970,
      busqueda: "",
      miHistorial: [],
      historialFiltrado: [],
      listasRepro: [],
      filtrado: false,
      notif: false,
      mensajeNotif: "",
      tiempo: 0,
      page: 0,
      moreVideos: false,
      mostrarSpin: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.borrarHistorial = this.borrarHistorial.bind(this);
    this.buscarHistorial = this.buscarHistorial.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.borrarVideo = this.borrarVideo.bind(this);
    this.anyadirVideoALista = this.anyadirVideoALista.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
    this.getHistorial = this.getHistorial.bind(this);
    this.getReproductionLists = this.getReproductionLists.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getHistorial(0);
      this.getReproductionLists();
    }
  }

  /**
   * Obtiene una lista con 20 vídeos reproducidos por el usuario.
   * @param {Number} page Página de vídeos a obtener
   */
  getHistorial(page) {
    getDisplaysByUser(page, data => {
      if (this._isMounted) {
        const newState = this.state.miHistorial
          .slice()
          .concat(data._embedded.displays);
        this.setState({
          page: page + 1,
          miHistorial: newState,
          moreVideos: data._embedded.displays.length === 20,
          mostrarSpin: false
        });
      }
    });
  }

  /**
   * Obtiene las listas de reproducción que un usuario
   * tiene.
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
   * Borra por completo el historial de reproducciones.
   */
  borrarHistorial() {
    this.state.miHistorial.map(elmnt => {
      deleteVideoFromDisplay(parseInt(elmnt.video.id), ok => {
        if (ok) {
          this.setState({
            historialFiltrado: [],
            busqueda: "",
            filtrado: false,
            page: 0
          });
        }
      });
      return null;
    });
    this.setState({
      miHistorial: [],
      notif: true,
      mensajeNotif: "Historial completo borrado"
    });
    this.iniciarReloj();
  }

  /**
   * Actualiza el valor de búsqueda introducido por el usuario
   * @param {Event} e Evento que devuelve el formulario
   */
  buscarHistorial(e) {
    e.preventDefault();
    this.setState({ busqueda: e.target.value });
    if (e.target.value === "") {
      this.setState({ historialFiltrado: [], filtrado: false });
    }
  }

  /**
   * Cuando se haya pulsado enter, se filtran los vídeos del historial
   * según la búsqueda realizada por el usuario.
   * @param {Event} e Evento que devuelve el formulario
   */
  keyDown(e) {
    if (this.state.busqueda !== "") {
      if (e.keyCode === 13) {
        const palabras = this.state.busqueda.split(" ");
        var resultado = [];
        this.state.miHistorial.forEach(e => {
          const video = e.video;
          for (let index = 0; index < palabras.length; index++) {
            const element = palabras[index];
            if (
              RemoveAccents(video.title)
                .toLowerCase()
                .includes(RemoveAccents(element).toLowerCase())
            ) {
              resultado.push({ video });
              break;
            }
          }
        });
        this.setState({ historialFiltrado: resultado, filtrado: true });
      }
    }
  }

  /**
   * Añade o quita el video seleccionado a la lista de videos elegida
   * por el usuario.
   * @param {Number} idVideo Id del video a añadir o quitar
   * @param {String} mensaje Mensaje de notificación al añadir
   * @param {Number} idLista Id de la lista de videos a la que añadir o quitar el video nombreVideo
   * @param {Boolean} anyadir Si es true añade, si es false quita a la lista
   * @param {Function} callback Función a ejecutar tras añadir/quitar el vídeo a la lista
   */
  anyadirVideoALista(idVideo, mensaje, idLista, anyadir, callback) {
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
   * Elimina el video seleccionado del historial.
   * @param {Number} idVideo id del video a eliminar
   * @param {String} nombreVideo nombre del video a eliminar
   */
  borrarVideo(idVideo, nombreVideo) {
    deleteVideoFromDisplay(parseInt(idVideo), ok => {
      if (ok) {
        this.setState({
          notif: true,
          mensajeNotif: `Vídeo ${nombreVideo.toUpperCase()} eliminado del historial`,
          historialFiltrado: [],
          busqueda: "",
          filtrado: false,
          miHistorial: [],
          page: 0
        });
        this.getHistorial(0);
      }
    });
    this.iniciarReloj();
  }

  /**
   * Ajusta el contenido del historial al tamaño actual
   * de la pantalla.
   */
  handleResize() {
    if (this.state.miHistorial.length > 0) {
      if (window.innerWidth <= 970) {
        this.setState({ fixed: false });
      } else {
        this.setState({ fixed: true });
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Controla el scroll del usuario para cargar más
   * vídeos del historial si el usuario hace scroll
   * hasta el final de la lista de vídeos.
   */
  handleScroll() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    if (offset >= height && this.state.moreVideos) {
      this.getHistorial(this.state.page);
    }
  }

  /**
   * Ajusta el contenido a la barra lateral.
   * @param {Boolean} display Determina si desplazar contenido o no
   */
  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }

  /**
   * Resetea el reloj y lo inicializa para ejecutar la función
   * Historial.tick() una vez por segundo.
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
    let t = this.state.tiempo;
    if (t === 3) {
      t = -1;
      this.pararReloj();
      this.setState({ notif: false });
    }
    this.setState({ tiempo: t + 1 });
  }

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/historial`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Historial | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={"historial"}
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
            <div>
              <h5 style={{ fontWeight: "bold" }}>
                Historial de reproducciones
              </h5>
            </div>
          </div>{" "}
          {this.state.mostrarSpin ? (
            <LoadingSpinUniCast className="spin-ranking" />
          ) : this.state.miHistorial.length === 0 ? (
            <div
              style={{
                color: "#00000080",
                padding: "10px",
                fontSize: "14px",
                textAlign: "center"
              }}
            >
              Historial vacío, conforme visualices vídeos se irán guardando
              aquí.
            </div>
          ) : (
            <HistorialLista
              fixed={this.state.fixed}
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              historial={
                !this.state.filtrado
                  ? this.state.miHistorial
                  : this.state.historialFiltrado
              }
              listasRepro={this.state.listasRepro}
              busqueda={this.state.busqueda}
              borrarVideo={this.borrarVideo}
              anyadirVideoALista={this.anyadirVideoALista}
              actualizarListas={this.getReproductionLists}
            />
          )}
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

export default Historial;
