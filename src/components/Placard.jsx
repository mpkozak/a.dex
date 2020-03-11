import React, { memo, useCallback } from 'react';
import './Placard.css';
import useGlobalState from './GlobalState.jsx';
import { Logo } from './UI'




export default memo(() => {
  const { state, setState } = useGlobalState();
  const {
    tracker,
  } = state;



  const handleClick = useCallback(() => {
    tracker.toggle();
    setState.message(tracker.active ? 'tracking...' : '');
  }, [setState, tracker])



  return (
    <div className="Placard outer">
      <div className="Placard--inner inner">
        <Logo cl="Placard--logo" />
        <button onClick={handleClick}>
          kick it
        </button>
      </div>
    </div>
  );
});
