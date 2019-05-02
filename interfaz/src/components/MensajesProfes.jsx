import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVerticalProfes from "./ListaVerticalProfes";
import imagenUsuario from "../assets/user.png";
import { RemoveAccents } from "../config/Procesar";
import { Redirect, Link } from "react-router-dom";
import { isSignedIn } from "../config/Auth";

const list = [
  {
    name: "Béjar Hernández, Ruben",
    image: imagenUsuario
  },
  {
    name: "Lacasta Miguel, Javier",
    image: imagenUsuario
  },
  {
    name: "Zarazaga Soria, F. Javier",
    image: imagenUsuario
  },
  {
    name: "Latre, Miguel Ángel",
    image: imagenUsuario
  },
  {
    name: "Nogueras, Javier",
    image: imagenUsuario
  },
  {
    name: "García Vallés, Fernando",
    image: imagenUsuario
  },
  {
    name: "Suárez Gracia, Darío",
    image: imagenUsuario
  },
  {
    name: "Lopez-Pellicer, Fracisco J.",
    image: imagenUsuario
  },
  {
    name: "Resano Ezcaray, Jesús Javier",
    image: imagenUsuario
  }
];

class ProfesoresLista extends Component {
  constructor(props) {
    super(props);
    this.state = { listaProfesores: this.props.historial };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listaProfesores: nextProps.historial });
  }

  render() {
    return (
      <div>
        {!this.props.fixed ? (
          <div style={{ display: "block", marginRight: "50px" }}>
            <div className="profesores-asignaturas">
              <input
                onChange={this.props.handleChange}
                onKeyDown={this.props.keyDown}
                defaultValue={this.props.busqueda}
                style={{
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  backgroundColor: "#fafafa",
                  borderWidth: "0px 0px 1px 0px",
                  borderColor: "lightgrey",
                  width: "calc(100% - 67%)",
                  color: "#00000080",
                  outline: "none"
                }}
                placeholder={"Buscar profesor..."}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "25px"
                }}
              >
                <ListaVerticalProfes lista={this.state.listaProfesores} />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", marginRight: "70px" }}>
            <div style={{ paddingRight: "300px" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "25px"
                  }}
                >
                  <ListaVerticalProfes lista={this.state.listaProfesores} />
                </div>
              </div>
            </div>
            <div
              className="profesores-asignatura"
              style={{ position: "fixed", right: "70px" }}
            >
              <input
                onChange={this.props.handleChange}
                onKeyDown={this.props.keyDown}
                defaultValue={this.props.busqueda}
                style={{
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  backgroundColor: "#fafafa",
                  borderWidth: "0px 0px 1px 0px",
                  borderColor: "lightgrey",
                  width: "100%",
                  color: "#00000080",
                  outline: "none"
                }}
                placeholder={"Buscar profesor..."}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

class MensajesProfes extends Component {
  constructor() {
    super();
    this.state = {
      contentMargin: "300px",
      fixed: window.innerWidth >= 970,
      busqueda: "",
      miHistorial: list,
      historialFiltrado: [],
      filtrado: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.borrarHistorial = this.borrarHistorial.bind(this);
    this.buscarHistorial = this.buscarHistorial.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  borrarHistorial() {
    this.setState({ miHistorial: [], fixed: false });
  }

  buscarHistorial(e) {
    e.preventDefault();
    this.setState({ busqueda: e.target.value });
    if (e.target.value === "") {
      this.setState({ historialFiltrado: [], filtrado: false });
    }
  }

  keyDown(e) {
    if (this.state.busqueda !== "") {
      if (e.keyCode === 13) {
        const palabras = this.state.busqueda.split(" ");
        var resultado = [];
        this.state.miHistorial.forEach(e => {
          const { name, image } = e;
          for (let index = 0; index < palabras.length; index++) {
            const element = palabras[index];
            if (
              RemoveAccents(name)
                .toLowerCase()
                .includes(RemoveAccents(element).toLowerCase())
            ) {
              resultado.push({ name, image });
              break;
            }
          }
        });
        this.setState({ historialFiltrado: resultado, filtrado: true });
      }
    }
  }

  handleResize() {
    if (this.state.miHistorial.length > 0) {
      if (window.innerWidth <= 970) {
        this.setState({ fixed: false });
      } else {
        this.setState({ fixed: true });
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  render() {
    return !isSignedIn() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Helmet>
          <title>Mensajes | Profesores</title>
          <style>{"body { background-color: #fafafa; }"}</style>
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
          <div style={{ marginBottom: "10px" }}>
            <Link
              to="/mensajes"
              className="link-mensajes"
              style={{ textDecoration: "none", color: "black" }}
            >
              {"Mensajes"}
            </Link>
            <Link
              to="/mensajes-profesores"
              className="link-mensajes-activo"
              style={{ color: "black" }}
            >
              {"Profesores"}
            </Link>
          </div>
          {this.state.miHistorial.length === 0 ? (
            <div
              style={{
                color: "#00000080",
                padding: "10px",
                fontSize: "14px",
                textAlign: "center"
              }}
            >
              Lista vacía, conforme añadas asignaturas, sus profesores irán
              apareciendo aqui.
            </div>
          ) : (
            <ProfesoresLista
              fixed={this.state.fixed}
              borrar={this.borrarHistorial}
              handleChange={this.buscarHistorial}
              keyDown={this.keyDown}
              anyadir={this.anyadirHistorialA}
              historial={
                !this.state.filtrado
                  ? this.state.miHistorial
                  : this.state.historialFiltrado
              }
              busqueda={this.state.busqueda}
            />
          )}
        </div>
      </div>
    );
  }
}

export default MensajesProfes;
