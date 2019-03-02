import React, { Component } from 'react';
import { MDBCol } from 'mdbreact';
import { FaSearch } from 'react-icons/fa';

class SearchBar extends Component {
    render() {
        return (
            <MDBCol md="6">
                <form className="form-inline mt-4 mb-4">
                    <FaSearch />
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                </form>
            </MDBCol>
        );
    }
}

export default SearchBar;