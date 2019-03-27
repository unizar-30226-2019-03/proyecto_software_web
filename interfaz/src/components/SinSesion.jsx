import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

class SinSesion extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        PAGINA DE INICIAR SESION
        <div>
          <Button variant="primary" href="/inicio">
            {"Acceder Inicio"}
          </Button>
        </div>
      </div>
    );
  }
}

export default SinSesion;
