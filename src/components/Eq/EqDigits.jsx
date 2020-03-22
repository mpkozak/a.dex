import React, { memo } from 'react';
import { params } from '../../GlobalState.jsx';
import { SevenSeg } from '../_shared';





export default memo(({ eqKey = '', val = 0 } = {}) => {
  const { unit, scalar } = params.units[eqKey];


  return (
    <div className="EqDigits">
      <SevenSeg
        cl="EqDigits--display"
        value={val * scalar}
        digits={4}
        dec={scalar !== 1 ? 2 : 0}
      />
      <h6>{unit}</h6>
    </div>
  );
});
