import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

import './assets/css/bootstrap.css'
import {Provider} from 'react-redux';
import App from "./App";
import configureStore from "./store/configureStore";
import {initialState} from "./utils/initialState";

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>,
    document.getElementById('root'));

registerServiceWorker();
