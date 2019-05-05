import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuItem extends Component {
  render() {
    return (
      <div
        style={{
          marginBottom: "16px",
          display: "flex"
        }}
      >
        <div>
          <Link to={`/chat/${this.props.url}`}>
            <img src={this.props.img} width="120" height="80" alt="mensajeX" />
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
              to={`/chat/${this.props.url}`}
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
      </div>
    );
  }
}

// All items component
// Important! add unique key
export const MenuVertical = list =>
  list.map(el => {
    const { name, image } = el;

    return <MenuItem url={name} key={name} img={image} />;
  });

class ListaVerticalProfes extends Component {
  constructor(props) {
    super(props);
    this.menu = MenuVertical(this.props.lista);
  }

  componentWillReceiveProps(newProps) {
    this.menu = MenuVertical(newProps.lista);
  }

  render() {
    return <div>{this.menu}</div>;
  }
}

export default ListaVerticalProfes;
