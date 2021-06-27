import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App.jsx';

ReactDOM.render(
  <React.StrictMode>
    <App length="10"/>
  </React.StrictMode>,
  document.getElementById('root')
);