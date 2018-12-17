import React, { Component } from 'react';
import './App.css';
import { SvgDefs } from './components/_svg.js';
import Main from './components/Main.js';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <SvgDefs />
        <Main />
      </div>
    );
  }
}
