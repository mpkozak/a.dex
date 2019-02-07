export default class Audio {
  constructor({ latency = .05, baseHz = 440 } = {}) {
    this.context = true;
    this.latency = latency;
    this.baseHz = baseHz;
    this.nodes = { output: this.ctx.destination };
    this.muted = false;
    this._muteCache = [];
    this._outputSrc = [];
    this._defs = {
      _oscTypes: ['sine', 'square', 'sawtooth', 'triangle'],
      _eqTypes: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'],
    };
  };
  set reset(confirm) {
    if (typeof confirm !== 'boolean' || !confirm) {
      return console.error('Reset Failure: Expected Boolean "true".');
    };
    this.ctx && this.ctx.close();
    Object.keys(this).forEach(d => delete this[d]);
    this.constructor();
  };
  set context(confirm) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!confirm || this.ctx) {
      return console.error('Audio Context Has Already Been Instantiated.');
    };
    return this.ctx = new AudioContext();
  };
  set fftBase(n) {
    n = n > 15 ? 15 : n < 5 ? 5 : n;
    this.fftSize = 2 ** n;
    if (this._analyser) {
      this._analyser.fftSize = this.fftSize;
      this._freqData = new Float32Array(this.fftSize);
      this._waveData = new Float32Array(this.fftSize);
    };
  };
  set analyserSrc(src) {
    if (!this._analyser) {
      return console.error('No Analyser Node Has Been Created.');
    };
    const node = this._parseNode(src);
    if (!node) {
      return console.error(`Invalid Audio Node "${src}"`);
    };
    if (this._analyserSrc) {
      this.disconnect(this._analyserSrc, this._analyser);
    };
    this._analyserSrc = node;
    this.connect(node, this._analyser);
  };
  get now() {
    return this.ctx.currentTime;
  };
  get nodeNames() {
    return Object.keys(this.nodes);
  };



  params() {
    const _params = [];
    const params = {};
    Object.keys(this.nodes).forEach(n => {
      params[n] = {};
      const node = this.nodes[n];
      const props = Object.getOwnPropertyDescriptors(node)
      console.log(props)
      for (let p in node) {
        const param = node[p];
        if (param && typeof param === 'object' && param.constructor.name === 'AudioParam') {
          _params.push(param);
          params[n][p] = _params.indexOf(param);
        };
      };
      // lookup[n] = params
    });
    console.log(params, _params)
    // return lookup;
  };


  // get freqData() {
  //   this._analyser.getFloatFrequencyDomainData(this._freqData);
  //   return this._freqData;
  // };
  // get waveData() {
  //   this._analyser.getFloatTimeDomainData(this._waveData);
  //   return this._waveData;
  // };
  waveData() {
    this._analyser.getFloatTimeDomainData(this._waveData);
  };
  freqData() {
    this._analyser.getFloatFrequencyDomainData(this._freqData);
  };





/////////////////////////
// Master + Mute Stack //
  resume() {
    this.ctx.resume();
  };
  mute(d = this.latency) {
    this._outputSrc.forEach((n, i) => {
      if (n.constructor.name === 'GainNode') {
        this._muteCache[i] = n.gain.value;
        this.setRamp(n.gain, 0, d);
      } else {
        setTimeout(() => this.disconnect(n), d * 1000);
      };
    });
    this.muted = true;
  };
  unmute(d = this.latency) {
    this._outputSrc.forEach((n, i) => {
      if (n.constructor.name === 'GainNode') {
        this.setRamp(n.gain, this._muteCache[i], d);
      } else {
        setTimeout(() => this.connect(n), d * 1000);
      };
    });
    this.muted = false;
  };
/////////////////////////

