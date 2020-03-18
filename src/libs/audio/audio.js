




export default class Audio {
  constructor({
    octaves = 0,
    baseHz = 110,
    latency = .05,
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
    this._baseHz = baseHz;
    this._latency = .05;

    this._ctx = new AudioContext();

    this.osc1 = new OscillatorNode(this._ctx, {
      type: osc1Type,
      frequency: this._baseHz,
    });
    this.osc2 = new OscillatorNode(this._ctx, {
      type: osc2Type,
      frequency: this._baseHz,
      detune: osc2Detune,
    });
    this.fmGain = new GainNode(this._ctx, {
      gain: fmGainGain,
    });
    this.instGain = new GainNode(this._ctx, {
      gain: 0,
    });
    this.hpf = new BiquadFilterNode(this._ctx, {
      type: 'highpass',
      frequency: hpfFreq,
      Q: 1,
    });
    this.lpf = new BiquadFilterNode(this._ctx, {
      type: 'lowpass',
      frequency: lpfFreq,
      Q: 1,
    });
    this.delay = new DelayNode(this._ctx, {
      delayTime: delayTime,
    });
    this.delayGain = new GainNode(this._ctx, {
      gain: delayGain,
    });
    this.masterGain = new GainNode(this._ctx, {
      gain: masterGain,
    });

    this._analyser = new AnalyserNode(this._ctx, {
      fftSize: 2 ** 8,
      minDecibels: -100,
      maxDecibels: -30,
      smoothingTimeConstant: 0,
    });


    this._cb = null;

    this.handleTrackerData = this.handleTrackerData.bind(this);

    this.connect();
  };



/*
    Getters
*/

  get now() {
    return this._ctx.currentTime;
  };

  get analyser() {
    return this._analyser;
  };



/*
    Setters
*/

  set octaves(val) {
    this._octaves = val;
  };

  set callback(fn) {
    this._cb = fn;
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
    this.masterGain.connect(this._analyser);
    this.masterGain.connect(this._ctx.destination);
    return;
  };

  init() {
    this.osc1.start();
    this.osc2.start();
    return;
  };



/*
    Tracker Stream
*/

  handleTrackerData(data) {
    const now = this.now;
    if (!data) {
      this._cb();
      return this.mute();
    };
    const { x, y } = data;
    const nextLevel = Math.pow(y, 2);
    const nextFreq = Math.pow(2, x * this._octaves) * this._baseHz;
    this.setGain(this.instGain.gain, nextLevel, now);
    this.setFreq(this.osc1.frequency, nextFreq, now);
    this.setFreq(this.osc2.frequency, nextFreq, now);
    if (this._cb) {
      this._cb();
    };
    return;
  };






/*
    Realtime Methods
*/

  mute() {
    return this.setGain(this.instGain.gain, 0, this._ctx.currentTime);
  };

  setGain(gainNode, val, t) {
    const prevVal = gainNode.value;
    gainNode.cancelScheduledValues(t - 1);
    gainNode.setValueAtTime(prevVal, t);
    gainNode.linearRampToValueAtTime(val, t + this._latency);
    return;
  };

  setFreq(oscNode, val, t) {
    const prevVal = oscNode.value;
    oscNode.cancelScheduledValues(t - 1);
    oscNode.setValueAtTime(prevVal, t);
    oscNode.exponentialRampToValueAtTime(val, t + this._latency);
    return;
  };

  setParam(param, val, t) {
    const prevVal = param.value;
    param.cancelScheduledValues(t - 1);
    param.setValueAtTime(prevVal, t);
    param.linearRampToValueAtTime(val, t + this._latency);
  };




};
