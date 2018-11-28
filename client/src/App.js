import React, { Component } from 'react';
import './App.css';
import Theremin from './components/Theremin.js';
// import Freq from './components/Freq.js';
// import Note from './components/Note.js';
// import Spec from './components/Spec.js';
import Vu from './components/Vu.js';
import Wave from './components/Wave.js';
import * as template from './components/_templates.js';


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
        this.setState(prevState => ({ audioCtx, mic }));
      });

// Enable CTX without microphone
    // const audioCtx = new AudioContext();
    // this.setState(prevState => ({ audioCtx }));

// Enable CTX + start test tone
    // const audioCtx = new AudioContext();
    // const osc1 = new OscillatorNode(audioCtx, {type: 'sine', frequency: 1000});
    // const masterGain = new GainNode(audioCtx, {gain: .01});
    // osc1.connect(masterGain);
    // masterGain.connect(audioCtx.destination);
    // osc1.start();
    // this.setState(prevState => ({ audioCtx, mic: masterGain }));
  }


  showModules() {
    const { audioCtx } = this.state;
    const { mic } = this.state;
    if (mic) {
      return (
        <div>
          <div className='instrument'>
            <Theremin ctx={audioCtx} />
          </div>
          <div className='modules'>
            <Wave ctx={audioCtx} src={mic} />
            <Vu ctx={audioCtx} src={mic} />
          </div>
        </div>
      );
    } else return <div>Loading...</div>;
  }


  render() {
    return (
      <div className='App'>
        {template.moduleDefs()}
        {this.showModules()}
      </div>
    );
  }
}



          // <div className='instruments'>
          //   <div className='instrument'>
          //     <Theremin ctx={audioCtx} />
          //   </div>
          // </div>

          // <div className='modules'>
          //   <div className='module'>
          //     <Wave ctx={audioCtx} src={mic} />
          //   </div>
          //   <div className='module'>
          //     <Vu ctx={audioCtx} src={mic} />
          //   </div>
          //   <div className='module'>
          //     <Spec ctx={audioCtx} src={mic} />
          //   </div>
          //   <div className='module'>
          //     <Freq ctx={audioCtx} src={mic} />
          //   </div>
          //   <div className='module'>
          //     <Note ctx={audioCtx} src={mic} />
          //   </div>
          // </div>


