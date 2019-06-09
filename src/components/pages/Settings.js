import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {setDegrees} from "../../redux/appSettings";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Settings = (props) => {

    return (<>
        <Container className="pt-4">
            <h1>Ustawienia</h1>
            <hr/>
            <Row>
                <Col xs="4" className="px-3">Jednostka </Col>
                <Col>
                    <Form.Check name="setting-degrees-mode" type="radio" label="&deg;C" onChange={()=>props.setDegrees(1)} checked={props.degreesMode===1} id="degrees-celsius" />
                    <Form.Check name="setting-degrees-mode" type="radio" label="&deg;F" onChange={()=>props.setDegrees(2)} checked={props.degreesMode===2} id="degrees-fahrenheit" />
                </Col>
            </Row>
            <hr/>
            <div className="d-flex justify-content-end">
                <Link className="ml-auto btn btn-outline-primary" to="/" variant="outline-primary"><FontAwesomeIcon icon="arrow-circle-left"/> Powrót</Link>
            </div>
        </Container>
    </>);
};

const mapStateToProps = (state) => {
    return {
        degreesMode:state.appSettings.degreesMode,
    }
};

const mapDispatchToProps  = (dispatch) => {
    return {
        setDegrees:(mode)=>dispatch(setDegrees(mode)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Settings);