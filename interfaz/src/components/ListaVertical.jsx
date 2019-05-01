import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaPlus } from "react-icons/fa";
import { FormCheck } from "react-bootstrap";
import Popup from "reactjs-popup";

class ContenidoPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listas: this.props.listaRepro,
      anyadido: false,
      lista: "",
      mensaje: "",
      crearLista: false,
      nombreNuevaLista: ""
    };
    this.handleChange = this.handleChange.bind(this);

    this.actualizarNuevaLista = this.actualizarNuevaLista.bind(this);
    this.crearLista = this.crearLista.bind(this);
  }

  handleChange(e) {
    const item = e.target.value;
    const isChecked = e.target.checked;
    if (!isChecked) {
      //Eliminar De la lista item
      this.props.enviarPadre(true, item, `Eliminado de ${item}`, false);
    } else {
      //Añadir a la lista item
      this.props.enviarPadre(true, item, `Añadido a ${item}`, true);
    }
  }

  actualizarNuevaLista(e) {
    e.preventDefault();
    this.setState({ nombreNuevaLista: e.target.value });
  }

  crearLista(e) {
    if (e.keyCode === 13) {
      //CREAR LA LISTA
      const item = this.state.nombreNuevaLista;
      var nuevasListas = this.state.listas.slice();
      nuevasListas.push(item);
      this.setState({
        nombreNuevaLista: "",
        crearLista: false,
        listas: nuevasListas
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
            return (
              <FormCheck id={lista} key={lista}>
                <FormCheck.Input
                  type={"checkbox"}
                  value={lista}
                  onChange={this.handleChange}
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
                  {lista}
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

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarOpciones: false,
      popUp: false,
      mostrarNotif: false,
      mensaje: ""
    };
    this.abrirPopUp = this.abrirPopUp.bind(this);
    this.cerrarPopUp = this.cerrarPopUp.bind(this);
    this.recibirHijo = this.recibirHijo.bind(this);
  }

  recibirHijo(mostrar, lista, mensaje, anyadir) {
    this.setState({ mostrarNotif: mostrar, mensaje: mensaje });
    //SI anyadir = true, anyadir a la lista lista, sino borrar de la lista lista
    this.props.anyadirALista(this.props.url, mensaje, lista, anyadir);
  }

  abrirPopUp() {
    this.setState({ popUp: true });
  }

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
            to={`/video/${this.props.url}`}
            style={{ position: "relative" }}
          >
            <img src={this.props.img} width="240" height="140" alt="videoX" />
            <div
              style={{
                color: "white",
                fontSize: "12px",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.7)",
                textDecoration: "none",
                width: "40px",
                height: "16px",
                position: "absolute",
                right: "3px",
                top: "60px",
                borderRadius: "3px",
                zIndex: "100"
              }}
            >
              {this.props.duracion}
            </div>
            <div
              style={{
                color: "green",
                fontSize: "12px",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.7)",
                textDecoration: "none",
                width: "40px",
                height: "16px",
                position: "absolute",
                left: "4px",
                top: "60px",
                borderRadius: "3px",
                zIndex: "100"
              }}
            >
              {this.props.rating}
            </div>
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
              to={`/video/${this.props.url}`}
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
              to={`/asig/X`}
            >
              {this.props.canal}
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
                Descripción del video. Un texto es una composición de signos
                codificados en un sistema de escritura que forma una unidad de
                sentido. También es una composición de caracteres imprimibles
                (con grafema) generados por un algoritmo de cifrado que, aunque
                no tienen sentido para cualquier persona, sí puede ser
                descifrado por su destinatario original. En otras palabras, un
                texto es un entramado de signos con una intención comunicativa
                que adquiere sentido en determinado contexto.
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
                listaRepro={this.props.listaRepro}
                enviarPadre={this.recibirHijo}
              />
            </Popup>
            <FaTimes
              color={"#00000080"}
              onClick={() => this.props.borrar(this.props.url)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

// All items component
// Important! add unique key
export const MenuVertical = (list, borrar, anyadir, listaRepro) =>
  list.map(el => {
    const { name, canal, image, duracion, rating } = el;

    return (
      <MenuItem
        url={name}
        canal={canal}
        key={name}
        borrar={borrar}
        anyadirALista={anyadir}
        img={image}
        listaRepro={listaRepro}
        duracion={duracion}
        rating={rating}
      />
    );
  });

class ListaVertical extends Component {
  constructor(props) {
    super(props);
    this.menu = MenuVertical(
      this.props.lista,
      this.props.borrar,
      this.props.anyadirALista,
      this.props.listaRepro
    );
  }

  componentWillReceiveProps(newProps) {
    this.menu = MenuVertical(
      newProps.lista,
      newProps.borrar,
      newProps.anyadirALista,
      newProps.listaRepro
    );
  }

  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVertical;
