
export default function Audio() {
  var _validNodes = [
    'osc',
    'gain',
    'eq',
    'delay',
    'analyser',
    'stream',
  ];
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var ctx = new AudioContext();

  var _nodes = {};
  var latency = .05
  var baseHz = 220;

  const rampParam = (param, val) => {
    // console.log('ramp', param,  val)
    const t = ctx.currentTime
    const prevVal = param.value;
    console.log('rampParam', t, t + latency, prevVal, val)
    param.cancelScheduledValues(t - 1);
    param.setValueAtTime(prevVal, t);
    param.linearRampToValueAtTime(val, t + latency);
  };

  const rampParam2 = (id, p, val) => {
    // console.log('ramp', param,  val)
    const param = _nodes[id][p]
    const t = ctx.currentTime
    const prevVal = param.value;
    console.log('rampParam', t, t + latency, prevVal, val)
    param.cancelScheduledValues(t - 1);
    param.setValueAtTime(prevVal, t);
    param.linearRampToValueAtTime(val, t + latency);
  };




  var rampParamExp = (param, val) => {
    const t = ctx.currentTime
    const prevVal = param.value;
    param.cancelScheduledValues(t - 1);
    param.setValueAtTime(prevVal, t);
    param.exponentialRampToValueAtTime(val > 0 ? val : .0001, t + latency);
  };

// oscParams: {
//   type,
//   frequency,
//   detune,
//   exponential = false
// }

// gainParams: {
//   gain,
//   exponential = true
// }

class Osc {
  constructor(id, { type = 'sine', frequency = baseHz, detune = 0, exponential = false } = {}) {
    this._id = id;
    this.type = type;
    this.frequency = frequency;
    this.detune = detune;
    this.exponential = exponential;
  };
  get type() {
    return _nodes[this._id].node.type;
  };
  set type(wave) {
    _nodes[this._id].node.type = wave;
  };
  get frequency() {
    return _nodes[this._id].node.frequency.value;
  };
  set frequency(hz) {
    if (!this.exponential) {
      // rampParam(_nodes[this._id].node.frequency, hz);
      rampParam2(this._id, 'frequency', hz);
    } else {
      rampParamExp(_nodes[this._id].node.frequency, hz);
    };
  };
  get detune() {
    return _nodes[this._id].node.detune.value;
  };
  set detune(cents) {
    if (!this.exponential) {
      rampParam(_nodes[this._id].node.detune, cents);
    } else {
      rampParamExp(_nodes[this._id].node.detune, cents);
    };
  };
  get exponential() {
    return _nodes[this._id].exp;
  };
  set exponential(boolean) {
    _nodes[this._id].exp = boolean;
  };
  // constructor({type = 'sine', frequency = baseHz, detune = 0, exponential = false} = {}) {
  //   this.type = type;
  //   this.frequency = frequency;
  //   this.detune = detune;
  //   this.exponential = exponential;
  // };
  //     get type() {
  //       return this.type;
  //     };
  //     set type(wave) {
  //       this.type = wave;
  //     };
  //     get frequency() {
  //       return this.frequency.value;
  //     };
  //     set frequency(hz) {
  //       if (!this.exponential) {
  //         rampParam(this.frequency, hz);
  //       } else {
  //         rampParamExp(this.frequency, hz);
  //       };
  //     };
  //     get detune() {
  //       return this.detune.value;
  //     };
  //     set detune(cents) {
  //       if (!this.exponential) {
  //         rampParam(this.detune, cents);
  //       } else {
  //         rampParamExp(this.detune, cents);
  //       };
  //     };
  //     get exponential() {
  //       return this.exponential;
  //     };
  //     set exponential(boolean) {
  //       this.exponential = boolean;
  //     };
}


// , { type = 'sine', frequency = baseHz, detune = 0, exponential = false } = {}
var makeOsc = (id, params) => {
  // var osc = ctx.createOscillator();
  // const id = nodeId
  // var exponential = false
  // osc.start();
  // _nodes[id] = { node: osc };
  console.log('makeOsc', _nodes[id])
  const osc = new Osc(id, params)
  return osc
  // return new Osc(id, params);


  // var Osc = {
  //   get type() {
  //     return osc.type;
  //   },
  //   set type(wave) {
  //     osc.type = wave;
  //   },
  //   get frequency() {
  //     return osc.frequency.value;
  //   },
  //   set frequency(hz) {
  //     if (!exponential) {
  //       // rampParam(osc.frequency, hz);
  //       osc.frequency.setValueAtTime(hz, ctx.currentTime)
  //     } else {
  //       rampParamExp(osc.frequency, hz);
  //     };
  //   },
  //   get detune() {
  //     return osc.detune.value;
  //   },
  //   set detune(cents) {
  //     if (!exponential) {
  //       rampParam(osc.detune, cents);
  //     } else {
  //       rampParamExp(osc.detune, cents);
  //     };
  //   },
  //   get exponential() {
  //     return exponential;
  //   },
  //   set exponential(boolean) {
  //     exponential = boolean;
  //   },

  // //     get type() {
  // //       return _nodes[id].node.type;
  // //     };
  // //     set type(wave) {
  // //       _nodes[id].node.type = wave;
  // //     };
  // //     get frequency() {
  // //       console.log(_nodes[id].node.frequency)
  // //       return _nodes[id].node.frequency.value;
  // //     };
  // //     set frequency(hz) {
  // //       if (!_nodes[id].exponential) {
  // //         rampParam(_nodes[id].node, hz);
  // //         // _nodes[id].node.frequency = hz
  // //       } else {
  // //         rampParamExp(_nodes[id].node.frequency, hz);
  // //       };
  // //     };
  // //     get detune() {
  // //       return _nodes[id].node.detune.value;
  // //     };
  // //     set detune(cents) {
  // //       if (!_nodes[id].exponential) {
  // //         rampParam(_nodes[id].node.detune, cents);
  // //       } else {
  // //         rampParamExp(_nodes[id].node.detune, cents);
  // //       };
  // //     };
  // //     get exponential() {
  // //       return _nodes[id].exp;
  // //     };
  // //     set exponential(boolean) {
  // //       _nodes[id].exp = boolean;
  // //     };


  // };

  // return new Osc();
  // return Osc;


  // var exponential = false;
  // console.log(id, params)
  // return new Osc(id)
  // return {
  //   get type() {
  //     return osc.type;
  //   },
  //   set type(wave) {
  //     osc.type = wave;
  //   },
  //   get frequency() {
  //     return osc.frequency.value;
  //   },
  //   set frequency(hz) {
  //     if (!exponential) {
  //       rampParam(osc.frequency, hz);
  //     } else {
  //       rampParamExp(osc.frequency, hz);
  //     };
  //   },
  //   get detune() {
  //     return osc.detune.value;
  //   },
  //   set detune(cents) {
  //     if (!exponential) {
  //       rampParam(osc.detune, cents);
  //     } else {
  //       rampParamExp(osc.detune, cents);
  //     };
  //   },
  //   get exponential() {
  //     return exponential;
  //   },
  //   set exponential(boolean) {
  //     exponential = boolean;
  //   }
  // };

};







  // const nodes = {};


  // var getParams = (node, nodeId) => {
  //   const _ref = _nodes[`n${nodeId}`];
  //   var params = {};
  //   var paramId = 0;
  //   Object.entries(Object.getOwnPropertyDescriptors(node.constructor.prototype))
  //     .forEach(([key, value]) => {
  //       const id = paramId++;
  //       if (typeof value.set === 'function') {
  //         _ref[`p${id}`] = { key };
  //         params[key] = {
  //           get _ref() {
  //             return id;
  //           },
  //           get value() {
  //             return node[key]
  //           },
  //           set value(v) {
  //             node[key] = value;
  //           },
  //         };
  //       } else if (node[key].constructor.name === 'AudioParam') {
  //         _ref[`p${id}`] = { key, node: node[key] };
  //         params[key] = {
  //           get _ref() {
  //             return id;
  //           },
  //           get value() {
  //             return node[key].value
  //           },
  //           set value(v) {
  //             const t = ctx.currentTime;
  //             const prevVal = node[key].value;
  //             node[key].cancelScheduledValues(t - 1);
  //             node[key].setValueAtTime(prevVal, t);
  //             node[key].linearRampToValueAtTime(v, t + latency);
  //           }
  //         };
  //         Object.freeze(params[key])
  //       }
  //     });

  //   // Object.keys(params).map(p => {
  //   //   console.log(params[p].ref)
  //   //   // const find = _ref[d].filter(k => _ref.key === k)
  //   //   // console.log('find', find)
  //   // })
  //   return params;
  // };




  var nodeId = 0;
  var createNode = (nodeType, initialValues = {}) => {
    const id = nodeId++
    var node;
    switch (nodeType) {
      case 'osc' :
        // node = makeOsc(id, initialValues)
        _nodes[`n${id}`] = { node: ctx.createOscillator() }
        node = makeOsc(`n${id}`, initialValues)
        break;
      case 'gain' :
        node = ctx.createGain();
        break;
      case 'eq' :
        node = ctx.createBiquadFilter();
        break;
      case 'delay' :
        node = ctx.createDelay();
        break;
      case 'analyser' :
        node = ctx.createAnalyser();
        break;
      case 'stream' :
        // if (!stream || stream.constructor.name !== 'MediaStream' || stream.getAudioTracks().length !== 1) {
          // return console.error('Invalid MediaStream');
        // };

        // node = ctx.createMediaStreamSource();
        break;
      default : return null;
    };
    // _nodes[`n${id}`] = { node };
    // const params = getParams(node, id)

    return node

    // Object.keys(params).map(p => {
    //   console.log(params[p].value)
    //   // const find = _ref[d].filter(k => _ref.key === k)
    //   // console.log('find', find)
    // })


    // console.log(node, params)
    // return params

    // Object.entries(initialValues).forEach(([p, v]) => {
    //   // console.log(p, v)
    //   if (params[p]) {
    //     if (params[p].node) {
    //       // console.log('ramp value', p, v)
    //       params[p].node.setValueAtTime(v, ctx.currentTime);
    //     } else {
    //       // console.log('set value', p, v)
    //       params[p] = v;
    //     };
    //   };
    // });


    // {
    //   // node,
    //   // name: node.constructor.name,
    //   params: getParams(node, nodeId)
    // };
  };



  class Audio {

    // get now() {
    //   return ctx.currentTime;
    // };
    get nodes() {
      return _nodes;
    };
    // get params() {
    //   return params;
    // };
    create(nodeType, initialValues) {
      if (!_validNodes.includes(nodeType)) {
        throw new Error('Invalid Node Type');
      };
      return createNode(nodeType, initialValues);
    };
  };

  return new Audio();
};







// Audio {
//   Node {
//     Params {
//       Param1
//       Param2
//       Param3
//     }
//   }
// }

// set + get
// Node.Param = newValue;


// Audio.create(nodeType, { params })


// _nodes {
//   n0: {
//     node: AudioNode
//     p0: AudioParam
//     p1: AudioParam
//   }
//   n2: {
//     node: AudioNode
//   }
// }


// Node {
//   _id: (get)
//   Param: (get + set)
//   rampExponential: (boolean)
// };





// class AudioClass {
//   constructor() {

//     var AudioContext = window.AudioContext || window.webkitAudioContext;
//     var ctx = new AudioContext();
//     // var getTime = ctx.currentTime
//     // this.now = (() => ctx.currentTime);
//     this.create = (nodeType, params = {}) => {
//       console.log('i am create', nodeType, params)
//     }
//   }

//   get now() {
//     return ctx.currentTime;
//   }

// }

  // var AudioContext = window.AudioContext || window.webkitAudioContext;
  // set context(confirm) {
  //   const AudioContext = window.AudioContext || window.webkitAudioContext;
  //   if (!confirm || this.ctx) {
  //     return console.error('Audio Context Has Already Been Instantiated.');
  //   };
  //   return this.ctx = new AudioContext();
  // };

