import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaHorizontal from "./ListaHorizontal";
import { FaPlus, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { sesionValida } from "../App";

const lista = [
  { titulo: "Lista de reproducción A" },
  { titulo: "Lista de reproducción B" },
  { titulo: "Lista de reproducción C" },
  { titulo: "Lista de reproducción D" },
  { titulo: "Lista de reproducción E" },
  { titulo: "Lista de reproducción F" },
  { titulo: "Lista de reproducción G" },
  { titulo: "Lista de reproducción H" }
];

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
        borderRadius: "3px"
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

class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tituloOriginal: this.props.titulo,
      titulo: this.props.titulo,
      width: this.props.titulo.length,
      popUp: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
  }

  abrirPopUp() {
    this.setState({ popUp: true });
  }

  cerrarPopUp() {
    this.setState({ popUp: false });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      titulo: e.target.value,
      width: e.target.value.length + 0.5
    });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      e.target.blur();
      this.props.editar(this.state.tituloOriginal, this.state.titulo);
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", width: "93.45%" }}>
          <div>
            <h6 style={{ fontWeight: "bold" }}>
              <input
                defaultValue={this.state.titulo}
                ref={ip => (this.titulo = ip)}
                onChange={this.handleChange}
                onKeyDown={this.keyPress}
                size={this.state.width}
                style={{
                  backgroundColor: "#fafafa",
                  border: "0",
                  overflow: "visible",
                  pointerEvents: "none"
                }}
              />
            </h6>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "-4px"
            }}
          >
            <div
              style={{
                cursor: "pointer",
                marginRight: "15px"
              }}
              onClick={() => {
                this.titulo.focus();
              }}
            >
              <FaPencilAlt className="icono-lista" />
            </div>
            <Popup
              open={this.state.popUp}
              onOpen={this.abrirPopUp}
              repositionOnResize
              trigger={
                <div style={{ cursor: "pointer" }}>
                  <FaRegTrashAlt className="icono-lista" />
                </div>
              }
            >
              <div className="popup">
                <div className="titulo">¿Estás seguro?</div>

                <Button
                  variant="link"
                  style={{
                    marginTop: "10px",
                    padding: "0",
                    textDecoration: "none",
                    fontSize: "14px"
                  }}
                  onClick={() => {
                    this.cerrarPopUp();
                    this.props.borrar(this.state.titulo);
                  }}
                >
                  Confirmar borrado
                </Button>
              </div>
            </Popup>
          </div>
          <div style={{ marginRight: "0", marginLeft: "auto" }}>
            <Link
              to={`/lista/` + this.state.titulo}
              style={{ color: "#00000080", textDecoration: "none" }}
            >
              Ver todos los vídeos
            </Link>
          </div>
        </div>
        <ListaHorizontal />
      </div>
    );
  }
}

class Listas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      popUp: false,
      popUpValidado: false,
      nombreLista: "",
      tiempo: 0,
      misListas: lista
    };
    this.nombreLista = React.createRef();
    this.crearLista = this.crearLista.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
    this.deshacer = this.deshacer.bind(this);
    this.iniciarReloj = this.iniciarReloj.bind(this);
    this.pararReloj = this.pararReloj.bind(this);
    this.tick = this.tick.bind(this);
    this.borrarLista = this.borrarLista.bind(this);
    this.editarLista = this.editarLista.bind(this);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }

  abrirPopUp() {
    this.setState({ popUp: true, nombreLista: "" });
  }

  cerrarPopUp() {
    this.setState({ popUp: false });
  }

  crearLista(evento) {
    evento.preventDefault();
    const nombreLista = this.nombreLista.current.value;
    var nuevasListas = this.state.misListas.slice();
    nuevasListas.push({ titulo: nombreLista });
    this.setState({
      popUpValidado: true,
      nombreLista: nombreLista,
      misListas: nuevasListas
    });
    this.iniciarReloj();
  }

  deshacer() {
    this.borrarLista(this.state.nombreLista);
    this.setState({ popUpValidado: false });
  }

  iniciarReloj() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  pararReloj() {
    clearInterval(this.timerID);
    this.setState({ popUpValidado: false });
  }

  tick() {
    let t = this.state.tiempo;
    if (t === 3) {
      t = -1;
      this.pararReloj();
    }
    this.setState({ tiempo: t + 1 });
  }

  borrarLista(titulo) {
    var nuevasListas = this.state.misListas.slice();
    const index = nuevasListas.findIndex(e => e.titulo === titulo);
    nuevasListas.splice(index, 1);
    this.setState({ misListas: nuevasListas });
  }

  editarLista(antigua, nueva) {
    var nuevasListas = this.state.misListas.slice();
    const index = nuevasListas.findIndex(e => e.titulo === antigua);
    nuevasListas[index] = { titulo: nueva };
    this.setState({ misListas: nuevasListas });
  }

  render() {
    return !sesionValida() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Mis Listas</title>
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
            {this.state.misListas.map(e => {
              const { titulo } = e;
              return (
                <Lista
                  titulo={titulo}
                  key={titulo}
                  editar={this.editarLista}
                  borrar={this.borrarLista}
                />
              );
            })}
            <Notificacion
              mostrar={this.state.popUpValidado}
              mensaje={`Lista ${this.state.nombreLista.toUpperCase()} creada`}
              handleClick={this.deshacer}
              deshacer={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Listas;
