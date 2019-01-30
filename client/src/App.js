import React, { PureComponent } from 'react';
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Logo, SvgDefs } from './components/_svg.js';
import Init from './components/Init.js';
import Main from './components/Main.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      compatible: false,
      initialized: false,
      videoStream: false,
      audio: false,
    };
    this.init = this.initialize.bind(this);
    this.audioMute = this.audioMute.bind(this);
    this.audioSetGain = this.audioSetGain.bind(this);
    this.audioSetFreq = this.audioSetFreq.bind(this);
  };

  componentDidMount() {
    if (!!global.AnalyserNode.prototype.getFloatTimeDomainData) {
      this.setState(prevState => ({ compatible: true }));
    };
  };

  initialize() {
    this.setState(prevState => ({ initialized: true }), () => {
      this.videoInit();
      this.audioInit();
    });
  };

  videoInit() {
    navigator.mediaDevices.getUserMedia({
      video: true
      // video: {
      //   width: {ideal: 640},
      //   height: {ideal: 480}
      // }
    })
      .then(videoStream => {
        this.setState(prevState => ({ videoStream }));
      })
      .catch(err => {
        this.setState(prevState => ({ compatible: false }));
        console.log(err);
      });
    // this.setState(prevState => ({ videoStream: true }));
  };

  audioInit() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const baseHz = 110;
    const latency = 0.05;
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
    const instGain = ctx.createGain();
      instGain.gain.setValueAtTime(0, ctx.currentTime);
    const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(.73, ctx.currentTime);
    const analyser = ctx.createAnalyser();
      analyser.fftSize = 2 ** 8;
      analyser.minDecibels = -100;
      analyser.maxDecibels = -30;
      analyser.smoothingTimeConstant = 0;

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(instGain);
    instGain.connect(masterGain);
    masterGain.connect(analyser);
    masterGain.connect(ctx.destination);
    osc1.start();
    osc2.start();

    const audio = {
      ctx,
      osc1,
      osc2,
      fmGain,
      instGain,
      masterGain,
      analyser,
      baseHz,
      latency,
      mute: this.audioMute,
      setGain: this.audioSetGain,
      setFreq: this.audioSetFreq,
    };
    this.setState(prevState => ({ audio }));
  };

  audioMute(t = this.state.audio.ctx.currentTime) {
    this.audioSetGain(0, t);
  };

  audioSetGain(val, t) {
    const { instGain, latency } = this.state.audio;
    const node = instGain.gain;
    const prevVal = node.value;
    // const t = ctx.currentTime;
    node.cancelScheduledValues(t - 1);
    node.setValueAtTime(prevVal, t);
    node.linearRampToValueAtTime(val, t + latency);
  };

  audioSetFreq(val, t) {
    const { osc1, osc2, latency } = this.state.audio;
    [osc1.frequency, osc2.frequency].forEach(d => {
      // const t = ctx.currentTime
      const prevVal = d.value;
      d.cancelScheduledValues(t - 1);
      d.setValueAtTime(prevVal, t);
      d.exponentialRampToValueAtTime(val, t + latency);
    });
  };


  render() {
    const { compatible, initialized, videoStream, audio } = this.state;
    return (
      <div className="App">
        {compatible
          ? (!initialized
              ? <Init handleClick={this.init} />
              : videoStream && audio &&
                  <React.Fragment>
                    <SvgDefs />
                    <Main videoStream={videoStream} audio={audio} />
                  </React.Fragment>
            )
          : <React.Fragment>
              <div className="logo">
                <Logo />
              </div>
              <div className="message">
                <h2>This browser does not fully support WebAudio.</h2>
                <br />
                <h3>For best results, please use the latest version of Chrome.</h3>
              </div>
            </React.Fragment>
        }
      </div>
    );
  };
};
