import React, { Component, PropTypes } from 'react';

export default class Ingredient extends Component {
  render() {
    const { ingredient } = this.props;
    return <div> {ingredient} </div>
  };
};

Ingredient.propTypes = {
  ingredient: PropTypes.string
};