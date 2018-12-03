import React from 'react';
import * as d3 from 'd3';
// import help from '../_help.js';
import { moduleFrame, modulePanelShadows } from '../_svg.js';

export default function Spec(props) {
  const analyser = props.audio.analyser;
  const fftBins = analyser.frequencyBinCount;
  const slices = 60;
  const dataSet = new Array(slices).fill(new Array(fftBins).fill('#000000'));
  let canvasCtx, canvasWidth, canvasHeight, sliceWidth, sliceHeight;

  // const colors = ['#FEFEF5', '#FCFFB9', '#F9FF7A', '#F7DF4B', '#F3B226', '#EC851A', '#E0610F', '#BA460E', '#8A3B12', '#5F341D', '#3D2E25', '#28282B', '#181E36', '#09112D', '#000A18', '#000002'];
  // const domain = help.makeDomain([0, -120], colors);
  // const zScale = d3.scaleLog().domain(domain).range(colors);
  const zScale = d3.scaleLinear().domain([0, -120]).range(['#FFCC00', '#000000']);

  const drawSpec = (data) => {
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    data.forEach((d, i) => {
      d.forEach((f, j) => {
        canvasCtx.fillStyle = f;
        canvasCtx.fillRect(i * sliceWidth, canvasHeight - (j * sliceHeight), sliceWidth, sliceHeight);
      });
    });
  }

  const drawSvg = () => {
    return (
      <g>

  {/* Module Frame */}
        {moduleFrame()}

  {/* Canvas Group */}
        <g clipPath='url(#module-screen-clip)'>
          <rect
            x={0}
            y={0}
            width={100}
            height={60}
            fill='#000000'
            stroke='none'
          />
          <foreignObject
            x={5}
            y={5}
            width={90}
            height={50}
          >
            <canvas id='spec-canvas'/>
          </foreignObject>
        </g>

  {/* Panel Shadows Group */}
        {modulePanelShadows()}

      </g>
    );
  }

  const animate = () => {
    requestAnimationFrame(animate);
    const data = new Float32Array(fftBins);
    analyser.getFloatFrequencyData(data);

    const dataColor = [];
    data.forEach(d => dataColor.push(zScale(d)));
    dataSet.shift();
    dataSet.push(dataColor);

    drawSpec(dataSet);
  }

  const canvas = document.querySelector('#spec-canvas')
  if (canvas) {
    canvasCtx = canvas.getContext('2d');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    sliceWidth = canvasWidth / slices;
    sliceHeight = canvasHeight / fftBins;
    animate();
  }

  return (
    <div className='inner'>
      <svg viewBox='0 0 100 60'>
        {drawSvg()}
      </svg>
    </div>
  );

}
