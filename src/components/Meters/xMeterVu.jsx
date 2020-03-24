import React, { Fragment, memo } from 'react';
import { MeterFrame } from '../_shared';
import MeterVuBackpane from './MeterVuBackpane.jsx';
import MeterVuLed from './MeterVuLed.jsx';
import MeterVuNeedle from './MeterVuNeedle.jsx';





export default memo(({ cl = '' } = {}) =>
  <Fragment>
    <MeterVuBackpane cl={cl} />
    <MeterVuLed cl={cl} />
    <MeterVuNeedle cl={cl} />
    <MeterFrame cl={cl} />
  </Fragment>
);
