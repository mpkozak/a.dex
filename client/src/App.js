import React, { Component } from 'react';
import './App.css';
import Theremin from './components/Theremin.js';
import Wave from './components/Wave.js';
import Spec from './components/Spec.js';
import Freq from './components/Freq.js';
import Note from './components/Note.js';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      audioCtx: false,
      mic: false,
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
    const body = !mic ? <div>Loading...</div> : (
      <div className='App'>
        <Theremin audioCtx={audioCtx} />
        <div className='modules'>
          <div className='module'>
            <Wave audioCtx={audioCtx} mic={mic} />
          </div>
          <div className='module'>
            <Note audioCtx={audioCtx} mic={mic} />
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {body}
      </div>
    );
  }
}



      //   <div className='module'>
      //     <Wave audioCtx={audioCtx} mic={mic} />
      //   </div>
      //   <div className='module'>
      //     <Spec audioCtx={audioCtx} mic={mic} />
      //   </div>
      //   <div className='module'>
      //     <Freq audioCtx={audioCtx} mic={mic} />
      //   </div>
      //   <div className='module'>
      //     <Note audioCtx={audioCtx} mic={mic} />
      //   </div>


