import React, { Component } from 'react';
import './App.css';
import Main from './components/Main.js';

export default class App extends Component {
  constructor() {
    super()
    this.state = {

    };
  }

  render() {
    return (
      <div className='App'>
        <Main />
      </div>
    );
  }
}
