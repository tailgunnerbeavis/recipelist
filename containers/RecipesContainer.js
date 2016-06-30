import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getSelectedRecipes, getAllRecipes } from '../reducers/recipes'
import { getFilteredRecipes } from '../reducers/index'
import { toggleRecipe } from '../actions'
import Recipe from '../components/Recipe'

class RecipesContainer extends Component {
  render() {
    var that = this;
  	var children = this.props.recipes.map(function(recipe, index) {
      var selected = false;
      var filtered = true;
        if(this.props.selected_recipes.indexOf(recipe.name) > -1) {
          selected = true;
        }
        if(this.props.filtered_recipes.indexOf(recipe.name) > -1) {
          filtered = false;

        }
        return <Recipe
          name={recipe.name}
          type={recipe.type}
          cook_time={recipe.cook_time}
          selected={selected}
          filtered={filtered}
          onAddToCartClicked={filtered ? null : () => this.props.toggleRecipe(recipe.name)}
          key={index}/>
        }, this
    )
    return (
    	<div>{children}</div>
    )
  }
}

RecipesContainer.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cook_time: PropTypes.number.isRequired
  })),
  selected_recipes: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    recipes: getAllRecipes(state.default.recipes),
    selected_recipes: getSelectedRecipes(state.default.recipes),
    filtered_recipes: getFilteredRecipes(state.default)
  }
}

export default connect(
  mapStateToProps,
  { toggleRecipe }
)(RecipesContainer)