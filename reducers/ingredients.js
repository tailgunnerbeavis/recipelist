import { combineReducers } from 'redux';
import { RECEIVE_INGREDIENTS,
  SELECT_INGREDIENT_FILTER,
  UNSELECT_INGREDIENT_FILTER } from '../constants/ActionTypes';
var _ = require('lodash');

function byName(state = {}, action) {
  switch (action.type) {
    case RECEIVE_INGREDIENTS:
      var ingredients = [];
      if (Array.isArray(action.ingredients)) {
        action.ingredients.forEach(function(recipe) {
          Array.prototype.push.apply(ingredients, recipe.ingredients);
        })
      };
      return Object.assign({}, state, ingredients);
    default:
      return state;
  }
};

export default function filterNames(state = [], action) {
  switch (action.type) {
    case SELECT_INGREDIENT_FILTER:
      return [ ...state, action.ingredientName ];
    case UNSELECT_INGREDIENT_FILTER:
      var newstate = [ ...state ];
      newstate.splice(newstate.indexOf(action.ingredientName), 1);
      return newstate;
    default:
      return state;
  }
};

export default combineReducers({
  byName,
  filterNames
});

export function getIngredient(state, ingredientName) {
  return state.byName[ingredientName];
};

export function getAllIngredients(state) {
  return _.toArray(_.get(state,'byName', []));
};

export function getFilterIngredients(state) {
  return _.get(state, 'filterNames', []);
};