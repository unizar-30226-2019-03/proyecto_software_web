import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getTime } from "../config/Process";
import IconoAsignaturaUniversidad from "./IconoAsignaturaUniversidad";
import { getTimePassed, getScore, getVideoSubject } from "../config/VideoAPI";

// One item component
// selected prop will be passed
class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { asig: {} };
  }

  componentWillMount() {
    getVideoSubject(parseInt(this.props.id), data => {
      this.setState({ asig: data });
    });
  }

  render() {
    return (
      <div>
        <div className="menu-item">
          <Link to={`/video/${this.props.id}`} style={{ position: "relative" }}>
            <img src={this.props.img} width="210" height="118" alt="videoX" />
            <div
              style={{
                color: "white",
                fontSize: "12px",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.7)",
                textDecoration: "none",
                width: "fit-content",
                height: "fit-content",
                position: "absolute",
                right: "4px",
                top: "49px",
                borderRadius: "3px",
                zIndex: "100"
              }}
            >
              {this.props.duracion}
            </div>
            {this.props.showRating ? (
              <div
                style={{
                  color: this.props.rating >= 50 ? "#228B22" : "#DC143C",
                  fontSize: "12px",
                  textAlign: "center",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  textDecoration: "none",
                  width: "40px",
                  height: "fit-content",
                  position: "absolute",
                  left: "4px",
                  top: "49px",
                  borderRadius: "3px",
                  zIndex: "100"
                }}
              >
                {this.props.rating + "%"}
              </div>
            ) : null}
          </Link>
          <div>
            <div style={{ float: "left", marginTop: "5px" }}>
              <Link
                to={`/asig/${this.state.asig.id}`}
                style={{ textDecoration: "none" }}
              >
                <IconoAsignaturaUniversidad
                  name={
                    this.state.asig.abbreviation === undefined
                      ? ""
                      : this.state.asig.abbreviation
                  }
                  image={
                    this.state.asig.university === undefined
                      ? ""
                      : this.state.asig.university.photo
                  }
                />
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
                to={`/video/${this.props.id}`}
              >
                {this.props.title}
              </Link>
            </div>
          </div>
          <div
            className="fecha-subida"
            style={{ marginLeft: "0", marginTop: "2px" }}
          >
            Subido hace {this.props.timestamp}
          </div>
        </div>
      </div>
    );
  }
}

// All items component
// Important! add unique key
export const Menu = (list, now) =>
  list.map(el => {
    const { title, id, thumbnailUrl, score, timestamp, seconds } = el;
    return (
      <MenuItem
        title={title}
        id={id}
        key={title}
        img={thumbnailUrl}
        canal={title}
        duracion={getTime(seconds)}
        rating={getScore(score)}
        timestamp={getTimePassed(timestamp, now)}
        showRating={score === null ? false : true}
        subject={el.subject}
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

  componentWillReceiveProps(newProps) {
    this.setState({ menu: newProps.menu });
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
    this.menuItems = Menu(this.props.list, this.props.now);
  }

  componentWillReceiveProps(newProps) {
    this.menuItems = Menu(newProps.list, this.props.now);
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
