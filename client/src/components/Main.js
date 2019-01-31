import React, { PureComponent } from 'react';
import './_css/Main.css';
import { Logo } from './_svg.js';
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

      track: false,

      osc1: props.audio.osc1.type,
      osc2: props.audio.osc2.type,
      color1: '#00FF00',
      color2: '#FF0000',
      colorActive: false,
    };
    this.getData = undefined;
    this.drawScreen = undefined;
    this.videoInit = this.videoInit.bind(this);
    this.trackerInit = this.trackerInit.bind(this);
    this.trackerCallback = this.trackerCallback.bind(this);
    this.trackerColorRefresh = this.trackerColorRefresh.bind(this);
    this.runtimeStack = this.runtimeStack.bind(this);

    this.passbackMeters = this.passbackMeters.bind(this)
    this.passbackScreen = this.passbackScreen.bind(this);


    // this.audioRefresh = this.audioRefresh.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.handleSetOsc = this.handleSetOsc.bind(this);
    this.handleGetColor = this.handleGetColor.bind(this);
    this.handleSetColor = this.handleSetColor.bind(this);

  };


  componentDidMount() {
    const color1 = localStorage.getItem('color1');
    const color2 = localStorage.getItem('color2');
    if (color1 && color2) {
      this.setState(prevState => ({ color1, color2 }));
    };
    this.handleOrientationChange();
    window.addEventListener('orientationchange', this.handleOrientationChange);
    this.videoInit();
  };

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
    const { video, color1, color2 } = this.state;
    this.tracker = new Tracker(video, [color1, color2], this.trackerCallback);
    const track = this.tracker.init();
    this.setState(prevState => ({ track }), this.runtimeStack);
  };

  trackerCallback(data) {
    this.audioRefresh(data[1].x, data[0].y);
    this.drawScreen(data)
  };

  trackerColorRefresh() {
    const { color1, color2 } = this.state;
    this.tracker.setColors([color1, color2]);

  };

  runtimeStack() {
    this.tracker.masterStack();
    this.drawMeters();
    this.rAF = requestAnimationFrame(this.runtimeStack);
  };



////////////////////////////
// CHILD PASSBACK METHODS //

  passbackMeters(getData) {
    this.drawMeters = getData;
  };

  passbackScreen(drawScreen, cropX, cropY, cW, cH) {
    this.tracker.cropX = cropX;
    this.tracker.cropY = cropY;
    this.cW = cW;
    this.cH = cH;
    this.drawScreen = drawScreen;
  };
////////////////////////////


  audioRefresh(posX, posY) {
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
    alert(this.state.help)
    this.setState(prevState => ({ showHelp: !prevState.showHelp }));
  };

  handleSetOsc(osc, type) {
    this.props.audio.audioSetOsc(osc, type);
    this.setState(prevState => ({ [osc]: type }));
  };

  handleGetColor(colorActive) {
    if (this.state.colorActive !== colorActive) {
      this.setState(prevState => ({ colorActive }));
    } else {
      this.setState(prevState => ({ colorActive: false }));
    }
  };

  handleSetColor(rgba) {
    const setTarget = 'color' + this.state.colorActive;
    const color = this.rgbaToHex(rgba);
    localStorage.setItem(setTarget, color);
    this.setState(prevState => ({
      [setTarget]: color,
      colorActive: false
    }), this.trackerColorRefresh);
  };


  render() {
    const { analyser } = this.props.audio;
    const {
      orientationOk,
      showHelp,
      video,
      osc1,
      osc2,
      color1,
      color2,
      colorActive,
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
                  getColor={this.handleGetColor}
                />
              </div>
              <div className="r r4">
                <Meters
                  analyser={analyser}
                  passback={this.passbackMeters}
                />
              </div>
            </React.Fragment>
        }
      </div>
    );
  };
};
