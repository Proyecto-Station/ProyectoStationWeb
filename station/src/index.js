import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppBarView from './view/AppBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppBarView />
    <h1>Hola Mundo!</h1>
  </React.StrictMode>
);

reportWebVitals();
