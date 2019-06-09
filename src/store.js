import {createStore, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import citiesReducer from './redux/cities';
import appSettingsReducer from './redux/appSettings';


const rootPersistConfig = {
    key:'root',
    storage,
};

const rootReducer = combineReducers({
    cities:citiesReducer,
    appSettings:appSettingsReducer,
});


export const store = createStore(
    persistReducer(rootPersistConfig,rootReducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);