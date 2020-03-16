import React, { memo, useCallback } from 'react';
import './Placard.css';
import { useGlobalState } from '../../libs/hooks';
import PlacardLogo from './PlacardLogo.jsx';





export default memo(() => {
  const { tracker, setState } = useGlobalState();

  const handleClick = useCallback(() => {
    tracker.toggle();
    setState.message(tracker.active ? 'tracking...' : '');
  }, [setState, tracker]);


  return (
    <div className="Placard outer">
      <div className="Placard--inner inner">
        <PlacardLogo />
        <button onClick={handleClick}>
          kick it
        </button>
      </div>
    </div>
  );
});
