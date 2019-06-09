import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {addCityToList} from "../../redux/cities";
import {connect} from "react-redux";

const CitySearch = (props) => {
    const [isInvalid,setIsInvalid] = useState(false);
    const [isLoading,setIsLoading] = useState(false);


    const _handleKeyDown = (e) => {
        if(e.key==='Enter') findCity(e.target.value);
    };

    const findCity = () => {
        const el = document.getElementById('find-city-input');
        if(el.value.length>=2){
            setIsInvalid(false);
            setIsLoading(true);
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${el.value}&appid=960eb5e22444bcd7583f3a4d7c3926fe&units=imperial`).then(
                response=>{
                    const data = {
                        avgTemp:response.data.list.reduce((total,el)=>{return total+el.main.temp},0)/response.data.list.length,
                        coord: {...response.data.city.coord},
                        name:response.data.city.name,
                        id:response.data.city.id,
                    };
                    props.addCityToList(data);
                    setIsLoading(false);
                    el.value = '';
                }
            ).catch(()=>{
                //error handle
                setIsLoading(false);
            });
        } else setIsInvalid(true);
    };

    return (<>
        <Row>
            <Col xs="8">
                <Form.Group>
                    <Form.Control id="find-city-input" onKeyDown={(e)=>_handleKeyDown(e)} isInvalid={isInvalid} type="text" placeholder="Nazwa miasta" />
                </Form.Group>
            </Col>
            <Col xs="4">
                <Button onClick={()=>findCity("Rzeszów")} className="w-100">{isLoading?<><FontAwesomeIcon spin icon="spinner"/> Szukanie</>:<><FontAwesomeIcon icon="search-plus"/> Dodaj</>}</Button>
            </Col>
        </Row>
    </>);
};

const mapDispatchToProps = dispatch => {
    return {
        addCityToList:(data)=>dispatch(addCityToList(data))
    }
};

export default connect(null,mapDispatchToProps)(CitySearch);