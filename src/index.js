import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'

axios.defaults.baseURL = 'https://enigmatic-sea-26384.herokuapp.com/api'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
