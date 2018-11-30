import React, { Component } from 'react';
import './_css/Main.css';
import help from './_help.js';
import { svgDefs } from './_svg.js';
import Oscillators from './Oscillators.js';
import Effects from './Effects.js';
import Theremin from './_instruments/Theremin.js';
import Wave from './_meters/Wave.js';
import VU from './_meters/VU.js';

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      audio: false,
      params: {
        fmWidth: {v: 0, max: 1200, min: -1200},
        fmDepth: {v: 0, max: 3000, min: 0},
        volume: {v: 0, max: 1, min: 0},
      },
      // mic: false,
      // analyserSrc: 'masterGain',
    };
    this.updateParam = this.updateParam.bind(this);
  }

  componentDidMount() {
    this.audioInit();
    setTimeout(() => {

    help.setAudioParam(this.state.audio.masterGain.gain, .1, this.state.audio.ctx, this.state.audio.latency);

    }, 1000)
  }

  componentDidUpdate() {
    // console.log('update')
    // this.audioRefresh();

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
    const normalize = new GainNode(ctx, {gain: .5})
    const masterGain = new GainNode(ctx, {gain: params.volume.v});
    const masterOut = ctx.destination;
    const analyser = new AnalyserNode(ctx, {fftSize: Math.pow(2, scaleBase), minDecibels: -100, maxDecibels: -30, smoothingTimeConstant: 0});

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(normalize);
    normalize.connect(masterGain);
    // osc2.connect(masterGain);
    masterGain.connect(masterOut);
    masterGain.connect(analyser);

    osc1.start()
    osc2.start()

    // const lpf = new BiquadFilterNode(ctx, {type: 'lowpass', Q: 1, frequency: params.tone.v});

    const audio = {
      ctx: ctx,
      osc1: osc1,
      osc2: osc2,
      // lpf: lpf,
      fmGain: fmGain,
      masterGain: masterGain,
      masterOut: masterOut,
      analyser: analyser,
      analyserSrc: 'masterGain',
      mic: false,
      baseHz: baseHz,
      latency: .01
    };
    this.setState(prevState => ({ audio }));
  }

  micInit() {
    const { mic } = this.state.audio;
    const { ctx } = this.state.audio;
    const { analyser } = this.state.audio;
    const { masterGain } = this.state.audio;
    const { analyserSrc } = this.state.audio;

    if (!mic) {
      navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
          const mic = ctx.createMediaStreamSource(stream);
          masterGain.disconnect(analyser);
          mic.connect(analyser)
          this.setState(prevState => ({
            audio: {...prevState.audio, mic: mic, analyserSrc: 'mic'}
          }));
          console.log(this.state.audio)
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
      this.audioRefresh();
    };
  }




  audioRefresh() {
    console.log('audio refresh')
    const { audio } = this.state;
    const ctx = audio.ctx;
    const latency = audio.latency;

    const osc2 = audio.osc2;
    const fmGain = audio.fmGain;

    help.setAudioParam(osc2.detune, this.state.params.fmWidth.v, ctx, latency);
    help.setAudioParam(fmGain.gain, this.state.params.fmDepth.v, ctx, latency);
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
            {/*{ctx ? <Theremin ctx={ctx} /> : null}*/}
            {ctx ? <Theremin ctx={ctx} /> : null}

          </div>
        </div>

        <div className='settings'>
          <div className='outer'>
            <div className='inner'>
              Latency: {audio ? Math.floor(ctx.baseLatency * 1000) : ''} ms
              <button onClick={() => this.micInit()}>mic</button>
            </div>
          </div>
        </div>

        <div className='meters'>
          <div className='outer'>
            {audio ? <VU audio={audio}/> : null}
          </div>
          <div className='outer'>
            {audio ? <Wave audio={audio}/> : null}
          </div>
          <div className='outer'>
            <div className='inner'>meter</div>
          </div>
        </div>

        <Oscillators audio={audio} />

        <Effects params={params} update={this.updateParam} />

        <div className='master'>
          <div className='outer'>
            <div className='inner'>master</div>
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
