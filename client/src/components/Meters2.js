import React from 'react';
import * as d3 from 'd3';
import './_css/Meters.css';
import { MeterVU, MeterWave } from './_svg.js';

export const Meters = (props) => {
  const { data } = props;
  if (!data.length) return null;

  let wave, opacity, rotation, peak;

  const getWave = (data) => {
    const width = 100
    const height = 60;
    const margin = 5;
    const extent = d3.extent(data);

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    // const yScale = d3.scaleLinear().domain([-1, 1]).range([0 + margin, height - margin]);
    const yScale = d3.scaleLinear().domain([extent[0] - .1, extent[1] + .1]).range([0 + margin, height - margin]);
    const curveScale = d3.line().curve(d3.curveLinear);

    const dataCurve = [];
    data.forEach((d, i) => {
      dataCurve.push([xScale(i), yScale(d)]);
    });

    const curvePath = d3.select('.invisible').append('path').attr('d', curveScale(dataCurve)).remove();
    const curveNode = curvePath.node();
    const curvePathLength = curveNode.getTotalLength();

    wave = curveScale(dataCurve);
    opacity = (width - Math.sqrt(curvePathLength)) / width;
  }

  const getRotation = (rmsVU) => {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const needleScale = d3.scaleLinear().domain(vu).range(deg);
    rotation = needleScale(rms);
  }

  const handlePeak = () => {
    peak = true;
    setTimeout(() => { peak = false }, 1000);
  }




  const sum = data.reduce((a, b) => a + Math.pow(b, 2), 0);
  const rmsVU = 20 * Math.log10(Math.sqrt(sum / data.length)) + 20;
  if (rmsVU > 15) handlePeak();
  getRotation(rmsVU);
  getWave(data);


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
}

// export default Meters;
