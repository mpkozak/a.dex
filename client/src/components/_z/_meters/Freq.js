import React from 'react';
import * as d3 from 'd3';
import { moduleFrame, modulePanelShadows } from '../_svg.js';

export default function Freq(props) {
  const { analyser } = props;
  const fftBins = analyser.frequencyBinCount;
  const freq = new Float32Array(fftBins);

  const drawFreq = (data) => {
    const width = 100
    const height = 60;
    const extent = d3.extent(data);

    const xScale = d3.scaleLinear().domain([0, fftBins - 1]).range([0, width]);
    const yScale = d3.scalePow().domain(extent).range([0, height]);

    // const curveScale = d3.line().curve(d3.curveMonotoneX);
    // const dataCurve = [];

    // dataCurve.push([0, height]);
    // data.forEach((d, i) => {
    //   dataCurve.push([xScale(i), height - yScale(d)]);
    // });
    // dataCurve.push([width, height]);

    // const freq = d3.select('#freq-svg-d3').selectAll('path').data([dataCurve]);
    // freq.enter().append('path')
    //   .attr('d', d => curveScale(d))
    //   .style('fill', '#FFCC00')
    //   .style('stroke', 'none');
    // freq.transition()
    //   .attr('d', d => curveScale(d));

    const freq = d3.select('#freq-svg-d3').selectAll('rect').data(data);
    freq.enter().append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('width', width / fftBins)
      .style('stroke', 'none')
      .style('fill', '#FFCC00');
    freq
      .attr('y', d => height - yScale(d))
      .attr('height', d => yScale(d));
  }


  const drawSvg = () => {
    const colorBg = '#021006'
    return (
      <g>

  {/* Module Frame */}
        {moduleFrame()}

  {/* Panel Background Group */}
        <g className='panel-bg'>
    {/* Base Layer */}
          <rect
            x={5}
            y={5}
            width={90}
            height={50}
            rx={1}
            ry={1}
            fill={colorBg}
            stroke='#000000'
            strokeWidth='.3%'
          />
        </g>

  {/* D3 Node Link */}
        <g id='freq-svg-d3' clipPath='url(#module-screen-clip)'/>

  {/* Panel Shadows Group */}
        {modulePanelShadows()}

      </g>
    );
  }

  const animate = () => {
    requestAnimationFrame(animate);
    analyser.getFloatFrequencyData(freq);
    drawFreq(freq);
  };
  animate();

  return (
    <div className='inner'>
      <svg viewBox='0 0 100 60'>
        {drawSvg()}
      </svg>
    </div>
  );
}
