import React, { PureComponent } from 'react';
import './_css/Main.css';
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { Logo } from './_svg.js';

import Placard from './Placard.js';
import Screen from './Screen.js';
import Oscillators from './Oscillators.js';
import Meters from './Meters.js';


export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientationOk: true,
      showHelp: false,
      video: false,
    };
    this.videoInit = this.videoInit.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);


    this.toggleHelp = this.toggleHelp.bind(this);


    this.audioRefresh = this.audioRefresh.bind(this);
    this.passbackMeters = this.passbackMeters.bind(this)
    this.start = this.start.bind(this);
  };


  componentDidMount() {
    window.addEventListener('orientationchange', this.handleOrientationChange);
    this.handleOrientationChange();
  };

  componentDidUpdate() {
    // if (!this.refs.video) this.videoInit();
  }

  handleOrientationChange() {
    const orientation = Math.abs(window.orientation);
    this.setState(prevState => ({ orientationOk: !orientation }));
  };



  // handleOrientationChange() {
  //   // console.log('orientationchange', this.state.video.width, this.props.videoStream)
  //   const orientation = Math.abs(window.orientation)
  //   // this.state.video.srcObject = null
  //   this.setState(prevState => ({ video: false }), () => {
  //     setTimeout(() => {
  //       // this.videoInit();
  //     }, 2000);
  //   });
  // };













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
    this.setState(prevState => ({ video }));
    console.log('in videoinit', width, height)
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


  passbackMeters(getData) {
    this.getData = getData;
    // this.start();
  };


  start() {
    this.getData();
    this.rAF = requestAnimationFrame(this.start);
    this.setState(prevState => ({ raf: this.rAF }))
  };







  render() {
    const { orientationOk, showHelp, video } = this.state;
    const { ctx, osc1, osc2, instGain, analyser, mute, setGain, setFreq, setOsc } = this.props.audio;
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
                <Placard active={showHelp} handleClick={this.toggleHelp} />
              </div>
              <div className="r r2">
                {video && <Screen video={video} />}
              </div>
              <div className="r r3">
                <Oscillators osc1={osc1.type} osc2={osc2.type} setOsc={setOsc} />
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

