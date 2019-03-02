import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import  CustomNavBar from './CustomNavBar';
import Video from './Video';

class Home extends Component {
    render() {
        return (
            <div>
            <CustomNavBar />
            
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
                <div class="container" style={{height: '400px', width: '400px'}} >
                    <Video />
                </div>
            </Jumbotron>
            </div>
        );
    }
}

export default Home;