import React, { Component } from 'react';
import logo from '../assets/favicon.ico'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, InputGroup} from 'react-bootstrap';
import { MDBCol } from 'mdbreact';
class CustomNavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">
                <img
                    alt="holi"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {' UniCast'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                        <MDBCol md="6">
                            <form className="form-inline mt-4 mb-4">
                                <MDBIcon icon="search" />
                                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                            </form>
                        </MDBCol>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default CustomNavBar;