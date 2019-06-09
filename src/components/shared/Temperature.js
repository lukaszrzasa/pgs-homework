import React from 'react';
import {connect} from "react-redux";

const Temperature = (props) => {

    return (<>
        {(Math.round(((props.degreesMode===2) ? props.value : (props.value-32)*(5/9))*10)/10)}
        &deg;
        {(props.degreesMode===1?'C':'F')}
    </>);
};

const mapStateToProps = (state) => {
    return {
        degreesMode:state.appSettings.degreesMode
    }
};
export default connect(mapStateToProps)(Temperature);