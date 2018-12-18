import React from 'react';
import * as d3 from 'd3';
import './_css/Meters.css';
import { MeterWave, MeterVU } from './_svg.js';


var wave = 'M 0 30 L 100 30';
var opacity = 1;
var rotation = -48;
var peak = false;

export default function Meters(props) {
  const { data } = props;

  const width = 100
  const height = 60;
  const margin = 5;
  const extent = d3.extent(data);
  const waveScaleX = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
  const waveScaleY = d3.scaleLinear().domain([extent[0] - .1, extent[1] + .1]).range([0 + margin, height - margin]);
  const waveScaleCurve = d3.line().curve(d3.curveLinear);

  const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
  const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
  const vuScaleRotation = d3.scaleLinear().domain(vu).range(deg);


  const getWave = (dataCurve) => {
    const curvePath = d3.select('.invisible').append('path').attr('d', waveScaleCurve(dataCurve)).remove();
    const curveNode = curvePath.node();
    const curvePathLength = curveNode.getTotalLength();
    wave = waveScaleCurve(dataCurve);
    opacity = (width - Math.sqrt(curvePathLength)) / width;
  };

  const getVU = (rmsVU) => {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    rotation = vuScaleRotation(rms);
    if (rmsVU > 15) {
      peak = true;
      setTimeout(() => { peak = false }, 1000);
    };
  };

  if (data.length) {
    const dataCurve = []
    let dataSum = 0;
    const length = data.length;
    for (let i = 0; i < length; i++) {
      const d = data[i];
      dataCurve.push([waveScaleX(i), waveScaleY(d)]);
      dataSum +=  Math.pow(d, 2);
    };
    const dataVU = 20 * Math.log10(Math.sqrt(dataSum / length)) + 20;
    getWave(dataCurve);
    getVU(dataVU);
  };


  return (
    <div className='meters'>
      <div className='meter outer'>
        <div className='inner'>
          <MeterWave wave={wave} opacity={opacity} />
        </div>
      </div>
      <div className='meter outer'>
        <div className='inner'>
          <MeterVU rotation={rotation} peak={peak} />
        </div>
      </div>
    </div>
  );
};
