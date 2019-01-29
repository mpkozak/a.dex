import React, { PureComponent } from 'react';
import './_css/Main.css';
import help from './_help.js';
import Init from './Init.js'
import AnimationStack from './AnimationStack.js';
import Placard from './Placard.js';
import Instructions from './Instructions.js';
import Settings from './Settings.js';
import Delay from './Delay.js';
import Oscillators from './Oscillators.js';
import FmSynth from './FmSynth.js';
import Eq from './Eq.js';
import Master from './Master.js';

export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      audioEnabled: false,
      showHelp: false,
      micActive: false,
    };
    this.audio = false;
    this.audioInit = this.audioInit.bind(this);
    this.audioMute = this.audioMute.bind(this);
    this.audioRefresh = this.audioRefresh.bind(this);
    this.toggleMic = this.toggleMic.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  };

  componentDidMount() {
    // this.refs.main.addEventListener('touchstart', (e) => e.preventDefault())
  }


  audioInit() {
    const baseHz = 110;
    const latency = 0.05;
    const fftSizeBase = 8;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(baseHz, ctx.currentTime);
    const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseHz, ctx.currentTime);
      osc2.detune.setValueAtTime(-1200, ctx.currentTime);
    const fmGain = ctx.createGain();
      fmGain.gain.setValueAtTime(1500, ctx.currentTime);
    const instGain = ctx.createGain({ gain: 0 });
      instGain.gain.setValueAtTime(0, ctx.currentTime);
    const hpf = ctx.createBiquadFilter();
      hpf.type = 'highpass';
      hpf.frequency.setValueAtTime(0, ctx.currentTime);
      hpf.Q.setValueAtTime(1, ctx.currentTime);
    const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(22000, ctx.currentTime);
      lpf.Q.setValueAtTime(1, ctx.currentTime);
    const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(0, ctx.currentTime);
    const delayGain = ctx.createGain();
      delayGain.gain.setValueAtTime(0, ctx.currentTime);
    const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(.73, ctx.currentTime);
    const analyser = ctx.createAnalyser();
      analyser.fftSize = Math.pow(2, fftSizeBase);
      analyser.minDecibels = -100;
      analyser.maxDecibels = -30;
      analyser.smoothingTimeConstant = 0;
    const mic = ctx.createMediaStreamSource(this.props.audioStream);

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(instGain);
    instGain.connect(hpf);
    hpf.connect(lpf);
    lpf.connect(masterGain);
    lpf.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGain);
    masterGain.connect(analyser);
    masterGain.connect(ctx.destination);
    osc1.start();
    osc2.start();

    this.audio = { ctx, osc1, osc2, fmGain, instGain, hpf, lpf, delay, delayGain, masterGain, analyser, baseHz, latency, mic };
    this.setState(prevState => ({ audioEnabled: true }));
  };

  audioMute() {
    const { ctx, instGain, latency } = this.audio;
    help.setAudioGain(instGain.gain, 0, ctx.currentTime, latency);
  };

  audioRefresh(x, y) {
    const { ctx, osc1, osc2, instGain, baseHz, latency } = this.audio;
    const setLevel = Math.pow(y, 2);
    const setFreq = Math.pow(2, x) * baseHz;
    help.setAudioGain(instGain.gain, setLevel, ctx.currentTime, latency);
    help.setAudioFreqs([osc1.frequency, osc2.frequency], setFreq, ctx.currentTime, latency);
  };

  toggleMic() {
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

  toggleHelp() {
    this.setState(prevState => ({ showHelp: !prevState.showHelp }));
  };


  render() {
    const { micActive, showHelp } = this.state;
    const { ctx, osc1, osc2, fmGain, hpf, lpf, delay, delayGain, masterGain, analyser } = this.audio;
    return (
      <div className="Main" ref="main">
        {!this.audio
          ? <Init handleClick={this.audioInit} />
          : <React.Fragment>
              <AnimationStack videoStream={this.props.videoStream} width={this.props.width} height={this.props.height} audioRefresh={this.audioRefresh} audioMute={this.audioMute} analyser={analyser} />
              <Placard show={showHelp} toggle={this.toggleHelp} />
              <Instructions show={showHelp} toggle={this.toggleHelp} />
              <Settings latency={ctx.baseLatency * 1000 || 'err'} micActive={micActive} toggle={this.toggleMic} />
              <Delay delay={delay} wet={delayGain} />
              <Oscillators osc1={osc1} osc2={osc2} mute={this.audioMute} />
              <FmSynth depth={fmGain} width={osc2} />
              <Eq hpf={hpf} lpf={lpf} />
              <Master masterGain={masterGain} />
            </React.Fragment>
        }
      </div>
    );
  };
};
