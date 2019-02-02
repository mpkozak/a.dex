import React, { PureComponent } from 'react';
import './_css/Main.css';
import { Logo } from './_svg.js';
// import Instructions from './Instructions.js';
import Tracker from './_tracker.js'
import Placard from './Placard.js';
import Screen from './Screen.js';
import Oscillators from './Oscillators.js';
import Settings from './Settings.js';
import Meters from './Meters.js';

export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientationOk: true,
      showHelp: false,
      video: false,
      trackerCtx: false,
      osc1: props.audio.osc1.type,
      osc2: props.audio.osc2.type,
      color1: '#00FF00',
      color2: '#FF0000',
      colorActive: false,
      sensitivity: 30,
    };
    this.rAF = undefined;
    this.drawMeters = undefined;
    this.drawScreen = undefined;
    this.trackerInit = this.trackerInit.bind(this);
    this.trackerSetColors = this.trackerSetColors.bind(this);
    this.trackerRuntime = this.trackerRuntime.bind(this);
    this.runtimeStack = this.runtimeStack.bind(this);
    this.passbackMeters = this.passbackMeters.bind(this)
    this.passbackScreen = this.passbackScreen.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.handleSetOsc = this.handleSetOsc.bind(this);
    this.handleGetColor = this.handleGetColor.bind(this);
    this.handleSetColor = this.handleSetColor.bind(this);
    this.handleSetSensitivity = this.handleSetSensitivity.bind(this);
  };

  componentDidMount() {
    const color1 = localStorage.getItem('color1');
    const color2 = localStorage.getItem('color2');
    color1 && color2 && this.setState(prevState => ({ color1, color2 }));
    this.handleOrientationChange();
    window.addEventListener('orientationchange', this.handleOrientationChange);
    this.videoInit();
  };

//////////////////////////
// Initialization Stack //
  videoInit() {
    const { videoStream } = this.props;
    const { width, height } = videoStream.getVideoTracks()[0].getSettings();
    const video = document.createElement('video');
    video.srcObject = videoStream;
    video.width = width;
    video.height = height;
    video.preload = true;
    video.loop = true;
    video.playsInline = true;
    video.play();
    this.setState(prevState => ({ video }), this.trackerInit);
  };

  trackerInit() {
    const { video, color1, color2, sensitivity } = this.state;
    this.tracker = new Tracker(video, [color1, color2], this.trackerRuntime, sensitivity);
    this.tracker.cropX = this.cropX;
    this.tracker.cropY = this.cropY;
    const trackerCtx = this.tracker.init();
    this.setState(prevState => ({ trackerCtx }), this.runtimeStack);
  };

  trackerSetColors() {
    const { color1, color2 } = this.state;
    this.tracker.setColors([color1, color2]);
  };
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
    // this.tracker.getData();
    this.rAF = requestAnimationFrame(this.runtimeStack);
  };
///////////////////

////////////////////////////
// Child Passback Capture //
  passbackMeters(getData) {
    this.drawMeters = getData;
  };

  passbackScreen(drawScreen, cropX, cropY, cW, cH) {
    this.drawScreen = drawScreen;
    this.cropX = cropX;
    this.cropY = cropY;
    this.cW = cW;
    this.cH = cH;
  };
////////////////////////////

////////////////////////
// Handlers + Helpers //
  rgbaToHex(rgba) {
    let color = '#';
    rgba.forEach((d, i) => {
      (i < 3) && (color += ('0' + d.toString(16)).slice(-2));
    });
    return color;
  };

  handleOrientationChange() {
    const orientation = Math.abs(window.orientation);
    this.setState(prevState => ({ orientationOk: !orientation }));
  };

  handleToggleHelp() {
    this.setState(prevState => ({ showHelp: !prevState.showHelp }));
  };

  handleSetOsc(osc, type) {
    this.props.audio.audioSetOsc(osc, type);
    this.setState(prevState => ({ [osc]: type }));
  };

  handleGetColor(colorSet) {
    const colorActive = (this.state.colorActive !== colorSet) && colorSet;
    this.setState(prevState => ({ colorActive }));
  };

  handleSetColor(rgba) {
    const setTarget = 'color' + this.state.colorActive;
    const color = this.rgbaToHex(rgba);
    localStorage.setItem(setTarget, color);
    this.setState(prevState => ({
      [setTarget]: color,
      colorActive: false
    }), this.trackerSetColors);
  };

  handleSetSensitivity(e) {
    const parent = e.target.parentNode.parentNode.parentNode.parentNode;
    const { offsetLeft, offsetWidth } = parent;
    const { clientX } = e.targetTouches[0];
    let pct = (clientX - offsetLeft) / offsetWidth;
    if (pct > 1) {
      pct = 1;
    } else if (pct < 0) {
      pct = 0;
    };
    const sensitivity = pct * 150;
    this.tracker.sensitivity = sensitivity;
    this.setState(prevState => ({ sensitivity }));
  };
////////////////////////


              // {showHelp &&
              //   <Instructions show={showHelp} toggleHelp={this.handleToggleHelp} />
              // }


  render() {
    const {
      orientationOk,
      showHelp,
      video,
      osc1,
      osc2,
      color1,
      color2,
      colorActive,
      sensitivity,
    } = this.state;
    return (
      <div className="Main" ref="main">
        {!orientationOk
          ? <div className="splash">
              <div className="logo-box">
                <Logo opacity={.6} />
              </div>
            </div>
          : <React.Fragment>
              <div className="r r1">
                <Placard
                  active={showHelp}
                  toggleHelp={this.handleToggleHelp}
                />
              </div>
              <div className="r r2">
                {video &&
                  <Screen
                    video={video}
                    colorActive={colorActive}
                    setColor={this.handleSetColor}
                    passback={this.passbackScreen}
                  />
                }
              </div>
              <div className="r r3">
                <Oscillators
                  osc1={osc1}
                  osc2={osc2}
                  setOsc={this.handleSetOsc}
                />
                <Settings
                  color1={color1}
                  color2={color2}
                  active={colorActive}
                  sensitivity={sensitivity / 150}
                  getColor={this.handleGetColor}
                  setSensitivity={this.handleSetSensitivity}
                />
              </div>
              <div className="r r4">
                <Meters
                  analyser={this.props.audio.analyser}
                  passback={this.passbackMeters}
                />
              </div>
            </React.Fragment>
        }
      </div>
    );
  };
};
