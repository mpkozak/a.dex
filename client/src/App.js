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
          <div className='instruments'>
            <div className='instrument'>
              <Theremin ctx={audioCtx} />
            </div>
          </div>
          <div className='modules'>
            <Wave ctx={audioCtx} src={mic} />
            <Vu ctx={audioCtx} src={mic} />
            {/* <Spec ctx={audioCtx} src={mic} /> */}
            {/* <Note ctx={audioCtx} src={mic} /> */}
            {/* <Freq ctx={audioCtx} src={mic} /> */}



          <div className='inst'>
            <h6>To configure:</h6>
            <ul>
              <li>Select two (real world) objects of different colors (expo markers work well).</li>
              <li>For each object: Hold the object up within the camera frame. Click on one of the color boxes in ‘Set Colors’ and then click on the object within the video frame. You should see a tracking box of the selected color appear around the object in the video frame.</li>
              <li>If the tracking box doesn’t appear (or only appears intermittently), use the ‘Sense’ knob to adjust the color sensitivity.</li>
            </ul>
            <h6>To play:</h6>
            <ul>
              <li>Volume is controlled by moving the corresponding color object up and down.</li>
              <li>Pitch is controlled by moving the corresponding color object left and right.</li>
            </ul>
          </div>




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

