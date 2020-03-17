import { clampRange } from '../parse.js';





export default class Audio {
  constructor({
    octaves = 0,
    octavesRange = [],
    osc1Type,
    osc2Type,
    osc2Detune,
    fmGainGain,
    hpfFreq,
    lpfFreq,
    delayTime,
    delayGain,
    masterGain,
  } = {}) {
    this._octaves = octaves;
    this._octavesRange = octavesRange;
    this.baseHz = 110;
    this.latency = .05;
    this.ctx = new AudioContext();
    this.osc1 = new OscillatorNode(this.ctx, {
      type: osc1Type,
      frequency: this.baseHz,
    });
    this.osc2 = new OscillatorNode(this.ctx, {
      type: osc2Type,
      frequency: this.baseHz,
      detune: osc2Detune,
    });
    this.fmGain = new GainNode(this.ctx, {
      gain: fmGainGain,
    });
    this.instGain = new GainNode(this.ctx, {
      gain: 0,
    });
    this.hpf = new BiquadFilterNode(this.ctx, {
      type: 'highpass',
      frequency: hpfFreq,
      Q: 1,
    });
    this.lpf = new BiquadFilterNode(this.ctx, {
      type: 'lowpass',
      frequency: lpfFreq,
      Q: 1,
    });
    this.delay = new DelayNode(this.ctx, {
      delayTime: delayTime,
    });
    this.delayGain = new GainNode(this.ctx, {
      gain: delayGain,
    });
    this.masterGain = new GainNode(this.ctx, {
      gain: masterGain,
    });
    this.analyser = new AnalyserNode(this.ctx, {
      fftSize: 2 ** 8,
      minDecibels: -100,
      maxDecibels: -30,
      smoothingTimeConstant: 0,
    });
    this.handleTrackerData = this.handleTrackerData.bind(this);
  };



/*
    Getters
*/

  get now() {
    return this.ctx.currentTime;
  };

  get octaves() {
    return this._octaves;
  };



/*
    Setters
*/

  set octaves(val) {
    this._octaves = clampRange(val, this._octavesRange);
  };



/*
    Initializers
*/

  connect() {
    this.osc1.connect(this.fmGain);
    this.fmGain.connect(this.osc2.frequency);
    this.osc2.connect(this.instGain);
    this.instGain.connect(this.hpf);
    this.hpf.connect(this.lpf);
    this.lpf.connect(this.masterGain);
    this.lpf.connect(this.delay);
    this.delay.connect(this.delayGain);
    this.delayGain.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.masterGain.connect(this.ctx.destination);
  };

  start() {
    this.osc1.start();
    this.osc2.start();
  };

  init() {
    this.connect();
    this.start();
  };



/*
    Tracker Stream
*/

  handleTrackerData(data) {
    const now = this.ctx.currentTime;
    if (!data) {
      return this.mute();
    };
    const { x, y } = data;
    const nextLevel = Math.pow(y, 2);
    const nextFreq = Math.pow(2, x * this.octaves) * this.baseHz;
    this.setGain(this.instGain.gain, nextLevel, now);
    this.setFreq(this.osc1.frequency, nextFreq, now);
    this.setFreq(this.osc2.frequency, nextFreq, now);
    return;
  };



/*
    Realtime Methods
*/

  mute() {
    return this.setGain(this.instGain.gain, 0, this.ctx.currentTime);
  };

  setGain(gainNode, val, t) {
    const prevVal = gainNode.value;
    gainNode.cancelScheduledValues(t - 1);
    gainNode.setValueAtTime(prevVal, t);
    gainNode.linearRampToValueAtTime(val, t + this.latency);
    return;
  };

  setFreq(oscNode, val, t) {
    const prevVal = oscNode.value;
    oscNode.cancelScheduledValues(t - 1);
    oscNode.setValueAtTime(prevVal, t);
    oscNode.exponentialRampToValueAtTime(val, t + this.latency);
    return;
  };

  setParam(param, val, t) {
    const prevVal = param.value;
    param.cancelScheduledValues(t - 1);
    param.setValueAtTime(prevVal, t);
    param.linearRampToValueAtTime(val, t + this.latency);
  };




};




