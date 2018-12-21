import React, { Component } from 'react';
import './_css/Main.css';

import help from './_help.js';
import Init from './Init.js'
import Instructions from './Instructions.js';
import Placard from './Placard.js';
import Settings from './Settings.js';
import Oscillators from './Oscillators.js';
import Effects from './Effects.js';
import Meters from './Meters.js';

import Theremin from './Theremin.js';
import Master from './Master.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      audio: false,
      params: {
        osc1: 'triangle',
        osc2: 'sine',
        fmWidth: {v: -1200, max: 1200, min: -1200},
        fmDepth: {v: 1500, max: 3000, min: 0},
        eqLo: {v: 5, max: 10, min: 0},
        eqMid: {v: 5, max: 10, min: 0},
        eqHi: {v: 5, max: 10, min: 0},
        volume: {v: .73, max: 1, min: 0}
      },
      showHelp: false,
      chrome: false,
    };
    this.audioInit = this.audioInit.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleMic = this.toggleMic.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.updateOsc = this.updateOsc.bind(this);
    this.audioMute = this.audioMute.bind(this);
    this.controllerRefresh = this.controllerRefresh.bind(this);
  };

  componentWillMount() {
    const chrome = navigator.userAgent.includes('Chrome');
    this.setState(prevState => ({ chrome }));
  };

  toggleHelp() {
    this.setState(prevState => ({
      showHelp: !prevState.showHelp
    }));
  };

  audioInit() {
    const scaleBase = 10;
    const baseHz = 50;
    const { params } = this.state;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc1 = new OscillatorNode(ctx, {type: params.osc1, frequency: baseHz});
    const osc2 = new OscillatorNode(ctx, {type: params.osc2, frequency: baseHz, detune: params.fmWidth.v});
    const fmGain = new GainNode(ctx, {gain: params.fmDepth.v});
    const instGain = new GainNode(ctx, {gain: 0})
    const masterGain = new GainNode(ctx, {gain: params.volume.v});
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: -30, smoothingTimeConstant: 0});
    const masterOut = ctx.destination;

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(instGain);
    instGain.connect(masterGain);
    masterGain.connect(analyser);
    masterGain.connect(masterOut);
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
      fftSize: analyser.fftSize,
      mic: false,
      baseHz: baseHz,
      latency: .05
    };
    this.setState(prevState => ({ audio }));
  };

  audioMute() {
    const { ctx, latency, instGain } = this.state.audio;
    help.setAudioParam(instGain.gain, 0, ctx, latency * 2);
  };

  toggleMic() {
    const { ctx, mic, analyser, masterGain, analyserSrc } = this.state.audio;
    if (!mic) {
      navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
          const mic = ctx.createMediaStreamSource(stream);
          masterGain.disconnect(analyser);
          mic.connect(analyser);
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
  };

  paramRefresh(key) {
    const { audio, params } = this.state;
    const { ctx, latency, osc2, fmGain, masterGain } = audio;
    switch (key) {
      case 'fmDepth' :
        help.setAudioParam(fmGain.gain, params.fmDepth.v, ctx, latency);
        break;
      case 'fmWidth' :
        help.setAudioParam(osc2.detune, params.fmWidth.v, ctx, latency);
        break;
      case 'volume' :
        help.setAudioParam(masterGain.gain, params.volume.v, ctx, latency);
        break;
      default : return null;
    };
  };

  updateParam(amt, key) {
    const prev = this.state.params[key];
    const delta = amt * prev.max;
    const current = prev.v + delta;
    if (current >= prev.min && current <= prev.max) {
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: current}}
      }));
      this.paramRefresh(key);
    };
  };

  updateOsc(osc, type) {
    const { audio } = this.state;
    const { ctx, latency, instGain } = audio;
    help.setAudioParam(instGain.gain, 0, ctx, latency)
      .then(res => {
        audio[osc].type = type;
      });
    this.setState(prevState => ({
      params: {...prevState.params, [osc]: type}
    }));
  };

  controllerRefresh(level, freq) {
    const { ctx, baseHz, latency, instGain, osc1, osc2 } = this.state.audio;
    const setLevel = level;
    const setFreq = freq * baseHz;
    help.setAudioParam(instGain.gain, setLevel, ctx, latency);
    help.setAudioParam(osc1.frequency, setFreq, ctx, latency);
    help.setAudioParam(osc2.frequency, setFreq, ctx, latency);
  };


  render() {
    const { params, audio, showHelp, chrome } = this.state;
    const latency = !!audio ? Math.round((audio.ctx.currentTime - audio.ctx.getOutputTimestamp().contextTime) * 1000) : 0;

    return (
      <div className='Main'>
        {!audio ? <Init chrome={chrome} handleClick={this.audioInit} /> : null}
        <Placard show={showHelp} toggle={this.toggleHelp} />
        <Instructions show={showHelp} toggle={this.toggleHelp} />
        <Settings latency={latency} src={audio.analyserSrc} toggle={this.toggleMic} />
        <Oscillators osc1={params.osc1} osc2={params.osc2} update={this.updateOsc} />
        <Meters analyser={audio.analyser} />
        <Theremin active={!!audio} refresh={this.controllerRefresh} mute={this.audioMute} />
        <Effects params={params} update={this.updateParam} />
        <Master params={params} update={this.updateParam} />
      </div>
    );
  };
};
