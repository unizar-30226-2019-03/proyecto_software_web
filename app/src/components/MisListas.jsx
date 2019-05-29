/**
 * @fileoverview Fichero MisListas.jsx donde se encuentra la clase
 * que renderiza la pantalla de las listas de reproducción de un
 * usuario.
 *
 * @author UniCast
 *
 * @requires ./BarraNavegacion.jsx:BarraNavegacion
 * @requires ../node_modules/react-helmet/es/Helmet.js:Helmet
 * @requires ./ListaHorizontal.jsx:ListaHorizontal
 * @requires ../../node_modules/react-icons/fa/FaPlus.js:FaPlus
 * @requires ../../node_modules/react-icons/fa/FaRegTrashAlt.js:FaRegTrashAlt
 * @requires ../../node_modules/react-icons/fa/FaStar.js:FaStar
 * @requires ../../node_modules/reactjs-popup/reactjs-popup.js:Popup
 * @requires ../../node_modules/react-bootstrap/Form.js:Form
 * @requires ../../node_modules/react-bootstrap/Button.js:Button
 * @requires ../node_modules/react-router-dom/Redirect.js:Redirect
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../config/Auth.jsx:isSignedIn
 * @requires ../config/Auth.jsx:getUserRole
 * @requires ../config/ReproductionListAPI.jsx:getUserReproductionLists
 * @requires ../config/ReproductionListAPI.jsx:addVideotoReproductionList
 * @requires ../config/ReproductionListAPI.jsx:deleteVideoFromReproductionList
 * @requires ../config/VideoAPI.jsx:getVideosFromReproductionList
 * @requires ../config/Process.jsx:putFavouritesFirst
 * @requires ./LoadingSpin.jsx:LoadingSpinUniCast
 */

import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaHorizontal from "./ListaHorizontal";
import { FaPlus, FaRegTrashAlt, FaStar } from "react-icons/fa";
import Popup from "reactjs-popup";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserRole } from "../config/Auth";
import {
  getUserReproductionLists,
  addReproductionList,
  deleteReproductionList
} from "../config/ReproductionListAPI";
import { getVideosFromReproductionList } from "../config/VideoAPI";
import { putFavouritesFirst } from "../config/Process";
import { LoadingSpinUniCast } from "./LoadingSpin";

/**
 * Renderiza el componente de una notificación
 * @param {Object} param0 Propiedades del componente
 * @param {Boolean} param0.mostrar Determina si mostrar o no la notificación
 * @param {String} param0.mensaje Mensaje a mostrar en la notificación
 * @param {Function} param0.handleClick Función a ejecutar tras pulsar DESHACER
 * @param {Boolean} param0.deshacer Determina si una operación se puede deshacer o no
 */
export const Notificacion = ({ mostrar, mensaje, handleClick, deshacer }) => {
  return (
    <div
      className={mostrar ? "visible" : "hidden"}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        backgroundColor: "#323232",
        color: "white",
        borderRadius: "3px",
        zIndex: "1000"
      }}
    >
      <div
        style={{
          padding: "8px 24px",
          fontSize: "14px",
          fontWeight: "300"
        }}
      >
        {mensaje}
        {deshacer ? (
          <Button
            variant="link"
            style={{
              textDecoration: "none",
              fontWeight: "400",
              fontSize: "14px",
              marginTop: "-4px",
              padding: "5px"
            }}
            onClick={handleClick}
          >
            DESHACER
          </Button>
        ) : null}
      </div>
    </div>
  );
};

/**
 * Clase que gestiona una lista de reproducción de un usuario.
 * @extends Component
 */
