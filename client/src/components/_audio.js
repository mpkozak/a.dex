
export default class Audio {
  constructor({ latency = .05, baseHz = 440 } = {}) {
    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new this.AudioContext();
    this.latency = latency;
    this.baseHz = baseHz;
    this.nodes = { output: this.ctx.destination };
  };
  get now() {
    return this.ctx.currentTime;
  };
/////////////////////////////
// Node Construction Stack //
  _nameNode(type) {
    return type + (Object.keys(this.nodes).filter(d => d.includes(type)).length + 1);
  };
  makeOsc(name = this._nameNode('osc'), type = 'sine', freq = this.baseHz, detune = 0) {
    const _oscTypes = ['sine', 'square', 'sawtooth', 'triangle'];
    this.nodes[name] = this.ctx.createOscillator();
    this.nodes[name].type = _oscTypes.includes(type) ? type : 'sine';
    this.nodes[name].frequency.value = freq || this.baseHz;
    this.nodes[name].detune.value = detune || 0;
    this.nodes[name].start();
    return this.nodes[name];
  };
  makeEq(name = this._nameNode('eq'), type = 'peaking', freq = 0, q = 1, gain = 0, detune = 0) {
    const _eqTypes = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];
    this.nodes[name] = this.ctx.createBiquadFilter();
    this.nodes[name].type = _eqTypes.includes(type) ? type : 'peaking';
    this.nodes[name].frequency.value = freq || 0;
    this.nodes[name].Q.value = q || 1;
    this.nodes[name].gain.value = gain || 0;
    this.nodes[name].detune.value = detune || 0;
    return this.nodes[name];
  };
  makeGain(name = this._nameNode('gain'), gain = 0) {
    this.nodes[name] = this.ctx.createGain();
    this.nodes[name].gain.value = gain || 0;
    return this.nodes[name];
  };
  makeDelay(name = this._nameNode('delay'), time = 0) {
    this.nodes[name] = this.ctx.createDelay();
    this.nodes[name].delayTime.value = time || 0;
    return this.nodes[name];
  };
  makeAnalyser(name = this._nameNode('analyser'), fftBase = 8, minDb = -100, maxDb = -30, smooth = 1) {
    this.nodes[name] = this.ctx.createAnalyser();
    this.nodes[name].fftSize = 2 ** (fftBase || 8);
    this.nodes[name].minDecibels = minDb || -100;
    this.nodes[name].maxDecibels = maxDb || -30;
    this.nodes[name].smoothingTimeConstant = smooth || 1;
    return this.nodes[name];
  };
  makeStream(name = this._nameNode('stream'), stream) {
    if (!stream || stream.constructor.name !== 'MediaStream' || stream.getAudioTracks().length !== 1) {
      return console.error('Invalid MediaStream');
    };
    this.nodes[name] = this.ctx.createMediaStreamSource(stream);
    return this.nodes[name];
  };
/////////////////////////////

///////////////////////////
// Node Connection Stack //
  _parseNodes(arr) {
    return arr.map(n => {
      if (typeof n !== 'string') {
        return this.nodes[n[0]][n[1]];
      };
      return this.nodes[n];
    });
  };
  connect(...queue) {
    queue.forEach(d => {
      const nodes = this._parseNodes(d);
      if (nodes.includes(undefined)) {
        return console.error('Invalid Audio Node');
      };
      return nodes[0].connect(nodes[1]);
    });
  };
  disconnect(...queue) {
    queue.forEach(d => {
      const nodes = this._parseNodes(d);
      if (nodes.includes(undefined)) {
        return console.error('Invalid Audio Node');
      };
      return nodes[0].disconnect(nodes[1]);
    });
  };
///////////////////////////


 setRamp(node, param, val = 0, t = this.now) {
    const p = this.nodes[node][param];
    if (!p) {
      return console.error(`Invalid Audio Parameter ${node}.${param}`);
    };
    const prevVal = p.value;
    p.cancelScheduledValues(t - 1);
    p.setValueAtTime(prevVal, t);
    p.linearRampToValueAtTime(val, t + this.latency);
    return t;
  };
  setRampExp(node, param, val = .0001, t = this.now) {
    const p = this.nodes[node][param];
    if (!p) {
      return console.error(`Invalid Audio Parameter ${node}.${param}`);
    };
    const prevVal = p.value;
    p.cancelScheduledValues(t - 1);
    p.setValueAtTime(prevVal, t);
    p.exponentialRampToValueAtTime(val > 0 ? val : .0001, t + this.latency);
    return t;
  };

  // setParam(param, val) {
  //   console.log(param.__proto__.toString())
  //   // console.log(param.Symbol())
  //   if (param.constructor.name === 'AudioParam') {
  //   console.dir(param.constructor)
  //   }
  // };





};




