/**
 * @fileoverview Fichero ListaBusqueda.jsx donde se encuentra la clase
 * que renderiza la lista de vídeos recuperados tras realizar una búsqueda.
 *
 * @author UniCast
 *
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../../node_modules/react-icons/fa/FaPlus.js:FaPlus
 * @requires ../../node_modules/reactjs-popup/reactjs-popup.js:Popup
 * @requires ../config/Process.jsx:getTime
 * @requires ../config/VideoAPI.jsx:getScore
 * @requires ../config/VideoAPI.jsx:getTimePassed
 * @requires ./ListaVertical.jsx:ContenidoPopUp
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";
import { getTime } from "../config/Process";
import { getScore, getTimePassed } from "../config/VideoAPI";
import { ContenidoPopUp } from "./ListaVertical";

/**
 * Clase que renderiza un vídeo individual para la lista
 * de búsqueda.
 * @extends Component
 */
class MenuItem extends Component {
  /**
   * Construye el componente MenuItem
   */
  constructor() {
    super();
    this.state = {
      mostrarOpciones: false,
      popUp: false
    };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
    this.recibirHijo = this.recibirHijo.bind(this);
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
    //SI anyadir = true, anyadir a la lista lista, sino borrar de la lista lista
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
              to={`/asig/${this.props.canalId}`}
            >
              {this.props.canal} - {this.props.uni}
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
          </div>
        ) : null}
      </div>
    );
  }
}

/**
 * Renderiza la lista completa de los vídeos que coinciden con la búsqueda realizada
 * por el usuario
 * @param {Array.<Object>} list Lista de vídeos recuperados
 * @param {Function} anyadir Función para añadir/borrar un vídeo a una lista de reproducción
 * @param {Array.<Object>} listaRepro Listas de reproducción del usuario
 * @param {Date} time Timestamp para calcular la fecha de subida del vídeo
 * @param {Function} actualizarListas Función para actualizar las listas de reproducción del usuario
 */
export const MenuVertical = (
  list,
  anyadir,
  listaRepro,
  time,
  actualizarListas
) =>
  list.map(video => {
    return (
      <MenuItem
        url={video.title}
        canal={video.subject.name}
        uni={video.university.name}
        canalId={video.subject.id}
        key={video.id}
        id={video.id}
        anyadirALista={anyadir}
        actualizarListas={actualizarListas}
        img={video.thumbnailUrl}
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
 * Clase que gestiona la lista de vídeos que coinciden
 * con la búsqueda realizada por el usuario.
 * @extends Component
 */
class ListaBusqueda extends Component {
  /**
   * Construye el componente ListaBusqueda
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.lista Lista de vídeos que coinciden con la búsqueda
   * @param {Function} props.anyadirALista Función para añadir/borrar un vídeo a una lista de reproducción
   * @param {Array.<Object>} props.listaRepro Listas de reproducción de un usuario
   * @param {Date} props.time Timestamp del servidor para calcular el tiempo transcurrido desde la subida del vídeo
   * @param {Function} props.actualizarListas Función para actualizar las listas de reproducción del usuario
   */
  constructor(props) {
    super(props);
    this.menu = MenuVertical(
      props.lista,
      props.anyadirALista,
      props.listaRepro,
      props.time,
      props.actualizarListas
    );
  }

  componentWillReceiveProps(newProps) {
    this.menu = MenuVertical(
      newProps.lista,
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

export default ListaBusqueda;
