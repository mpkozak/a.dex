import React, { Component } from 'react';
import './_css/Main.css';
import help from './_help.js';
import { svgDefs, bigKnob } from './_svg.js';
import Theremin from './_instruments/Theremin.js';
import Wave from './_meters/Wave.js';
import VU from './_meters/VU.js';

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      audio: false,
      params: {
        fmWidth: {v: 0, max: 1000, min: -1000},
        fmDepth: {v: 0, max: 3000, min: 0},
        volume: {v: .5, max: 1, min: 0},
      },
      mic: false,
    };
    this.handleOscillatorType = this.handleOscillatorType.bind(this);
  }

  componentDidMount() {
    this.audioInit();
    // this.micInit();
  }

  componentDidUpdate() {
    console.log('update')
    this.audioRefresh();
  }

  audioInit() {
    const { params } = this.state;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const baseHz = 220;
    const osc1 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz});
    const osc2 = new OscillatorNode(ctx, {type: 'sine', frequency: baseHz, detune: params.fmWidth.v});
    const fmGain = new GainNode(ctx, {gain: params.fmDepth.v});
    const masterGain = new GainNode(ctx, {gain: params.volume.v});
    const masterOut = ctx.destination;

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(masterGain);
    masterGain.connect(masterOut);

    osc1.start()
    osc2.start()

    // const lpf = new BiquadFilterNode(ctx, {type: 'lowpass', Q: 1, frequency: params.tone.v});

    // osc1.connect(fmGain);
    // fmGain.connect(osc2.frequency);
    // osc2.connect(lpf);
    // lpf.connect(masterGain);
    // masterGain.connect(masterOut);


    const audio = {
      ctx: ctx,
      baseHz: baseHz,
      osc1: osc1,
      osc2: osc2,
      // lpf: lpf,
      fmGain: fmGain,
      fm: true,
      masterGain: masterGain,
      masterOut: masterOut,
      latency: .05
    };
    this.setState(prevState => ({ audio }));

    // this.setState(prevState => ({
      // ctx, masterGain, masterOut, osc1, osc2, fmDepth
      // osc2: {...prevState.osc2, node: osc2}
      // }));
  }

  micInit() {
    if (!this.state.mic) {
      navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
          const mic = this.state.audio.ctx.createMediaStreamSource(stream);
          this.setState(prevState => ({ mic }));
        });
    }
  }

  handleOscillatorType(osc, type) {
    const { audio } = this.state;
    const ctx = audio.ctx;
    console.log(osc)
    help.setAudioParam(audio.masterGain.gain, 0, ctx, .01)
      .then(res => {
        // console.log(res);
        osc.type = type;
        help.setAudioParam(audio.masterGain.gain, .5, ctx, .01)
        // .then(res => console.log(res))
      })
  }


  handleClickParam(e, key) {
    e.preventDefault();
    var handleDrag = (e) => {
      this.updateParam((e.movementX - e.movementY) / 500, key);
    };
    window.addEventListener('mousemove', handleDrag);
    var clearEvent = () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', clearEvent);
    };
     window.addEventListener('mouseup', clearEvent);
  }


  handleScrollParam(e, key) {
    e.preventDefault();
    this.updateParam(e.deltaY / 2000, key);
  }


  updateParam(amt, key) {
    const prev = this.state.params[key];
    const delta = amt * prev.max;
    const current = prev.v + delta;
    if (current >= prev.min && current <= prev.max) {
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: current}}
      }));
    };
  }


  audioRefresh() {
    const { audio } = this.state;
    const ctx = audio.ctx;
    const latency = audio.latency;

    const osc2 = audio.osc2;
    const fmGain = audio.fmGain;

    help.setAudioParam(osc2.detune, this.state.params.fmWidth.v, ctx, latency);
    help.setAudioParam(fmGain.gain, this.state.params.fmDepth.v, ctx, latency);
  }




  render() {
    const { ctx } = this.state.audio;
    const { masterGain } = this.state.audio;
    const { osc1 } = this.state.audio;
    const { osc2 } = this.state.audio;
    const { params } = this.state;
    const degFmDepth = params.fmDepth.v / (params.fmDepth.max - params.fmDepth.min) * 100;
    const degFmWidth = (Math.abs(params.fmWidth.min) + params.fmWidth.v) / (params.fmWidth.max - params.fmWidth.min) * 100;
    console.log(degFmDepth, degFmWidth)
    // console.log(this.state.osc1, this.state.osc2)



    return (
      <div className='Main'>
        {svgDefs()}

        <div className='controller'>
          <div className='outer'>
            {/*{this.state.ctx ? <Theremin ctx={this.state.ctx} /> : null}*/}
            {ctx ? <Theremin ctx={ctx} /> : null}

          </div>
        </div>

        <div className='settings'>
          <div className='outer'>
            <div className='inner'>
              Latency: {this.state.audio ? Math.floor(ctx.baseLatency * 1000) : ''} ms
              <button onClick={() => this.micInit()}>mic</button>
            </div>
          </div>
        </div>

        <div className='meters'>
          <div className='outer'>
            {this.state.audio ? <VU ctx={ctx} src={masterGain}/> : null}
          </div>
          <div className='outer'>
            {this.state.audio ? <Wave ctx={ctx} src={masterGain}/> : null}
          </div>
          <div className='outer'>
            <div className='inner'>meter</div>
          </div>
        </div>

        <div className='oscillators'>
          <div className='osc1 outer'>
            <div className='oscillator inner'>
              <h4>Oscillator 1</h4>
              <div className='button-box'>
                <button onClick={() => this.handleOscillatorType(osc1, 'sine')}>sin</button>
                <button onClick={() => this.handleOscillatorType(osc1, 'triangle')}>tri</button>
                <button onClick={() => this.handleOscillatorType(osc1, 'sawtooth')}>saw</button>
                <button onClick={() => this.handleOscillatorType(osc1, 'square')}>sqr</button>
              </div>
            </div>
          </div>
          <div className='osc2 outer'>
            <div className='oscillator inner'>
              <h4>Oscillator 2</h4>
              <div className='button-box'>
                <button onClick={() => this.handleOscillatorType(osc2, 'sine')}>sin</button>
                <button onClick={() => this.handleOscillatorType(osc2, 'triangle')}>tri</button>
                <button onClick={() => this.handleOscillatorType(osc2, 'sawtooth')}>saw</button>
                <button onClick={() => this.handleOscillatorType(osc2, 'square')}>sqr</button>
              </div>
              <div className='knob-box'>
                <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => this.handleClickParam(e, 'fmDepth')} onWheel={(e) => this.handleScrollParam(e, 'fmDepth')}>
                  {bigKnob(degFmDepth)}
                </svg>
                <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => this.handleClickParam(e, 'fmWidth')} onWheel={(e) => this.handleScrollParam(e, 'fmWidth')}>
                  {bigKnob(degFmWidth)}
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className='effects'>
          <div className='outer'>
            <div className='inner'>fx1</div>
          </div>
          <div className='outer'>
            <div className='inner'>fx2</div>
          </div>
        </div>

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
