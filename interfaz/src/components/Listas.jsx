import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaHorizontal from "./ListaHorizontal";
import { FaPlus, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";
import { Form, Button } from "react-bootstrap";

const Notificacion = ({ mostrar, nombre, handleClick }) => {
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
        {" "}
        LISTA {nombre.toUpperCase()} CREADA{" "}
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
      </div>
    </div>
  );
};

class Listas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      popUp: false,
      popUpValidado: false,
      nombreLista: "",
      tiempo: 0
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
    this.setState({ popUpValidado: true, nombreLista: nombreLista });
    this.iniciarReloj();
  }

  deshacer() {
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
    if (t === 2) {
      t = -1;
      this.pararReloj();
    }
    this.setState({ tiempo: t + 1 });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Mis Listas</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
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
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción A
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción B
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción C
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción D
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
            <Notificacion
              mostrar={this.state.popUpValidado}
              nombre={this.state.nombreLista}
              handleClick={this.deshacer}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Listas;