// audio.makeOsc('osc1', 'triangle', 110)
// audio.makeOsc('osc2', 'sine', 110, -1200)
// audio.makeGain('fmGain', 1500)
// audio.makeGain('instGain', 0)
// audio.makeEq('hfp', 'highpass', 0, 1)
// audio.makeEq('lpf', 'lowpass', 2200, 1)
// audio.makeDelay('delay', 0)
// audio.makeGain('delayGain', 0)
// audio.makeGain('masterGain', .73)
// audio.makeAnalyser('analyser', 10)
// audio.connect([
//   ['osc1', 'fmGain'],
//   ['fmGain', 'osc2.frequency'],
//   ['osc2', 'instGain'],
//   ['instGain', 'hpf'],
//   ['hpf', 'lpf'],
//   ['lpf', 'delay'],
//   ['delay', 'delayGain'],
//   ['delayGain', 'masterGain'],
//   ['masterGain', 'analyser'],
//   ['masterGain', 'output']
// ]);



    // const expected = ['string', 'string', 'number', 'number'];
    // const defaults = [this.makeNodeName('osc'), 'sine', this.baseHz, 1200];
    // console.log('before', arguments)
    // Object.keys(arguments).forEach((d, i) => {
    //   if (typeof arguments[d] !== expected [i]) {
    //     arguments[d] = defaults[i];
    //   };
    // });



  //     lpf.frequency.setValueAtTime(2200, ctx.currentTime);
  //     lpf.Q.setValueAtTime(1, ctx.currentTime);

// Audio.makeOsc('osc1', )

  // audioInit() {
  //   const fmGain = ctx.createGain();
  //     fmGain.gain.setValueAtTime(1500, ctx.currentTime);
  //   const instGain = ctx.createGain();
  //     instGain.gain.setValueAtTime(0, ctx.currentTime);
  //   const hpf = ctx.createBiquadFilter();
  //     hpf.type = 'highpass';
  //     hpf.frequency.setValueAtTime(0, ctx.currentTime);
  //     hpf.Q.setValueAtTime(1, ctx.currentTime);
  //   const lpf = ctx.createBiquadFilter();
  //     lpf.type = 'lowpass';
  //     lpf.frequency.setValueAtTime(2200, ctx.currentTime);
  //     lpf.Q.setValueAtTime(1, ctx.currentTime);
  //   const delay = ctx.createDelay();
  //     delay.delayTime.setValueAtTime(0, ctx.currentTime);
  //   const delayGain = ctx.createGain();
  //     delayGain.gain.setValueAtTime(0, ctx.currentTime);
  //   const masterGain = ctx.createGain();
  //     masterGain.gain.setValueAtTime(.73, ctx.currentTime);
  //   const analyser = ctx.createAnalyser();
  //     analyser.fftSize = 2 ** 8;
  //     analyser.minDecibels = -100;
  //     analyser.maxDecibels = -30;
  //     analyser.smoothingTimeConstant = 0;

  //   osc1.connect(fmGain);
  //   fmGain.connect(osc2.frequency);
  //   osc2.connect(instGain);
  //   instGain.connect(hpf);
  //   hpf.connect(lpf);
  //   lpf.connect(masterGain);
  //   lpf.connect(delay);
  //   delay.connect(delayGain);
  //   delayGain.connect(masterGain);
  //   masterGain.connect(analyser);
  //   masterGain.connect(ctx.destination);
  //   osc1.start();
  //   osc2.start();

  //   this.audio = {
  //     ctx,
  //     osc1,
  //     osc2,
  //     fmGain,
  //     instGain,
  //     hpf,
  //     lpf,
  //     delay,
  //     delayGain,
  //     masterGain,
  //     analyser,
  //     baseHz,
  //     latency,
  //     audioMute: this.audioMute,
  //     audioToggleMic: this.audioToggleMic,
  //     audioSetGain: this.audioSetGain,
  //     audioSetFreq: this.audioSetFreq,
  //     audioSetParam: this.audioSetParam,
  //     audioSetOsc: this.audioSetOsc
  //   };
  //   this.setState(prevState => ({ audioOk: true }));
  //   return true;
  // };
