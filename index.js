import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllRecipes, getAllIngredients } from './actions'
import App from './containers/App'
import * as storage from 'redux-storage'

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch(getAllRecipes())
store.dispatch(getAllIngredients())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)