import React, { createContext, useReducer, useContext } from 'react';
import Tracker from './libs/tracker.js';



    // this.sensitivity = { min: 0, max: 221 };
    // this.range = { min: 2, max: 6 };

const params = {
  sensitivityRange: [
    0,
    221,
  ],
  octavesRange: [
    2,
    6,
  ],
};


const initialState = {
  tracker: new Tracker(),
  colorGain: '#00FF00',
  colorFreq: '#FF0000',
  sensitivity: 30,
  octaves: 4,
  colorSet: false,
  message: null,
};


function updateState(state, key, val) {
  console.log('updating state', key, val)
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

  // const setTracker = instance => dispatch({ type: 'tracker', payload: instance });
  const setColorGain = color => dispatch({ type: 'colorGain', payload: color });
  const setColorFreq = color => dispatch({ type: 'colorFreq', payload: color });
  const setSensitivity = val => dispatch({ type: 'sensitivity', payload: val });
  const setOctaves = val => dispatch({ type: 'octaves', payload: val });
  const setColorSet = colorKey => dispatch({ type: 'colorSet', payload: colorKey });
  const setMessage = text => dispatch({ type: 'message', payload: text });

  const modSensitivity = delta => dispatch({ type: 'sensitivity', payload: state.sensitivity + delta })

  return {
    params: { ...params },
    state: { ...state },
    setState: {
      // tracker: setTracker,
      colorGain: setColorGain,
      colorFreq: setColorFreq,
      octaves: setOctaves,
      sensitivity: setSensitivity,
      colorSet: setColorSet,
      message: setMessage,
    },
    modState: {
      sensitivity: modSensitivity,
    }
  };
};
