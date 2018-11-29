import React, { Component } from 'react';
import tracking from 'tracking';
import help from '../_helpers.js';
import * as UI from '../_UI.js';
import './_css/Theremin.css';

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      config: false,
      // colorGain: {r: 0, g: 0, b: 0},
      // colorFreq: {r: 0, g: 0, b: 0},
      colorGain: {r: null, g: null, b: null},
      colorFreq: {r: null, g: null, b: null},
      audio: {},
      params: {
        sense: {v: 30, max: 100},
        range: {v: 4, max: 6},
        tone: {v: 2200, max: 4400},
        volume: {v: .5, max: 1},
        fmWidth: {v: 0, max: 10},
        fmDepth: {v: 0, max: 3000},
      },
      data: [],
      dataGain: false,
      dataFreq: false,
    };
    this.handleClickColor = this.handleClickColor.bind(this);
    this.handleClickParam = this.handleClickParam.bind(this);
    this.handleScrollParam = this.handleScrollParam.bind(this);
  }

  componentDidMount() {
    const colorGain = JSON.parse(localStorage.getItem('colorGain'));
    const colorFreq = JSON.parse(localStorage.getItem('colorFreq'));
    if (colorGain && colorFreq) {
      const config = true;
      this.setState(prevState => ({ config, colorGain, colorFreq }));
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
    // console.log(this.state.audio.ctx.baseLatency)
    // console.log(this.state.audio.ctx.currentTime - this.state.audio.ctx.getOutputTimestamp().contextTime);
  }

  audioInit(ctx) {
    const { params } = this.state;
    const baseHz = 220;

    const osc1 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz});
    const osc2 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz + params.fmWidth.v});
    const lpf = new BiquadFilterNode(ctx, {type: 'lowpass', Q: 1, frequency: params.tone.v});
    const fmGain = new GainNode(ctx, {gain: params.fmDepth.v});
    const masterGain = new GainNode(ctx, {gain: 0});
    const masterOut = ctx.destination;

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(lpf);
    lpf.connect(masterGain);
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
      return help.getColorDist(this.state.colorGain, {r: r, g: g, b: b}) <= this.state.params.sense.v;
    });
    tracking.ColorTracker.registerColor('Freq', (r, g, b) => {
      return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.state.params.sense.v;
    });
    const colors = new tracking.ColorTracker(['Gain', 'Freq']);

    colors.minDimension = 3;
    colors.minGroupSize = 500;

    colors.on('track', e => {
      const data = e.data;
      const gain = data.filter(d => d.color === 'Gain');
      const dataGain = gain.length > 0 ? gain[0] : false;
      const freq = data.filter(d => d.color === 'Freq');
      const dataFreq = freq.length > 0 ? freq[0] : false;
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


  handleClickParam(e, key) {
    e.preventDefault();
    var handleDrag = (e) => {
      this.updateParam((e.movementX - e.movementY) / 500, key);
    };
    window.addEventListener('mousemove', handleDrag);
    var clearEvent = () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', clearEvent);
    };
     window.addEventListener('mouseup', clearEvent);
  }


  handleScrollParam(e, key) {
    e.preventDefault();
    this.updateParam(e.deltaY / 2000, key);
  }


  updateParam(amt, key) {
    const prev = this.state.params[key];
    const delta = amt * prev.max;
    const current = prev.v + delta;
    if (current >= 0 && current <= prev.max) {
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: current}}
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
    // const { dataFreq } = this.state;
    const { audio } = this.state;
    const ctx = audio.ctx;
    const masterGain = audio.masterGain;
    const latency = audio.latency;
    const height = this.refs.video.clientHeight;

    if (dataGain) {
      const y = dataGain.y + (dataGain.height / 2);
      const level = (height - y) / height * this.state.params.volume.v;
      help.setAudioParam(masterGain.gain, level, ctx, latency);
    } else {
      help.setAudioParam(masterGain.gain, 0, ctx, latency * 2);
    };
  }


  audioRefreshFreq() {
    const { dataFreq } = this.state;
    const { audio } = this.state;
    const ctx = audio.ctx;
    const osc1 = audio.osc1;
    const osc2 = audio.osc2;
    const latency = audio.latency;
    const width = this.refs.video.clientWidth;

    if (dataFreq) {
      const x = dataFreq.x + (dataFreq.width / 2)
      const freq1 = audio.baseHz * Math.pow(2, (width - x)/(width / this.state.params.range.v));
      const freq2 = (audio.baseHz + this.state.params.fmWidth.v) * Math.pow(2, (width - x)/(width / this.state.params.range.v));
      help.setAudioParam(osc1.frequency, freq1, ctx, latency);
      help.setAudioParam(osc2.frequency, freq2, ctx, latency);
    };
  }


  audioRefreshFm() {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const fmGain = audio.fmGain;
    const latency = audio.latency;

    help.setAudioParam(fmGain.gain, this.state.params.fmDepth.v, ctx, latency);
  }


  audioRefreshTone() {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const lpf = audio.lpf;
    const latency = audio.latency;

    help.setAudioParam(lpf.frequency, this.state.params.tone.v, ctx, latency);
  }


  makeControlBox() {
    const { params } = this.state;

    const components = Object.keys(params).map((d, i) => {
      return (
        <div className='component' key={i}>
          <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => this.handleClickParam(e, d)} onWheel={(e) => this.handleScrollParam(e, d)}>
            {UI.knob((params[d].v / params[d].max) * 100)}
          </svg>
          <h6 className='label'>{d}</h6>
        </div>
      );
    });

    return (
      <div className='control-box'>
        {components}
      </div>
    );
  }


  render() {
    const { colorGain } = this.state;
    const { colorFreq } = this.state;
    const colorV = `rgb(${colorGain.r}, ${colorGain.g}, ${colorGain.b})`;
    const colorF = `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;

    return (
      <div className='module-double'>
        <div className='Theremin'>

          <div className='top'>
            <div className='video-box'>
              <canvas className='canvas' ref='canvas'/>
              <video className='video' ref='video' preload='true' autoPlay loop muted/>
            </div>
            <div className='color-box'>
              <div className='element header label'>
                <h4>Set Colors</h4>
              </div>
              <div className='element'>
                <div className='swatch colorGain' onClick={this.handleClickColor} style={{backgroundColor: colorV}} />
                <h5 className='label'>Volume</h5>
              </div>
              <div className='element'>
                <div className='swatch colorFreq' onClick={this.handleClickColor} style={{backgroundColor: colorF}} />
                <h5 className='label'>Frequency</h5>
              </div>
            </div>
          </div>

          <div className='bottom'>
            {this.makeControlBox()}
          </div>

        </div>
      </div>
    );
  }
}



            // <UI.knob click={(e) => this.handleClickParam(e, d)} scroll={(e) => this.handleScrollParam(e, d)} level={(params[d].v / params[d].max) * 100} size={knobSize} />
