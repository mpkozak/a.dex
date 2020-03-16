import React, { createContext, useReducer, useContext } from 'react';
import Tracker from './libs/tracker/';





const tracker = new Tracker();


const params = {
  types: {
    osc: [
      'sine',
      'triangle',
      'sawtooth',
      'square',
    ],
  },
  range: {
    sensitivity: [
      0,
      221,
    ],
    octaves: [
      2,
      6,
    ],
  },
};


const initialState = {
  colorGain: '#00FF00',
  colorFreq: '#FF0000',
  sensitivity: 30,
  octaves: 4,
  colorSet: false,
  osc1: 'triangle',
  osc2: 'sine',
  message: null,
};


function updateState(state, key, val) {
  // console.log('updating state', key, val)
  return key in initialState
    ? ({ ...state, [key]: val })
    : state;
};


function globalStateReducer(state, action) {
  return updateState(state, action.type, action.payload);
};


const GlobalStateContext = createContext();





export const GlobalStateProvider = ({ children } = {}) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};





export default function useGlobalState() {
  const [state, dispatch] = useContext(GlobalStateContext);

  const setColorGain = color => dispatch({ type: 'colorGain', payload: color });
  const setColorFreq = color => dispatch({ type: 'colorFreq', payload: color });
  const setSensitivity = val => dispatch({ type: 'sensitivity', payload: val });
  const setOctaves = val => dispatch({ type: 'octaves', payload: val });
  const setColorSet = colorKey => dispatch({ type: 'colorSet', payload: colorKey });
  const setOsc1 = wave => dispatch({ type: 'osc1', payload: wave });
  const setOsc2 = wave => dispatch({ type: 'osc2', payload: wave });
  const setMessage = text => dispatch({ type: 'message', payload: text });


  return {
    tracker: tracker,
    params: { ...params },
    state: { ...state },
    setState: {
      colorGain: setColorGain,
      colorFreq: setColorFreq,
      octaves: setOctaves,
      sensitivity: setSensitivity,
      colorSet: setColorSet,
      osc1: setOsc1,
      osc2: setOsc2,
      message: setMessage,
    }
  };
};
