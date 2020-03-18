import React, { Fragment, memo } from 'react';
import { MeterFrame } from '../_shared';
import MeterWaveBackpane from './MeterWaveBackpane.jsx';
import MeterWavePath from './MeterWavePath.jsx';
import MeterWaveOverlay from './MeterWaveOverlay.jsx';





export default memo(({ cl = '' } ={}) => {
  return (
    <Fragment>
      <MeterWaveBackpane cl={cl} />
      <MeterWavePath cl={cl} />
      <MeterWaveOverlay cl={cl} />
      <MeterFrame cl={cl} />
    </Fragment>
  );
});
