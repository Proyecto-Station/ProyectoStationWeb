import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'

import axios from 'axios'
import App from './App'

const datos = JSON.parse(localStorage.getItem('data'))

axios.defaults.baseURL = 'http://fast-refuge-29958.herokuapp.com/api/'

if (datos) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + datos.accessToken
}

const root = document.getElementById("root");
render(<Router><App /></Router>, root);
       
