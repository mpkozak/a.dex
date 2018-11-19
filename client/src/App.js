import React, { Component } from 'react';
import './App.css';
import Wave from './components/Wave2.js';
import Spec from './components/Spec2.js';
import Freq from './components/Freq.js';
import Note from './components/Note.js';




class App extends Component {
  constructor() {
    super()
    this.state = {
      audioCtx: {},
      analyser1: {},
      analyser2: {},
    };
  }

  componentDidMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        const audioCtx = new AudioContext();
        const analyser1 = audioCtx.createAnalyser();
        const analyser2 = audioCtx.createAnalyser();
        const mic = audioCtx.createMediaStreamSource(stream);
        mic.connect(analyser1);
        mic.connect(analyser2);
        analyser1.connect(audioCtx.destination);
        analyser2.connect(audioCtx.destination);
        this.setState(prevState => ({
          audioCtx, analyser1, analyser2
        }))
      })
  }




  render() {
    const { audioCtx } = this.state;
    const { analyser1 } = this.state;
    const { analyser2 } = this.state;

    return (
      <div className='App'>
        <div className='module'>
          <Wave audioCtx={audioCtx} analyser={analyser1} />
        </div>
        <div className='module'>
          <Spec audioCtx={audioCtx} analyser={analyser2} />
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