/////////////////////////////
// Node Construction Stack //
  _nameNode(type) {
    return type + (Object.keys(this.nodes).filter(d => d.includes(type)).length + 1);
  };
  makeOsc(name = this._nameNode('osc'), type = 'sine', { Hz = this.baseHz, detune = 0 } = {}) {
    this.nodes[name] = this.ctx.createOscillator();
    this.nodes[name].type = this._defs._oscTypes.includes(type) ? type : 'sine';
    this.nodes[name].frequency.value = Hz || this.baseHz;
    this.nodes[name].detune.value = detune || 0;
    this.nodes[name].start();
    return this.nodes[name];
  };
  makeEq(name = this._nameNode('eq'), type = 'peaking', { Hz = 0, q = 1, gain = 1, detune = 0 } = {}) {
    this.nodes[name] = this.ctx.createBiquadFilter();
    this.nodes[name].type = this._defs._eqTypes.includes(type) ? type : 'peaking';
    this.nodes[name].frequency.value = Hz || 0;
    this.nodes[name].Q.value = q || 1;
    this.nodes[name].gain.value = gain || 1;
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
  // makeAnalyser(name = this._nameNode('analyser'), { fftBase = 8, minDb = -100, maxDb = -30, smooth = 1 } = {}) {
  //   if (this.nodeNames.filter(d => this.nodes[d].constructor.name === 'AnalyserNode').length) {
  //     return console.error('Cannot Create Multiple Analysers');
  //   };
  //   this.nodes[name] = this.ctx.createAnalyser();
  //   this._analyser = this.nodes[name];
  //   this.fftBase = fftBase;
  //   this.nodes[name].fftSize = this.fftSize;
  //   this.nodes[name].minDecibels = minDb || -100;
  //   this.nodes[name].maxDecibels = maxDb || -30;
  //   this.nodes[name].smoothingTimeConstant = smooth || 1;
  //   return this.nodes[name];
  // };
  makeAnalyser(name = this._nameNode('analyser'), { fftBase = 8, minDb = -100, maxDb = -30, smooth = 1 } = {}) {
    if (this.nodeNames.filter(d => this.nodes[d].constructor.name === 'AnalyserNode').length) {
      return console.error('Cannot Create Multiple Analysers');
    };
    this.nodes[name] = this.ctx.createAnalyser();
    this._analyser = this.nodes[name];
    this.fftBase = fftBase;
    this.nodes[name].fftSize = this.fftSize;
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
  _parseNode(n) {
    let node;
    if (typeof n === 'object') {
      if (n.constructor.name.includes('Node')) {
        return n;
      };
      node = n.length === 2 && this.nodes[n[0]][n[1]];
    } else if (typeof n === 'string') {
      node = this.nodes[n];
    };
    if (!node) {
      return console.error(`Invalid Audio Node "${n}"`);
    };
    return node;
  };
  connect(node1, node2 = this.nodes.output) {
    if (!node1) {
      return console.error('Missing Argument - Insuffient Audio Nodes For Connection');
    };
    const nodes = [node1, node2].map(d => this._parseNode(d));
    if (nodes[0] && nodes[1] && nodes[0].constructor.name.includes('Node')) {
      if (nodes[1].constructor.name === 'AudioDestinationNode') {
        this._outputSrc.push(nodes[0]);
      };
      if (nodes[1].constructor.name === 'AnalyserNode' && !this._analyserSrc) {
        return this.analyserSrc = nodes[0];
      };
      return nodes[0].connect(nodes[1]);
    };
    return console.error(`Invalid Connection: "${node1}" => "${node2}"`);
  };
  disconnect(node1, node2 = this.nodes.output) {
    if (!node1) {
      return console.error('Missing Argument - Insuffient Audio Nodes For Connection');
    };
    const nodes = [node1, node2].map(d => this._parseNode(d));
    if (nodes[0] && nodes[1] && nodes[0].constructor.name.includes('Node')) {
      return nodes[0].disconnect(nodes[1]);
    };
    return console.error(`Invalid Disconnection: "${node1}" => "${node2}"`);
  };
  connectBatch(...queue) {
    queue.forEach(q => {
      this.connect(q[0], q[1]);
    });
  };
///////////////////////////

///////////////////////////////
// Param Change + Ramp Stack //
  _parseParam(p) {
    let param;
    if (typeof p === 'object') {
      if (p.constructor.name === 'AudioParam') {
        return p;
      };
      param = p.length === 2 && this.nodes[p[0]][p[1]];
    };
    if (!param) {
      return console.error(`Invalid Audio Parameter "${p}"`);
    };
    return param;
  };
  setRamp(param, val = 0, d = this.latency, t = this.now) {
    const p = this._parseParam(param);
    if (p) {
      const prevVal = p.value;
      p.cancelScheduledValues(t - 1);
      p.setValueAtTime(prevVal, t);
      p.linearRampToValueAtTime(val, t + d);
      return t;
    };
  };
  setRampExp(param, val = .0001, d = this.latency, t = this.now) {
    const p = this._parseParam(param);
    if (p) {
      const prevVal = p.value;
      p.cancelScheduledValues(t - 1);
      p.setValueAtTime(prevVal, t);
      p.exponentialRampToValueAtTime(val > 0 ? val : .0001, t + d);
      return t;
    };
  };
  setRampBatch(queue, d, t) {
    queue.forEach(q => {
      if (q.length > 2 ? q.pop() : false) {
        this.setRampExp(...q, d, t);
      } else {
        this.setRamp(...q, d, t);
      };
    });
  };
  setOsc(osc, type, d = .01) {
    if (!this._defs._oscTypes.includes(type)) {
      return console.error(`Invalid Oscillator Type: "${type}"`);
    };
    const o = this._parseNode(osc);
    if (!o) {
      return console.error(`Invalid Oscillator Node: "${osc}"`);
    };
    this.mute(undefined, d);
    setTimeout(() => {
      o.type = type;
      this.unmute(undefined, d);
    }, d * 1000);
    return { osc, type };
  };

  setParam(param, val, latency) {
    const p = this._parseParam(param);
    this.setRamp(p, val, latency);
    return p.value;
  };

///////////////////////////////


};


// //
// create audio node
//   =>


// // audio.create('nodeType', { name: 'name', param1: 'value', param2: 'value' })



// // if passed name, used as reference. else name by default.

// for each param (either AudioParam or 'set' type value), create reference entry,
// osc1: {
//   osc1Freq,
//   osc1Detune,

// }



//













