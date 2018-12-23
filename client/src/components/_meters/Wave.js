import React from 'react';
import * as d3 from 'd3';
import { MeterWave } from '../_svg.js';

export default function Wave(props) {
  const { curve } = props;

  const waveScaleCurve = d3.line().curve(d3.curveLinear);
  const wave = waveScaleCurve(curve);

  const getOpacity = (curve) => {
    const curvePath = d3.select('.invisible').append('path').attr('d', wave).remove();
    const curveNode = curvePath.node();
    const curvePathLength = curveNode.getTotalLength();
    return (100 - Math.sqrt(curvePathLength)) / 100;
  };
  const opacity = !!curve ? getOpacity(wave) : 1;

  return (
    <MeterWave wave={wave} opacity={opacity} />
  );
};
