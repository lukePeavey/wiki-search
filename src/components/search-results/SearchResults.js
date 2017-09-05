import React from 'react'
import './SearchResults.css'

const SearchResults = ({ results, hidden }) => (
  <section className={`searchResults ${hidden ? 'hidden' : ''}`}>
    {results.map(result => <Result {...result} key={result.pageid} />)}
  </section>
)

const Result = ({ title, extract, pageid, thumbnail }) => (
  <a
    className="result"
    href={`https://en.wikipedia.org/?curid=${pageid}`}
    target="_blank"
  >
    <div className="text">
      <header className="title">{title}</header>
      <div className="extract">{extract}</div>
    </div>
  </a>
)

export default SearchResults
