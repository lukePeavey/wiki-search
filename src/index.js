import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App'
import registerServiceWorker from './utils/registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
