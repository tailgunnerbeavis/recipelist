import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllIngredients, getFilterIngredients } from '../reducers/ingredients'
import { selectIngredientFilter, unselectIngredientFilter } from '../actions/index'
import Filter from '../components/Filter'
import Autosuggest from 'react-autosuggest';

class FilterContainer extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: this.getSuggestions('')
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value, reason }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
    if(reason === ('enter' || 'click')) {
    	console.log("save " + value);
    	this.props.selectIngredientFilter(value);
    }
  }

	getSuggestions(value) {
	  const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

	  return inputLength === 0 ? [] : this.props.ingredients.filter(lang =>
	    lang.toLowerCase().slice(0, inputLength) === inputValue
	  );
	}

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Filter by Ingredient',
      value,
      onChange: this.onChange
    };
    console.log(this.props.filter_ingredients)
  	var filters = this.props.filter_ingredients.map( (ingredient, index) =>
        <Filter
          ingredient={ingredient}
          onFilterButtonClicked={() => this.props.unselectIngredientFilter(ingredient)}
          key={index}/>
    )  

    return (
    	<div className='filter'>
	    <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}/>
        {filters}
        </div>

    );
  }
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

FilterContainer.propTypes = {
  ingredients: PropTypes.array.isRequired,
  filter_ingredients: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    ingredients: getAllIngredients(state.ingredients),
    filter_ingredients: getFilterIngredients(state.ingredients) 
  }
}

export default connect(
  mapStateToProps,
  { selectIngredientFilter, unselectIngredientFilter }
)(FilterContainer)