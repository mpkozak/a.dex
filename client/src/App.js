import React, { Component } from 'react';
import './App.css';
import Wave from './components/Wave2.js';
import Spec from './components/Spec2.js';
import Freq from './components/Freq2.js';
// import Note from './components/Note.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      audioCtx: {},
      mic: {},
    };
  }

  componentDidMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        const audioCtx = new AudioContext();
        const mic = audioCtx.createMediaStreamSource(stream);
        this.setState(prevState => ({
          audioCtx, mic
        }));
      });
  }

  render() {
    const { audioCtx } = this.state;
    const { mic } = this.state;

    return (
      <div className='App'>
        <div className='module'>
          <Wave audioCtx={audioCtx} mic={mic} />
        </div>
        <div className='module'>
          <Spec audioCtx={audioCtx} mic={mic} />
        </div>
        <div className='module'>
          <Freq audioCtx={audioCtx} mic={mic} />
        </div>
        <div className='module'>

        </div>
      </div>
    );
  }
}

export default App;
