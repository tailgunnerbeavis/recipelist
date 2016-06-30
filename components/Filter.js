import React, { Component, PropTypes } from 'react'

export default class Ingredient extends Component {
  render() {
    const { ingredient } = this.props
    return <button className="button" onClick={this.props.onFilterButtonClicked}><span className="button-span"> {ingredient} <i className="material-icons">close</i></span></button>
  }
}

Ingredient.propTypes = {
  ingredient: PropTypes.string
}