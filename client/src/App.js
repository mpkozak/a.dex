import React, { Component } from 'react';
import './App.css';
import Audio from './components/Audio.js';
import Note from './components/Note.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Note/>
      </div>
    );
  }
}

export default App;



        // <Audio/>
