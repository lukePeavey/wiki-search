import React, { Component } from 'react'
import SearchBar from '../search-bar/SearchBar'
import SearchResults from '../search-results/SearchResults'
import { isEmpty } from 'lodash'
import { fetchSuggestions, fetchResults } from '../../api'
import './App.css'
import wikiLogo from '../../images/wikipedia.png'

class App extends Component {
  state = {
    results: [],
    value: '',
    showingResults: false,
    searchPlaceholder: 'Search Wikipedia...'
  }

  submitSearch = (event, { value }) => {
    fetchResults(value)
      .then(results => {
        this.setState({ results, showingResults: true })
        window.setTimeout(() => this.clearSearchBar(), 5) // hack
      })
      .catch(this.setState({ results: [] }))
  }

  clearSearchBar = () => {
    this.textInput.clear()
  }

  render() {
    const { results, showingResults } = this.state
    return (
      <div className={`app ${showingResults ? 'showingResults' : ''}`}>
        <section className="header">
          <a href="/" className="home material-icons" />
          <SearchBar
            ref={(input) => { this.textInput = input }}
            onSubmit={this.submitSearch}
            onChange={() => {}}
            placeholder={showingResults ? 'Search Wikipedia again...' : 'Search Wikipedia...'}
          />
        </section>
        <section className="content">
          <SearchResults results={results} />
        </section>
      </div>
    )
  }
}

export default App
