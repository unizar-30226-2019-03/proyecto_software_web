import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import ListaVerticalProfes from "./ListaVerticalProfes";
import { Redirect, Link } from "react-router-dom";
import { isSignedIn, getUserRole, getUserID } from "../config/Auth";
import { findUserProfessors } from "../config/UserAPI";

class ProfesoresLista extends Component {
  constructor(props) {
    super(props);
    this.state = { listaProfesores: this.props.profesores };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listaProfesores: nextProps.profesores });
  }

  render() {
    return (
      <div>
        <div style={{ display: "block", marginRight: "70px" }}>
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
    );
  }
}

class MensajesProfes extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      profesores: [],
      page: 0
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getData(page) {
    findUserProfessors(page, data => {
      if (this._isMounted) {
        let profesores = this.state.profesores.slice().concat(data);
        //Eliminamos el propio profesor (si lo es)
        const index = profesores.findIndex(p => {
          return p.id === getUserID();
        });
        if (index !== -1) {
          profesores.splice(index, 1);
        }
        this.setState({ page: page + 1, profesores: profesores });
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData(0);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(display) {
    if (display) {
      this.setState({ contentMargin: "300px" });
    } else {
      this.setState({ contentMargin: "71px" });
    }
  }

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/mensajes-profesores`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Profesores | UniCast</title>
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
          {this.state.profesores.length === 0 ? (
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
            <ProfesoresLista profesores={this.state.profesores} />
          )}
        </div>
      </div>
    );
  }
}

export default MensajesProfes;
