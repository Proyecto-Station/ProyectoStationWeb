import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import axios from 'axios'
import App from './App'

const datos = JSON.parse(localStorage.getItem('data'))

axios.defaults.baseURL = 'http://fast-refuge-29958.herokuapp.com/api/'

if (datos) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + datos.accessToken
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
