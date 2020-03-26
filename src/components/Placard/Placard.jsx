import React, { memo, useCallback } from 'react';
import './Placard.css';
import { tracker } from '../../global';
import { useGlobalState } from '../../libs/hooks';
import { Logo } from '../_shared'





export default memo(() => {
  const { state, setState } = useGlobalState();
  const { tutorial } = state;

  const toggleTutorial = useCallback(() => {
    tracker.toggle();
    setState(['tutorial', !tutorial]);
  }, [tutorial, setState]);


  return (
    <div className="Placard outer">
      <div className="Placard--inner inner">
        <Logo cl="Placard--logo" />
        <button onClick={toggleTutorial}>
          help
        </button>
      </div>
    </div>
  );
});
