import React, { PureComponent } from 'react';
import './_css/Main.css';
import Tracker from '../_tracker2.js'
// import Init from './Init.js'
// import AnimationStack from './AnimationStack.js';
// import Placard from './Placard.js';
// import Instructions from './Instructions.js';
// import Settings from './Settings.js';
// import Delay from './Delay.js';
// import Oscillators from './Oscillators.js';
// import FmSynth from './FmSynth.js';
// import Eq from './Eq.js';
// import Master from './Master.js';

import Screen from './Screen.js';
import Oscillator from './Oscillator.js';
import FmSynth from './FmSynth.js';

export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this._params = {
      fmDepth: {
        param: props.audio.nodes.fmGain.gain,
        min: 0,
        max: 3000,
        // range: 3000,
        toPct: (val) => (val / 3000),
        toVal: (pct) => (pct * 3000),
      },
      fmWidth: {
        param: props.audio.nodes.osc2.detune,
        min: -1200,
        max: 1200,
        // range: 2400,
        toPct: (val) => ((val + 1200) / 2400),
        toVal: (pct) => ((pct * 2400) - 1200),
      },
      hpf: {
        param: props.audio.nodes.hpf.frequency,
        min: 0,
        max: 2200,
        // range: 2200,
        toPct: (val) => (val / 2200),
        toVal: (pct) => (pct * 2200),
      },
      lpf: {
        param: props.audio.nodes.lpf.frequency,
        min: 2200,
        max: 22000,
        // range: 19800,
        toPct: (val) => ((val - 2200) / 19800),
        toVal: (pct) => ((pct * 19800) + 2200),
      },
      delayTime: {
        param: props.audio.nodes.delay.delayTime,
        min: 0,
        max: .999,
        // range: .999,
        toPct: (val) => (val / .999),
        toVal: (pct) => (pct * .999),
      },
      delayWet: {
        param: props.audio.nodes.delayGain.gain,
        min: 0,
        max: 1,
        // range: 1,
        toPct: (val) => (val),
        toVal: (pct) => (pct),
      },
    };




    this.state = {
      // showHelp: false,
      // video: false,
      // trackerCtx: false,
      color1: '#00FF00',
      color2: '#FF0000',
      // colorActive: false,
      sensitivity: 20,
      range: 5,
      osc1: props.audio.nodes.osc1.type,
      osc2: props.audio.nodes.osc2.type,
      fmDepth: this._params.fmDepth.toPct(this._params.fmDepth.param.value),
      fmWidth: this._params.fmWidth.toPct(this._params.fmWidth.param.value),
      hpf: this._params.hpf.toPct(this._params.hpf.param.value),
      lpf: this._params.lpf.toPct(this._params.lpf.param.value),
      delayTime: this._params.delayTime.toPct(this._params.delayTime.param.value),
      delayWet: this._params.delayWet.toPct(this._params.delayWet.param.value),


    };

    this.passbackScreen = this.passbackScreen.bind(this);
    this.trackerCallback = this.trackerCallback.bind(this);

    this.handleSetOsc = this.handleSetOsc.bind(this);
    this.handleSetParam = this.handleSetParam.bind(this);
    this.paramInterval = 0;


    this.runTrack = this.runTrack.bind(this)
  };

  componentDidMount() {
    // const color1 = localStorage.getItem('color1');
    // const color2 = localStorage.getItem('color2');
    // color1 && color2 && this.setState(prevState => ({ color1, color2 }));
  };

  passbackScreen(video, drawScreen) {
    this.video = video;
    this.drawScreen = drawScreen;
    this.trackerInit(video);
  };


  trackerInit(video) {
    const { color1, color2, sensitivity } = this.state;
    this.tracker = new Tracker(video, [color1, color2], this.trackerCallback, 5, sensitivity);
    this.trackerCanvas = this.tracker.init();
    // setInterval(this.runTrack, 100)
    this.runTrack();
  };


  runTrack() {
    // console.log('raf')
    this.tracker.runtime()
    requestAnimationFrame(this.runTrack)
  }


  trackerCallback(data) {
    this.drawScreen(data)
    // console.log(data)
  }


