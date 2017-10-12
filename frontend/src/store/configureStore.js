import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// import reducer from '../reducers';
import homePageReducer from "../home/reducer";
import reducers from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(initialState) {
    return createStore(
        reducers,
        // initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )

    );
}
