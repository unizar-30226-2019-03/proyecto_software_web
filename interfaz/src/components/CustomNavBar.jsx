import React, { Component } from 'react';
import logo from '../assets/favicon.ico'
import {Navbar, Nav} from 'react-bootstrap';
import { FaBell, FaEnvelope, FaUser} from 'react-icons/fa'
import SearchBar from './SearchBar';
import './DropDown.css';

class CustomNavBar extends Component {
    constructor() {
        super();
        this.state = { displayMenu: false };
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    showDropdown(event) {
        event.preventDefault();
        this.setState({displayMenu: !this.state.displayMenu},() => {
            document.addEventListener('click', this.hideDropdown)})
    }

    hideDropdown() {
        this.setState({displayMenu: false}, () => {
            document.removeEventListener('click', this.hideDropdown)
        })
    }

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
                    <Nav.Link>
                        <div class="dropdown">
                            <FaUser size={25} onClick={this.showDropdown}/>
                            {this.state.displayMenu ? (
                                <div class="dropdown-content">
                                    <a href='#aaa'>Link 1</a>
                                    <a href='#aa'>Link 2</a>
                                    <a href='#a'>Link 3</a>
                                </div>
                                ):
                                (
                                    null
                                )                        
                            }
                        </div>
                        </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default CustomNavBar;