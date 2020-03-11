import React, { createContext, useReducer, useContext } from 'react';




/*
  streams
    video
    microphone
  colors
    colorFreq
    colorGain

*/










const setColorFreq = 'setColorFreq';
const setColorGain = 'setColorGain';



const initialState = {
  colorFreq: '#FFFFFF',
  colorGain: '#444444',
};



const globalStateReducer = (state, action) => {
  switch (action.type) {
    case setColorFreq:
      return {
        ...state,
        colorFreq: action.payload,
      };
    case setColorGain:
      return {
        ...state,
        colorGain: action.payload,
      };
    default:
      return state;
  };
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

  const setColorFreq = color => dispatch({ type: 'setColorFreq', payload: color });
  const setColorGain = color => dispatch({ type: 'setColorGain', payload: color });

  return {
    set: {
      colorFreq: setColorFreq,
      colorGain: setColorGain,
    },
    // setColorFreq,
    // setColorGain,
    state: { ...state },
  };
};





export default useGlobalState;




