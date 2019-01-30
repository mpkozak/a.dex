import React, { PureComponent } from 'react';
import './App.css';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { NoAudio, NoVideo, Init } from './_splash.js';
import { Logo, SvgDefs } from './components/_svg.js';
import Main from './components/Main.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      webAudioOk: false,
      cameraOk: false,
      initOk: false
    };
    this.videoStream = undefined;
    this.audio = undefined;
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    this.handleLock = this.handleLock.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.audioMute = this.audioMute.bind(this);
    this.audioSetGain = this.audioSetGain.bind(this);
    this.audioSetFreq = this.audioSetFreq.bind(this);
    this.audioSetOsc = this.audioSetOsc.bind(this);
  };

  componentDidMount() {
    disableBodyScroll(this.refs.app);
    if (!!global.AnalyserNode.prototype.getFloatTimeDomainData) {
      this.setState(prevState => ({ webAudioOk: true }), () => {
        this.audioInit() && this.videoInit();
      });
    };
  };


//////////////////////////
// INITIALIZATION STACK //

  videoInit() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    })
      .then(stream => {
        this.videoStream = stream;
        this.setState(prevState => ({ cameraOk: true }), () => {
          enableBodyScroll(this.refs.app);
          window.addEventListener('touchstart', this.handleSwipe);
        });
      })
      .catch(err => {
        console.log(err);
      });

        // this.setState(prevState => ({ cameraOk: true }), () => {
        //   enableBodyScroll(this.refs.app);
        //   window.addEventListener('touchstart', this.handleSwipe);
        // });
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
    masterGain.connect(analyser);
    instGain.connect(analyser);
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
      mute: this.audioMute,
      setGain: this.audioSetGain,
      setFreq: this.audioSetFreq,
      setOsc: this.audioSetOsc
    };
    return true;
  };
//////////////////////////


///////////////////////////
// AUDIO REFRESH METHODS //

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
// LAYOUT HANDLERS //

  handleSwipe() {
    this.audio.ctx.resume();
    window.removeEventListener('touchstart', this.handleSwipe);
    window.addEventListener('scroll', this.handleScrollEvent);
    window.scrollY === 400 || window.scrollTo(0, 400);
  };

  handleScrollEvent() {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(this.handleLock, 50);
    if (!this.state.initOk) {
      window.scrollY > 400 || window.scrollTo(0, 400);
      window.scrollY < 1500 || window.scrollTo(0, 1500);
      document.querySelector('.splash').style.opacity = 0;
    };
  };

  handleLock() {
    const { initOk } = this.state;
    if ((window.innerHeight + 2000) === this.refs.app.clientHeight) {
      window.removeEventListener('scroll', this.handleScrollEvent);
      this.refs.app.style.height = '100vh';
      disableBodyScroll(this.refs.app);
      window.scrollTo(0, 0);
      if (!initOk) {
        this.setState(prevState => ({ initOk: true }));
        window.addEventListener('resize', this.handleResize);
      };
    };
  };

  handleResize() {
    window.scrollY === 0 || window.scrollTo(0, 0);
    this.refs.app.style.height = 'calc(100vh + 2000px)';
    enableBodyScroll(this.refs.app);
    window.addEventListener('scroll', this.handleScrollEvent);
  };
/////////////////////


  render() {
    const { webAudioOk, cameraOk, initOk } = this.state;
    const { videoStream, audio } = this;
    const bgColor = {
      backgroundColor: !initOk ? 'rgba(0, 0, 0, .7)' : 'none'
    };

    return (
      <div className="App" ref="app" style={bgColor}>
        <SvgDefs />
        {initOk
          ? <Main videoStream={videoStream} audio={audio} />
          : <div className="splash">
              <div className="logo-box">
                <Logo opacity={.6} />
              </div>
              <div className="message-box">
                {cameraOk
                  ? <Init />
                  : webAudioOk
                    ? <NoVideo />
                    : <NoAudio />
                }
              </div>
            </div>
        }
      </div>
    );
  };
};



        // {!webAudioOk
        //   ? <NoAudio />
        //   : !cameraOk
        //     ? <NoVideo />
        //     : !initOk
        //       ? <Init />
        //       : <Main videoStream={videoStream} audio={audio} />
        // }
