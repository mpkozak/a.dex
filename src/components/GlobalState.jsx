import React, { createContext, useReducer, useContext } from 'react';

import Tracker from '../libs/tracker.js';



/*
  streams
    video
    microphone
  colors
    colorFreq
    colorGain

*/



// const st = {
//   streams: {
//     audio: {},
//     video: {},
//   },




//   audio: {

//   },



// };



// const screenStates = {
//   initial: '',
//   tutorial: '',

// }



// const setColorFreq = 'setColorFreq';
// const setColorGain = 'setColorGain';
// const setRange = 'setRange';
// const setSensitivity = 'setSensitivity';



const initialState = {
  tracker: new Tracker(),
  colorFreq: '#FF0000',
  colorGain: '#00FF00',
  sensitivity: 30,
  range: 4,
  colorSet: false,
  message: 'welcome',
};


const updateState = (state, key, val) =>
  key in initialState
    ? ({ ...state, [key]: val })
    : state;



const globalStateReducer = (state, action) => {
  return updateState(state, action.type, action.payload);


  // switch (action.type) {
  //   case setColorFreq:
  //     return {
  //       ...state,
  //       colorFreq: action.payload,
  //     };
  //   case setColorGain:
  //     return {
  //       ...state,
  //       colorGain: action.payload,
  //     };
  //   case setSensitivity:
  //     return {
  //       ...state,
  //       sensitivity: action.payload,
  //     };
  //   case setRange:
  //     return {
  //       ...state,
  //       range: action.payload,
  //     };
  //   default:
  //     return state;
  // };
};




const GlobalStateContext = createContext();



export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};





const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  // const setTracker = instance => dispatch({ type: 'tracker', payload: instance });
  const setColorFreq = color => dispatch({ type: 'colorFreq', payload: color });
  const setColorGain = color => dispatch({ type: 'colorGain', payload: color });
  const setSensitivity = val => dispatch({ type: 'sensitivity', payload: val });
  const setRange = val => dispatch({ type: 'range', payload: val });
  const setColorSet = colorKey => dispatch({ type: 'colorSet', payload: colorKey });
  const setMessage = text => dispatch({ type: 'message', payload: text });


  return {
    state: { ...state },
    setState: {
      // tracker: setTracker,
      colorFreq: setColorFreq,
      colorGain: setColorGain,
      range: setRange,
      sensitivity: setSensitivity,
      colorSet: setColorSet,
      message: setMessage,
    },
  };
};





export default useGlobalState;




