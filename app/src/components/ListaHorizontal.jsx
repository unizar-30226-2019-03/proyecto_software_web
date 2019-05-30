/**
 * @fileoverview Fichero ListaHorizontal.jsx donde se encuentra la clase
 * que renderiza una lista horizontal de vídeos.
 *
 * @author UniCast
 *
 * @requires ../../node_modules/react-horizontal-scrolling-menu/build/index.js:ScrollMenu
 * @requires ../../node_modules/react-icons/fa/FaAngleRight.js:FaAngleRight
 * @requires ../../node_modules/react-icons/fa/FaAngleLeft.js:FaAngleLeft
 * @requires ../node_modules/react-router-dom/Link.js:Link
 * @requires ../config/Process.jsx:getTime
 * @requires ./IconoAsignaturaUniversidad.jsx:IconoAsignaturaUniversidad
 * @requires ../config/VideoAPI.jsx:getTimePassed
 * @requires ../config/VideoAPI.jsx:getScore
 */

import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getTime } from "../config/Process";
import IconoAsignaturaUniversidad from "./IconoAsignaturaUniversidad";
import { getTimePassed, getScore } from "../config/VideoAPI";

/**
 * Clase que renderiza un vídeo individual para la lista horizontal.
 * @extends Component
 */
class MenuItem extends Component {
  render() {
    return (
      <div>
        <div className="menu-item zoom-item">
          <Link
            to={`/video?id=${this.props.id}`}
            style={{ position: "relative" }}
          >
            <img
              src={this.props.img}
              style={{ objectFit: "cover" }}
              width="210"
              height="118"
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
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "5px" }}>
              <Link
                to={`/asig/${this.props.subject.id}`}
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
              className="tooltip"
              style={{ marginLeft: "5px", lineHeight: "16px" }}
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
                <span className="tooltiptext">{this.props.title}</span>
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

/**
 * Renderiza la lista completa de vídeos.
 * @param {Array.<Object>} list Lista de vídeos a renderizar
 * @param {Date} now Timestamp del servidor para calcular el tiempo transcurrido desde la subida del vídeo
 */
export const Menu = (list, now) =>
  list.map(el => {
    const { title, id, thumbnailUrl, score, timestamp, seconds } = el;
    return (
      <MenuItem
        title={title}
        id={id}
        key={title}
        img={thumbnailUrl}
        canal={title}
        duracion={getTime(seconds)}
        rating={getScore(score)}
        timestamp={getTimePassed(timestamp, now)}
        showRating={score === null ? false : true}
        subject={el.subject}
        university={el.university}
      />
    );
  });

/**
 * Renderiza la flecha izquierda de la lista horizontal
 */
const ArrowL = () => {
  return (
    <div
      style={{
        width: "inherit",
        height: "inherit"
      }}
    >
      <FaAngleLeft
        size={25}
        color="#00000080"
        style={{
          position: "absolute",
          top: "7px",
          left: "7px"
        }}
      />
    </div>
  );
};

/**
 * Renderiza la flecha derecha de la lista horizontal
 */
const ArrowR = () => {
  return (
    <div
      style={{
        width: "inherit",
        height: "inherit"
      }}
    >
      <FaAngleRight
        size={25}
        color="#00000080"
        style={{
          position: "absolute",
          top: "7px",
          left: "7px"
        }}
      />
    </div>
  );
};

/**
 * Clase que gestiona la lista de vídeos horizontal con flechas en los laterales
 */
class HMenuArr extends Component {
  /**
   * Construye el componente HMenuArr
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.menu Lista renderizada de los vídeos
   */
  constructor(props) {
    super(props);
    /**
     * Indica si el componente está montado o no
     * @type {Boolean}
     */
    this._isMounted = false;
    this.state = {
      menu: props.menu
    };
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(newProps) {
    if (this._isMounted) {
      this.setState({ menu: newProps.menu });
    }
  }

  render() {
    return (
      <div
        className=""
        style={{
          width: "93.45%",
          borderBottom: "1px solid lightgrey"
        }}
      >
        <ScrollMenu
          data={this.state.menu}
          selected={1}
          wheel={false}
          transition={0.2}
          alignCenter={false}
          alignOnResize={true}
          dragging={false}
          arrowClass="arrow-horizontal-list-renderer"
          arrowRight={ArrowR()}
          arrowLeft={ArrowL()}
        />
      </div>
    );
  }
}

/**
 * Clase que gestiona la lista horizontal de vídeos.
 * @extends Component
 */
class ListaHorizontal extends Component {
  /**
   * Construye el componente ListaHorizontal
   *
   * @param {Object} props Propiedades para inicializar el componente
   * @param {Array.<Object>} props.list Lista de vídeos a renderizar
   * @param {Date} props.now Timestamp del servidor para calcular el tiempo transcurrido desde la subida del vídeo
   */
  constructor(props) {
    super(props);
    this.menuItems = Menu(props.list, props.now);
  }

  componentWillReceiveProps(newProps) {
    this.menuItems = Menu(newProps.list, this.props.now);
  }

  render() {
    return (
      <div style={{ marginBottom: "50px" }}>
        <HMenuArr menu={this.menuItems} />
      </div>
    );
  }
}
export default ListaHorizontal;
