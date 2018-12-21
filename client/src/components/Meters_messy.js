import React from 'react';
import * as d3 from 'd3';
import './_css/Meters.css';
import { MeterWave, MeterVU } from './_svg.js';

export default function Meters(props) {
  const { data, fftSize } = props;
  let wave = 'M 0 30 L 100 30';
  let opacity = 1;
  let rotation = -48;
  let peak = false;

  const getWave = (dataCurve) => {
    const waveScaleCurve = d3.line().curve(d3.curveLinear);
    wave = waveScaleCurve(dataCurve);
    const curvePath = d3.select('.invisible').append('path').attr('d', wave).remove();
    const curveNode = curvePath.node();
    const curvePathLength = curveNode.getTotalLength();
    opacity = (100 - Math.sqrt(curvePathLength)) / 100;
  };

  const getVU = (rmsVU) => {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const vuScaleRotation = d3.scaleLinear().domain(vu).range(deg);
    rotation = vuScaleRotation(rms);
    peak = (rmsVU > 10);
  };

  const getData = () => {
    // const waveScaleX = d3.scaleLinear().domain([fftSize - 1, 0]).range([0, 100]);
    // const waveScaleY = d3.scaleLinear().domain([-1, 1]).range([5, 55]);
    const dataCurve = new Array(fftSize);
    let dataSum = 0;
    for (let i = 0; i < fftSize; i++) {
      const d = data[i];
      dataSum += Math.pow(d, 2);
// manual calculation
      // dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 25) + 30];
// manual calculation declared
      const x = (i / (fftSize - 1)) * 100;
      const y = (d * 25) + 30;
      dataCurve[i] = [x, y];
// d3 calculation
      // dataCurve[i] = [waveScaleX(i), waveScaleY(d)];
// d3 calculation declared
      // const x = waveScaleX(i);
      // const y = waveScaleY(d);
      dataCurve[i] = [x, y];
    };
    const dataVU = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
    getWave(dataCurve);
    getVU(dataVU);
  };

  if (data.length) {
    getData();
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
