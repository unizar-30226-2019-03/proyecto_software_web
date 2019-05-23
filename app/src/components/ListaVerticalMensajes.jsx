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
        <div style={{ flex: "10%" }}>
          <Link to={`/chat/${this.props.chat.sender.id}`}>
            <img
              src={this.props.chat.sender.photo}
              width="80"
              height="80"
              alt={this.props.chat.sender.username}
              style={{ borderRadius: "50%" }}
            />
          </Link>
        </div>
        <div style={{ flex: "90%" }}>
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
              to={`/chat/${this.props.chat.sender.id}`}
            >
              {this.props.chat.sender.name +
                " " +
                this.props.chat.sender.surnames}
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
                {this.props.chat.text}
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
    return <MenuItem key={el.id} chat={el} />;
  });

class ListaVerticalMensajes extends Component {
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

export default ListaVerticalMensajes;
