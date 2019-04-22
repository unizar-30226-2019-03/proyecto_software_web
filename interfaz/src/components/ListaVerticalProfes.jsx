import React, { Component } from "react";
import { Link } from "react-router-dom";

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

  }

  recibirHijo(mostrar, lista, mensaje, anyadir) {
    this.setState({ mostrarNotif: mostrar, mensaje: mensaje });
    //SI anyadir = true, anyadir a la lista lista, sino borrar de la lista lista
    this.props.anyadirALista(this.props.url, mensaje, lista, anyadir);
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
          <Link to={`/Chat`}>
            <img src={this.props.img} width="120" height="80" alt="videoX" />
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
              to={`/chat`}
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
                Asignaturas del profesor. Proyecto sofware. IA. Programación I.

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

          </div>
        ) : null}
      </div>
    );
  }
}

// All items component
// Important! add unique key
export const MenuVertical = (list) =>
  list.map(el => {
    const { name, image } = el;

    return (
      <MenuItem
        url={name}
        key={name}
        img={image}
      />
    );
  });

class ListaVerticalProfes extends Component {
  constructor(props) {
    super(props);
    this.menu = MenuVertical(
      this.props.lista,
    );
  }
  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVerticalProfes;
