import React, { PureComponent } from 'react';
import './App.css';
import { Splash } from './components/_splash.js';
import { SvgDefs } from './components/_svg.js';
import Audio from './components/_audio.js';
import Main from './components/desktop/Main.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      audioOk: null,
      streamOk: null,
      initOk: null,

      micActive: false,
    };
    this.audio = undefined;
    this.videoStream = undefined;
    this.audioStream = undefined;

    this.handleClick = this.handleClick.bind(this);

    this.audioMute = this.audioMute.bind(this);
    this.audioToggleMic = this.audioToggleMic.bind(this);
    this.audioSetGain = this.audioSetGain.bind(this);
    this.audioSetFreq = this.audioSetFreq.bind(this);
    this.audioSetParam = this.audioSetParam.bind(this);
    this.audioSetOsc = this.audioSetOsc.bind(this);
  };

  componentDidMount() {
    if (!!global.AnalyserNode.prototype.getFloatTimeDomainData) {
      this.audioInit() && this.streamInit();
    };
  };

//////////////////////////
// Initialization Stack //
  audioInit() {
    const audio = new Audio({ latency: .05, baseHz: 110 });
    audio.makeOsc('osc1', 'triangle', 110);
    audio.makeOsc('osc2', 'sine', 110, -1200);
    audio.makeGain('fmGain', 1500);
    audio.makeGain('instGain', 0);
    audio.makeEq('hpf', 'highpass', 0, 1);
    audio.makeEq('lpf', 'lowpass', 2200, 1);
    audio.makeDelay('delay', 0);
    audio.makeGain('delayGain', 0);
    audio.makeGain('masterGain', .73);
    audio.makeAnalyser('analyser', 10);
    audio.connect(
      ['osc1', 'fmGain'],
      ['fmGain', ['osc2', 'frequency']],
      ['osc2', 'instGain'],
      ['instGain', 'hpf'],
      ['hpf', 'lpf'],
      ['lpf', 'delay'],
      ['delay', 'delayGain'],
      ['delayGain', 'masterGain'],
      ['masterGain', 'analyser'],
      ['masterGain', 'output']
    );
    this.audio = audio;

    this.audio.makeStream(false)
    this.setState(prevState => ({ audioOk: true }));
    return true;
  };

  streamInit() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 }
      },
      audio: true
    })
      .then(stream => {
        this.audioStream = new MediaStream([stream.getAudioTracks()[0]]);
        this.videoStream = new MediaStream([stream.getVideoTracks()[0]]);
        // this.audio.mic = this.audio.ctx.createMediaStreamSource(this.audioStream);
        this.audio.makeStream('mic', this.audioStream);
        this.setState(prevState => ({ streamOk: true }));
        window.addEventListener('click', this.handleClick);
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({ streamOk: false }));
      });
  };

  handleClick() {
    window.removeEventListener('click', this.handleClick);
    this.audio.ctx.resume();
    const { shadowMask } = this.refs;
    shadowMask.style.opacity = 0;
    // setTimeout(() => shadowMask.style.display = 'none', 100);
    this.setState(prevState => ({ initOk: true }));
  };
//////////////////////////

///////////////////////////
// Audio Handler Methods //
  audioMute(t = this.audio.ctx.currentTime) {
    this.audioSetGain(0, t);
  };

  audioToggleMic() {
    const { micActive } = this.state;
    const { masterGain, analyser, mic } = this.audio;
    if (!micActive) {
      masterGain.disconnect(analyser);
      mic.connect(analyser);
    } else {
      mic.disconnect(analyser);
      masterGain.connect(analyser);
    };
    this.setState(prevState => ({ micActive: !prevState.micActive }));
  };

  audioSetGain(val, t = this.audio.ctx.currentTime) {
    const { instGain, latency } = this.audio;
    const node = instGain.gain;
    const prevVal = node.value;
    node.cancelScheduledValues(t - 1);
    node.setValueAtTime(prevVal, t);
    node.linearRampToValueAtTime(val, t + latency);
  };

  audioSetFreq(val, t = this.audio.ctx.currentTime) {
    const { osc1, osc2, latency } = this.audio;
    [osc1.frequency, osc2.frequency].forEach(d => {
      const prevVal = d.value;
      d.cancelScheduledValues(t - 1);
      d.setValueAtTime(prevVal, t);
      d.exponentialRampToValueAtTime(val, t + latency);
    });
  };

  audioSetParam(param, val, t = this.audio.ctx.currentTime) {
    const prevVal = param.value;
    param.cancelScheduledValues(t - 1);
    param.setValueAtTime(prevVal, t);
    param.linearRampToValueAtTime(val, t + .05);
  };

  audioSetOsc(osc, type) {
    this.audioMute();
    setTimeout(() => {
      this.audio[osc].type = type;
    }, 10);
  };
