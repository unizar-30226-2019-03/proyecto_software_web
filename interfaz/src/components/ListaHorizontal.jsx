import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import imagenPrueba from "../assets/landscape.jpg";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import iconoAsign from "../assets/favicon.ico";
import { Link } from "react-router-dom";
import { getTime } from "../App";
import IconoAsignaturaUniversidad from "./IconoAsignaturaUniversidad";

// list of items
const list = [
  {
    name: "item1",
    canal: "Asignatura A",
    image: imagenPrueba,
    duracion: getTime(500),
    rating: 98
  },
  {
    name: "item2",
    canal: "Asignatura B",
    image: imagenPrueba,
    duracion: getTime(600),
    rating: 98
  },
  {
    name: "item3",
    canal: "Asignatura C",
    image: imagenPrueba,
    duracion: getTime(700),
    rating: 92
  },
  {
    name: "item4",
    canal: "Asignatura D",
    image: imagenPrueba,
    duracion: getTime(800),
    rating: 88
  },
  {
    name: "item5",
    canal: "Asignatura E",
    image: imagenPrueba,
    duracion: getTime(900),
    rating: 77
  },
  {
    name: "item6",
    canal: "Asignatura F",
    image: imagenPrueba,
    duracion: getTime(1000),
    rating: 90
  },
  {
    name: "item7",
    canal: "Asignatura G",
    image: imagenPrueba,
    duracion: getTime(1100),
    rating: 84
  },
  {
    name: "item8",
    canal: "Asignatura H",
    image: imagenPrueba,
    duracion: getTime(1200),
    rating: 87
  },
  {
    name: "item9",
    canal: "Asignatura I",
    image: imagenPrueba,
    duracion: getTime(1300),
    rating: 93
  },
  {
    name: "item10",
    canal: "Asignatura J",
    image: imagenPrueba,
    duracion: getTime(1400),
    rating: 91
  },
  {
    name: "item11",
    canal: "Asignatura K",
    image: imagenPrueba,
    duracion: getTime(1500),
    rating: 91
  },
  {
    name: "item12",
    canal: "Asignatura L",
    image: imagenPrueba,
    duracion: getTime(1600),
    rating: 90
  }
];

// One item component
// selected prop will be passed
const MenuItem = ({ url, canal, img, duracion, rating }) => {
  return (
    <div>
      <div className="menu-item">
        <Link to={`/video/${url}`} style={{ position: "relative" }}>
          <img src={img} width="210" height="118" alt="videoX" />
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
              right: "4px",
              top: "49px",
              borderRadius: "3px",
              zIndex: "100"
            }}
          >
            {duracion}
          </div>
          <div
            style={{
              color: rating >= 50 ? "#228B22" : "#DC143C",
              fontSize: "12px",
              textAlign: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
              textDecoration: "none",
              width: "40px",
              height: "16px",
              position: "absolute",
              left: "4px",
              top: "49px",
              borderRadius: "3px",
              zIndex: "100"
            }}
          >
            {rating + "%"}
          </div>
        </Link>
        <div>
          <div style={{ float: "left", marginTop: "5px" }}>
            <Link to={`/asig/${canal}`} style={{ textDecoration: "none" }}>
              <IconoAsignaturaUniversidad name={canal} image={iconoAsign} />
            </Link>
          </div>
          <div style={{ marginLeft: "75px", lineHeight: "normal" }}>
            {" "}
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflowWrap: "break-word",
                fontWeight: "bold"
              }}
              to={`/video/${url}`}
            >
              Vídeo de prueba en pagina de inicio {url}
            </Link>
          </div>
        </div>
        <div
          className="fecha-subida"
          style={{ marginLeft: "0", marginTop: "2px" }}
        >
          Subido hace X min
        </div>
      </div>
    </div>
  );
};

// All items component
// Important! add unique key
export const Menu = list =>
  list.map(el => {
    const { name, canal, image, duracion, rating } = el;

    return (
      <MenuItem
        url={name}
        key={name}
        img={image}
        canal={canal}
        duracion={duracion}
        rating={rating}
      />
    );
  });

const ArrowL = () => {
  return (
    <div
      style={{
        width: "inherit",
        height: "inherit"
      }}
    >
      <FaAngleLeft
        size={25}
        color="#00000080"
        style={{
          position: "absolute",
          top: "7px",
          left: "7px"
        }}
      />
    </div>
  );
};

const ArrowR = () => {
  return (
    <div
      style={{
        width: "inherit",
        height: "inherit"
      }}
    >
      <FaAngleRight
        size={25}
        color="#00000080"
        style={{
          position: "absolute",
          top: "7px",
          left: "7px"
        }}
      />
    </div>
  );
};

class HMenuArr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: this.props.menu
    };
  }
  render() {
    return (
      <div
        className=""
        style={{
          width: "93.45%",
          borderBottom: "1px solid lightgrey"
        }}
      >
        <ScrollMenu
          data={this.state.menu}
          selected={1}
          wheel={false}
          transition={0.2}
          alignCenter={false}
          alignOnResize={true}
          dragging={false}
          arrowClass="arrow-horizontal-list-renderer"
          arrowRight={ArrowR()}
          arrowLeft={ArrowL()}
        />
      </div>
    );
  }
}

class ListaHorizontal extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list);
  }

  render() {
    // Create menu from items
    return (
      <div style={{ marginBottom: "50px" }}>
        <HMenuArr menu={this.menuItems} />
      </div>
    );
  }
}
export default ListaHorizontal;
