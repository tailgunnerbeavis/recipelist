import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSelectedIngredients } from '../reducers/index';
import Ingredient from '../components/Ingredient';

class RecipesContainer extends Component {
  render() {
  	var children = _.uniq(this.props.selected_ingredients).sort().map( (ingredient, index) =>
        <Ingredient
          ingredient={ingredient}
          key={index}/>
    )
    return (
    	<div>{children}</div>
    );
  };
};

RecipesContainer.propTypes = {
  selected_ingredients: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    selected_ingredients: getSelectedIngredients(state.default)
  };
};

export default connect(
  mapStateToProps,
  {}
)(RecipesContainer);