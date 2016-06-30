import React, { Component } from 'react';
import RecipesContainer from './RecipesContainer';
import IngredientsContainer from './IngredientsContainer';
import FilterContainer from './FilterContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Recipe List</h2>
        <FilterContainer />
        <hr/>
        <RecipesContainer />
        <hr/>
        <IngredientsContainer />
      </div>
    )
  };
};