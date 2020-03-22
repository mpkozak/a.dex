




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

    this._osc1 = new OscillatorNode(this._ctx, {
      type: osc1Type,
      frequency: this._baseHz,
    });
    this._osc2 = new OscillatorNode(this._ctx, {
      type: osc2Type,
      frequency: this._baseHz,
      detune: osc2Detune,
    });
    this._fmGain = new GainNode(this._ctx, {
      gain: fmGainGain,
    });
    this.instGain = new GainNode(this._ctx, {
      gain: 0,
    });
    this._hpf = new BiquadFilterNode(this._ctx, {
      type: 'highpass',
      frequency: hpfFreq,
      Q: 1,
    });
    this._lpf = new BiquadFilterNode(this._ctx, {
      type: 'lowpass',
      frequency: lpfFreq,
      Q: 1,
    });
    this._delay = new DelayNode(this._ctx, {
      delayTime: delayTime,
    });
    this._delayGain = new GainNode(this._ctx, {
      gain: delayGain,
    });
    this._masterGain = new GainNode(this._ctx, {
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

  // get delay() {
  //   console.log("get delay", this._delay)
  //   return this._delay.delayTime.value;
  // };







  get analyser() {
    return this._analyser;
  };

  get trackerCallback() {
    return this.handleTrackerData;
  };



/*
    Setters
*/

  set osc1(type) {
    this._osc1.type = type;
  };

  set osc2(type) {
    this._osc2.type = type;
  };

  set octaves(val) {
    this._octaves = val;
  };

  set depth(val) {
    this.setParam(this._fmGain.gain, val, this.now);
  };

  set width(val) {
    this.setParam(this._osc2.detune, val, this.now);
  };

  set hpf(val) {
    this.setParam(this._hpf.frequency, val, this.now);
  };

  set lpf(val) {
    this.setParam(this._lpf.frequency, val, this.now);
  };

  set delay(val) {
    this.setParam(this._delay.delayTime, val, this.now);
  };

  set wet(val) {
    this.setParam(this._delayGain.gain, val, this.now);
  };

  set master(val) {
    this.setParam(this._masterGain.gain, val, this.now);
  };





  set analyserCallback(fn) {
    this._cb = fn;
  };



/*
    Initializers
*/

  connect() {
    this._osc1.connect(this._fmGain);
    this._fmGain.connect(this._osc2.frequency);
    this._osc2.connect(this.instGain);
    this.instGain.connect(this._hpf);
    this._hpf.connect(this._lpf);
    this._lpf.connect(this._masterGain);
    this._lpf.connect(this._delay);
    this._delay.connect(this._delayGain);
    this._delayGain.connect(this._masterGain);
    this._masterGain.connect(this._analyser);
    this._masterGain.connect(this._ctx.destination);
    return;
  };

  init() {
    this._osc1.start();
    this._osc2.start();
    return;
  };



/*
    Tracker Stream
*/

  handleTrackerData(data) {
    const now = this.now;
    if (!data) {
      // this._cb(true);
      return this.mute();
    };
    const { x, y } = data;
    const nextLevel = Math.pow(y, 2);
    const nextFreq = Math.pow(2, x * this._octaves) * this._baseHz;
    this.setGain(this.instGain.gain, nextLevel, now);
    this.setFreq(this._osc1.frequency, nextFreq, now);
    this.setFreq(this._osc2.frequency, nextFreq, now);
    // this._cb();
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
