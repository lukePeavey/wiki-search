import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import { fetchSuggestions, fetchResults } from '../../api'
import './SearchBar.css'

/**
 * SearchBar component with autocomplete dropdown
 */
export default class SearchBar extends Component {
  state = {
    value: '',
    suggestions: []
  }

  handleChange = (event, { newValue }) => {
    this.setState(prevState => ({
      value: newValue,
      suggestions: newValue === '' ? [] : prevState.suggestions
    }))
    // The parent component can provide onchange callback via props.
    this.props.onChange(newValue)
  }

  handleSubmit = (event, { value }) => {
    event.preventDefault()
    // The submit callback is provided by the parent via props
    this.props.onSubmit(event, { value })
  }

  handleSuggestionFetchRequested = ({ value, reason }) => {
    if (reason === 'input-changed') {
      fetchSuggestions(value)
        .then(suggestions => this.setState({ suggestions }))
        .catch(err => {
          console.warn(err)
          this.setState({ suggestion: [] })
        })
    }
  }

  handleSuggestionSelected = (event, { suggestion }) => {
    this.setState({ suggestions: [] })
    this.handleSubmit(event, { value: suggestion.title })
  }

  render() {
    const { id, placeholder } = this.props
    const { value, suggestions, results } = this.state
    const inputProps = {
      placeholder: 'Search For Anything on Wikipedia',
      onChange: this.handleChange,
      value
    }
    return (
      <form className="searchBar" onSubmit={this.handleSubmit}>
        <Autosuggest
          inputProps={inputProps}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionFetchRequested}
          onSuggestionSelected={this.handleSuggestionSelected}
          alwaysRenderSuggestions={true}
          highlightFirstSuggestion={true}
          getSuggestionValue={suggestion => suggestion.title}
          renderSuggestion={suggestion => <span>{suggestion.title}</span>}
        />
        <i className="material-icons">search</i>
      </form>
    )
  }
}