class Lista extends Component {
  /**
   * Construye el componente Lista
   */
  constructor() {
    super();
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      lista: {},
      videos: [],
      timeNow: new Date(),
      popUp: false
    };
    this.abrirPopUp = this.abrirPopUp.bind(this);

    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  /**
   * Obtiene los primeros 20 vídeos de una lista de reproducción
   * @param {Array.<Object>} list Lista de reproducción
   */
  getData(list) {
    getVideosFromReproductionList(list.id, 0, (data, now) => {
      this.props.loadACK();
      if (this._isMounted) {
        this.setState({
          lista: list,
          videos: data,
          timeNow: now
        });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData(this.props.list);
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ lista: newProps.list });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Abre el pop-up para borrar la lista de reproducción.
   */
  abrirPopUp() {
    this.setState({ popUp: true });
  }

  /**
   * Cierra el pop-up para borrar la lista de reproducción.
   */
  cerrarPopUp() {
    this.setState({ popUp: false });
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", width: "93.45%" }}>
          <div style={{ display: "flex" }}>
            {this.state.lista.name === "Favoritos" ? (
              <FaStar
                color={"rgb(212, 175, 55)"}
                style={{ marginRight: "5px" }}
              />
            ) : null}
            <h6>
              <Link
                to={`/lista?id=${this.state.lista.id}&name=${
                  this.state.lista.name
                }`}
                style={{ color: "black", textDecoration: "none" }}
              >
                {this.state.lista.name}
              </Link>
            </h6>
          </div>
          <div
            style={{
              marginLeft: "10px",
              marginTop: "-5px"
            }}
          >
            {" "}
            {this.state.lista.name === "Favoritos" ? null : (
              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                arrow={false}
                position={"bottom left"}
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
                repositionOnResize
                trigger={
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
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
                      this.props.borrar(this.state.lista);
                    }}
                  >
                    Sí, eliminar
                  </div>
                </div>
              </Popup>
            )}
          </div>
          {this.state.videos.length === 0 ? null : (
            <div style={{ marginRight: "0", marginLeft: "auto" }}>
              <Link
                to={`/lista?id=${this.state.lista.id}&name=${
                  this.state.lista.name
                }`}
                style={{ color: "#00000080", textDecoration: "none" }}
              >
                Ver todos los vídeos
              </Link>
            </div>
          )}
        </div>
        {this.state.videos.length === 0 ? (
          <div
            style={{
              width: "93.45%",
              marginTop: "10px",
              fontSize: "13px",
              color: "#00000080",
              marginBottom: "50px",
              borderBottom: "1px solid lightgrey"
            }}
          >
            <p style={{ width: "50%" }}>
              Actualmente no hay vídeos guardados en esta lista, conforme
              guardes los vídeos se mostrarán aquí.
            </p>
          </div>
        ) : (
          <ListaHorizontal list={this.state.videos} now={this.state.timeNow} />
        )}
      </div>
    );
  }
}

/**
 * Clase que gestiona la pantalla de las listas de
 * reproducción de un usuario.
 * @extends Component
 */
class MisListas extends Component {
  /**
   * Construye el componente MisListas
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
      popUp: false,
      notif: false,
      mensajeNotif: "",
      tiempo: 0,
      misListas: [],
      listaCreada: null,
      deshacer: true,
      mostrarSpin: true,
      numListas: 0,
      listasCargadas: 0
    };
    this.nombreLista = React.createRef();
    this.getData = this.getData.bind(this);
    this.crearLista = this.crearLista.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ackLista = this.ackLista.bind(this);
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
    this.deshacer = this.deshacer.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
    this.borrarLista = this.borrarLista.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.pararReloj();
  }

  /**
   * Obtiene las listas de reproducción de un usuario y coloca
   * la lista de favoritos en primer lugar.
   */
  getData() {
    getUserReproductionLists(data => {
      if (this._isMounted) {
        const sortedData = putFavouritesFirst(data);
        this.setState({
          misListas: sortedData,
          numListas: sortedData.length
        });
      }
    });
  }

