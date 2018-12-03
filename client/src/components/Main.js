import React, { Component } from 'react';
import './_css/Main.css';
import help from './_help.js';
import { svgDefs } from './_svg.js';
import Oscillators from './Oscillators.js';
import Effects from './Effects.js';
import Meters from './Meters.js';
import Master from './Master.js';
import Theremin from './Theremin.js';

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      audio: false,
      params: {
        osc1: 'sine',
        osc2: 'sine',
        fmWidth: {v: 0, max: 1200, min: -1200},
        fmDepth: {v: 0, max: 3000, min: 0},
        eqLo: {v: 5, max: 10, min: 0},
        eqMid: {v: 5, max: 10, min: 0},
        eqHi: {v: 5, max: 10, min: 0},
        volume: {v: .73, max: 1, min: 0}
      }
    };
    this.updateParam = this.updateParam.bind(this);
    this.updateOsc = this.updateOsc.bind(this);
    this.audioMute = this.audioMute.bind(this);
    this.controllerRefresh = this.controllerRefresh.bind(this);
  }

  componentDidMount() {
    this.audioInit();
  }

  audioInit() {
    const scaleBase = 10;
    const baseHz = 220;
    const { params } = this.state;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc1 = new OscillatorNode(ctx, {type: params.osc1, frequency: baseHz});
    const osc2 = new OscillatorNode(ctx, {type: params.osc2, frequency: baseHz, detune: params.fmWidth.v});
    const fmGain = new GainNode(ctx, {gain: params.fmDepth.v});
    const instGain = new GainNode(ctx, {gain: 0})
    const masterGain = new GainNode(ctx, {gain: params.volume.v});
    const masterOut = ctx.destination;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: -30, smoothingTimeConstant: 0});

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(instGain);
    instGain.connect(masterGain);
    masterGain.connect(masterOut);
    masterGain.connect(analyser);
    osc1.start();
    osc2.start();

    const audio = {
      ctx: ctx,
      osc1: osc1,
      osc2: osc2,
      fmGain: fmGain,
      instGain: instGain,
      masterGain: masterGain,
      masterOut: masterOut,
      analyser: analyser,
      analyserSrc: 'masterGain',
      mic: false,
      baseHz: baseHz,
      latency: .05
    };
    this.setState(prevState => ({ audio }));
  }

  audioMute() {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const latency = audio.latency;
    const instGain = audio.instGain;
    help.setAudioParam(instGain.gain, 0, ctx, latency * 2);
  }

  audioRefresh(key) {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const latency = audio.latency;
    const osc1 = audio.osc1;
    const osc2 = audio.osc2;
    const fmGain = audio.fmGain;
    const instGain = audio.instGain;
    const masterGain = audio.masterGain;

    switch (key) {
      case 'osc1' :
        help.setAudioParam(instGain.gain, 0, ctx, latency)
          .then(res => {
            osc1.type = this.state.params.osc1;
          });
        break;
      case 'osc2' :
        help.setAudioParam(instGain.gain, 0, ctx, latency)
          .then(res => {
            osc2.type = this.state.params.osc2;
          });
        break;
      case 'fmDepth' :
        help.setAudioParam(fmGain.gain, this.state.params.fmDepth.v, ctx, latency);
        break;
      case 'fmWidth' :
        help.setAudioParam(osc2.detune, this.state.params.fmWidth.v, ctx, latency);
        break;
      case 'volume' :
        help.setAudioParam(masterGain.gain, this.state.params.volume.v, ctx, latency);
        break;
      default : return null;
    };
  }

  micToggle() {
    const { ctx } = this.state.audio;
    const { mic } = this.state.audio;
    const { analyser } = this.state.audio;
    const { masterGain } = this.state.audio;
    const { analyserSrc } = this.state.audio;

    if (!mic) {
      navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
          const mic = ctx.createMediaStreamSource(stream);
          masterGain.disconnect(analyser);
          mic.connect(analyser)
          this.setState(prevState => ({
            audio: {...prevState.audio, mic: mic, analyserSrc: 'mic'}
          }));
        });
    } else if (analyserSrc === 'masterGain') {
      masterGain.disconnect(analyser);
      mic.connect(analyser)
        this.setState(prevState => ({
          audio: {...prevState.audio, analyserSrc: 'mic'}
        }));
    } else if (analyserSrc === 'mic') {
      mic.disconnect(analyser);
      masterGain.connect(analyser);
        this.setState(prevState => ({
          audio: {...prevState.audio, analyserSrc: 'masterGain'}
        }));
    };
  }

  updateParam(amt, key) {
    const prev = this.state.params[key];
    const delta = amt * prev.max;
    const current = prev.v + delta;
    if (current >= prev.min && current <= prev.max) {
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: current}}
      }));
      this.audioRefresh(key);
    };
  }

  updateOsc(osc, type) {
    this.setState(prevState => ({
      params: {...prevState.params, [osc]: type}
    }));
    this.audioRefresh(osc);
  }

  controllerRefresh(level, freq) {
    const { audio } = this.state;
    const { ctx } = this.state.audio;
    const hz = freq ? freq * audio.baseHz : audio.baseHz;
    help.setAudioParam(audio.instGain.gain, level, ctx, audio.latency);
    help.setAudioParam(audio.osc1.frequency, hz, ctx, audio.latency);
    help.setAudioParam(audio.osc2.frequency, hz, ctx, audio.latency);
  }

  render() {
    const { params } = this.state;
    const { audio } = this.state;
    // const { ctx } = this.state.audio;

    return (
      <div className='Main'>
        {svgDefs()}

        <div className='controller'>
          <div className='outer'>
            <Theremin refresh={this.controllerRefresh} mute={this.audioMute} />
          </div>
        </div>

        <div className='placard'>
          <div className='outer'>
            <div className='inner'>
              <div className='name'>
                <h4><span className='alpha'>α</span>dex</h4>
              </div>
              <div className='by'>
                <h6>by</h6> <h5 className='kozak'> kozak</h5>
              </div>
            {/*
              <h6>Latency: {audio ? Math.floor(ctx.baseLatency * 1000) : ''} ms</h6>
              <button onClick={() => this.micToggle()}>toggle</button>
            */}
            </div>
          </div>
        </div>

        <div className='settings'>
          <div className='outer'>
            <div className='inner'>
              <h4 className='label'>Instructions:</h4>
              <ul>
                <li>Select two (real world) objects of different colors (expo markers work well).</li>
                <li>For each object: Hold the object up within the camera frame. Click on one of the color boxes in 'Set Colors' and then click on the object within the video frame. You should see a tracking box of the selected color appear around the object in the video frame.</li>
                <li>If the tracking box doesn’t appear (or only appears intermittently), use the 'Sensitivity' knob to adjust..</li>
                <li>Volume is controlled by moving the corresponding color object up and down.</li>
                <li>Pitch is controlled by moving the corresponding color object left and right.</li>
              </ul>
            </div>
          </div>
        </div>

        <Meters analyser={audio.analyser} />

        <Oscillators params={params} update={this.updateOsc} />

        <Effects params={params} update={this.updateParam} />

        <div className='master'>
          <div className='outer'>
            <Master params={params} update={this.updateParam} />
          </div>
        </div>
      </div>
    );
  }
}
