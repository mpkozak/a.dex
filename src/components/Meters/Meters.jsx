import React, { memo } from 'react';
import './Meters.css';
import { parseCl } from '../../libs/parse';
import MeterFrame from './MeterFrame.jsx';
import MeterVuBackpane from './MeterVuBackpane.jsx';
import MeterVuLed from './MeterVuLed.jsx';
import MeterVuNeedle from './MeterVuNeedle.jsx';
import MeterWaveBackpane from './MeterWaveBackpane.jsx';
import MeterWavePath from './MeterWavePath.jsx';
import MeterWaveOverlay from './MeterWaveOverlay.jsx';





const Meter = memo(({ cl = '', children = [] } = {}) => {
  return (
    <div className={parseCl(['Meter', cl])}>
      <div className="Meter--inner">
        <div className="Meter--inner-wrap">
          {children}
          <MeterFrame cl="Meter--layer layer-4" />
        </div>
      </div>
    </div>
  );
});





export const MeterVu = memo(() =>
  <Meter cl="Meter-vu">
    <MeterVuBackpane cl="Meter--layer layer-1" />
    <MeterVuLed cl="Meter--layer layer-2" />
    <MeterVuNeedle cl="Meter--layer layer-3" />
  </Meter>
);

export const MeterWave = memo(() =>
  <Meter cl="Meter-wave">
    <MeterWaveBackpane cl="Meter--layer layer-1" />
    <MeterWavePath cl="Meter--layer layer-2" />
    <MeterWaveOverlay cl="Meter--layer layer-3" />
  </Meter>
);
