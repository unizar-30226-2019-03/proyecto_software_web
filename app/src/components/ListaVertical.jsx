/**
 * @fileoverview Fichero ListaVertical.jsx donde se encuentra la clase
 * que renderiza una lista vertical de vídeos.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../../node_modules/react-icons/fa/FaTimes.js:FaTimes
 * @requires ../../node_modules/react-icons/fa/FaPlus.js:FaPlus
 * @requires ../../node_modules/react-bootstrap/FormCheck.js:FormCheck
 * @requires ../../node_modules/reactjs-popup/reactjs-popup.js:Popup
 * @requires ../config/VideoAPI.jsx:getScore
 * @requires ../config/VideoAPI.jsx:getTimePassed
 * @requires ../config/VideoAPI.jsx:getVideoSubject
 * @requires ../config/Process.jsx:getTime
 * @requires ../config/ReproductionListAPI.jsx:getReproductionListVideoIn
 * @requires ../config/ReproductionListAPI.jsx:addReproductionList
 * @requires ../config/Auth.jsx:isSignedIn
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaPlus } from "react-icons/fa";
import { FormCheck } from "react-bootstrap";
import Popup from "reactjs-popup";
import { getScore, getTimePassed, getVideoSubject } from "../config/VideoAPI";
import { getTime } from "../config/Process";
import {
  getReproductionListVideoIn,
  addReproductionList
} from "../config/ReproductionListAPI";
import { isSignedIn } from "../config/Auth";

/**
 * Clase que gestiona el pop-up para añadir o quitar un vídeo
 * a una lista de reproducción de un usuario.
 * @extends Component
 */
