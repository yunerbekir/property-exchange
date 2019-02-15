import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { makeRootReducer } from './reducers/root.reducer';

export const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */
export const store = createStore(
    connectRouter(history)(makeRootReducer()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunk,
        ),
    )
);
/* eslint-enable */

store.asyncReducers = {};

