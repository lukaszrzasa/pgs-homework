import React from 'react';
import Navigation from "./components/includes/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faArrowCircleLeft,
    faCog,
    faMinusCircle,
    faSearch,
    faSearchPlus,
    faSpinner
} from '@fortawesome/free-solid-svg-icons'
import CitiesList from "./components/pages/CitiesList";
import CityDetails from "./components/pages/CityDetails";
import {Route, Switch} from "react-router-dom";
import Settings from "./components/pages/Settings";

library.add(faCog,faSearch,faSearchPlus,faMinusCircle,faArrowCircleLeft,faSpinner);


const App = () => {
    return (
        <div className="App">
            <Navigation/>
            <Switch>
                <Route path="/" exact component={CitiesList} />
                <Route path="/settings" component={Settings} />
                <Route path="/details/:id" component={CityDetails} />
            </Switch>
        </div>
    );
};


export default App;
