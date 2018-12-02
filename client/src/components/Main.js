import React, { Component } from 'react';
import './_css/Main.css';
import help from './_help.js';
import { svgDefs } from './_svg.js';
import Oscillators from './Oscillators.js';
import Effects from './Effects.js';
import Meters from './Meters.js';
import Master from './Master.js';
import Theremin from './_instruments/Theremin.js';

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      audio: false,
      params: {
        fmWidth: {v: 0, max: 1200, min: -1200},
        fmDepth: {v: 0, max: 3000, min: 0},
        volume: {v: .73, max: 1, min: 0},
      },
      micEnabled: false,
    };
    this.updateParam = this.updateParam.bind(this);
  }

  componentDidMount() {
    this.audioInit();
    // setTimeout(() => {
    //   this.setState(prevState => ({
    //     params: {...prevState.params, volume: {...prevState.params.volume, v: .5}}
    //   }));
    //   this.audioRefresh('volume');
    // }, 1000);
  }

  componentDidUpdate() {
    // console.log('main updated')
  }

  audioInit() {
    const scaleBase = 10;
    const baseHz = 220;
    const { params } = this.state;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc1 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz});
    const osc2 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz, detune: params.fmWidth.v});
    const fmGain = new GainNode(ctx, {gain: params.fmDepth.v});
    const instGain = new GainNode(ctx, {gain: 0})
    const masterGain = new GainNode(ctx, {gain: params.volume.v});
    const masterOut = ctx.destination;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: -30, smoothingTimeConstant: 0});

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(instGain);
    instGain.connect(masterGain);
    masterGain.connect(masterOut);
    masterGain.connect(analyser);

    osc1.start();
    osc2.start();

    // const lpf = new BiquadFilterNode(ctx, {type: 'lowpass', Q: 1, frequency: params.tone.v});

    const audio = {
      ctx: ctx,
      osc1: osc1,
      osc2: osc2,
      fmGain: fmGain,
      instGain: instGain,
      masterGain: masterGain,
      masterOut: masterOut,
      analyser: analyser,
      analyserSrc: 'masterGain',
      mic: false,
      baseHz: baseHz,
      latency: .05
    };
    this.setState(prevState => ({ audio }));
  }

  // micEnable() {
  //   const { ctx } = this.state.audio;

  //   navigator.mediaDevices.getUserMedia({audio: true})
  //     .then(stream => {
  //       const mic = ctx.createMediaStreamSource(stream);
  //       this.setState(prevState => ({
  //         micEnabled: true,
  //         audio: {...prevState.audio, mic: mic},
  //       }));
  //     });
  // }

  micToggle() {
    const { ctx } = this.state.audio;
    const { mic } = this.state.audio;
    const { analyser } = this.state.audio;
    const { masterGain } = this.state.audio;
    const { analyserSrc } = this.state.audio;

    if (!mic) {
      // this.micEnable();
      navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
          const mic = ctx.createMediaStreamSource(stream);
          masterGain.disconnect(analyser);
          mic.connect(analyser)
          this.setState(prevState => ({
            audio: {...prevState.audio, mic: mic, analyserSrc: 'mic'}
          }));
        });
    } else if (analyserSrc === 'masterGain') {
      masterGain.disconnect(analyser);
      mic.connect(analyser)
        this.setState(prevState => ({
          audio: {...prevState.audio, analyserSrc: 'mic'}
        }));
    } else if (analyserSrc === 'mic') {
      mic.disconnect(analyser);
      masterGain.connect(analyser);
        this.setState(prevState => ({
          audio: {...prevState.audio, analyserSrc: 'masterGain'}
        }));
    };
  }

  updateParam(amt, key) {
    const prev = this.state.params[key];
    const delta = amt * prev.max;
    const current = prev.v + delta;
    if (current >= prev.min && current <= prev.max) {
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: current}}
      }));
      this.audioRefresh(key);
    };
  }

  audioRefresh(key) {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const latency = audio.latency;

    const osc2 = audio.osc2;
    const fmGain = audio.fmGain;
    const masterGain = audio.masterGain;

    switch (key) {
      case 'fmDepth' :
        help.setAudioParam(fmGain.gain, this.state.params.fmDepth.v, ctx, latency);
        break;
      case 'fmWidth' :
        help.setAudioParam(osc2.detune, this.state.params.fmWidth.v, ctx, latency);
        break;
      case 'volume' :
        help.setAudioParam(masterGain.gain, this.state.params.volume.v, ctx, latency);
        break;
      default : return null;
    }
  }




  render() {
    const { params } = this.state;
    const { audio } = this.state;
    const { ctx } = this.state.audio;

    return (
      <div className='Main'>
        {svgDefs()}

        <div className='controller'>
          <div className='outer'>
            {/*{ctx ? <Theremin audio={audio} params={params} /> : null}*/}
            {audio ? <Theremin audio={audio} params={params} /> : null}
          </div>
        </div>

        <div className='placard'>
          <div className='outer'>
            <div className='inner'>
              <div className='name'>
                <h4><span className='alpha'>α</span>dex</h4>
              </div>
              <div className='by'>
                <h6>by</h6> <h5 className='kozak'> kozak</h5>
              </div>
            </div>
          </div>
        </div>

        <div className='settings'>
          <div className='outer'>
            <div className='inner'>
              <h6>Latency: {audio ? Math.floor(ctx.baseLatency * 1000) : ''} ms</h6>
              <button onClick={() => this.micToggle()}>toggle</button>
            </div>
          </div>
        </div>

        <Meters audio={audio} />

        <Oscillators audio={audio} />

        <Effects params={params} update={this.updateParam} />

        <div className='master'>
          <div className='outer'>
            <Master params={params} update={this.updateParam} />
          </div>
        </div>
      </div>
    );
  }
}









{/*




import { bigKnob } from './_svg.js';





        // <div className='fm outer'>




        // </div>

        //





        {template.moduleDefs()}
        {this.showModules()}
            <Wave ctx={audioCtx} src={mic} />
            <Vu ctx={audioCtx} src={mic} />
            <Spec ctx={audioCtx} src={mic} />
            <Note ctx={audioCtx} src={mic} />
            <Freq ctx={audioCtx} src={mic} />
            <div className='inst'>
              <h6>To configure:</h6>
              <ul>
                <li>Select two (real world) objects of different colors (expo markers work well).</li>
                <li>For each object: Hold the object up within the camera frame. Click on one of the color boxes in ‘Set Colors’ and then click on the object within the video frame. You should see a tracking box of the selected color appear around the object in the video frame.</li>
                <li>If the tracking box doesn’t appear (or only appears intermittently), use the ‘Sense’ knob to adjust the color sensitivity.</li>
              </ul>
              <h6>To play:</h6>
              <ul>
                <li>Volume is controlled by moving the corresponding color object up and down.</li>
                <li>Pitch is controlled by moving the corresponding color object left and right.</li>
              </ul>
            </div>

*/}
