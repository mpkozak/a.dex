import React, { Component } from 'react';
// import { tracking } from 'node_modules/tracking/build/tracking-min.js';
// import tracking from './components/tracking-min.js';
import tracking from '../node_modules/tracking/build/tracking-min.js';
import './App.css';
import Wave from './components/Wave2.js';
import Spec from './components/Spec2.js';
import Freq from './components/Freq2.js';
import Note from './components/Note2.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      audioCtx: false,
      mic: false,
      gain: false,
      osc: false
    };
    this.track = this.track.bind(this);
    this.playTone = this.playTone.bind(this);
  }

  componentDidMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        const audioCtx = new AudioContext();
        const mic = audioCtx.createMediaStreamSource(stream);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0, audioCtx.currentTime)
        const osc = new OscillatorNode(audioCtx, {type: 'sine', frequency: 440});
        osc.start();
        osc.connect(gain);
        gain.connect(audioCtx.destination)

        this.setState(prevState => ({
          audioCtx, mic, gain, osc
        }));


      });

        this.track();
  }

  track() {
      window.tracking.ColorTracker.registerColor('white', function(r, g, b) {
      if (r > 250 && g > 250 && b > 250) {
      return true;
      }
      return false;
      });


      const colors = new window.tracking.ColorTracker(['white']);

      colors.on('track', e => {
        if (e.data.length === 0) {
          // console.log('none')
          this.playTone(false, false)
        } else {
          this.playTone(e.data[0].x, e.data[0].y)
          // console.log(e.data[0].x, e.data[0].y, e.data.length)

          // e.data.forEach(match => {
          //   console.log(match.x, match.y, match.color)
          //   this.playTone(match.x, match.y)
          // });
        }
      });

      window.tracking.track('.Video', colors, { camera: true });
  }

  playTone(x, y) {
    console.log(x, y)
    const gain = this.state.gain;
    const osc = this.state.osc;
    const audioCtx = this.state.audioCtx;
    // const freq = x * 100
    const freq = !x ? 440 : 440 * Math.pow(2, ((200 - x)/100));
    const vol = !y ? 0 : (200 - y) / 200;
    console.log(freq, vol)

    // if (osc) osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    // if (gain) gain.gain.setValueAtTime(vol, audioCtx.currentTime);

    osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + .1);
    gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + .1);

    // osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + .01);
    // gain.gain.exponentialRampToValueAtTime(vol, audioCtx.currentTime + .01);
  }



  render() {
    const { audioCtx } = this.state;
    const { mic } = this.state;

    return (
      <div>
        <div className='videobox'>
          <video className='Video' width='200' height='200' preload='true' autoPlay loop muted></video>
          <div className='videobox-hide' />
        </div>
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
            <Note audioCtx={audioCtx} mic={mic} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
