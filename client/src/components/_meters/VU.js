import React from 'react';
import * as d3 from 'd3';
import { MeterVU } from '../_svg.js';


export default function VU(props) {
  const { data, peak } = props;
  const isPeak = (new Date() - peak) < 1000;

  const getRotation = (rmsVU) => {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const needleScale = d3.scaleLinear().domain(vu).range(deg);
    const rotation = needleScale(rms);
    return rotation;
  };
// console.log('vu ran')
  return (
    <div className='inner'>
      <MeterVU rotation={getRotation(data)} peak={isPeak} />
    </div>
  );
};
