import React from 'react';
import * as d3 from 'd3';
import { MeterWave } from '../_svg.js';


export default function Wave(props) {
  const { data } = props;

  const getOpacity = (wave) => {
    const curvePath = d3.select('.invisible').append('path').attr('d', wave).remove();
    const curveNode = curvePath.node();
    const curvePathLength = curveNode.getTotalLength();
    return (100 - Math.sqrt(curvePathLength)) / 100;
  };

  const waveScaleCurve = d3.line().curve(d3.curveLinear);
  const wave = waveScaleCurve(data);
  const opacity = !!data ? getOpacity(wave) : 1 ;

  return (
    <div className='inner'>
      <MeterWave wave={wave} opacity={opacity} />
    </div>
  );
};
