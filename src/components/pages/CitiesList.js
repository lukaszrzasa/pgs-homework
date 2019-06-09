import React from 'react';
import CitySearch from "../includes/CitySearch";
import {Container, Table,Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {removeCityFromList} from "../../redux/cities";
import {connect} from "react-redux";
import Temperature from '../shared/Temperature';
import {Link} from "react-router-dom";

const CitiesList = (props) => {

    return (<>
        <Container className="pt-5">
            <CitySearch/>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Miasto</th>
                        <th colSpan="2">Średnia prognozowana temperatura</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.cities).map((index,num)=>{
                        const el = props.cities[index];
                        return (
                            <tr key={el.id}>
                                <td>{num+1}</td>
                                <td><Link to={`/details/${el.id}`}>{el.name}</Link></td>
                                <td><Temperature value={el.avgTemp} /></td>
                                <td className="d-flex justify-content-end">
                                    <Button
                                        onClick={()=>props.removeCityFromList(el.id)}
                                        variant="outline-danger"
                                        className="ml-auto w-50">
                                        <FontAwesomeIcon icon="minus-circle"/> Usuń
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
        </Container>
    </>);
};

const mapStateToProps = (state) => {
    return {
        cities:state.cities,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeCityFromList:(id)=>dispatch(removeCityFromList(id)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CitiesList);