import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const MenuItem = ({ name, img, uni }) => {
  return (
    <div
      style={{
        marginBottom: "16px",
        display: "flex"
      }}
    >
      <div>
        <Link
          to={`/profesor/${name}`}
          style={{ display: "flex", color: "black", textDecoration: "none" }}
        >
          <img
            src={img}
            width="125"
            height="125"
            style={{ borderRadius: "50%" }}
            alt="videoX"
          />
          <div
            style={{
              fontWeight: "400",
              fontSize: "20px",
              marginLeft: "30px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              marginTop: "45px",
              marginBottom: "45px"
            }}
          >
            {name} - {uni}
          </div>
        </Link>
      </div>
      <div
        style={{
          marginRight: "0",
          marginLeft: "auto",
          marginTop: "45px",
          marginBottom: "45px"
        }}
      >
        <Link
          to={`/chat/${name}`}
          className="universidad"
          style={{ textDecoration: "none" }}
        >
          <Button
            className="boton-filtro"
            style={{
              whiteSpace: "nowrap"
            }}
          >
            Enviar un mensaje
          </Button>
        </Link>
      </div>
    </div>
  );
};

// All items component
// Important! add unique key
const MenuVertical = list =>
  list.map(el => {
    const { name, image, uni } = el;

    return <MenuItem name={name} key={name} img={image} uni={uni} />;
  });

class BusquedaProfesores extends Component {
  constructor(props) {
    super(props);
    this.menu = MenuVertical(this.props.lista);
  }
  render() {
    return <div>{this.menu}</div>;
  }
}

export default BusquedaProfesores;
