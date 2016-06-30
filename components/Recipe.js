import React, { Component, PropTypes } from 'react'

export default class Recipe extends Component {
  render() {
    const { filtered, selected, name, type, cook_time } = this.props
    var css = {};
    if (selected === true) {
    	css = {color: 'blue'};
    }
    if (filtered === true) {
      css = {color: 'grey'};
    }
    return <div onClick={this.props.onAddToCartClicked} style={css}><input type="checkbox" checked={selected} disabled={filtered}/> {name} - {type} - cook time: {cook_time}</div>
  }
}

Recipe.propTypes = {
  cook_time: PropTypes.number,
  type: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  filtered: PropTypes.bool
}