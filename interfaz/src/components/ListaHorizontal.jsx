import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import imagenPrueba from "../assets/landscape.jpg";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import iconoAsign from "../assets/favicon.ico";
import { Link } from "react-router-dom";

// list of items
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

// One item component
// selected prop will be passed
export const MenuItem = ({ url, img }) => {
  return (
    <div>
      <div className="menu-item">
        <Link to={`/video/${url}`}>
          <img src={img} width="210" height="118" alt="videoX" />
        </Link>
        <div>
          <div style={{ float: "left", marginTop: "5px" }}>
            <Link to={`/asig/X`}>
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
    const { name, image } = el;

    return <MenuItem url={name} key={name} img={image} />;
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
