import React, { Component } from 'react';
import logo from '../assets/favicon.ico'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { FaBell, FaEnvelope, FaUser} from 'react-icons/fa'
import SearchBar from './SearchBar';

class CustomNavBar extends Component {
    render() {
        return (
            <Navbar expand="lg" bg="light"  className="shadow-sm mb-5 bg-white rounded" sticky="top">
            <Navbar.Brand href="#">
                <img
                    alt="holi"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />
                {' React Bootstrap'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">  
                <SearchBar /> 
                <Nav className="ml-auto">
                    <Nav.Link href="#home"><FaBell size={20}/></Nav.Link>
                    <Nav.Link href="#link"><FaEnvelope size={20}/></Nav.Link>
                    <NavDropdown alignRight title={<FaUser size={25}/>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default CustomNavBar;