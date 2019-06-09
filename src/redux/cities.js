import { REHYDRATE } from 'redux-persist';

const ADD_CITY_TO_LIST = 'ADD_CITY_TO_LIST';
const REMOVE_CITY_FROM_LIST = 'REMOVE_CITY_FROM_LIST';

export const addCityToList = cityData => ({type:ADD_CITY_TO_LIST,payload:cityData});
export const removeCityFromList = id => ({type:REMOVE_CITY_FROM_LIST,payload:id});

const initialState = {};

const citiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case REHYDRATE:
            if(typeof action.payload === 'undefined') return {...state};
            return {...state,...action.payload.cities};
        case ADD_CITY_TO_LIST:
            return {...state,[action.payload.id]:action.payload};
        case REMOVE_CITY_FROM_LIST:
            let newState = {...state};
            delete newState[action.payload];
            return newState;
        default:
            return {...state};
    }
};

export default citiesReducer;