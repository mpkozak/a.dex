import React, { createContext, useReducer, useContext } from 'react';
import Tracker from './libs/tracker';
import { Audio, Analyser } from './libs/audio/';





const params = {
  types: {
    osc: [
      'sine',
      'triangle',
      'sawtooth',
      'square',
    ],
  },
  units: {
    hpf: {
      unit: 'Hz',
      scalar: 1,
    },
    lpf: {
      unit: 'kHz',
      scalar: 1e-3,
    },
    delay: {
      unit: 'ms',
      scalar: 1e3,
    },
  },
  range: {
    sensitivity: [0, 221],
    octaves: [2, 6],
    depth: [0, 3000],
    width: [-1200, 1200],
    hpf: [0, 2200],
    lpf: [2200, 22000],
    delay: [0, .999],
    wet: [0, 1],
    master: [0, 1],
  },
};



const initialState = {
  init: false,

  colorGain: '#00FF00',
  colorFreq: '#FF0000',
  colorSet: false,
  sensitivity: 30,
  octaves: 4,
  osc1: 'triangle',
  osc2: 'sine',
  depth: 1500,
  width: -1200,
  hpf: 0,
  lpf: 22000,
  delay: 0,
  wet: 0,
  master: .73,

  message: null,
};



// const audio = new Audio({
//   octaves: initialState.octaves,
//   osc1Type: initialState.osc1,
//   osc2Type: initialState.osc2,
//   osc2Detune: initialState.width,
//   fmGainGain: initialState.depth,
//   hpfFreq: initialState.hpf,
//   lpfFreq: initialState.lpf,
//   delayTime: initialState.delay,
//   delayGain: initialState.wet,
//   masterGain: initialState.master,
// });

// audio.init();

// const tracker = new Tracker({
//   scalar: 10,
//   callback: audio.handleTrackerData,
//   sensitivity: initialState.sensitivity,
//   colors: [
//     initialState.colorGain,
//     initialState.colorFreq,
//   ],
// });

// const analyser = new Analyser(audio.analyser);

// audio.callback = analyser.runtime;




let audio, tracker, analyser;



/*
get streams


*/






async function initialize() {


  try {




  } catch {


  }


};













function updateState(state, key, val) {
  switch (key) {
    case 'colorGain':
      tracker.colors = [
        val,
        state.colorFreq,
      ];
      break;
    case 'colorFreq':
      tracker.colors = [
        state.colorGain,
        val,
      ];
      break;
    case 'sensitivity':
      tracker.sensitivity = val;
      break;
    case 'octaves':
      audio.octaves = val;
      break;
    case 'osc1':
      audio.osc1.type = val;
      break;
    case 'osc2':
      audio.osc2.type = val;
      break;
    case 'depth':
      audio.setParam(audio.fmGain.gain, val, audio.now);
      break;
    case 'width':
      audio.setParam(audio.osc2.detune, val, audio.now);
      break;
    case 'hpf':
      audio.setParam(audio.hpf.frequency, val, audio.now);
      break;
    case 'lpf':
      audio.setParam(audio.lpf.frequency, val, audio.now);
      break;
    case 'delay':
      audio.setParam(audio.delay.delayTime, val, audio.now);
      break;
    case 'wet':
      audio.setParam(audio.delayGain.gain, val, audio.now);
      break;
    case 'master':
      audio.setParam(audio.masterGain.gain, val, audio.now);
      break;
    default:
      break;
  };

  return key in initialState
    ? ({ ...state, [key]: val })
    : state;
};


function globalStateReducer(state, action) {
  return updateState(state, action.type, action.payload);
};


const GlobalStateContext = createContext();


function GlobalStateProvider({ children } = {}) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};


function useGlobalState() {
  const [state, dispatch] = useContext(GlobalStateContext);

  const setInit = stage => dispatch({ type: 'init', payload: stage });

  const setColorGain = color => dispatch({ type: 'colorGain', payload: color });
  const setColorFreq = color => dispatch({ type: 'colorFreq', payload: color });
  const setColorSet = colorKey => dispatch({ type: 'colorSet', payload: colorKey });
  const setSensitivity = val => dispatch({ type: 'sensitivity', payload: val });
  const setOctaves = val => dispatch({ type: 'octaves', payload: val });
  const setOsc1 = wave => dispatch({ type: 'osc1', payload: wave });
  const setOsc2 = wave => dispatch({ type: 'osc2', payload: wave });
  const setDepth = val => dispatch({ type: 'depth', payload: val });
  const setWidth = val => dispatch({ type: 'width', payload: val });
  const setHpf = val => dispatch({ type: 'hpf', payload: val });
  const setLpf = val => dispatch({ type: 'lpf', payload: val });
  const setDelay = val => dispatch({ type: 'delay', payload: val });
  const setWet = val => dispatch({ type: 'wet', payload: val });
  const setMaster = val => dispatch({ type: 'master', paylaod: val });

  const setMessage = text => dispatch({ type: 'message', payload: text });


  return {
    tracker: tracker,
    // audio: audio,
    analyser: analyser,
    params: { ...params },
    state: { ...state },
    setState: {
      init: setInit,

      colorGain: setColorGain,
      colorFreq: setColorFreq,
      colorSet: setColorSet,
      sensitivity: setSensitivity,
      octaves: setOctaves,
      osc1: setOsc1,
      osc2: setOsc2,
      depth: setDepth,
      width: setWidth,
      hpf: setHpf,
      lpf: setLpf,
      delay: setDelay,
      wet: setWet,
      master: setMaster,

      message: setMessage,
    },
  };
};






// function throttle(fn, t) {
//   let now = Date.now();
//   return () => {
//     console.log('in throttle return')
//     const nextNow = Date.now();
//     if (nextNow - now < t) {
//       return null;
//     };
//     now = nextNow;
//     fn();
//   };
// };



export { GlobalStateProvider, useGlobalState as default };
