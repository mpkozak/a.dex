import React, { Component } from 'react';
import tracking from '../../node_modules/tracking/build/tracking-min.js';
import help from './_helpers.js';

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      audioCtx: false,
      vol: false,
      osc: false,
      baseHz: 220,
      colorVol: {r: 255, g: 195, b: 70},
      colorFreq: {r: 240, g: 58, b: 76},
      sensitivity: 50,

      videoW: 200,
      videoH: 150,
    };
    this.trackerInit = this.trackerInit.bind(this);
    this.trackerDraw = this.trackerDraw.bind(this);
    this.trackerModulate = this.trackerModulate.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.audioInit(this.props.audioCtx), 1000);
  }

  audioInit(audioCtx) {
    const vol = audioCtx.createGain();
    vol.gain.setValueAtTime(0, audioCtx.currentTime);

    const osc = new OscillatorNode(audioCtx, {type: 'sine', frequency: this.state.baseHz});
    osc.start();
    osc.connect(vol);
    vol.connect(audioCtx.destination);

    this.setState(prevState => ({
      audioCtx, vol, osc
    }));

    this.trackerInit();
  }

  trackerInit() {
    const tracking = window.tracking;

    tracking.ColorTracker.registerColor('blue', (r, g, b) => {
      return help.getColorDist(this.state.colorVol, {r: r, g: g, b: b}) <= this.refs.sensitivity.value;
    });
    tracking.ColorTracker.registerColor('red', (r, g, b) => {
      return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.refs.sensitivity.value;
    });

    const colors = new tracking.ColorTracker(['blue', 'red']);
    colors.minDimension = 3;
    colors.minGroupSize = 500;

    colors.on('track', e => {
      this.trackerDraw(e.data);
      this.trackerModulate(e.data);
    });

    tracking.track('.video', colors, {camera: true});
  }

  trackerDraw(data) {
    const width = this.refs.canvas.clientWidth;
    const height = this.refs.canvas.clientHeight;
    this.refs.canvas.width = width;
    this.refs.canvas.height = height;
    const canvas = this.refs.canvas.getContext('2d');

    if (data) data.forEach(d => {
      canvas.fillStyle = d.color;
      canvas.fillRect(width - (d.x + d.width), d.y, d.width, d.height);
    });
  }

  trackerModulate(data) {
    const { audioCtx } = this.state;
    const { vol } = this.state;
    const { osc } = this.state;
    const { baseHz } = this.state;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;

    if (!data) {
      vol.gain.cancelScheduledValues(audioCtx.currentTime);
      vol.gain.setValueAtTime(vol.gain.value, audioCtx.currentTime);
      vol.gain.linearRampToValueAtTime(0, audioCtx.currentTime + .5);
    } else data.forEach(d => {
      if (d.color === 'red') {
        const x = d.x + (d.width / 2);
        const freq = baseHz * Math.pow(2, ((width - x)/(width / 4)));
        osc.frequency.cancelScheduledValues(audioCtx.currentTime);
        osc.frequency.setValueAtTime(osc.frequency.value, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + .05);
        // console.log('freq ', freq)
      } else if (d.color === 'blue') {
        const y = d.y + (d.height / 2);
        const gain = (height - y) / (height / 4) - .2;
        vol.gain.cancelScheduledValues(audioCtx.currentTime);
        vol.gain.setValueAtTime(vol.gain.value, audioCtx.currentTime);
        vol.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + .05);
        // console.log('gain ', gain)
      };
    });
  }



  render() {
    const { videoW } = this.state;
    const { videoH } = this.state;

    return (
      <div className='Theremin'>
        <div className='video-box'>
          <video className='video' ref='video' width={videoW} height={videoH} preload='true' autoPlay loop muted />
          <canvas className='overlay' ref='canvas' />
        </div>
          <input
            ref='sensitivity'
            type='range'
            max='100'
            min='0'
          />
      </div>
    );
  }
}
