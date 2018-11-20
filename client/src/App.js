import React, { Component } from 'react';
import tracking from '../node_modules/tracking/build/tracking-min.js';
import './App.css';
import Wave from './components/Wave.js';
import Spec from './components/Spec.js';
import Freq from './components/Freq.js';
import Note from './components/Note.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      videoW: 200,
      videoH: 150,
      audioCtx: false,
      mic: false,
      gain: false,
      osc: false,
      pitch: 220,
    };
    this.track = this.track.bind(this);
    this.drawRects = this.drawRects.bind(this);
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
        const osc = new OscillatorNode(audioCtx, {type: 'sine', frequency: this.state.pitch});
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
      const tracking = window.tracking

      // tracking.ColorTracker.registerColor('white', (r, g, b) => {
      //   if (r > 250 && g > 250 && b > 250) {
      //     return true;
      //   } else return false;
      // });

      // const oragne = {r: 97, g: 5, b: 5};
      // tracking.ColorTracker.registerColor('orange', (r, g, b) => {
      //   return getColorDistance(oragne, {r: r, g: g, b: b}) < 25
      // });

      const screwdriver = {r: 240, g: 58, b: 76};
      tracking.ColorTracker.registerColor('red', (r, g, b) => {
        return getColorDistance(screwdriver, {r: r, g: g, b: b}) < 50
      });

      const lighter = {r: 255, g: 195, b: 70};
      tracking.ColorTracker.registerColor('blue', (r, g, b) => {
        return getColorDistance(lighter, {r: r, g: g, b: b}) < 50
      });

      const getColorDistance = (target, actual) => {
        return Math.sqrt(
          (target.r - actual.r) * (target.r - actual.r) +
          (target.g - actual.g) * (target.g - actual.g) +
          (target.b - actual.b) * (target.b - actual.b)
        );
      };

      const colors = new tracking.ColorTracker(['red', 'blue']);
      colors.minDimension = 3;
      colors.minGroupSize = 500;

      colors.on('track', e => {
        if (e.data.length === 0) {
          this.playTone(false);
          this.drawRects(false);
        } else {
          this.drawRects(e.data);
          this.playTone(e.data);
        };
      });

      tracking.track('.Video', colors, {camera: true});
  }



  drawRects(data) {
    const width = this.refs.canvas.clientWidth;
    const height = this.refs.canvas.clientHeight;
    const canvas = this.refs.canvas.getContext('2d');
    this.refs.canvas.width = width;
    this.refs.canvas.height = height;

    // canvas.fillStyle = 'rgb(0, 0, 0)';
    // canvas.fillStyle = 'red'
    // canvas.fillRect(0, 0, width, height);

    if (data) data.forEach(d => {
      canvas.fillStyle = d.color;
      canvas.fillRect(width - (d.x + d.width), d.y, d.width, d.height);
      // const xScale = width / this.state.videoW;
      // const yScale = height / this.state.videoH;
      // console.log(d.x, width, this.refs.video.clientWidth, d.y, height, this.refs.video.clientHeight)
      // canvas.fillRect(width - (d.x + d.width) * xScale, d.y * yScale, d.width * xScale, d.height * yScale);
    })
  }



  playTone(data) {
    // const videoW = this.state.videoW;
    // const videoH = this.state.videoH;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;
    const audioCtx = this.state.audioCtx;
    const gain = this.state.gain;
    const osc = this.state.osc;
    const pitch = this.state.pitch;

    if (!data) {
      gain.gain.cancelScheduledValues(audioCtx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + .5);
    // } else if (data.length === 1 && data[0].color !== 'blue') {
    //   gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + .5);
    } else data.forEach(d => {
      if (d.color === 'red') {
        // const x = d.x + (d.width / 2);
        const x = d.x;
        const freq = pitch * Math.pow(2, ((width - x)/(width / 4)));
        // console.log('freq ', freq)

        osc.frequency.cancelScheduledValues(audioCtx.currentTime);
        osc.frequency.setValueAtTime(osc.frequency.value, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + .01);
      } else if (d.color === 'blue') {
        // const y = d.y + (d.height / 2);
        const y = d.y;
        const vol = (height - y) / (height / 4) - .2;
        // console.log('vol ', vol)

        gain.gain.cancelScheduledValues(audioCtx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + .05);
      };
    });
  }



  render() {
    const { videoW } = this.state;
    const { videoH } = this.state;
    const { audioCtx } = this.state;
    const { mic } = this.state;

    return (
      <div className='App'>
        <div className='module double'>
          <div className='module-park'>
            <video className='Video' width={videoW} height={videoH} ref='video' preload='true' autoPlay loop muted></video>
            <canvas className='tracker' ref='canvas' />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

        // <div className='module'>
        //   <Wave audioCtx={audioCtx} mic={mic} />
        // </div>
        // <div className='module'>
        //   <Spec audioCtx={audioCtx} mic={mic} />
        // </div>
        // <div className='module'>
        //   <Freq audioCtx={audioCtx} mic={mic} />
        // </div>
        // <div className='module'>
        //   <Note audioCtx={audioCtx} mic={mic} />
        // </div>


