import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarOpciones: false,
      popUp: false,
      tiempo: 0,
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
        }}
        style={{
          marginBottom: "16px",
          display: "flex"
        }}
      >
        <div>
          <Link to={`/chat`}>
            <img src={this.props.img} width="120" height="80" alt="mensajeX" />
          </Link>
        </div>
        <div style={{ marginTop: "0px" }}>
          <div
            style={{
              marginLeft: "10px",
              lineHeight: "normal",
              marginBottom: "8px"
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
              to={`/Chat`}
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
           
            <div style={{ marginTop: "10px", width: "90%" }}>
              <div
                style={{
                  textDecoration: "none",
                  color: "#00000080",
                  fontSize: "12px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  fontWeight: "500"
                }}
              >
                Contenido del mensaje. Saludos y motivos del mensaje, es el último mensaje
                enviado por la persona "Apellido Apellido, Nombre" al usuario, 
                mientras llegue a verse en las dos lineas reservadas. El contenido 
                total del mensaje se podrá ver haciendo click sobre cualquier parte 
                del mensaje, donde se accederá al chat completo entre las dos personas.

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
export const MenuVertical = (list, borrar) =>
  list.map(el => {
    const { name, image } = el;

    return (
      <MenuItem
        url={name}
        key={name}
        borrar={borrar}
        img={image}
      />
    );
  });

class ListaVerticalMensajes extends Component {
  constructor(props) {
    super(props);
    this.menu = MenuVertical(
      this.props.lista,
      this.props.borrar,
    );
  }
  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVerticalMensajes;
