import React, { Component } from "react";
import BarraNavegacion from "./BarraNavegacion";
import { Helmet } from "react-helmet";
import { Button, Form, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import {
  isSignedIn,
  getUserID,
  restriccionNombre,
  restriccionUser,
  emailPattern,
  restriccion,
  getUserRole
} from "../config/Auth";
import { checkFileExtensionImage } from "../config/Process";
import { getUser, updateUser } from "../config/UserAPI";
import {
  getUnivesities,
  getDegreesFromUnivesity
} from "../config/UniversityAPI";

const FormularioDatos = (
  handleSubmit,
  nombre,
  apellidos,
  userID,
  email,
  passwd,
  passwd2,
  foto,
  universidad,
  carrera,
  user,
  description,
  handleChangeDescription,
  img_valida,
  nombreInvalido,
  apellidoInvalido,
  userInvalido,
  emailInvalido,
  passNoIguales,
  passNoValida,
  listaUniversidades,
  listaCarreras,
  handleChangeUni
) => {
  return (
    <div style={{ margin: "0 20% 0 0" }}>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label style={{ color: nombreInvalido ? "red" : "black" }}>
              {nombreInvalido ? "Nombre inválido" : "Nombre *"}
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.name}
              required
              ref={nombre}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label style={{ color: apellidoInvalido ? "red" : "black" }}>
              {apellidoInvalido ? "Apellidos inválido" : "Apellidos *"}
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.surnames}
              required
              ref={apellidos}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridUserID">
          <Form.Label style={{ color: userInvalido ? "red" : "black" }}>
            {userInvalido
              ? "Nombre de usuario inválido"
              : "Nombre de usuario *"}
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.username}
            required
            ref={userID}
          />
        </Form.Group>

        <Form.Group controlId="formGridEmail">
          <Form.Label style={{ color: emailInvalido ? "red" : "black" }}>
            {emailInvalido ? "Email inválido" : "Email *"}
          </Form.Label>
          <Form.Control
            defaultValue=""
            type="email"
            placeholder="Si no escribe nada no se modificará su correo"
            ref={email}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPasswd">
            {passNoValida ? (
              <Form.Label style={{ color: "red" }}>
                Contraseña inválida
              </Form.Label>
            ) : passNoIguales ? (
              <Form.Label style={{ color: "red" }}>
                Contraseñas no iguales
              </Form.Label>
            ) : (
              <Form.Label>Contraseña*</Form.Label>
            )}
            <Form.Control
              placeholder="Si no escribe nada no se modificará su contraseña"
              defaultValue=""
              type="password"
              ref={passwd}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPasswd2">
            <Form.Label>Confirmar contraseña *</Form.Label>
            <Form.Control defaultValue="" type="password" ref={passwd2} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUni">
            <Form.Label>¿En qué universidad estudias?</Form.Label>
            <Form.Control
              as="select"
              ref={universidad}
              onChange={e => handleChangeUni(e)}
            >
              <option value={0}>Elige una universidad...</option>
              {listaUniversidades.map(e => {
                const { id, name } = e;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCarrera">
            <Form.Label>¿Qué carrera?</Form.Label>
            <Form.Control as="select" ref={carrera}>
              <option value={0}>Elige una carrera...</option>
              {listaCarreras.map(e => {
                const { id, name } = e;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridFoto">
          <Form.Label style={{ color: img_valida ? "black" : "red" }}>
            {img_valida ? "Foto de usuario" : "Formato de imagen inválido"}
          </Form.Label>
          <div style={{ display: "flex" }}>
            <Form.Control
              type="file"
              accept="image/*"
              ref={foto}
              onChange={event => {
                var output = document.getElementById("output");
                output.src = URL.createObjectURL(event.target.files[0]);
              }}
            />
            <img
              id="output"
              src={user.photo}
              alt="Foto de perfil"
              width="60px"
              height="60px"
              style={{ marginTop: "-10px", borderRadius: "50%" }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={handleChangeDescription}
            rows="3"
            style={{ resize: "none" }}
          />
        </Form.Group>

        <Button
          className="boton-filtro"
          style={{ float: "right" }}
          type="submit"
        >
          Confirmar
        </Button>

        <Link to="/perfil">
          <Button
            className="boton-filtro"
            style={{
              float: "left",
              marginBottom: "20px"
            }}
          >
            Cancelar
          </Button>
        </Link>
      </Form>
    </div>
  );
};

class EditarPerfil extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      contentMargin: "300px",
      datosValidados: false,
      datosInvalidos: false,
      passValida: -1,
      listaUniversidades: [],
      listaCarreras: [],
      user: {},
      description: "",
      img_valida: true,
      nombreInvalido: false,
      apellidoInvalido: false,
      userInvalido: false,
      emailInvalido: false,
      passNoIguales: false,
      passNoValida: false
    };
    this.nombre = React.createRef();
    this.apellidos = React.createRef();
    this.email = React.createRef();
    this.userID = React.createRef();
    this.pass = React.createRef();
    this.pass2 = React.createRef();
    this.foto = React.createRef();
    this.universidad = React.createRef();
    this.carrera = React.createRef();
    this.getData = this.getData.bind(this);
    this.handleSubmitDatos = this.handleSubmitDatos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeUni = this.handleChangeUni.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.getAllUniversities = this.getAllUniversities.bind(this);
  }

  getData() {
    getUser(getUserID(), u => {
      if (this._isMounted) {
        this.setState({ user: u, description: u.description });
      }
    });
    getUnivesities(0, data => {
      if (data._embedded.universities.length === 20) {
        this.getAllUniversities(data._embedded.universities, 1);
      } else {
        if (this._isMounted) {
          this.setState({ listaUniversidades: data._embedded.universities });
        }
      }
    });
  }

  componentWillMount() {
    this._isMounted = true;
    if (isSignedIn()) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getAllUniversities(unis, page) {
    if (unis.length < 20 * page) {
      if (this._isMounted) {
        this.setState({ listaUniversidades: unis });
      }
    } else {
      getUnivesities(page, data => {
        const newData = [...unis, ...data._embedded.universities];
        this.getAllUniversities(newData, page + 1);
      });
    }
  }

  handleChangeUni(e) {
    const uniId = parseInt(e.target.value);
    //ACTUALIZAR LISTA DE CARRERAS (getDegreesFromUniversity)
    getDegreesFromUnivesity(uniId, data => {
      this.setState({ listaCarreras: data._embedded.degrees });
    });
  }

  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  /**
   * Comprueba que nombre, apellidos, userID, email, pass y pass2, y foto son correctas.
   * De ser así, actualiza el usuario. Si se ha actualizado el usuario, pondrá datosValidos a true,
   * y datosInvalidos a false. En el caso contrario será al reves.
   * @param {*} event 
   */
  handleSubmitDatos(event) {
    event.preventDefault();
    const nombre = this.nombre.current.value;
    const apellidos = this.apellidos.current.value;
    const userID = this.userID.current.value;
    const email = this.email.current.value;
    const pass = this.pass.current.value;
    const pass2 = this.pass2.current.value;
    const foto = this.foto.current.value;
    const descripcion = this.state.description;
    const universidad = parseInt(this.universidad.current.value);
    const carrera = parseInt(this.carrera.current.value);
    let ok = true;

    //Comporobar nombre y apellidos
    if (!nombre.match(restriccionNombre)) {
      ok = false;
      this.setState({ nombreInvalido: true });
    } else {
      this.setState({ nombreInvalido: false });
    }
    if (!apellidos.match(restriccionNombre)) {
      ok = false;
      this.setState({ apellidoInvalido: true });
    } else {
      this.setState({ apellidoInvalido: false });
    }

    //Comprobar nombre de usuario
    if (!userID.match(restriccionUser)) {
      ok = false;
      this.setState({ userInvalido: true });
    } else {
      this.setState({ userInvalido: false });
    }

    // Comprobar email
    if (!email.match(emailPattern)) {
      if (email !== "") {
        ok = false;
        this.setState({ emailInvalido: true });
      }
    } else {
      this.setState({ emailInvalido: false });
    }

    //Comprobar passwords
    if (pass.match(restriccion)) {
      if (pass !== pass2) {
        ok = false;
        this.setState({ passNoIguales: true, passNoValida: false });
      } else {
        this.setState({ passNoIguales: false, passNoValida: false });
      }
    } else {
      if (pass !== "") {
        ok = false;
        this.setState({ passNoValida: true });
      }
    }

    //Comprobar imagen
    if (!checkFileExtensionImage(foto) && foto !== "") {
      ok = false;
      this.setState({ img_valida: false });
    }

    if (ok) {
      updateUser(
        userID,
        pass,
        email,
        descripcion,
        nombre,
        apellidos,
        universidad,
        carrera,
        this.foto.current.files[0],
        updated => {
          if (updated) {
            this.setState({ datosValidados: true, datosInvalidos: false });
          } else {
            this.setState({ datosValidados: false, datosInvalidos: true });
          }
        }
      );
    } else {
      this.setState({ datosValidados: false, datosInvalidos: true });
    }
  }

  handleChange(display) {
    if (display) {
      this.setState({
        contentMargin: "300px"
      });
    } else {
      this.setState({
        contentMargin: "70px"
      });
    }
  }

  render() {
    return !isSignedIn() || getUserRole() === "ROLE_ADMIN" ? (
      <Redirect
        to={{
          pathname: "/",
          state: {
            url: `/perfil`
          }
        }}
      />
    ) : (
      <div>
        <Helmet>
          <title>Editar Perfil | UniCast</title>
          <style>{"body { background-color: #fafafa; }"}</style>
        </Helmet>
        {this.state.datosValidados ? (
          <Redirect to={"/perfil"} />
        ) : (
          <div>
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
              <h5
                style={{
                  color: this.state.datosInvalidos ? "red" : "black"
                }}
              >
                {this.state.datosInvalidos
                  ? "No se ha podido actualizar el usuario, compruebe los datos"
                  : "Editar perfil"}
              </h5>
              <div>
                {FormularioDatos(
                  this.handleSubmitDatos,
                  this.nombre,
                  this.apellidos,
                  this.userID,
                  this.email,
                  this.pass,
                  this.pass2,
                  this.foto,
                  this.universidad,
                  this.carrera,
                  this.state.user,
                  this.state.description,
                  this.handleChangeDescription,
                  this.state.img_valida,
                  this.state.nombreInvalido,
                  this.state.apellidoInvalido,
                  this.state.userInvalido,
                  this.state.emailInvalido,
                  this.state.passNoIguales,
                  this.state.passNoValida,
                  this.state.listaUniversidades,
                  this.state.listaCarreras,
                  this.handleChangeUni
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditarPerfil;
