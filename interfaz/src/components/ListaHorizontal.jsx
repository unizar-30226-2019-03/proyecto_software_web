import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import imagenPrueba from "../assets/landscape.jpg";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import iconoAsign from "../assets/favicon.ico";
import { Link } from "react-router-dom";
import { getTime } from "./ViendoVideo";

// list of items
const list = [
  {
    name: "item1",
    canal: "Asignatura A",
    image: imagenPrueba,
    duracion: getTime(500)
  },
  {
    name: "item2",
    canal: "Asignatura B",
    image: imagenPrueba,
    duracion: getTime(600)
  },
  {
    name: "item3",
    canal: "Asignatura C",
    image: imagenPrueba,
    duracion: getTime(700)
  },
  {
    name: "item4",
    canal: "Asignatura D",
    image: imagenPrueba,
    duracion: getTime(800)
  },
  {
    name: "item5",
    canal: "Asignatura E",
    image: imagenPrueba,
    duracion: getTime(900)
  },
  {
    name: "item6",
    canal: "Asignatura F",
    image: imagenPrueba,
    duracion: getTime(1000)
  },
  {
    name: "item7",
    canal: "Asignatura G",
    image: imagenPrueba,
    duracion: getTime(1100)
  },
  {
    name: "item8",
    canal: "Asignatura H",
    image: imagenPrueba,
    duracion: getTime(1200)
  },
  {
    name: "item9",
    canal: "Asignatura I",
    image: imagenPrueba,
    duracion: getTime(1300)
  },
  {
    name: "item10",
    canal: "Asignatura J",
    image: imagenPrueba,
    duracion: getTime(1400)
  },
  {
    name: "item11",
    canal: "Asignatura K",
    image: imagenPrueba,
    duracion: getTime(1500)
  },
  {
    name: "item12",
    canal: "Asignatura L",
    image: imagenPrueba,
    duracion: getTime(1600)
  }
];

// One item component
// selected prop will be passed
const MenuItem = ({ url, canal, img, duracion }) => {
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
        </Link>
        <div>
          <div style={{ float: "left", marginTop: "5px" }}>
            <Link to={`/asig/${canal}`}>
              <img
                src={iconoAsign}
                alt={url}
                width="25px"
                height="25px"
                style={{ borderRadius: "50%" }}
              />
            </Link>
          </div>
          <div style={{ marginLeft: "30px", lineHeight: "normal" }}>
            {" "}
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
        </div>
        <div className="fecha-subida">Hace X min</div>
      </div>
    </div>
  );
};

// All items component
// Important! add unique key
export const Menu = list =>
  list.map(el => {
    const { name, canal, image, duracion } = el;

    return (
      <MenuItem
        url={name}
        key={name}
        img={image}
        canal={canal}
        duracion={duracion}
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
