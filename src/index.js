import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import polyfills from './polyfills.js';
import App from './components/App.jsx';



polyfills();

ReactDOM.render(<App />, document.getElementById('root'));
