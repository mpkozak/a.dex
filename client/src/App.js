import React, { Component } from 'react';
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
      videoW: 200,
      videoH: 150,
      audioCtx: false,
      mic: false,
      gain: false,
      osc: false
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
      const tracking = window.tracking

      tracking.ColorTracker.registerColor('white', function(r, g, b) {
        if (r > 250 && g > 250 && b > 250) {
          return true;
        } else return false;
      });

      const oragne = {r: 97, g: 5, b: 5};
      tracking.ColorTracker.registerColor('orange', (r, g, b) => {
        return getColorDistance(oragne, {r: r, g: g, b: b}) < 25
      });
      const getColorDistance = (target, actual) => {
        return Math.sqrt(
          (target.r - actual.r) * (target.r - actual.r) +
          (target.g - actual.g) * (target.g - actual.g) +
          (target.b - actual.b) * (target.b - actual.b)
        );
      };


      const colors = new tracking.ColorTracker(['yellow', 'orange']);
      colors.minDimension = 3;
      colors.minGroupSize = 30;

      colors.on('track', e => {
        if (e.data.length === 0) {
          this.playTone(false, false, false);
          this.drawRects([{x: 0, y: 0, width: 0, height: 0, color: 'rgb(0, 0, 0)'}]);
        } else {
          this.drawRects(e.data);
          e.data.forEach(d => {
            const x = d.x + (d.width / 2);
            const y = d.y + (d.height / 2);
            this.playTone(x, y, d.color)
          });


          // const x = e.data[0].x + (e.data[0].width / 2);
          // const y = e.data[0].y + (e.data[0].height / 2);
          // this.playTone(x, y, color)


          // this.playTone(e.data[0].x, e.data[0].y);
          // console.log(e.data[0].x, e.data[0].y, e.data.length)

          // e.data.forEach(match => {
          //   console.log(match.x, match.y, match.color)
          //   this.playTone(match.x, match.y)
          // });
        };
      });

      tracking.track('.Video', colors, {camera: true});
  }

  drawRects(data) {
    const width = this.state.videoW;
    const height = this.state.videoH;
    const canvas = this.refs.canvas.getContext('2d');
    this.refs.canvas.width = width;
    this.refs.canvas.height = height;

    canvas.fillStyle = 'rgb(0, 0, 0)';
    canvas.fillRect(0, 0, width, height);


    data.forEach(d => {
      console.log(d.x, d.y)
      canvas.fillStyle = d.color;
      canvas.fillRect(width - (d.x + d.width), d.y, d.width, d.height);
    })
  }


  playTone(x, y, color) {
    const videoW = this.state.videoW;
    const videoH = this.state.videoH;
    const gain = this.state.gain;
    const osc = this.state.osc;
    const audioCtx = this.state.audioCtx;
    const freq = !x ? 440 : 440 * Math.pow(2, ((videoW - x)/(videoW / 2)));
    const vol = !y ? 0 : (videoH - y) / videoH;

    if (color === 'orange') osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + .1);
    if (color === 'yellow') gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + .1);
  }



  render() {
    const { videoW } = this.state;
    const { videoH } = this.state;
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
          <Note audioCtx={audioCtx} mic={mic} />
        </div>
        <div className='module'>
          <video className='Video' width={videoW} height={videoH} preload='true' autoPlay loop muted></video>
        </div>
        <div className='module'>
          <canvas className='tracker' ref='canvas' />
        </div>
      </div>
    );
  }
}

export default App;



        // <div className='videobox'>
        //   <video className='Video' width={videoW} height={videoH} preload='true' autoPlay loop muted></video>
        //   <div className='videobox-hide' />
        // </div>


