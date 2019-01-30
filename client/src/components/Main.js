import React, { PureComponent } from 'react';
import './_css/Main.css';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import Placard from './Placard.js';
import Screen from './Screen.js';
import Oscillators from './Oscillators.js';
import Meters from './Meters.js';


export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      audioEnabled: false,
      showHelp: false,
      video: false,
    };
    this.audio = props.audio;


    this.toggleHelp = this.toggleHelp.bind(this);


    this.audioRefresh = this.audioRefresh.bind(this);
    this.passbackMeters = this.passbackMeters.bind(this)
    this.start = this.start.bind(this);
    this.videoInit = this.videoInit.bind(this);
  };




  componentDidMount() {

    this.videoInit();


    // const mainWidth = this.refs.main.clientWidth;
    // const mainHeight = this.refs.main.clientHeight;
    // const { innerWidth, innerHeight } = window;

    // (() => {
    //   console.log('hid')
    //   setTimeout(function() {
    //     if(window.pageYOffset !== 0) return;
    //     window.scrollTo(0, window.pageYOffset + 1);

    //   }, 1000)}
    // )();

    // disableBodyScroll(this.refs.main)

    // setTimeout(() => {
    //   window.scrollTo(0,100)
    // }, 1000)

    // setTimeout(() => {
    //   window.scrollTo(0,-100)
    // }, 2000)

    // const body = document.query
    // clearAllBodyScrollLocks()
    // window.addEventListener('touchstart', () => {
    //   // window.scrollTo(0,100)
    //   console.log(mainWidth, mainHeight, innerWidth, innerHeight)
    //   console.log(window.scrollY)
    // })



    // console.log('main mount', this.props.videoStream)
    // this.setState(prevState => ({ videoStream: this.props.videoStream }))
    // console.log(this.refs)
    // this.refs.video = document.createElement('video');
    // console.log(this.props.audio)
    // window.addEventListener('touchstart', () => this.props.audio.setGain(Math.random()))

    // const { ctx, instGain } = this.audio;
    // this.props.audio.setGain(instGain.gain, 0, ctx.currentTime, .001)

    // console.log(this.props.audio.instGain.gain)


        // const { width, height } = this.props.videoStream.getVideoTracks()[0].getSettings();
        // console.log('in main ', width, height)
  };

  componentDidUpdate() {
    // if (!this.refs.video) this.videoInit();
  }


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
  };


  audioRefresh(x, y) {
    const { ctx, baseHz, setGain, setFreq } = this.audio;
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
    requestAnimationFrame(this.start);
  };







  render() {
    const { showHelp, video } = this.state;
    const { ctx, osc1, osc2, instGain, analyser, mute, setGain, setFreq } = this.audio;
    return (
      <div className="Main" ref="main">
        <div className="top">
          <Placard active={showHelp} handleClick={this.toggleHelp} />
        </div>
        <div className="middle">
          {video && <Screen video={video} />}
        </div>
        <div className="bottom">
          <div className="left">
            <div className="top">top</div>
            <div className="bottom">
              <Oscillators osc1={osc1} osc2={osc2} mute={mute} />
            </div>
          </div>
          <div className="right">
            <Meters analyser={analyser} passback={this.passbackMeters} />
          </div>
        </div>
      </div>
    );
  };
};






          // <Screen video={video} />



            // <div className="bottom">
            //   <Oscillators osc1={osc1} osc2={osc2} mute={mute} />
            //   <Meters analyser={analyser} passback={this.passbackMeters} />
            // </div>



{/*


              <button onClick={() => mute(ctx.currentTime)}>mute</button>
              <button onClick={() => setGain(Math.random(), ctx.currentTime)}>gain</button>
              <button onClick={() => setFreq(Math.random() * 1000, ctx.currentTime)}>freq</button>


        {!this.audio
          ? <Init handleClick={this.audioInit} />
              <Theremin videoStream={videoStream} width={width} height={height} refresh={audioRefresh} mute={audioMute} animFrame={animFrame} />
          : <React.Fragment>
              <AnimationStack videoStream={this.props.videoStream} width={this.props.width} height={this.props.height} audioRefresh={this.audioRefresh} audioMute={this.audioMute} analyser={analyser} />
              <Placard show={showHelp} toggle={this.toggleHelp} />
              <Instructions show={showHelp} toggle={this.toggleHelp} />
              <Settings latency={ctx.baseLatency * 1000 || 'err'} micActive={micActive} toggle={this.toggleMic} />
              <Delay delay={delay} wet={delayGain} />
              <FmSynth depth={fmGain} width={osc2} />
              <Eq hpf={hpf} lpf={lpf} />
              <Master masterGain={masterGain} />
            </React.Fragment>
        }


*/}
