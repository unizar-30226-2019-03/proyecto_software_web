import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import Video from "./Video";
import vid from "../assets/VideoPrueba.mp4";
import { FaShareAlt, FaRegBookmark, FaRegStar } from "react-icons/fa";
import icono from "../assets/favicon.ico";
import { sesionValida, getTime } from "../App";

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

let tabla_Pearson = shuffle([...new Array(256)].map((_, i) => i));

function generadorColores(usuario) {
  var hash = 0;
  if (usuario.length === 0) return hash;
  for (let i = 0; i < usuario.length; i++) {
    hash = usuario.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var color = "#";
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

const profesores = [
  { foto: icono, nombre: "Jorge" },
  { foto: icono, nombre: "Javier" },
  { foto: icono, nombre: "Juan" }
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
      tiempoVideo: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.recogerComentarios = this.recogerComentarios.bind(this);
    this.recibirEstadoVideo = this.recibirEstadoVideo.bind(this);
    this.irAUltimoComentario = this.irAUltimoComentario.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.comentar = this.comentar.bind(this);
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
    function scrollFunc(elemento) {
      var docPos = f_scrollTop();
      elemento.scrollIntoView();
      window.scrollTo(0, docPos);
    }

    function f_scrollTop() {
      return f_filterResults(
        window.pageYOffset ? window.pageYOffset : 0,
        document.documentElement ? document.documentElement.scrollTop : 0,
        document.body ? document.body.scrollTop : 0
      );
    }

    function f_filterResults(n_win, n_docel, n_body) {
      var n_result = n_win ? n_win : 0;
      if (n_docel && (!n_result || n_result > n_docel)) n_result = n_docel;
      return n_body && (!n_result || n_result > n_body) ? n_body : n_result;
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
        const usuario = document.cookie.split("=")[1].split("@")[0];
        const tiempo = this.state.tiempoVideo;
        const color = generadorColores(usuario);
        nuevosComentarios.push({ tiempo, comentario, usuario, color });
        this.comentario.current.value = "";
        this.setState({ comentarios: nuevosComentarios });
        e.preventDefault();
      }
    }
  }

  render() {
    return !sesionValida() ? (
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
                  <FaShareAlt
                    size={30}
                    color={"#00000080"}
                    style={{ marginRight: "20px", cursor: "pointer" }}
                  />
                  <FaRegBookmark
                    size={30}
                    color={"#00000080"}
                    style={{ cursor: "pointer" }}
                  />
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
      </div>
    );
  }
}

export default ViendoVideo;