  /**
   * Una vez se han cargado todas las listas con sus vídeos,
   * se quita de pantalla el spin de carga y se muestran las
   * listas de reproducción del usuario.
   */
  ackLista() {
    const numACK = this.state.listasCargadas + 1;
    if (numACK === this.state.numListas) {
      this.setState({ mostrarSpin: false });
    }
    this.setState({ listasCargadas: numACK });
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
   * Abre el pop-up para añadir/quitar un vídeo a una lista de reproducción
   */
  abrirPopUp() {
    this.setState({ popUp: true, nombreLista: "" });
  }

  /**
   * Cierra el pop-up para añadir/quitar un vídeo a una lista de reproducción.
   */
  cerrarPopUp() {
    this.setState({ popUp: false });
  }

  /**
   * Crea una nueva lista de reproducción.
   * @param {Event} evento Evento que devuelve el formulario
   */
  crearLista(evento) {
    evento.preventDefault();
    const nombreLista = this.nombreLista.current.value;
    addReproductionList(nombreLista, (ok, list) => {
      if (ok) {
        this.setState({
          mensajeNotif: `Lista ${nombreLista.toUpperCase()} creada`,
          notif: true,
          listaCreada: list,
          deshacer: true
        });
        this.getData();
      } else {
        this.setState({
          mensajeNotif: `No se ha podido crear la lista ${nombreLista.toUpperCase()}`,
          notif: true,
          deshacer: false
        });
      }
      this.iniciarReloj();
    });
  }

  /**
   * Deshace la creación de una lista de reproducción
   */
  deshacer() {
    this.borrarLista(this.state.listaCreada);
    this.setState({ notif: false });
  }

  /**
   * Resetea el reloj y lo inicializa para ejecutar la función
   * MisListas.tick() una vez por segundo.
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

  /**
   * Borra una lista de reproducción
   * @param {Object} lista Lista de reproducción
   */
  borrarLista(lista) {
    this.pararReloj();
    deleteReproductionList(lista.id, ok => {
      if (!ok) {
        this.setState({
          mensajeNotif: `No se ha podido borrar la lista ${lista.name.toUpperCase()}`,
          notif: true,
          deshacer: false
        });
      } else {
        this.setState({
          mensajeNotif: `Lista ${lista.name.toUpperCase()} borrada`,
          notif: true,
          deshacer: false
        });
        this.getData();
      }
      this.iniciarReloj();
    });
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
        <Helmet>
          <title>Mis Listas | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={"listas"}
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
          <div>
            <div
              style={{
                width: "93.45%",
                display: "flex",
                borderBottom: "1px solid lightgrey",
                marginBottom: "40px"
              }}
            >
              <h5
                style={{
                  fontWeight: "bold"
                }}
              >
                Mis listas de reproducción
              </h5>

              <Popup
                open={this.state.popUp}
                onOpen={this.abrirPopUp}
                onClose={this.cerrarPopUp}
                trigger={
                  <div className="anyadir-lista">
                    <div style={{ marginRight: "5px" }}>
                      <FaPlus color={"#00000080"} />
                    </div>
                    <div style={{ marginTop: "2px", color: "#00000080" }}>
                      NUEVA LISTA
                    </div>
                  </div>
                }
                modal={true}
              >
                <div className="popup">
                  <div className="titulo">Nueva Lista</div>
                  <Form
                    className="form"
                    onSubmit={e => {
                      this.crearLista(e);
                      this.cerrarPopUp();
                    }}
                  >
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        ref={this.nombreLista}
                        placeholder="Título de la lista..."
                      />
                    </Form.Group>
                    <Button className="boton-popup" type="submit">
                      Crear lista de reproducción
                    </Button>
                  </Form>
                </div>
              </Popup>
            </div>
            <div
              style={{
                display: this.state.mostrarSpin ? "block" : "none"
              }}
            >
              <LoadingSpinUniCast className="spin-ranking" />
            </div>
            <div
              style={{
                visibility: this.state.mostrarSpin ? "hidden" : "visible"
              }}
            >
              {this.state.misListas.map(e => {
                return (
                  <Lista
                    list={e}
                    key={e.id}
                    borrar={this.borrarLista}
                    loadACK={this.ackLista}
                  />
                );
              })}
            </div>
            <Notificacion
              mostrar={this.state.notif}
              mensaje={this.state.mensajeNotif}
              handleClick={this.deshacer}
              deshacer={this.state.deshacer}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MisListas;
