import React, { PureComponent } from 'react';
import './App.css';
import { SvgDefs } from './components/_svg.js';
import Audio from './components/_audio.js';
import Splash from './components/_splash.js';
import Main from './components/desktop/Main.js';

// import Audio from './components/_audio2.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      audioOk: null,
      streamOk: null,
      initOk: null,
    };
    this.audio = undefined;
    this.videoStream = undefined;
    this.audioStream = undefined;
    this.handleClickInit = this.handleClickInit.bind(this);
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
    audio.makeOsc('osc1', 'triangle');
    audio.makeOsc('osc2', 'sine', { detune: -1200 });
    audio.makeGain('fmGain', 1500);
    audio.makeGain('instGain', .0001);
    audio.makeEq('hpf', 'highpass', { Hz: 0 });
    audio.makeEq('lpf', 'lowpass', { Hz: 2200 });
    audio.makeDelay('delay', 0);
    audio.makeGain('delayGain', 0);
    audio.makeGain('masterGain', .73);
    audio.makeAnalyser('analyser', { fftBase: 8 });
    audio.connectBatch(
      ['osc1', 'fmGain'],
      ['fmGain', ['osc2', 'frequency']],
      ['osc2', 'instGain'],
      ['instGain', 'hpf'],
      ['hpf', 'lpf'],
      ['lpf', 'masterGain'],
      ['lpf', 'delay'],
      ['delay', 'delayGain'],
      ['delayGain', 'masterGain'],
      ['masterGain', 'analyser'],
      ['masterGain', 'output'],
    );
    this.audio = audio;
    this.setState(prevState => ({ audioOk: true }));
    return true;
  };


  // audioInit() {
  //   const audio = Audio();
  //   audio.osc = audio.create('osc', { type: 'sine', frequency: 5000, detune: -12, exponential: false });
  //   // audio.gain = audio.create('gain');
  //   // audio.eq = audio.create('eq');
  //   // audio.delay = audio.create('delay');
  //   // audio.analyser = audio.create('analyser');
  //   // audio.stream = audio.create('stream');
  //   // console.log('user-facing', audio)

  //   console.log(audio.osc)
  //   // console.log(audio.osc.frequency)
  //   audio.osc.type = 'sawtooth'
  //   setTimeout(() => console.log(audio.osc.frequency), 1000)
  //   setTimeout(() => {
  //     audio.osc.frequency = 22000
  //   }, 2000)
  //   // setTimeout(() => console.log(audio.osc.frequency), 3000)
  //   // setTimeout(() => audio.osc.frequency = 2000, 4000)
  //   setTimeout(() => console.log(audio.osc), 5000)

  //   console.log(audio)

  //   // console.log(audio.nodes)
  //   // console.log(audio.osc)
  //   // setTimeout(() => console.log(audio.osc), 1000)
  //   // console.log(audio)
  //   // console.log(Audio.prototype)
  //   // console.log('now', audio.now)
  //   // setInterval(() => console.log('now', audio.now, 1000)
  //   // const test = Object.getOwnPropertyDescriptors(audio.nodes.osc1)
  //   // console.log(test)
  //   // console.log(audio.params(), audio)
  //   // audio.params()

  //   // console.log(audio, audio.params())
  //   // audio.setRamp(['instGain', 'gain'], 1)
  // }


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
        this.audio.makeStream('mic', this.audioStream);
        this.setState(prevState => ({ streamOk: true }));
        window.addEventListener('click', this.handleClickInit);
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({ streamOk: false }));
      });
  };

  handleClickInit() {
    window.removeEventListener('click', this.handleClick);
    this.refs.shadowMask.style.opacity = 0;
    this.setState(prevState => ({ initOk: true }));
  };
//////////////////////////

  render() {
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




        // <SvgDefs />
        // <div id="bgi" className="fullscreen" />
        // <div ref="shadowMask" id="shadow-mask" className="fullscreen" />
        // {initOk
        //   ? <Main
        //       audio={audio}
        //       videoStream={videoStream}
        //     />
        //   : <Splash
        //       audioOk={audioOk}
        //       streamOk={streamOk}
        //       initOk={initOk}
        //     />
        // }




    // this.passbackMeters = this.passbackMeters.bind(this);
    // this.drawMeters = undefined;
    // this.runtimeStack = this.runtimeStack.bind(this);
    // this.runtime = 0;
    // this.rAF = 0;



  // passbackMeters(getData) {
  //   this.drawMeters = getData;
  //   this.audio.analyserSrc = 'mic'
  //   // console.profile('meters')
  //   this.runtimeStack();
  //   // setTimeout(() => console.profileEnd('meters'), 5000);
  // };


  // runtimeStack() {
  //   requestAnimationFrame(this.runtimeStack);
  //   // const freq = Math.random() * 1000;
  //   // this.audio.setRampBatch([
  //   //   [['instGain', 'gain'], Math.random(), true],
  //   //   [['osc1', 'frequency'], freq],
  //   //   [['osc2', 'frequency'], freq]
  //   // ])
  //   this.drawMeters();
  // };


        // <Meters
        //   audio={this.props.audio}
        //   passback={this.passbackMeters}
        // />



    // audio.analyserSrc = 'masterGain';


    // setTimeout(() => {
    //   audio.analyserSrc = 'osc1'
    //   console.log('osc1', audio._analyser, audio._analyserSrc, audio)
    // }, 1000)
    // setTimeout(() => {
    //   audio.analyserSrc = 'osc2'
    //   console.log('osc2', audio._analyser, audio._analyserSrc, audio)
    // }, 2000)
    // setTimeout(() => {
    //   audio.analyserSrc = 'masterGain'
    //   console.log('masterGain', audio._analyser, audio._analyserSrc, audio)
    // }, 3000)
    // setTimeout(() => {
    //   audio.analyserSrc = 'instGain'
    //   console.log('instGain', audio._analyser, audio._analyserSrc, audio)
    // }, 4000)

    // console.log(audio)

    // audio.setRamp(['instGain', 'gain'], .5)
    // this.rand = () => {
    //   const freq = Math.random() * 1000;
    //   audio.setRampBatch([
    //     [['masterGain', 'gain'], Math.random(), true],
    //     [['osc1', 'frequency'], freq],
    //     [['osc2', 'frequency'], freq]
    //   ])
    //   console.log(audio.waveData)
    //   requestAnimationFrame(this.rand)
    // }
    // this.rand();


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
