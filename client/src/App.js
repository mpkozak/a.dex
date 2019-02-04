import React, { PureComponent } from 'react';
import NoSleep from 'nosleep.js';
import './App.css';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Splash } from './_splash.js';
import { SvgDefs } from './components/_svg.js';
import Main from './components/Main.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientationOk: undefined,
      pending: true,
      audioOk: false,
      cameraOk: false,
      initOk: false,
      hideSplash: false,
    };
    this.noSleep = undefined;
    this.videoStream = undefined;
    this.audio = undefined;
    this.handleOrientation = this.handleOrientation.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.audioMute = this.audioMute.bind(this);
    this.audioSetGain = this.audioSetGain.bind(this);
    this.audioSetFreq = this.audioSetFreq.bind(this);
    this.audioSetOsc = this.audioSetOsc.bind(this);
  };

  componentDidMount() {
    window.addEventListener('orientationchange', this.handleOrientation);
    disableBodyScroll(this.refs.app);
    this.noSleep = new NoSleep();
    if (!!global.AnalyserNode.prototype.getFloatTimeDomainData) {
      this.setState(prevState => ({
        orientationOk: !Math.abs(window.orientation),
        audioOk: true
      }));
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
        this.setState(prevState => ({ cameraOk: true, pending: false }), () => {
          window.addEventListener('touchstart', this.handleSwipe);
          enableBodyScroll(this.refs.app);
        });
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({ pending: false }));
      });
        // this.setState(prevState => ({ cameraOk: true }), () => {
        //   enableBodyScroll(this.refs.app);
        //   window.addEventListener('touchstart', this.handleSwipe);
        // });
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
  handleOrientation() {
    const orientationOk = !Math.abs(window.orientation);
    const hideSplash = orientationOk;
    this.setState(prevState => ({
       orientationOk, hideSplash
    }));
  };

  handleSwipe() {
    if (this.state.orientationOk) {
      window.removeEventListener('touchstart', this.handleSwipe);
      this.audio.ctx.resume();
      this.noSleep.enable();
      window.scrollY === 400 || window.scrollTo(0, 400);
      window.addEventListener('scroll', this.handleScroll);
    };
  };

  handleScroll() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(this.handleLock, 20);
    if (!this.state.initOk) {
      window.scrollY > 400 || window.scrollTo(0, 400);
      window.scrollY < 1500 || window.scrollTo(0, 1500);
    };
    if (!this.state.hideSplash) {
      this.setState(prevState => ({ hideSplash: true }));
    };
  };

  handleLock() {
    const { app, shadowMask } = this.refs;
    if ((window.innerHeight + 2000) === app.clientHeight) {
      window.removeEventListener('scroll', this.handleScroll);
      disableBodyScroll(app);
      app.style.height = '100vh';
      shadowMask.style.opacity = 0;
      window.scrollTo(0, 0);
      if (!this.state.initOk) {
        this.setState(prevState => ({ initOk: true }));
        window.addEventListener('resize', this.handleResize);
      };
    };
  };

  handleResize() {
    const { app, shadowMask } = this.refs;
    app.style.height = 'calc(100vh + 2000px)';
    window.scrollY === 0 || window.scrollTo(0, 0);
    if ((window.innerHeight + 2000) !== app.clientHeight) {
      window.addEventListener('scroll', this.handleScroll);
      enableBodyScroll(app);
      shadowMask.style.opacity = 1;
    };
  };
/////////////////////


  render() {
    const { orientationOk, pending, audioOk, cameraOk, initOk, hideSplash } = this.state;
    const { videoStream, audio } = this;
    const appStyle = {
      backgroundColor: !initOk ? 'rgba(0, 0, 0, .7)' : 'none'
    };

    return (
      <div ref="app" id="App" style={appStyle}>
        <SvgDefs />
        <div id="bgi" className="fullscreen" />
        <div ref="shadowMask" id="shadow-mask" className="fullscreen" />
          {initOk && orientationOk
            ? <Main
                videoStream={videoStream}
                audio={audio}
              />
            : <Splash
                orientationOk={orientationOk}
                pending={pending}
                cameraOk={cameraOk}
                audioOk={audioOk}
                hideSplash={hideSplash}
              />
          }
      </div>
    );
  };
};
