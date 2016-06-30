import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import { getAllRecipes, getAllIngredients } from './actions';
import App from './containers/App';
import * as storage from 'redux-storage';
import { RECEIVE_RECIPES } from './constants/ActionTypes';

const reducer = storage.reducer(combineReducers(reducers));

import createEngine from 'redux-storage-engine-localstorage';
const engine = createEngine('my-save-key');

const middleware = [ thunk, logger(), storage.createMiddleware(engine) ];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);
load(store);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

store.dispatch(getAllRecipes());
store.dispatch(getAllIngredients());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);