///////////////////////////


  render() {
    // console.log(this.audio)
    const { audioOk, streamOk, initOk } = this.state;
    const { audio, videoStream } = this;
    return (
      <div ref="app" id="App">
        <SvgDefs />
        <div id="bgi" className="fullscreen" />
        <div ref="shadowMask" id="shadow-mask" className="fullscreen" />
        {initOk
          ? <Main
              audio={audio}
              videoStream={videoStream}
            />
          : <Splash
              audioOk={audioOk}
              streamOk={streamOk}
              initOk={initOk}
            />
        }
      </div>
    );
  };
};





    // const AudioContext = window.AudioContext || window.webkitAudioContext;
    // const baseHz = 110;
    // const latency = 0.05;
    // const ctx = new AudioContext();
    // const osc1 = ctx.createOscillator();
    //   osc1.type = 'triangle';
    //   osc1.frequency.setValueAtTime(baseHz, ctx.currentTime);
    // const osc2 = ctx.createOscillator();
    //   osc2.type = 'sine';
    //   osc2.frequency.setValueAtTime(baseHz, ctx.currentTime);
    //   osc2.detune.setValueAtTime(-1200, ctx.currentTime);
    // const fmGain = ctx.createGain();
    //   fmGain.gain.setValueAtTime(1500, ctx.currentTime);
    // const instGain = ctx.createGain();
    //   instGain.gain.setValueAtTime(0, ctx.currentTime);
    // const hpf = ctx.createBiquadFilter();
    //   hpf.type = 'highpass';
    //   hpf.frequency.setValueAtTime(0, ctx.currentTime);
    //   hpf.Q.setValueAtTime(1, ctx.currentTime);
    // const lpf = ctx.createBiquadFilter();
    //   lpf.type = 'lowpass';
    //   lpf.frequency.setValueAtTime(2200, ctx.currentTime);
    //   lpf.Q.setValueAtTime(1, ctx.currentTime);
    // const delay = ctx.createDelay();
    //   delay.delayTime.setValueAtTime(0, ctx.currentTime);
    // const delayGain = ctx.createGain();
    //   delayGain.gain.setValueAtTime(0, ctx.currentTime);
    // const masterGain = ctx.createGain();
    //   masterGain.gain.setValueAtTime(.73, ctx.currentTime);
    // const analyser = ctx.createAnalyser();
    //   analyser.fftSize = 2 ** 8;
    //   analyser.minDecibels = -100;
    //   analyser.maxDecibels = -30;
    //   analyser.smoothingTimeConstant = 0;

    // osc1.connect(fmGain);
    // fmGain.connect(osc2.frequency);
    // osc2.connect(instGain);
    // instGain.connect(hpf);
    // hpf.connect(lpf);
    // lpf.connect(masterGain);
    // lpf.connect(delay);
    // delay.connect(delayGain);
    // delayGain.connect(masterGain);
    // masterGain.connect(analyser);
    // masterGain.connect(ctx.destination);
    // osc1.start();
    // osc2.start();

    // this.audio = {
    //   ctx,
    //   osc1,
    //   osc2,
    //   fmGain,
    //   instGain,
    //   hpf,
    //   lpf,
    //   delay,
    //   delayGain,
    //   masterGain,
    //   analyser,
    //   baseHz,
    //   latency,
    //   audioMute: this.audioMute,
    //   audioToggleMic: this.audioToggleMic,
    //   audioSetGain: this.audioSetGain,
    //   audioSetFreq: this.audioSetFreq,
    //   audioSetParam: this.audioSetParam,
    //   audioSetOsc: this.audioSetOsc
    // };
