import { combineReducers } from 'redux'
import { RECEIVE_RECIPES, SELECT_RECIPE, UNSELECT_RECIPE } from '../constants/ActionTypes'
var _ = require('lodash')

function byName(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RECIPES:
      return Object.assign({},
        state,
        action.recipes.reduce((obj, recipe) => {
          obj[recipe.name] = recipe
          return obj
        }, {})
      )
    default:
      return state
  }
}

function selectedNames(state = [], action) {
  switch (action.type) {
    case SELECT_RECIPE:
      return [ ...state, action.recipeName ]
    case UNSELECT_RECIPE:
      state.splice(state.indexOf(action.recipeName), 1)
      return state
    default:
      return state
  }
}

export default combineReducers({
  byName,
  selectedNames
})

export function getRecipe(state, recipeName) {
  return state.byName[recipeName]
}

export function getAllRecipes(state) {
  return _.toArray(_.get(state,'byName', []))
}

export function getSelectedRecipes(state) {
  return _.get(state, 'selectedNames', [])
}

export default function recipes(state = {}, action) {
  return {}
}