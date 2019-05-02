import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import Video from "./Video";
import vid from "../assets/VideoPrueba.mp4";
import {
  FaShareAlt,
  FaRegBookmark,
  FaRegStar,
  FaStar,
  FaStarHalf
} from "react-icons/fa";
import icono from "../assets/favicon.ico";
import { getTime } from "../config/Procesar";
import Popup from "reactjs-popup";
import StarRatingComponent from "react-star-rating-component";
import { ContenidoPopUp } from "./ListaVertical";
import { Notificacion } from "./Listas";
import { isSignedIn } from "../config/Auth";
import { generadorColores, scrollFunc } from "../config/VideoFunc";

const profesores = [
  { foto: icono, nombre: "Jorge" },
  { foto: icono, nombre: "Javier" },
  { foto: icono, nombre: "Juan" }
];

const listasRepro = [
  "Lista de reproducción 1",
  "Lista de reproducción 2",
  "Lista de reproducción 3",
  "Lista de reproducción 4",
  "Lista de reproduccióndasds aadsasdsadasadsdasdasasddasdsaddsadas 5"
];

const comentariosVideo = [
  {
    tiempo: 5,
    comentario: "Comentario de prueba en segundo 5",
    usuario: "david",
    color: generadorColores("david")
  },
  {
    tiempo: 6,
    comentario: "Comentario de prueba en segundo 6",
    usuario: "juan",
    color: generadorColores("juan")
  },
  {
    tiempo: 8,
    comentario: "Comentario de prueba en segundo 8",
    usuario: "diego",
    color: generadorColores("diego")
  },
  {
    tiempo: 10,
    comentario: "Comentario de prueba en segundo 10",
    usuario: "paula",
    color: generadorColores("paula")
  },
  {
    tiempo: 12,
    comentario: "Comentario de prueba en segundo 12",
    usuario: "isaac",
    color: generadorColores("isaac")
  },
  {
    tiempo: 13,
    comentario: "Comentario de prueba en segundo 13",
    usuario: "lorien",
    color: generadorColores("lorien")
  },
  {
    tiempo: 15,
    comentario: "Comentario de prueba en segundo 15",
    usuario: "raquel",
    color: generadorColores("raquel")
  },
  {
    tiempo: 16,
    comentario: "Comentario de prueba en segundo 16",
    usuario: "adrian",
    color: generadorColores("adrian")
  },
  {
    tiempo: 18,
    comentario: "Comentario de prueba en segundo 18",
    usuario: "ruben",
    color: generadorColores("ruben")
  },
  {
    tiempo: 20,
    comentario: "Comentario de prueba en segundo 20",
    usuario: "jose",
    color: generadorColores("jose")
  },
  {
    tiempo: 22,
    comentario: "Comentario de prueba en segundo 22",
    usuario: "david",
    color: generadorColores("david")
  },
  {
    tiempo: 23,
    comentario: "Comentario de prueba en segundo 23",
    usuario: "david",
    color: generadorColores("david")
  },
  {
    tiempo: 24,
    comentario: "Comentario de prueba en segundo 24",
    usuario: "juan",
    color: generadorColores("juan")
  },
  {
    tiempo: 25,
    comentario: "Comentario de prueba en segundo 25",
    usuario: "juan",
    color: generadorColores("juan")
  },
  {
    tiempo: 26,
    comentario: "Comentario de prueba en segundo 26",
    usuario: "diego",
    color: generadorColores("diego")
  },
  {
    tiempo: 27,
    comentario: "Comentario de prueba en segundo 27",
    usuario: "diego",
    color: generadorColores("diego")
  },
  {
    tiempo: 28,
    comentario: "Comentario de prueba en segundo 28",
    usuario: "paula",
    color: generadorColores("paula")
  },
  {
    tiempo: 29,
    comentario: "Comentario de prueba en segundo 29",
    usuario: "isaac",
    color: generadorColores("isaac")
  }
];

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

const Profesor = ({ foto, nombre }) => {
  return (
    <div style={{ marginRight: "20px", textAlign: "center" }}>
      <Link to="/profesor/X" style={{ textDecoration: "none", color: "black" }}>
        <img
          src={foto}
          alt="profesor"
          width="40"
          height="40"
          style={{ borderRadius: "50%" }}
        />
        <p>{nombre}</p>
      </Link>
    </div>
  );
};

