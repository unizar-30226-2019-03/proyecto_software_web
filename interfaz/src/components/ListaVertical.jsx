import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaPlus } from "react-icons/fa";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { mostrarOpciones: false };
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
          <Link to={`/video/${this.props.url}`}>
            <img src={this.props.img} width="240" height="140" alt="videoX" />
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
            <FaPlus
              color={"#00000080"}
              size={14}
              style={{ marginRight: "5px", cursor: "pointer" }}
              onClick={() => this.props.anyadirALista(this.props.url)}
            />
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
export const MenuVertical = (list, borrar, anyadir) =>
  list.map(el => {
    const { name, canal, image } = el;

    return (
      <MenuItem
        url={name}
        canal={canal}
        key={name}
        borrar={borrar}
        anyadirALista={anyadir}
        img={image}
      />
    );
  });

class ListaVertical extends Component {
  constructor(props) {
    super(props);
    this.menu = MenuVertical(
      this.props.lista,
      this.props.borrar,
      this.props.anyadirALista
    );
  }
  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVertical;
