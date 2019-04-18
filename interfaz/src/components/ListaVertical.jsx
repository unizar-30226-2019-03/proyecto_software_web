import React, { Component } from "react";
import imagenPrueba from "../assets/landscape.jpg";
import { Link } from "react-router-dom";

const list = [
  { name: "item1", image: imagenPrueba },
  { name: "item2", image: imagenPrueba },
  { name: "item3", image: imagenPrueba },
  { name: "item4", image: imagenPrueba },
  { name: "item5", image: imagenPrueba },
  { name: "item6", image: imagenPrueba },
  { name: "item7", image: imagenPrueba },
  { name: "item8", image: imagenPrueba },
  { name: "item9", image: imagenPrueba },
  { name: "item10", image: imagenPrueba },
  { name: "item11", image: imagenPrueba },
  { name: "item12", image: imagenPrueba }
];

const MenuItem = ({ url, img }) => {
  return (
    <div
      style={{
        marginBottom: "16px",
        display: "flex"
      }}
    >
      <div>
        <Link to={`/video/${url}`}>
          <img src={img} width="240" height="140" alt="videoX" />
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
            to={`/video/${url}`}
          >
            Vídeo de prueba en pagina de inicio {url}
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
            La Resistencia en Movistar +
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
              sentido. También es una composición de caracteres imprimibles (con
              grafema) generados por un algoritmo de cifrado que, aunque no
              tienen sentido para cualquier persona, sí puede ser descifrado por
              su destinatario original. En otras palabras, un texto es un
              entramado de signos con una intención comunicativa que adquiere
              sentido en determinado contexto.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// All items component
// Important! add unique key
export const MenuVertical = list =>
  list.map(el => {
    const { name, image } = el;

    return <MenuItem url={name} key={name} img={image} />;
  });

class ListaVertical extends Component {
  constructor(props) {
    super(props);
    this.menu = MenuVertical(list);
  }
  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVertical;