const ListaProfesores = list =>
  list.map(el => {
    const { foto, nombre } = el;

    return <Profesor nombre={nombre} key={nombre} foto={foto} />;
  });

class ViendoVideo extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "15%",
      user: "",
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
      calidad: 2.5,
      adecuacion: 2.5,
      claridad: 2.5
    };
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
    this.comentario = React.createRef();
  }

  recogerComentarios(tiempoInicio, tiempoFin, lista) {
    const res = comentariosVideo.filter(
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
    if (ultimoComentario === undefined) {
      nuevosComentarios = this.recogerComentarios(
        0,
        estado.currentTime,
        nuevosComentarios
      );
    } else {
      nuevosComentarios = this.recogerComentarios(
        ultimoComentario.tiempo,
        estado.currentTime,
        nuevosComentarios
      );
    }
    const altura =
      document.getElementById("div-comentarios").clientHeight -
      document.getElementById("cabecera-comentarios").clientHeight -
      document.getElementById("zona-escribir-comentarios").clientHeight -
      10;
    this.setState({
      comentarios: nuevosComentarios,
      alturaComentarios: altura,
      anchuraComentarios: document.getElementById("div-comentarios")
        .clientWidth,
      tiempoVideo: estado.currentTime
    });
  }

  componentWillMount() {
    if (document.cookie !== undefined) {
      let userCookie = document.cookie;
      let userID = userCookie.split("=")[1];
      this.setState({ user: userID });
    }
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
        const usuario = "david";
        const tiempo = this.state.tiempoVideo;
        const color = generadorColores(usuario);
        nuevosComentarios.push({ tiempo, comentario, usuario, color });
        this.comentario.current.value = "";
        this.setState({ comentarios: nuevosComentarios });
        e.preventDefault();
      }
    }
  }

  guardarVideo(mostrar, lista, mensaje, anyadir) {
    if (anyadir) {
      //Añadir a la lista lista
    } else {
      //Borrar de la lista lista
    }
    this.setState({ notif: mostrar, mensajeNotif: mensaje });
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
    //Enviar al servidor la puntuación actual
    //console.log(this.state.claridad, this.state.calidad, this.state.adecuacion);
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Inicio</title>
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
            <Video src={vid} enviarEstado={this.recibirEstadoVideo} />
            <div className="datos-video">
              <p className="titulo-video">
                {this.props.match.params.nombreVideo}
              </p>
              <div style={{ display: "flex" }}>
                <p className="fecha-subida-video">Subido hace X tiempo</p>
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
                    onOpen={() => this.setState({ popUpPuntuar: true })}
                    onClose={() => this.setState({ popUpPuntuar: false })}
                    arrow={false}
                    position="top left"
                    contentStyle={{
                      width: "250px",
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

                  <FaShareAlt
                    size={30}
                    color={"#00000080"}
                    style={{ marginRight: "20px", cursor: "pointer" }}
                  />
                  <Popup
                    open={this.state.popUpGuardar}
                    onOpen={() => this.setState({ popUpGuardar: true })}
                    onClose={() => this.setState({ popUpGuardar: false })}
                    arrow={false}
                    position="top left"
                    contentStyle={{
                      width: "250px",
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
                      video={this.props.match.params.nombreVideo}
                      listaRepro={listasRepro}
                      enviarPadre={this.guardarVideo}
                    />
                  </Popup>
                </div>
              </div>
            </div>
            <div className="datos-video">
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <Link to="/asig/X">
                  <img
                    src={icono}
                    style={{ borderRadius: "50%" }}
                    height="40"
                    width="40"
                    alt="Canal"
                  />
                </Link>
                <Link className="nombre-canal" to="/asig/X">
                  Asignatura concreta
                </Link>
                <Button className="boton-seguir">SEGUIR ASIGNATURA</Button>
              </div>
              <div style={{ marginLeft: "48px" }}>
                <p style={{ fontSize: "15px" }}>
                  Descripción del vídeo que le haya puesto el correspondiente
                  profesor, Descripción, Descripción, Descripción, Descripción,
                  Descripción, Descripción, Descripción, Descripción,
                  Descripción, Descripción.
                </p>
              </div>
              <div style={{ marginLeft: "48px" }}>
                <p style={{ fontWeight: "550" }}>Profesores de la asignatura</p>
                <div style={{ display: "flex" }}>
                  {ListaProfesores(profesores)}
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
