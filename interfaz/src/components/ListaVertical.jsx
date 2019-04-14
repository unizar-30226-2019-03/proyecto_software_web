import React, { Component } from "react";
import imagenPrueba from "../assets/landscape.jpg";
import iconoAsign from "../assets/favicon.ico";
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
    <div style={{ width: "400px", marginBottom: "8px", display: "flex" }}>
      <div>
        <Link to={`/video/${url}`}>
          <img src={img} width="175" height="100" alt="videoX" />
        </Link>
      </div>
      <div>
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
              color: "black",
              fontSize: "14px",
              overflowWrap: "break-word",
              fontWeight: "bold"
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
              overflowWrap: "break-word",
              fontWeight: "500"
            }}
            to={`/asig/X`}
          >
            Asignatura concreta
          </Link>
        </div>
        <div className="fecha-subida-vertical">Hace X min</div>
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
