import React, { memo } from 'react';
import './Placard.css';
import { tracker } from '../../GlobalState.jsx';
import { Logo } from '../_shared'





export default memo(() => {
  return (
    <div className="Placard outer">
      <div className="Placard--inner inner">
        <Logo cl="Placard--logo" />
        <button onClick={() => tracker.toggle()}>
          kick it
        </button>
      </div>
    </div>
  );
});
