import React, { Component } from 'react'
import SearchBar from '../search-bar/SearchBar'
import SearchResults from '../search-results/SearchResults'
import { fetchResults } from '../../api'
import './App.css'

class App extends Component {
  state = {
    results: [],
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
    this.searchBar.clear()
  }

  render() {
    const { results, showingResults } = this.state
    return (
      <div className={`app ${showingResults ? 'showingResults' : ''}`}>
        <section className="header">
          <a
            href={process.env.NODE_ENV === 'development' ? '/' : '/wiki-search'}
            className="home material-icons"
            alt="homepage"
          >
            home
          </a>
          <SearchBar
            ref={component => {
              this.searchBar = component
            }}
            onSubmit={this.submitSearch}
            onChange={() => {}}
            placeholder={
              showingResults ? (
                'Search Wikipedia again...'
              ) : (
                'Search Wikipedia...'
              )
            }
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
