import React, { createContext, useReducer, useContext } from 'react';
import { params, tracker } from './';





const initialState = {
  tutorial: true,
  colorGain: params.initial.colorGain,
  colorFreq: params.initial.colorFreq,
  colorSet: false,
};


function updateState(state, key, val) {
  switch (key) {
    case 'tutorial':
      if (val === false) {
        tracker.start();
      } else {
        tracker.stop();
      };
      break;
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





export {
  GlobalStateProvider,
  useGlobalState as default,
};
