import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { polyfills } from './global';
import App from './App.jsx';
import NoApp from './NoApp.jsx';





polyfills
  .then(ok => ReactDOM.render(<App />, document.getElementById('root')))
  .catch(err => {
    console.error(err);
    return ReactDOM.render(<NoApp />, document.getElementById('root'));
  });
