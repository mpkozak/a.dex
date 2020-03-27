import React, { memo, useCallback } from 'react';
import './Placard.css';
import { useGlobalState } from '../../libs/hooks';
import { Logo } from '../';
import PlacardHelp from './PlacardHelp.jsx';





export default memo(() => {
  const { state, setState } = useGlobalState();
  const { tutorial } = state;

  const toggleTutorial = useCallback(() => {
    setState(['tutorial', !tutorial]);
  }, [tutorial, setState]);


  return (
    <div className="Placard outer">
      <div className="Placard--inner inner">
        <Logo cl="Placard--logo" />
        <PlacardHelp
          cl="PlacardHelp"
          active={tutorial}
          handleClick={toggleTutorial}
        />
      </div>
    </div>
  );
});
