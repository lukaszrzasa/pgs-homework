import React, {useEffect,useState} from 'react';
import {connect} from "react-redux";
import {Badge, Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {addCityToList} from "../../redux/cities";
import Temperature from "../shared/Temperature";

const CityDetails = (props) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isNotFound,setIsNotFount] = useState(false);

    useEffect(()=>{
        if(typeof props.cities[props.match.params.id] !== 'undefined'){
            updateCity(props.match.params.id);
        }
    },[]);

    const updateCity = (id) => {
        if(isLoading===false) {
            setIsLoading(true);
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=960eb5e22444bcd7583f3a4d7c3926fe&units=imperial`).then(
                response => {
                    const data = {
                        avgTemp: response.data.list.reduce((total, el) => {
                            return total + el.main.temp
                        }, 0) / response.data.list.length,
                        coord: {...response.data.city.coord},
                        name: response.data.city.name,
                        id: response.data.city.id,
                    };
                    props.addCityToList(data);
                    setIsLoading(false);
                }
            ).catch(() => {
                //error handle
                setIsLoading(false);
                setIsNotFount(true);
            });
        }
    };

    return (<>
        <Container className="pt-4">
            {typeof props.cities[props.match.params.id] !== 'undefined'
            ? <>
                <div className="d-flex align-items-center">
                    <h1>{props.cities[props.match.params.id].name}</h1>
                    {isLoading && <Badge className="ml-3 px-2 py-2" variant="secondary"><FontAwesomeIcon icon="spinner" spin/> Aktualizacja</Badge>}
                    {isNotFound && <Badge className="ml-3 px-2 py-2" variant="secondary">Nie można zaktualizować danych</Badge>}
                </div>
                <hr/>
                <Row>
                    <Col className="py-2" xs="4" className="px-3">Szerokość geograficzna</Col>
                    <Col className="py-2" xs="8">{props.cities[props.match.params.id].coord.lat}</Col>
                    <Col className="py-2" xs="4" className="px-3">Długość geograficzna</Col>
                    <Col className="py-2" xs="8">{props.cities[props.match.params.id].coord.lon}</Col>
                    <Col className="py-2" xs="4" className="px-3">Srednia temperatura</Col>
                    <Col className="py-2" xs="8"><Temperature value={props.cities[props.match.params.id].avgTemp}/></Col>
                </Row>
            </>
            : <>
                <div className="d-flex align-items-center">
                    <h3>Nie dodałeś miasta o takim id do listy</h3>
                    {isLoading && <Badge className="ml-3 px-2 py-2" variant="secondary"><FontAwesomeIcon icon="spinner" spin/> Aktualizacja</Badge>}
                </div>
                <hr/>
                {parseInt(props.match.params.id)==props.match.params.id && !isLoading
                && <Button onClick={()=>{updateCity(props.match.params.id);}} variant="outline-primary"><FontAwesomeIcon icon="search"/> Szukaj miasta i dodaj do listy</Button>}
                    {isNotFound && <span className="text-danger">Nie ma miasta o takim id</span>}
            </>}
            <hr/>
            <div className="d-flex justify-content-end">
                <Link className="ml-auto btn btn-outline-primary" to="/" variant="outline-primary"><FontAwesomeIcon icon="arrow-circle-left"/> Powrót</Link>
            </div>
        </Container>
    </>);
};

const mapStateToProps = (state) => {
    return {
    cities:state.cities
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCityToList:(data)=>dispatch(addCityToList(data)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CityDetails);