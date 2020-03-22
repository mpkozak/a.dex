import React, { memo } from 'react';
import { params } from '../../GlobalState.jsx';
import { SevenSeg } from '../_shared';





export default memo(({ delayKey = '', val = 0 } = {}) => {
  const { unit, scalar } = params.units[delayKey];


  return (
    <div className="DelayDigits">
      <SevenSeg
        cl="DelayDigits--display"
        value={val * scalar}
        digits={3}
        dec={0}
      />
      <h6>{unit}</h6>
    </div>
  );
});
