import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import polyfills from './polyfills.js';
import App from './App.jsx';





polyfills.then(done =>
  ReactDOM.render(<App />, document.getElementById('root'))
);
