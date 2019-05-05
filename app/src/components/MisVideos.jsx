import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import icono from "../assets/favicon.ico";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, getUserToken, getUserID } from "../config/Auth";
import { UserApi, ApiClient } from "swagger_unicast";

import IconoAsignaturaUniversidad from "./IconoAsignaturaUniversidad";
import iconoAsign from "../assets/favicon.ico";
import { getTime } from "../config/Procesar";
import { getTimePassed } from "../config/VideoFunc";

// One item component
// selected prop will be passed
const MenuItem = ({ title, url, canal, img, duracion, rating, timestamp }) => {
  return (
    <div>
      <div className="menu-item">
        <Link to={`/video/${title}`} style={{ position: "relative" }}>
          <img src={img} width="210" height="118" alt={title} />
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
              to={`/video/${title}`}
            >
              {title}
            </Link>
          </div>
        </div>
        <div
          className="fecha-subida"
          style={{ marginLeft: "0", marginTop: "2px" }}
        >
          Subido hace {timestamp}
        </div>
      </div>
    </div>
  );
};

// All items component
// Important! add unique key
const Menu = list =>
  list.map(el => {
    const { title, url, thumbnailUrl, score, timestamp } = el;

    return (
      <MenuItem
        title={title}
        url={url}
        key={title}
        img={thumbnailUrl}
        canal={title}
        duracion={getTime(500)}
        rating={score}
        timestamp={getTimePassed(timestamp)}
      />
    );
  });

class MisVideos extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      listaVideos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.UserApi = new UserApi();
  }

  componentWillMount() {
    let defaultClient = ApiClient.instance;
    // Configure Bearer (JWT) access token for authorization: bearerAuth
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    const id = getUserID();
    const opts = {
      cacheControl: "no-cache, no-store, must-revalidate", // String |
      pragma: "no-cache", // String |
      expires: "0" // String |
    };
    this.UserApi.getVideosOfUser(id, opts, (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);

        this.setState({ listaVideos: data._embedded.videos });
      }
    });
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Asignatura</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          onChange={this.handleChange}
          activar={""}
          displaySide={true}
          hide={false}
        />
        <div
          className="transform"
          style={{
            marginLeft: this.state.contentMargin,
            marginTop: "80px"
          }}
        >
          <div className="cabecera-asignatura">
            <div className="titulo-asignatura">
              <img
                src={icono}
                alt="icono asignatura"
                style={{ marginRight: "25px", borderRadius: "50%" }}
                width="60"
                height="60"
              />
              Vídeos subidos
            </div>
            <div className="universidad">
              <Link to="/subir-video">
                <Button
                  style={{
                    backgroundColor: "#235da9",
                    borderColor: "#235da9"
                  }}
                >
                  Subir nuevo vídeo
                </Button>
              </Link>
            </div>
          </div>
          <div style={{ marginRight: "70px" }}>
            <div>
              <div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {Menu(this.state.listaVideos)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MisVideos;