class ContenidoPopUp extends Component {
  /**
   * Construye el componente ContenidoPopUp
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.listaRepro Listas de reproducción del usuario
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      listas: props.listaRepro,
      listasDelVideo: [],
      crearLista: false,
      nombreNuevaLista: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.actualizarNuevaLista = this.actualizarNuevaLista.bind(this);
    this.crearLista = this.crearLista.bind(this);
  }

  /**
   * Obtiene las listas de reproducción a las que un
   * vídeo concreto pertenece.
   */
  getData() {
    const id = parseInt(this.props.videoId);
    getReproductionListVideoIn(id, data => {
      if (this._isMounted) {
        this.setState({ listasDelVideo: data });
      }
    });
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

  /**
   * Añade o borra un vídeo a la lista de reproducción seleccionada
   * e informa de ello.
   * @param {Event} e Evento que devuelve el formulario
   * @param {Number} id Id de la lista de reproducción
   * @param {String} name Nombre de la lista de reproducción
   */
  handleChange(e, id, name) {
    const isChecked = e.target.checked;

    if (!isChecked) {
      //Eliminar De la lista item
      this.props.enviarPadre(
        id,
        `${this.props.video.toUpperCase()} eliminado de ${name.toUpperCase()}`,
        false,
        ok => {
          if (ok) {
            this.getData();
          }
        }
      );
    } else {
      //Añadir a la lista item
      this.props.enviarPadre(
        id,
        `${this.props.video.toUpperCase()} añadido a ${name.toUpperCase()}`,
        true,
        ok => {
          if (ok) {
            this.getData();
          }
        }
      );
    }
  }

  /**
   * Actualiza el valor del nombre de la nueva lista
   * de reproducción a crear.
   * @param {Event} e Evento que devuelve el formulario
   */
  actualizarNuevaLista(e) {
    e.preventDefault();
    this.setState({ nombreNuevaLista: e.target.value });
  }

  /**
   * Crea la lista de reproducción con el nombre indicado
   * por el usuario.
   * @param {Event} e Evento que devuelve el formulario
   */
  crearLista(e) {
    if (e.keyCode === 13) {
      //CREAR LA LISTA
      const item = this.state.nombreNuevaLista;
      addReproductionList(item, (ok, data) => {
        if (ok) {
          var nuevasListas = this.state.listas.slice();
          nuevasListas.push(data);
          this.setState({
            nombreNuevaLista: "",
            crearLista: false,
            listas: nuevasListas
          });
          this.props.actualizarListas();
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div style={{ borderBottom: "1px solid lightgrey", fontWeight: "450" }}>
          Guardar en...
        </div>
        <div
          style={{
            paddingTop: "15px",
            fontSize: "14px",
            borderBottom: "1px solid lightgrey"
          }}
        >
          {this.state.listas.map(lista => {
            let checked = this.state.listasDelVideo.find(l => {
              return l.id === lista.id;
            });
            checked = checked === undefined ? false : true;
            return (
              <FormCheck id={lista.id} key={lista.id}>
                <FormCheck.Input
                  type={"checkbox"}
                  value={lista.id}
                  onChange={e => this.handleChange(e, lista.id, lista.name)}
                  checked={checked}
                />
                <FormCheck.Label
                  style={{
                    marginBottom: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {lista.name}
                </FormCheck.Label>
              </FormCheck>
            );
          })}
        </div>
        <div
          style={{ paddingTop: "15px", fontSize: "14px", cursor: "default" }}
          onClick={() => this.setState({ crearLista: true })}
        >
          {!this.state.crearLista ? (
            "+ Crear nueva lista"
          ) : (
            <input
              style={{ border: "0", borderBottom: "1px solid lightgrey" }}
              placeholder="Nueva lista..."
              onChange={this.actualizarNuevaLista}
              onKeyDown={this.crearLista}
            />
          )}
        </div>
      </div>
    );
  }
}
export { ContenidoPopUp };

/**
 * Clase que renderiza un vídeo individual para la lista vertical.
 * @extends Component
 */
class MenuItem extends Component {
  /**
   * Construye el componente MenuItem
   */
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      mostrarOpciones: false,
      popUp: false,
      asig: {}
    };
    this.getData = this.getData.bind(this);
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
    this.recibirHijo = this.recibirHijo.bind(this);
  }

  /**
   * Obtiene la asignatura del vídeo a mostrar
   */
  getData() {
    getVideoSubject(this.props.id, data => {
      if (this._isMounted) {
        this.setState({ asig: data });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Si anyadir=true, anyade el vídeo a la lista de reproducción,
   * sino lo borra de la lista.
   * @param {Number} lista Id de la lista de reproducción
   * @param {String} mensaje Mensaje a mostrar en la notificación
   * @param {Boolean} anyadir Indica si añadir (true) o borrar (false) el vídeo a la lista
   * @param {Function} callback Función a ejecutar tras añadir/borrar el vídeo de la lista
   */
  recibirHijo(lista, mensaje, anyadir, callback) {
    this.props.anyadirALista(this.props.id, mensaje, lista, anyadir, ok => {
      callback(ok);
    });
  }

  /**
   * Abre el pop-up para añadir el vídeo a las listas de reproducción
   * del usuario.
   */
  abrirPopUp() {
    this.setState({ popUp: true });
  }

  /**
   * Cierra el pop-up para borrar el vídeo a las listas de reproducción
   * del usuario.
   */
  cerrarPopUp() {
    this.setState({ popUp: false, mostrarOpciones: false });
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
        style={{
          marginBottom: "16px",
          display: "flex"
        }}
      >
        <div>
          <Link
            to={`/video?id=${this.props.id}`}
            style={{ position: "relative" }}
          >
            <img
              src={this.props.img}
              style={{ objectFit: "cover" }}
              width="240"
              height="140"
              alt="videoX"
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
                right: "3px",
                top: "60px",
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
                  top: "60px",
                  borderRadius: "3px",
                  zIndex: "100"
                }}
              >
                {this.props.rating + "%"}
              </div>
            ) : null}
          </Link>
        </div>
        <div style={{ marginTop: "5px" }}>
          <div
            style={{
              marginLeft: "10px",
              lineHeight: "normal",
              marginBottom: "10px"
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                fontWeight: "400",
                wordWrap: "break-word",
                width: "90%"
              }}
              to={`/video?id=${this.props.id}`}
            >
              {this.props.url}
            </Link>
          </div>
          <div
            style={{
              marginLeft: "10px",
              lineHeight: "normal",
              marginBottom: "3px"
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "#00000080",
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                fontWeight: "500"
              }}
              to={`/asig/${this.state.asig.id}`}
            >
              {this.state.asig.name} -{" "}
              {this.state.asig.university === undefined
                ? ""
                : this.state.asig.university.name}
            </Link>
            <div style={{ marginTop: "10px", width: "90%" }}>
              <div
                style={{
                  textDecoration: "none",
                  color: "#00000080",
                  fontSize: "12px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  fontWeight: "500"
                }}
              >
                {this.props.descripcion}
              </div>
            </div>
          </div>
        </div>
        {this.state.mostrarOpciones ? (
          <div
            style={{
              position: "relative",
              right: "0",
              top: "0",
              width: "fit-content",
              height: "fit-content",
              display: "flex"
            }}
          >
            {" "}
            <Popup
              open={this.state.popUp}
              onOpen={this.abrirPopUp}
              onClose={this.cerrarPopUp}
              arrow={false}
              position="bottom right"
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
                <FaPlus
                  color={"#00000080"}
                  size={14}
                  style={{ marginRight: "5px", cursor: "pointer" }}
                />
              }
            >
              <ContenidoPopUp
                video={this.props.url}
                videoId={this.props.id}
                listaRepro={this.props.listaRepro}
                enviarPadre={this.recibirHijo}
                actualizarListas={this.props.actualizarListas}
              />
            </Popup>
            <FaTimes
              color={"#00000080"}
              onClick={() => this.props.borrar(this.props.id, this.props.url)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

/**
 * Renderiza la lista vertical completa de vídeos.
 * @param {Array.<Object>} list Lista de vídeos recuperados
 * @param {Function} borrar Función para borrar un vídeo de la lista
 * @param {Function} anyadir Función para añadir/borrar un vídeo a una lista de reproducción
 * @param {Array.<Object>} listaRepro Listas de reproducción del usuario
 * @param {Date} time Timestamp para calcular la fecha de subida del vídeo
 * @param {Function} actualizarListas Función para actualizar las listas de reproducción del usuario
 */
export const MenuVertical = (
  list,
  borrar,
  anyadir,
  listaRepro,
  time,
  actualizarListas
) =>
  list.map(video => {
    return (
      <MenuItem
        url={video.title}
        key={video.id}
        id={video.id}
        borrar={borrar}
        anyadirALista={anyadir}
        img={video.thumbnailUrl}
        actualizarListas={actualizarListas}
        listaRepro={listaRepro}
        duracion={getTime(video.seconds)}
        rating={getScore(video.score)}
        timestamp={getTimePassed(video.timestamp, time)}
        descripcion={video.description}
        showRating={video.score === null ? false : true}
      />
    );
  });

/**
 * Clase que gestiona la lista vertical de vídeos
 * @extends Component
 */
class ListaVertical extends Component {
  /**
   * Construye el componente ListaVertical
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.lista Lista de vídeos que coinciden con la búsqueda
   * @param {Array.<Object>} props.borrar Función para borrar un vídeo de la lista
   * @param {Function} props.anyadirALista Función para añadir/borrar un vídeo a una lista de reproducción
   * @param {Array.<Object>} props.listaRepro Listas de reproducción de un usuario
   * @param {Date} props.time Timestamp del servidor para calcular el tiempo transcurrido desde la subida del vídeo
   * @param {Function} props.actualizarListas Función para actualizar las listas de reproducción del usuario
   */
  constructor(props) {
    super(props);
    this.menu = MenuVertical(
      props.lista,
      props.borrar,
      props.anyadirALista,
      props.listaRepro,
      props.time,
      props.actualizarListas
    );
  }

  componentWillReceiveProps(newProps) {
    this.menu = MenuVertical(
      newProps.lista,
      newProps.borrar,
      newProps.anyadirALista,
      newProps.listaRepro,
      newProps.time,
      newProps.actualizarListas
    );
  }

  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVertical;
