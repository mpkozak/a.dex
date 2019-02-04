import React, { PureComponent } from 'react';
import './App.css';
import NoSleep from 'nosleep.js';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Splash } from './_splash.js';
import { SvgDefs } from './components/_svg.js';
import Main from './components/Main.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVertical: !Math.abs(window.orientation),
      isLocked: false,
      audioOk: null,
      cameraOk: null,
      initOk: null,
    };
    this.noSleep = new NoSleep();
    this.videoStream = undefined;
    this.audio = undefined;
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
    this.audioMute = this.audioMute.bind(this);
    this.audioSetGain = this.audioSetGain.bind(this);
    this.audioSetFreq = this.audioSetFreq.bind(this);
    this.audioSetOsc = this.audioSetOsc.bind(this);
  };

  componentDidMount() {
    window.addEventListener('orientationchange', this.handleOrientation);
    disableBodyScroll(this.refs.app);
    if (!!global.AnalyserNode.prototype.getFloatTimeDomainData) {
      this.audioInit() && this.videoInit();
    };
  };

//////////////////////////
// Initialization Stack //
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

    this.audio = {
      ctx,
      osc1,
      osc2,
      fmGain,
      instGain,
      masterGain,
      analyser,
      baseHz,
      latency,
      audioMute: this.audioMute,
      audioSetGain: this.audioSetGain,
      audioSetFreq: this.audioSetFreq,
      audioSetOsc: this.audioSetOsc
    };
    this.setState(prevState => ({ audioOk: true }));
    return true;
  };

  videoInit() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    })
      .then(stream => {
        this.videoStream = stream;
        this.setState(prevState => ({ cameraOk: true }));
        window.addEventListener('touchstart', this.handleTouchStart);
        enableBodyScroll(this.refs.app);
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({ initOk: false }));
      });
  };
//////////////////////////

///////////////////////////
// Audio Handler Methods //
  audioMute(t = this.audio.ctx.currentTime) {
    this.audioSetGain(0, t);
  };

  audioSetGain(val, t) {
    const { instGain, latency } = this.audio;
    const node = instGain.gain;
    const prevVal = node.value;
    node.cancelScheduledValues(t - 1);
    node.setValueAtTime(prevVal, t);
    node.linearRampToValueAtTime(val, t + latency);
  };

  audioSetFreq(val, t) {
    const { osc1, osc2, latency } = this.audio;
    [osc1.frequency, osc2.frequency].forEach(d => {
      const prevVal = d.value;
      d.cancelScheduledValues(t - 1);
      d.setValueAtTime(prevVal, t);
      d.exponentialRampToValueAtTime(val, t + latency);
    });
  };

  audioSetOsc(osc, type) {
    this.audioMute();
    setTimeout(() => {
      this.audio[osc].type = type;
    }, 10);
  };
///////////////////////////

/////////////////////
// Layout Handlers //
  handleTouchStart() {
    if (this.state.isVertical) {
      window.removeEventListener('touchstart', this.handleTouchStart);
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      this.noSleep.enable();
      this.audio.ctx.resume();
    };
  };

  handleScroll() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(this.handleLock, 20);
  };

  handleLock() {
    const { app, shadowMask } = this.refs;
    if ((window.innerHeight + 2000) === app.clientHeight) {
      window.removeEventListener('scroll', this.handleScroll);
      disableBodyScroll(app);
      app.style.height = '100vh';
      shadowMask.style.opacity = 0;
      window.scrollTo(0, 0);
      this.setState(prevState => ({ isLocked: true, initOk: true }));
    };
  };

  handleResize() {
    const { app, shadowMask } = this.refs;
    const { isVertical, initOk } = this.state;
    this.setState(prevState => ({ isLocked: false }));
    app.style.height = 'calc(100vh + 2000px)';
    if (isVertical) {
      if (initOk && (window.innerHeight + 2000) === app.clientHeight) {
        this.handleLock();
      } else {
        window.scrollY === 0 || window.scrollTo(0, 1000);
        shadowMask.style.opacity = 1;
        window.addEventListener('scroll', this.handleScroll);
        enableBodyScroll(app);
      };
    } else {
      shadowMask.style.opacity = 1;
      window.removeEventListener('scroll', this.handleScroll);
      disableBodyScroll(app);
    };
  };

  handleOrientation() {
    const isVertical = !Math.abs(window.orientation);
    this.setState(prevState => ({ isVertical }), this.handleResize);
  };
/////////////////////


  render() {
    const { isVertical, audioOk, cameraOk, initOk } = this.state;
    const { videoStream, audio } = this;
    return (
      <div ref="app" id="App">
        <SvgDefs />
        <div id="bgi" className="fullscreen" />
        <div ref="shadowMask" id="shadow-mask" className="fullscreen" />
          {initOk &&
            <Main
              isVertical={isVertical}
              videoStream={videoStream}
              audio={audio}
            />
          }
          <Splash
            isVertical={isVertical}
            cameraOk={cameraOk}
            audioOk={audioOk}
            initOk={initOk}
          />
      </div>
    );
  };
};
