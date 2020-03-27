import React, { memo } from 'react';
import { SevenSeg } from '../';





export default memo(({ val = 0, dec = 0, unit = '' } = {}) =>
  <div className="EqDigits">
    <SevenSeg
      cl="EqDigits--display"
      value={val}
      digits={4}
      dec={dec}
    />
    <h6>{unit}</h6>
  </div>
);
