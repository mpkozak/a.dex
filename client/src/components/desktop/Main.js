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
import Colors from './Colors.js';
import Oscillator from './Oscillator.js';
import FmSynth from './FmSynth.js';
import Meters from './Meters.js';

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
    this._audioTrackParams = {
      vol: props.audio.nodes.instGain.gain,
      osc1: props.audio.nodes.osc1.frequency,
      osc2: props.audio.nodes.osc2.frequency
    }
    this.state = {
      // showHelp: false,
      // video: false,
      color1: '',
      color2: '',
      colorActive: false,
      sensitivity: 50,
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
    this.tracker = undefined;
    this.trackerCtx = {};
    this.rAF = 0;
    this.paramInterval = 0;

    this.passbackScreen = this.passbackScreen.bind(this);
    this.passbackMeters = this.passbackMeters.bind(this);

    this.trackerSetColors = this.trackerSetColors.bind(this);
    this.trackerCallback = this.trackerCallback.bind(this);

    this.rAFStack = this.rAFStack.bind(this);

    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleColorCallback = this.handleColorCallback.bind(this);
    this.handleSetOsc = this.handleSetOsc.bind(this);
    this.handleSetParam = this.handleSetParam.bind(this);
  };

  componentDidMount() {
    const color1 = localStorage.getItem('color1') || '#00FF00';
    const color2 = localStorage.getItem('color2') || '#FF0000';
    this.setState(prevState => ({ color1, color2 }));
  };

  passbackScreen(drawScreen, video, vW, vH) {
    this.vW = video.clientWidth;
    this.vH = video.clientHeight;
    this.drawScreen = drawScreen;
    this.trackerInit(video);
  };

  passbackMeters(getData) {
    this.drawMeters = getData;
  };

  trackerInit(video) {
    const { color1, color2, sensitivity } = this.state;
    this.tracker = new Tracker(video, [color1, color2], this.trackerCallback, 10, sensitivity);
    this.trackerCtx = this.tracker.init();
    this.rAFStack();
  };

  trackerSetColors() {
    const { color1, color2 } = this.state;
    this.tracker.colors = [color1, color2];
  };


///////////////////
// Runtime Stack //
  trackerCallback(data) {
    this.audioRuntime(data[1].x, data[0].y);
    this.drawScreen(data);
  };

  audioRuntime(posX, posY) {
    const { audio } = this.props;
    const { range } = this.state;
    const { vol, osc1, osc2 } = this._audioTrackParams;

    if (!posX || !posY) {
      if (!this.muted) {
        console.log('ran mute')
        this.muted = true;
        return audio.setRampExp(vol, 0, .1);
      } else return null;
    };
    console.log('past mute stack')
    this.muted = false;
    const x = (this.vW - posX) / this.vW;
    const y = (this.vH - posY) / this.vH;
    const frequency = (2 ** (x * range)) * audio.baseHz;
    const gain = (y ** 2);
    audio.setRampBatch([
      [vol, gain, true],
      [osc1, frequency, false],
      [osc2, frequency, false],
    ]);
  };

  rAFStack() {
    requestAnimationFrame(this.rAFStack);
    this.drawMeters();
    this.tracker.runtime();
    // this.rAF = requestAnimationFrame(this.rAFStack);
  };
///////////////////




////////////////////////
// Handlers + Helpers //
  rgbaToHex(rgba) {
    let color = '#';
    rgba.forEach((d, i) => {
      (i < 3) && (color += ('0' + d.toString(16)).slice(-2));
    });
    return color;
  };

  handleColorClick(id) {
    const { colorActive } = this.state;
    this.setState(prevState => ({
      colorActive: (id === colorActive ? false : id)
    }));
  };

  handleColorCallback(e) {
    const { colorActive } = this.state;
    const { ctx, scalar } = this.trackerCtx;
    const rgba = ctx.getImageData(e.offsetX / scalar, e.offsetY / scalar, 1, 1).data;
    const color = this.rgbaToHex(rgba);
    localStorage.setItem(colorActive, color);
    this.setState(prevState => ({
      [colorActive]: color,
      colorActive: false
    }), this.trackerSetColors);
  };

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
          colorCallback={this.handleColorCallback}
          passback={this.passbackScreen}
        />
        <Colors
          color1={color1}
          color2={color2}
          colorActive={colorActive}
          colorClick={this.handleColorClick}
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
        <Meters
          audio={this.props.audio}
          passback={this.passbackMeters}
        />



        <div id="" className="outer">
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
