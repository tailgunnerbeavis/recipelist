import { combineReducers } from 'redux'
import { RECEIVE_INGREDIENTS, SELECT_INGREDIENT_FILTER, UNSELECT_INGREDIENT_FILTER } from '../constants/ActionTypes'
var _ = require('lodash')

function byName(state = {}, action) {
  // console.log(action);
  switch (action.type) {
    case RECEIVE_INGREDIENTS:
      var ingredients = []
      if (Array.isArray(action.ingredients)) {
        action.ingredients.forEach(function(recipe) {
          Array.prototype.push.apply(ingredients, recipe.ingredients)
        })
      }
      return Object.assign({}, state, _.uniq(ingredients).sort())
    default:
      return state
  }
}

export default function filterNames(state = [], action) {
  switch (action.type) {
    case SELECT_INGREDIENT_FILTER:
      return _.uniq([ ...state, action.ingredientName ])
    case UNSELECT_INGREDIENT_FILTER:
      state.splice(state.indexOf(action.ingredientName), 1)
      return state
    default:
      return state
  }
}

export default combineReducers({
  byName,
  filterNames
})

export function getIngredient(state, ingredientName) {
  return state.byName[ingredientName]
}

export function getAllIngredients(state) {
  return _.toArray(state.byName)
}

export function getFilterIngredients(state) {
  // console.log("getfilteringredients")
  // console.log(state)
  return _.get(state, 'filterNames')
}