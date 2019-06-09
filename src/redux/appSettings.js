import {REHYDRATE} from "redux-persist/es/constants";

const SET_DEGREES = 'SET_DEGREES';

export const setDegrees = mode => ({type:SET_DEGREES,payload:mode});

const initialState = {
    degreesMode:1// 1 = Celsius, 2 = Fahrenheit
};

const appSettingsReducer = (state = initialState, action) => {
    switch(action.type){
        case REHYDRATE:
            if(typeof action.payload === 'undefined') return {...state};
            return {...state,...action.payload.appSettings};
        case SET_DEGREES:
            return {...state,degreesMode: [1,2].indexOf(action.payload)!==-1?action.payload:1};
        default:
            return {...state};
    }
};

export default appSettingsReducer;