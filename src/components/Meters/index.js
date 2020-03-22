// export { default as MeterVu } from './MeterVu.jsx';
// export { default as MeterWave } from './MeterWave.jsx';
import React, { Fragment, memo } from 'react';
import { useAnalyser } from '../../libs/hooks';

import MeterWave from './MeterWave.jsx';
import MeterVu from './MeterVu.jsx';




export default function() {

  const { wave, rotation, peak } = useAnalyser();
  // console.log('meters hoc', wave, rotation, peak)

  return (
    <Fragment>
      <div className="meter Meter-wave">
        <div className="inner">
          <div className="wrap">
            <MeterWave cl="meter-panel" />
          </div>
        </div>
      </div>
      <div className="meter Meter-vu">
        <div className="inner">
          <div className="wrap">
            <MeterVu cl="meter-panel" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

 // rotation={rotation} peak={peak}
