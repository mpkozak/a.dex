import React, { Component } from 'react';
import './App.css';
import Spec from './components/Spec.js';
import Freq from './components/Freq.js';
import Wave from './components/Wave.js';
import Note from './components/Note.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='module'>
          <Wave/>
        </div>
        <div className='module'>
          <Spec/>
        </div>
        <div className='module'>
          <Freq/>
        </div>
        <div className='module'>
          <Note/>
        </div>
      </div>
    );
  }
}

export default App;