//////////////////////////
// Initialization Stack //
  // videoInit() {
  //   const { videoStream } = this.props;
  //   const { width, height } = videoStream.getVideoTracks()[0].getSettings();
  //   const video = document.createElement('video');
  //   video.srcObject = videoStream;
  //   video.width = width;
  //   video.height = height;
  //   video.preload = true;
  //   video.loop = true;
  //   video.playsInline = true;
  //   video.play();
  //   this.setState(prevState => ({ video }), this.trackerInit);
  // };

  // trackerInit() {
  //   const { video, color1, color2, sensitivity } = this.state;
  //   this.tracker = new Tracker(video, [color1, color2], this.trackerRuntime, sensitivity);
  //   this.tracker.cropX = this.cropX;
  //   this.tracker.cropY = this.cropY;
  //   const trackerCtx = this.tracker.init();
  //   this.setState(prevState => ({ trackerCtx }), this.runtimeStack);
  // };

  // trackerSetColors() {
  //   const { color1, color2 } = this.state;
  //   this.tracker.setColors([color1, color2]);
  // };
//////////////////////////

///////////////////
// Runtime Stack //
  audioRuntime(posX, posY) {
    const { ctx, baseHz, audioMute, audioSetGain, audioSetFreq } = this.props.audio;
    if (!posX || !posY) {
      audioMute();
    } else {
      const { cW, cH } = this;
      const x = (cW - posX) * (5 / cW);
      const y = 1 - ((posY / cH) / 2);
      const gain = (y ** 2);
      const freq = (2 ** x) * baseHz;
      audioSetGain(gain, ctx.currentTime);
      audioSetFreq(freq, ctx.currentTime);
    };
  };

  trackerRuntime(data) {
    this.audioRuntime(data[1].x, data[0].y);
    this.drawScreen(data)
  };

  runtimeStack() {
    this.drawMeters();
    this.tracker.runtime();
    this.rAF = requestAnimationFrame(this.runtimeStack);
  };
///////////////////

////////////////////////////
// Child Passback Capture //
  passbackMeters(getData) {
    this.drawMeters = getData;
  };

  // passbackScreen(drawScreen, cropX, cropY, cW, cH) {
  //   this.drawScreen = drawScreen;
  //   this.cropX = cropX;
  //   this.cropY = cropY;
  //   this.cW = cW;
  //   this.cH = cH;
  // };
////////////////////////////

////////////////////////
// Handlers + Helpers //
  handleSetOsc(id, delta) {
    const { osc, type } = this.props.audio.setOsc(id, delta);
    this.setState(prevState => ({ [osc]: type }));
  };

  handleSetParam(id, delta, t) {
    const { param, toVal } = this._params[id];
    const pct = this.state[id];
    let newPct = pct + (delta * .0004) * (20 ** (pct < .5 ? pct : 1 - pct));
    newPct = newPct > 1 ? 1 : newPct < 0 ? 0 : newPct;
    this.setState(prevState => ({ [id]: newPct }));
    if (this.paramInterval < t) {
      this.paramInterval = t + 100;
      this.props.audio.setParam(param, toVal(newPct), .1);
    };
  };





////////////////////////


  render() {
    const {
      color1,
      color2,
      colorActive,
      sensitivity,
      range,
      osc1,
      osc2,
      fmDepth,
      fmWidth,
      hpf,
      lpf,
      delayTime,
      delayWet,
    } = this.state;

    return (
      <div id="Main">
        <Screen
          color1={color1}
          color2={color2}
          colorActive={colorActive}
          videoStream={this.props.videoStream}
          passback={this.passbackScreen}
        />
        <Oscillator
          osc={1}
          current={osc1}
          setOsc={this.handleSetOsc}
          />
        <Oscillator
          osc={2}
          current={osc2}
          setOsc={this.handleSetOsc}
        />
        <FmSynth
          fmDepth={fmDepth}
          fmWidth={fmWidth}
          setFm={this.handleSetParam}
        />




        <div id="Colors" className="outer">
          <div className="inner border"/>
        </div>
        <div id="Sensitivity" className="outer">
          <div className="inner border"/>
        </div>
        <div id="" className="outer">
          <div className="inner border"/>
        </div>
        <div id="Placard" className="outer">
          <div className="inner border"/>
        </div>
      </div>
    );
  };
};
