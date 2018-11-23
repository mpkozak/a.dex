import React, { Component } from 'react';
import tracking from 'tracking';
import help from './_helpers.js';
import * as UI from './_UI.js';

import Wave from './Wave.js';
// import Note from './Note.js';
import Spec from './Spec.js';


export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      colorGain: {r: 0, g: 0, b: 0},
      colorFreq: {r: 0, g: 0, b: 0},
      audio: {},

      sense: {v: 30, max: 100},
      range: {v: 4, max: 6},
      tone: {v: 2200, max: 4400},
      volume: {v: .5, max: 1},
      fmWidth: {v: 1, max: 10},
      fmDepth: {v: 1500, max: 3000},

      data: [],
      dataGain: [],
      dataFreq: [],

    };
    this.handleClickColor = this.handleClickColor.bind(this);
    this.handleScrollParam = this.handleScrollParam.bind(this);
  }


  componentDidMount() {
    const colorGain = JSON.parse(localStorage.getItem('colorGain'));
    const colorFreq = JSON.parse(localStorage.getItem('colorFreq'));
    if (colorGain && colorFreq) {
      this.setState(prevState => ({ colorGain, colorFreq }));
    };
    this.audioInit(this.props.ctx);
    this.trackerInit();
  }


  componentDidUpdate() {
    this.trackerDraw();
    this.audioRefreshGain();
    this.audioRefreshFreq();
    this.audioRefreshFm();
    this.audioRefreshTone();
    // console.log(this.state.audio.ctx.currentTime - this.state.audio.ctx.getOutputTimestamp().contextTime);
  }


  audioInit(ctx) {
    const baseHz = 220;
    const osc1 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz});
    const osc2 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz + this.state.fmWidth.v});
    const lpf = new BiquadFilterNode(ctx, {type: 'lowpass', Q: 1, frequency: this.state.tone.v});
    const fmGain = new GainNode(ctx, {gain: this.state.fmDepth.v});
    const masterGain = new GainNode(ctx, {gain: 0});
    const masterOut = ctx.destination;

    // const makeDist = (amt) => {
    //   const sRate = ctx.sampleRate;
    //   const arr = new Float32Array(sRate);
    //   const deg = Math.PI / 180;
    //   for (let i = 0; i < sRate; i++) {
    //     const x = i * 2 / sRate - 1;
    //     arr[i] = (3 + amt) * x * 20 * deg / (Math.PI + amt * Math.abs(x));
    //   };
    //   return arr;
    // }

    const dist = new WaveShaperNode(ctx, {curve: help.makeDistortion(0, ctx.sampleRate), oversample: '4x'});


    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(lpf);
    lpf.connect(masterGain);

    // lpf.connect(dist);
    // dist.connect(masterGain);

    masterGain.connect(masterOut);

    osc1.start();
    osc2.start();

    const audio = {
      ctx: ctx,
      baseHz: baseHz,
      osc1: osc1,
      osc2: osc2,
      lpf: lpf,
      fmGain: fmGain,
      fm: true,
      masterGain: masterGain,
      masterOut: masterOut,
      latency: .05
    };
    this.setState(prevState => ({ audio }));
  }


  trackerInit() {
    const tracking = window.tracking;

    tracking.ColorTracker.registerColor('Gain', (r, g, b) => {
      return help.getColorDist(this.state.colorGain, {r: r, g: g, b: b}) <= this.state.sense.v;
    });
    tracking.ColorTracker.registerColor('Freq', (r, g, b) => {
      return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.state.sense.v;
    });
    const colors = new tracking.ColorTracker(['Gain', 'Freq']);

    colors.minDimension = 3;
    colors.minGroupSize = 500;

    colors.on('track', e => {
      const data = e.data;
      const dataGain = data.filter(d => d.color === 'Gain');
      const dataFreq = data.filter(d => d.color === 'Freq');
      this.setState(prevState => ({ data, dataGain, dataFreq }));
    });

    navigator.mediaDevices.getUserMedia({video: true})
      .then(stream => {
        this.refs.video.srcObject = stream;
        tracking.track('.video', colors);
      });
  }


  handleClickColor(e) {
    const frame = this.refs.canvas;
    const classList = e.target.classList;
    const target = classList[1];
    classList.add('pulse');

    const getCoords = (e) => {
      classList.remove('pulse');
      frame.removeEventListener('click', getCoords);

      const width = this.refs.canvas.width;
      const height = this.refs.canvas.height;

      const canvasCtx = this.refs.canvas.getContext('2d');
      canvasCtx.globalAlpha = 1;

      canvasCtx.drawImage(this.refs.video, 0, 0, width, height);
      const colorRaw = canvasCtx.getImageData(width - e.offsetX, e.offsetY, 1, 1).data;
      const color = {r: colorRaw[0], g: colorRaw[1], b: colorRaw[2]};

      localStorage.setItem(target, JSON.stringify(color));
      this.setState(prevState => ({
        [target]: color
      }));
    };
    frame.addEventListener('click', getCoords);
  }


  handleScrollParam(e) {
    e.preventDefault();
    const key = e.target.parentNode.parentNode.classList[1];
    const prev = this.state[key];
    const delta = (e.deltaY * prev.max) / 2000;
    const current = prev.v + delta;
    if (current >= 0 && current <= prev.max) {
      this.setState(prevState => ({
        [key]: {...prevState[key], v: current}
      }));
    };
  }


  trackerDraw() {
    const { colorGain } = this.state;
    const { colorFreq } = this.state;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;
    this.refs.canvas.width = width;
    this.refs.canvas.height = height;

    const canvasCtx = this.refs.canvas.getContext('2d');
    canvasCtx.globalAlpha = .7;
    canvasCtx.strokeStyle = '#FFFFFF';
    canvasCtx.lineWidth = 1;

    this.state.data.forEach(d => {
      canvasCtx.fillStyle = d.color === 'Gain'
        ? `rgb(${colorGain.r}, ${colorGain.g}, ${colorGain.b})`
        : `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;
      canvasCtx.fillRect(width - (d.x + d.width), d.y, d.width, d.height);
      canvasCtx.strokeRect(width - (d.x + d.width), d.y, d.width, d.height);
    });
  }


  audioRefreshGain() {
    const { dataGain } = this.state;
    const { dataFreq } = this.state;
    const { audio } = this.state;
    const height = this.refs.video.clientHeight;

    const ctx = audio.ctx;
    const masterGain = audio.masterGain;
    const latency = audio.latency;

    if (!dataGain.length || !dataFreq.length) {
      help.setAudioParam(masterGain.gain, 0, ctx, latency * 2);
      // masterGain.gain.cancelScheduledValues(ctx.currentTime);
      // masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      // masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + (latency * 2));
    } else {
      dataGain.forEach(d => {
        const y = d.y + (d.height / 2);
        const level = (height - y) / height * this.state.volume.v;
        help.setAudioParam(masterGain.gain, level, ctx, latency);
        // masterGain.gain.cancelScheduledValues(ctx.currentTime);
        // masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        // masterGain.gain.linearRampToValueAtTime(level, ctx.currentTime + latency);
      });
    };
  }


  audioRefreshFreq() {
    const { dataFreq } = this.state;
    const { audio } = this.state;
    const width = this.refs.video.clientWidth;

    const ctx = audio.ctx;
    const osc1 = audio.osc1;
    const osc2 = audio.osc2;
    const latency = audio.latency;

    dataFreq.forEach(d => {
      const x = d.x + (d.width / 2);
      const freq1 = audio.baseHz * Math.pow(2, (width - x)/(width / this.state.range.v));
      help.setAudioParam(osc1.frequency, freq1, ctx, latency);
      // osc1.frequency.cancelScheduledValues(ctx.currentTime);
      // osc1.frequency.setValueAtTime(osc1.frequency.value, ctx.currentTime);
      // osc1.frequency.linearRampToValueAtTime(freq1, ctx.currentTime + latency);
      const freq2 = (audio.baseHz + this.state.fmWidth.v) * Math.pow(2, (width - x)/(width / this.state.range.v));
      help.setAudioParam(osc2.frequency, freq2, ctx, latency);
      // osc2.frequency.cancelScheduledValues(ctx.currentTime);
      // osc2.frequency.setValueAtTime(osc2.frequency.value, ctx.currentTime);
      // osc2.frequency.linearRampToValueAtTime(freq2, ctx.currentTime + latency);
    });
  }

  audioRefreshFm() {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const fmGain = audio.fmGain;
    const latency = audio.latency;

    help.setAudioParam(fmGain.gain, this.state.fmDepth.v, ctx, latency);
    // fmGain.gain.cancelScheduledValues(ctx.currentTime);
    // fmGain.gain.setValueAtTime(fmGain.gain.value, ctx.currentTime);
    // fmGain.gain.linearRampToValueAtTime(this.state.fmDepth.v, ctx.currentTime + latency);
  }


  audioRefreshTone() {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const lpf = audio.lpf;
    const latency = audio.latency;

    help.setAudioParam(lpf.frequency, this.state.tone.v, ctx, latency);
    // lpf.frequency.cancelScheduledValues(ctx.currentTime);
    // lpf.frequency.setValueAtTime(lpf.frequency.value, ctx.currentTime);
    // lpf.frequency.linearRampToValueAtTime(this.state.tone.v, ctx.currentTime + latency);
  }


  render() {
    const { masterGain } = this.state.audio;

    const { colorGain } = this.state;
    const { colorFreq } = this.state;
    const colorV = `rgb(${colorGain.r}, ${colorGain.g}, ${colorGain.b})`;
    const colorF = `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;

    const { sense } = this.state;
    const { range } = this.state;
    const { tone } = this.state;
    const { volume } = this.state;
    const { fmDepth } = this.state;
    const { fmWidth } = this.state;
    const knobSize = 5;

    const modules = !masterGain
      ? <div />
      : (
        <div className='modules'>
          <div className='module'>
            <Wave ctx={this.props.ctx} src={masterGain} />
          </div>
          <div className='module'>
            <Spec ctx={this.props.ctx} src={masterGain} />
          </div>
        </div>
      );

    return (
      <div className='App'>

        <div className='Theremin'>

          <div className='top'>
            <div className='video-box'>
              <canvas className='canvas' ref='canvas'/>
              <video className='video' ref='video' preload='true' autoPlay loop muted/>
            </div>
            <div className='color-box'>
              <div className='element header'>
                <h4>Set Colors:</h4>
              </div>
              <div className='element'>
                <div className='swatch colorGain' onClick={this.handleClickColor} style={{backgroundColor: colorV}} />
                <h6>Volume</h6>
              </div>
              <div className='element'>
                <div className='swatch colorFreq' onClick={this.handleClickColor} style={{backgroundColor: colorF}} />
                <h6>Frequency</h6>
              </div>
            </div>
          </div>

          <div className='bottom'>
            <div className='control-box'>
              <div className='component'>
                <div className='knob sense'>
                  <UI.knob scroll={(e) => this.handleScrollParam(e)} level={(sense.v / sense.max) * 100} size={knobSize} />
                </div>
                <h6 className='label'>Sense</h6>
              </div>
              <div className='component'>
                <div className='knob range'>
                  <UI.knob scroll={(e) => this.handleScrollParam(e)} level={(range.v / range.max) * 100} size={knobSize} />
                </div>
                <h6 className='label'>Range</h6>
              </div>
              <div className='component'>
                <div className='knob tone'>
                  <UI.knob scroll={(e) => this.handleScrollParam(e)} level={(tone.v / tone.max) * 100} size={knobSize} />
                </div>
                <h6 className='label'>Tone</h6>
              </div>
              <div className='component'>
                <div className='knob volume'>
                  <UI.knob scroll={(e) => this.handleScrollParam(e)} level={(volume.v / volume.max) * 100} size={knobSize} />
                </div>
                <h6 className='label'>Volume</h6>
              </div>

              <div className='component'>
                <div className='knob fmDepth'>
                  <UI.knob scroll={(e) => this.handleScrollParam(e)} level={(fmDepth.v / fmDepth.max) * 100} size={knobSize} />
                </div>
                <h6 className='label'>Depth</h6>
              </div>
              <div className='component'>
                <div className='knob fmWidth'>
                  <UI.knob scroll={(e) => this.handleScrollParam(e)} level={(fmWidth.v / fmWidth.max) * 100} size={knobSize} />
                </div>
                <h6 className='label'>Width</h6>
              </div>
            </div>
          </div>

        </div>

        {modules}

      </div>
    );
  }
}

