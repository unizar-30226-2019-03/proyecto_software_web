import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaHorizontal from "./ListaHorizontal";
import { FaPlus, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

class Listas extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "70px" });
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Mis Listas</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        <BarraNavegacion
          logOut={this.props.logOut}
          onChange={this.handleChange}
          activar={"listas"}
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
          <div>
            <div
              style={{
                width: "93.45%",
                display: "flex",
                borderBottom: "1px solid lightgrey",
                marginBottom: "40px"
              }}
            >
              <h5
                style={{
                  fontWeight: "bold"
                }}
              >
                Mis listas de reproducción
              </h5>
              <div className="anyadir-lista" onClick={() => alert("Hola")}>
                <div style={{ marginRight: "5px" }}>
                  <FaPlus color={"#00000080"} />
                </div>
                <div style={{ marginTop: "2px", color: "#00000080" }}>
                  NUEVA LISTA
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción A
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción B
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción C
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <h6 style={{ fontWeight: "bold" }}>
                    Lista de reproducción D
                  </h6>
                </div>
                <div style={{ display: "flex", marginTop: "-4px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      marginRight: "15px"
                    }}
                  >
                    <FaPencilAlt className="icono-lista" />
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <FaRegTrashAlt className="icono-lista" />
                  </div>
                </div>
              </div>
              <ListaHorizontal />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Listas;
