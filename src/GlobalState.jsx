import React, { createContext, useReducer, useContext } from 'react';
import Tracker from './libs/tracker';
import { Audio, Analyser } from './libs/audio/';





/*
    Global Parameters
*/

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
  initial: {
    osc1: 'triangle',
    osc2: 'sine',
    sensitivity: 30,
    octaves: 4,
    depth: 1500,
    width: -1200,
    hpf: 0,
    lpf: 22000,
    delay: 0,
    wet: 0,
    master: .73,
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
  message: null,
  colorGain: '#00FF00',
  colorFreq: '#FF0000',
  colorSet: false,
};





/*
    Initialization Stack
*/

function audioInit() {
  const options = {
    octaves: params.initial.octaves,
    osc1Type: params.initial.osc1,
    osc2Type: params.initial.osc2,
    osc2Detune: params.initial.width,
    fmGainGain: params.initial.depth,
    hpfFreq: params.initial.hpf,
    lpfFreq: params.initial.lpf,
    delayTime: params.initial.delay,
    delayGain: params.initial.wet,
    masterGain: params.initial.master,
  };
  try {
    const audio = new Audio(options);
    audio.init();
    return audio;
  } catch (err) {
    console.error('audioInit', err);
    throw err;
  };
};


function analyserInit(analyserNode) {
  try {
    const analyser = new Analyser(analyserNode);
    return analyser;
  } catch (err) {
    console.error('analyserInit', err);
    throw err;
  };
};


async function streamInit() {
  const options = {
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
    audio: true,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(options);
    const mediaStreams = {
      audio: new MediaStream([stream.getAudioTracks()[0]]),
      video: new MediaStream([stream.getVideoTracks()[0]]),
    };
    return mediaStreams;
  } catch (err) {
    console.error('streamInit', err);
    throw err;
  };
};


function trackerInit(audioCallback) {
  const options = {
    scalar: 10,
    callback: audioCallback,
    sensitivity: params.initial.sensitivity,
    colors: [
      initialState.colorGain,
      initialState.colorFreq,
    ],
  };
  try {
    const tracker = new Tracker(options);
    return tracker;
  } catch (err) {
    console.error('trackerInit', err);
    throw err;
  };
};



let audio = {},
    analyser = {},
    tracker = {},
    mediaStreams = {};

async function initialize() {
  try {
    audio = audioInit();
    // console.log('audio', audio)
    analyser = analyserInit(audio.analyser);
    audio.analyserCallback = analyser.callback;
    // console.log('analyser', analyser)
    tracker = trackerInit(audio.trackerCallback);
    // console.log('tracker', tracker)
    mediaStreams = await streamInit();
    // console.log('mediaStreams', mediaStreams)
    return true;
  } catch (err) {
    // console.error('initialize', err);
    return false;
  };
};





/*
    Global State + Context
*/

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
  const setState = ([type, payload]) => dispatch({ type, payload });

  return { state, setState };
};





// function throttle(fn, t) {
//   let now = Date.now();
//   return (e) => {
//     console.log('in throttle return')
//     const nextNow = Date.now();
//     if (nextNow - now < t) {
//       return null;
//     };
//     now = nextNow;
//     fn(e);
//   };
// };



export {
  params,
  initialize,
  audio,
  analyser,
  tracker,
  mediaStreams,
  GlobalStateProvider,
  useGlobalState as default,
};
