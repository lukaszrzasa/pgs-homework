import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";

const Navigation = () => {

    return (<Navbar bg="light" expand="lg">
        <Container>
            <Link className="ml-auto btn btn-outline-primary" to="/settings" variant="outline-primary"><FontAwesomeIcon icon="cog"/> Ustawienia</Link>
        </Container>
    </Navbar>);
};

export default Navigation;