import React, { Component } from 'react';
import './App.css';
import Theremin from './components/Theremin.js';
// import Wave from './components/Wave.js';
// import Spec from './components/Spec.js';
// import Freq from './components/Freq.js';
// import Note from './components/Note.js';

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
    const body = !audioCtx ? <div>Loading...</div> : <Theremin ctx={audioCtx} src={mic} />;

    return (
      <div>
        {body}
      </div>
    );
  }
}


      //   <div className='module'>
      //     <Wave ctx={audioCtx} src={mic} />
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


