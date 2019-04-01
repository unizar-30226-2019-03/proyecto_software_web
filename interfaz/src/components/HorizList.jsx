import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "../App.css";
import imagenPrueba from "../assets/landscape.jpg";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

// list of items
const list = [
  { name: "#item1", image: imagenPrueba },
  { name: "#item2", image: imagenPrueba },
  { name: "#item3", image: imagenPrueba },
  { name: "#item4", image: imagenPrueba },
  { name: "#item5", image: imagenPrueba },
  { name: "#item6", image: imagenPrueba }
];

// One item component
// selected prop will be passed
const MenuItem = ({ url, img }) => {
  return (
    <div>
      <div className="menu-item">
        <a href={url}>
          <img src={img} width="210" height="118" alt="videoX" />
        </a>
      </div>
      <div>Hola</div>
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

const ArrowL = hide => {
  return (
    <div>
      <FaAngleLeft size={25} color="#00000080" style={{ visibility: hide }} />
    </div>
  );
};

const ArrowR = hide => {
  return (
    <div>
      <FaAngleRight size={25} color="#00000080" style={{ visibility: hide }} />
    </div>
  );
};

const HMenuArr = ({ menu }) => {
  return (
    <div
      className=""
      style={{
        width: "96%",
        borderBottom: "1px solid lightgrey"
      }}
    >
      <ScrollMenu
        data={menu}
        wheel={false}
        transition={0.15}
        alignCenter={false}
        dragging={false}
        arrowRight={ArrowR("visible")}
        arrowLeft={ArrowL("visible")}
      />
    </div>
  );
};

const HMenu = ({ menu }) => {
  return (
    <div
      className=""
      style={{
        width: "96%",
        borderBottom: "1px solid lightgrey"
      }}
    >
      <ScrollMenu
        data={menu}
        wheel={false}
        transition={0.15}
        alignCenter={false}
        dragging={false}
        arrowRight={ArrowR("hidden")}
        arrowLeft={ArrowL("hidden")}
      />
    </div>
  );
};

class HorizList extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list);
    this.state = {
      arrows: this.props.useArrows
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.useArrows !== this.state.arrows) {
      this.setState({ arrows: newProps.useArrows });
    }
  }

  render() {
    // Create menu from items
    return (
      <div style={{ marginBottom: "50px" }}>
        {this.state.arrows ? (
          <HMenuArr menu={this.menuItems} />
        ) : (
          <HMenu menu={this.menuItems} />
        )}
      </div>
    );
  }
}
export default HorizList;
