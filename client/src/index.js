import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import MobileSplash from './MobileSplash.js'

const isMobile = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return <MobileSplash />;
  } else {
    return <App />;
  }
};

ReactDOM.render(isMobile(), document.getElementById('root'));
