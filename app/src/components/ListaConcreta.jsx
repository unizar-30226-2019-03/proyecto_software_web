import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVertical from "./ListaVertical";
import { Notificacion } from "./MisListas";
import Popup from "reactjs-popup";
import { RemoveAccents, putFavouritesFirst } from "../config/Process";
import { isSignedIn, getUserRole } from "../config/Auth";
import { getVideosFromReproductionList } from "../config/VideoAPI";
import {
  deleteVideoFromReproductionList,
  deleteReproductionList,
  getUserReproductionLists,
  addVideotoReproductionList
} from "../config/ReproductionListAPI";
import { LoadingSpinUniCast } from "./LoadingSpin";

class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: false,
      listaVideos: this.props.historial,
      listasRepro: this.props.listasRepro
    };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  /**
   * Asigna a listaVideos y a listasRepro, el historial y listasRepro
   * de nextProps
   * @param {*} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      listaVideos: nextProps.historial,
      listasRepro: nextProps.listasRepro
    });
  }

  /**
   * Pone popUp a true
   */
  abrirPopUp() {
    this.setState({ popUp: true });
  }

  /**
   * Pone popUp a false
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
                placeholder={"Buscar en la lista de reproducción"}
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
                  zIndex: "1000",
                  maxHeight: "300px",
                  overflow: "scroll",
                  padding: "16px 20px",
                  marginTop: "10px",
                  border: "0",
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
                    BORRAR LA LISTA COMPLETA
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
                placeholder={"Buscar en la lista de reproducción"}
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
                  zIndex: "1000",
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
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                    className="tit-prof"
                  >
                    BORRAR LA LISTA COMPLETA
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
                    Una vez eliminada la lista no habrá vuelta atrás. Se
                    borrarán tanto los vídeos como la lista.
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

class ListaConcreta extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      idLista: -1,
      nombreLista: "",
      contentMargin: "300px",
      fixed: window.innerWidth >= 970,
      busqueda: "",
      listasRepro: [],
      miLista: [],
      listaFiltrada: [],
      filtrado: false,
      notif: false,
      mensajeNotif: "",
      videoBorrado: {},
      tiempo: 0,
      timestamp: new Date(),
      page: 0,
      borradoCompleto: false,
      moreVideos: false,
      mostrarSpin: true
    };
    this.getData = this.getData.bind(this);
    this.getReproductionLists = this.getReproductionLists.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.borrarLista = this.borrarLista.bind(this);
    this.buscarEnLista = this.buscarEnLista.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.anyadirVideoALista = this.anyadirVideoALista.bind(this);
    this.borrarVideo = this.borrarVideo.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
  }

  getData(page) {
    const id =
      this.state.idLista === -1
        ? parseInt(this.props.location.search.split("&")[0].split("=")[1])
        : this.state.idLista;
    getVideosFromReproductionList(id, page, (data, now) => {
      if (this._isMounted) {
        const newState = this.state.miLista.slice().concat(data);
        this.setState({
          miLista: newState,
          page: page + 1,
          timestamp: now,
          moreVideos: data.length === 20,
          mostrarSpin: false
        });
      }
    });
  }

  /**
   * Obtiene las listas de reproducción del usuario, y si
   * _isMounted=true, coloca la lista de reproducción de
   * favoritos primero, y se la asigna a listasRepro.
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
   * Borra la lista de reproducción con id idLista. Si se ha realizado
   * correctamente pone borradoCompleto a true.
   */
  borrarLista() {
    //Borrar la lista en el servidor
    deleteReproductionList(this.state.idLista, ok => {
      if (ok) {
        this.setState({ borradoCompleto: true });
      }
    });
  }

  buscarEnLista(e) {
    e.preventDefault();
    this.setState({ busqueda: e.target.value });
    if (e.target.value === "") {
      this.setState({ listaFiltrada: [], filtrado: false });
    }
  }

  keyDown(e) {
    if (this.state.busqueda !== "") {
      if (e.keyCode === 13) {
        const palabras = this.state.busqueda.split(" ");
        var resultado = [];
        this.state.miLista.forEach(e => {
          for (let index = 0; index < palabras.length; index++) {
            const element = palabras[index];
            if (
              RemoveAccents(e.title)
                .toLowerCase()
                .includes(RemoveAccents(element).toLowerCase())
            ) {
              resultado.push(e);
              break;
            }
          }
        });
        this.setState({ listaFiltrada: resultado, filtrado: true });
      }
    }
  }

  anyadirVideoALista(idVideo, mensaje, idLista, anyadir, callback) {
    //Añadir o borrar de la lista lista, dependiendo del parametro anyadir
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
      const idActual = this.state.idLista;
      deleteVideoFromReproductionList(idLista, idVideo, ok => {
        if (ok) {
          if (idActual === idLista) {
            this.setState({
              notif: true,
              mensajeNotif: mensaje,
              listaFiltrada: [],
              miLista: [],
              busqueda: "",
              filtrado: false,
              page: 0
            });
            this.getData(0);
          } else {
            this.setState({
              notif: true,
              mensajeNotif: mensaje
            });
          }
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

  borrarVideo(idVideo, nombreVideo) {
    const idLista = this.state.idLista;
    deleteVideoFromReproductionList(idLista, parseInt(idVideo), ok => {
      if (ok) {
        this.setState({
          notif: true,
          mensajeNotif: `Vídeo ${nombreVideo.toUpperCase()} eliminado de ${this.state.nombreLista.toUpperCase()}`,
          listaFiltrada: [],
          miLista: [],
          busqueda: "",
          filtrado: false,
          page: 0
        });
        this.getData(0);
      }
    });
    this.iniciarReloj();
  }

  handleResize() {
    if (this.state.miLista.length > 0) {
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

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      if (this._isMounted) {
        this.setState({
          idLista: parseInt(
            this.props.location.search.split("&")[0].split("=")[1]
          ),
          nombreLista: this.props.location.search
            .split("&")[1]
            .split("=")[1]
            .replace(/%20/g, " ")
        });
      }
      this.getData(0);
      this.getReproductionLists();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }

  handleScroll() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    if (offset >= height && this.state.moreVideos) {
      this.getData(this.state.page);
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
            url: `/listas`
          }
        }}
      />
    ) : (
      <div>
        {this.state.borradoCompleto ? (
          <Redirect to="/listas" />
        ) : (
          <div>
            <Helmet>
              <title>{`${this.state.nombreLista} | UniCast`}</title>
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
                <div>
                  <h5 style={{ fontWeight: "bold" }}>
                    Lista de reproducción - {this.state.nombreLista}
                  </h5>
                </div>
              </div>{" "}
              {this.state.mostrarSpin ? (
                <LoadingSpinUniCast className="spin-ranking" />
              ) : this.state.miLista.length === 0 ? (
                <div
                  style={{
                    color: "#00000080",
                    padding: "10px",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                >
                  Lista vacía, añade vídeos a esta lista para agurparlos.
                </div>
              ) : (
                <Lista
                  fixed={this.state.fixed}
                  borrar={this.borrarLista}
                  handleChange={this.buscarEnLista}
                  keyDown={this.keyDown}
                  actualizarListas={this.getReproductionLists}
                  historial={
                    !this.state.filtrado
                      ? this.state.miLista
                      : this.state.listaFiltrada
                  }
                  busqueda={this.state.busqueda}
                  borrarVideo={this.borrarVideo}
                  anyadirVideoALista={this.anyadirVideoALista}
                  listasRepro={this.state.listasRepro}
                />
              )}
            </div>
            <Notificacion
              mostrar={this.state.notif}
              mensaje={this.state.mensajeNotif}
              deshacer={false}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ListaConcreta;
