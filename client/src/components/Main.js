import React, { PureComponent } from 'react';
import './_css/Main.css';
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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
      color1: '#FFFFFF',
      color2: '#FF0000',
    };
    this.videoInit = this.videoInit.bind(this);
    this.trackerInit = this.trackerInit.bind(this);
    this.trackerCallback = this.trackerCallback.bind(this);
    this.start = this.start.bind(this);

    this.passbackMeters = this.passbackMeters.bind(this)
    this.passbackScreen = this.passbackScreen.bind(this);
    // this.getData = undefined;
    // this.drawScreen = undefined;





    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    // this.toggleHelp = this.toggleHelp.bind(this);
    // this.audioRefresh = this.audioRefresh.bind(this);


  };


  componentDidMount() {
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
    // console.log('in videoinit', width, height)
  };

  trackerInit() {
    const { video, color1, color2 } = this.state;
    this.tracker = new Tracker(video, [color1, color2], this.trackerCallback);
    const track = this.tracker.init();
    this.setState(prevState => ({ track }), this.start);
  };

  trackerCallback(data) {
    this.drawScreen(data)
  };

  start() {
    this.tracker.masterStack()
    this.rAF = requestAnimationFrame(this.start);
  };




  passbackMeters(getData) {
    this.getData = getData;
  };

  passbackScreen(drawScreen) {
    this.drawScreen = drawScreen;
  };






  handleOrientationChange() {
    const orientation = Math.abs(window.orientation);
    this.setState(prevState => ({ orientationOk: !orientation }));
  };


  audioRefresh(x, y) {
    const { ctx, baseHz, setGain, setFreq } = this.props.audio;
    const gain = (y ** 2);
    const freq = (2 ** x) * baseHz;
    setGain(gain, ctx.currentTime);
    setFreq(freq, ctx.currentTime);
  };

  toggleHelp() {
    alert(this.state.help)
    this.setState(prevState => ({ showHelp: !prevState.showHelp }));
  };




  render() {
    // console.log(this.getData, this.drawScreen)
    const { orientationOk, showHelp, video } = this.state;
    const { ctx, osc1, osc2, instGain, analyser, mute, setGain, setFreq, setOsc } = this.props.audio;
    return (
      <div className="Main" ref="main">
        {false
          ? <div className="splash">
              <div className="logo-box">
                <Logo opacity={.6} />
              </div>
            </div>
          : <React.Fragment>
              <div className="r r1">
                <Placard active={showHelp} handleClick={this.toggleHelp} />
              </div>
              <div className="r r2">
                {video && <Screen video={video} passback={this.passbackScreen} />}
              </div>
              <div className="r r3">
                <Oscillators osc1={osc1.type} osc2={osc2.type} setOsc={setOsc} />
                <Settings />
              </div>
              <div className="r r4">
                <Meters analyser={analyser} passback={this.passbackMeters} />
              </div>
            </React.Fragment>
        }
      </div>
    );
  };
};

        // {!orientationOk
