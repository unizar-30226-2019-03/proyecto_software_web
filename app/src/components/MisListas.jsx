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

  getData(list) {
    getVideosFromReproductionList(list.id, 0, (data, now) => {
      if (this._isMounted) {
        this.setState({ lista: list, videos: data, timeNow: now });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    this.getData(this.props.list);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ lista: newProps.list });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  abrirPopUp() {
    this.setState({ popUp: true });
  }

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

class MisListas extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      popUp: false,
      notif: false,
      mensajeNotif: "",
      tiempo: 0,
      misListas: [],
      listaCreada: null,
      deshacer: true
    };
    this.nombreLista = React.createRef();
    this.getData = this.getData.bind(this);
    this.crearLista = this.crearLista.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  getData() {
    getUserReproductionLists(data => {
      if (this._isMounted) {
        const sortedData = putFavouritesFirst(data);
        this.setState({ misListas: sortedData });
      }
    });
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

  deshacer() {
    this.borrarLista(this.state.listaCreada);
    this.setState({ notif: false });
  }

  iniciarReloj() {
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
              return <Lista list={e} key={e.id} borrar={this.borrarLista} />;
            })}
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
