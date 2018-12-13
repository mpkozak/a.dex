import React from 'react';
import * as d3 from 'd3';
import { meterFrame, meterPanelShadow } from '../_svg.js';

export default function Wave(props) {
  const { analyser } = props;
  if (!analyser) return null;
  const fftBins = analyser.frequencyBinCount;
  const wave = new Float32Array(fftBins);

  const drawWave = (data) => {
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
    const curveOpacity = (width - Math.sqrt(curvePathLength)) / width;

    const wave = d3.select('#wave-svg-d3').selectAll('path').data([dataCurve]);
    wave.enter().append('path')
      .style('fill', 'none')
      .style('stroke-width', '.15%')
      .style('stroke', '#A0FFA0')
    wave
      .attr('d', d => curveScale(d))
      .style('opacity', curveOpacity)
  }

  const drawSvg = () => {
    const colorBg = '#052205';
    const gridLines = [7.25, 11.75, 16.25, 20.75, 25.25, 29.75, 34.25, 38.75, 43.25, 47.75, 52.25, 56.75, 61.25, 65.75, 70.25, 74.75, 79.25, 83.75, 88.25, 92.75];

    return (
      <g className='meter-wave-svg'>
  {/* Frame */}
        {meterFrame()}
  {/* Interior */}
        <g className='wave-interior' clipPath='url(#meter-inner-clip)'>

    {/* Panel */}
          <g className='wave-panel'>
      {/* Background */}
            <rect
              x='5'
              y='5'
              width='90'
              height='50'
              rx='1'
              ry='1'
              fill={colorBg}
            />
      {/* Vertical Lines */}
            {gridLines.map((d, i) => {
              return (
                <line
                  key={'v' + d}
                  x1={d}
                  y1='0'
                  x2={d}
                  y2='60'
                  stroke='#FFFFFF'
                  strokeWidth={(i % 2 + 2) / 20}
                  strokeOpacity='.3'
                />
              );
            })}
      {/* Horizontal Lines */}
            {gridLines.map((d, i) => {
              if (d < 60) {
                return (
                  <line
                    key={'h' + d}
                    x1='0'
                    y1={d}
                    x2='100'
                    y2={d}
                    stroke='#FFFFFF'
                    strokeWidth={(i % 2 + 2) / 20}
                    strokeOpacity='.3'
                  />
                );
              } else return null;
            })}
          </g>

    {/* D3 Node Link */}
          <g className='wave-line' id='wave-svg-d3'/>

    {/* Panel Shadows */}
          {meterPanelShadow()}

        </g>
      </g>
    );
  }

  const animate = () => {
    requestAnimationFrame(animate);
    analyser.getFloatTimeDomainData(wave);
    drawWave(wave);
  };
  animate();



  return (
    <div className='inner'>
      <svg className='meter' viewBox='0 0 100 60'>
        {drawSvg()}
      </svg>
    </div>
  );
}
