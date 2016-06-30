import * as types from '../constants/ActionTypes'
import recipes from '../api/recipes'
var _ = require('lodash')

function receiveRecipes(recipes) {
  return {
    type: types.RECEIVE_RECIPES,
    recipes: recipes
  }
}

export function getAllRecipes() {
  return dispatch => {
    recipes.getRecipes(recipes => {
      dispatch(receiveRecipes(recipes))
    })
  }
}

export function toggleRecipe(recipeName) {
  return (dispatch, getState) => {
    if(getState().recipes.selectedNames.indexOf(recipeName) > -1) {
      dispatch(unselectRecipe(recipeName))
    } else {
      dispatch(selectRecipe(recipeName))
    }
  }
}

function selectRecipe(recipeName) {
  return {
    type: types.SELECT_RECIPE,
    recipeName: recipeName
  }
}

function unselectRecipe(recipeName) {
  return {
    type: types.UNSELECT_RECIPE,
    recipeName: recipeName
  }
}

export function getSelectedRecipes() {
  const selectedRecipes = getState().selectedRecipes
  return (getState) => {
    type: types.SELECTED_RECIPES,
    selectedRecipes
  }
}

function receiveIngredients(ingredients) {
  return {
    type: types.RECEIVE_INGREDIENTS,
    ingredients: ingredients
  }
}

export function getAllIngredients() {
  return dispatch => {
    recipes.getRecipes(ingredients => {
      dispatch(receiveIngredients(ingredients))
    })
  }
}

export function getFilteredRecipes() {
  const filteredRecipes = getState().filteredRecipes
  return (getState) => {
    type: types.FILTERED_RECIPES,
    filteredRecipes
  }
}

export function selectIngredientFilter(ingredientName) {
  return {
    type: types.SELECT_INGREDIENT_FILTER,
    ingredientName: ingredientName
  }
}

export function unselectIngredientFilter(ingredientName) {
  return {
    type: types.UNSELECT_INGREDIENT_FILTER,
    ingredientName: ingredientName
  }
}
