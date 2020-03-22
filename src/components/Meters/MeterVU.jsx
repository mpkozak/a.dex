import React, { Fragment, memo } from 'react';
import { MeterFrame } from '../_shared';
import MeterVuBackpane from './MeterVuBackpane.jsx';
import MeterVuLed from './MeterVuLed.jsx';
import MeterVuNeedle from './MeterVuNeedle.jsx';





export default memo(({ cl = '', rotation = -48, peak = false } = {}) => {
  // console.log('meter vu rendered', rotation, peak)

  return (
    <Fragment>
      <MeterVuBackpane cl={cl} />
      <MeterVuLed cl={cl} peak={peak} />
      <MeterVuNeedle cl={cl} rotation={rotation} />
      <MeterFrame cl={cl} />
    </Fragment>
  );
});
