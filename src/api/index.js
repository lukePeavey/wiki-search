import { stringify } from 'query-string'
/**
 * Wrapper for Wiki API requests.
 * @param {Object} params query parameters for the wiki api request
 * @return {Promise} json data or error message
 * @async
 */
async function apiFetch(params = {}) {
  const API_BASE = `https://en.wikipedia.org/w/api.php`
  const query = { format: 'json', origin: '*', ...params }
  try {
    const response = await fetch(`${API_BASE}?${stringify(query)}`)
    const data = await response.json()
    return response.ok ? data : Promise.reject(response.statusText)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * Fetches autocomplete suggestions for the search bar.
 *
 * The 'opensearch' action uses fuzzy matching to get suggested search terms
 * @return {Array.<{title: String, description: String, link: String}>} suggestions
 * @async
 */
export async function fetchSuggestions(value) {
  const params = { search: value, action: 'opensearch', limit: 5 }
  try {
    const suggestions = await apiFetch(params)
    if (!suggestions[1]) return []
    return suggestions[1].map((title, i) => ({
      title,
      description: suggestions[2][i],
      link: suggestions[3][i]
    }))
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * Fetches a list of search results from wiki API for the given search term.
 *
 * This uses the 'query' action to get a set of pages matching the search
 * term. A generator is used to get additional props/info on a set of pages
 * returned by a query, instead of making multiple api requests.
 * @return {Array.<{pageid: Number, title: String, extract: String}>} results
 * @async
 */
export async function fetchResults(value) {
  const params = {
    action: 'query',
    generator: 'search',
    gsrnamespace: 0,
    gsrlimit: 10,
    prop: 'pageimages|extracts',
    pilimit: 'max',
    exintro: '',
    explaintext: '',
    exsentences: 1,
    exlimit: 'max',
    gsrsearch: value
  }
  try {
    const results = await apiFetch(params)
    if (!results.query) return []
    return Object.values(results.query.pages).sort((a, b) => a.index - b.index)
  } catch (err) {
    return Promise.reject(err)
  }
}
