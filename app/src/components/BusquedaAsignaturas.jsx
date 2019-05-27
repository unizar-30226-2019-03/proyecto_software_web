import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const MenuItem = ({ subject }) => {
  return (
    <div
      style={{
        marginBottom: "16px",
        display: "flex"
      }}
    >
      <div>
        <Link
          to={`/asig/${subject.id}`}
          style={{ display: "flex", color: "black", textDecoration: "none" }}
        >
          <img
            src={
              subject.university === undefined ? "" : subject.university.photo
            }
            width="125"
            height="125"
            style={{ borderRadius: "50%" }}
            alt={subject.name}
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
            {subject.name === undefined ? "" : subject.name} -{" "}
            {subject.university === undefined ? "" : subject.university.name}
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
          to={`/asig/${subject.id}`}
          className="universidad"
          style={{ textDecoration: "none" }}
        >
          <Button
            className="boton-filtro"
            style={{
              whiteSpace: "nowrap"
            }}
          >
            Ir a Asignatura
          </Button>
        </Link>
      </div>
    </div>
  );
};

// All items component
// Important! add unique key
const Menu = list =>
  list.map(el => {
    return <MenuItem subject={el} key={el.id} />;
  });

class BusquedaAsignaturas extends Component {
  constructor(props) {
    super(props);
    this.menu = Menu(this.props.lista);
  }

  componentWillReceiveProps(nextProps) {
    this.menu = Menu(nextProps.lista);
  }

  render() {
    return <div>{this.menu}</div>;
  }
}

export default BusquedaAsignaturas;
