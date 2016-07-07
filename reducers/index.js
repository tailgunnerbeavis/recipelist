import { combineReducers } from 'redux';
import store, * as fromCart from './store';
import recipes, * as fromRecipes from './recipes';
import ingredients, * as fromIngredients from './ingredients';
var _ = require('lodash');

export default combineReducers({
  store,
  recipes,
  ingredients
});

function getAllRecipes(state) {
  return fromRecipes.getAllRecipes(state.recipes);
}

function getRecipe(state, recipeName) {
  return fromRecipes.getRecipe(state.recipes, recipeName);
}

export function getSelectedIngredients(state) {
  var ingredientList = []
  fromRecipes.getSelectedRecipes(_.get(state,'recipes', [])).map(function(recipe){
    ingredientList = ingredientList.concat( getRecipe(state, recipe).ingredients );
  });
  return ingredientList;
}

export function getFilteredRecipes(state) {
  var recipeList = [];
  fromRecipes.getAllRecipes(_.get(state, 'recipes', [])).map(function(recipe){
    var filters = fromIngredients.getFilterIngredients(state.ingredients);
    if (filters.every(function(filter){
      return recipe.ingredients.indexOf(filter) > -1;
    })) {
      recipeList = recipeList.concat( recipe.name );
    }
  })
  return recipeList;
}