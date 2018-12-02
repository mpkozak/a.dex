import React from 'react';
// import * as d3 from 'd3';
// import { moduleFrame, modulePanelShadows } from './_svg.js';

export default function Master(props) {

  console.log('props in master', props.params.volume)


  {/* Panel Background Group */}



  const drawSvg = () => {

    const colorRed = '#C12822';

    const ticks = [
      {y: 10, text: '+12', color: colorRed},
      {y: 18, text: '+6', color: colorRed},
      {y: 26, text: '0', color: '#FFFFFF'},
      {y: 33, text: '5', color: '#FFFFFF'},
      {y: 39.5, text: '10', color: '#FFFFFF'},
      {y: 45.5, text: '15', color: '#FFFFFF'},
      {y: 51, text: '20', color: '#FFFFFF'},
      {y: 56, text: '30', color: '#FFFFFF'},
      {y: 60.5, text: '40', color: '#FFFFFF'},
      {y: 64, text: '60', color: '#FFFFFF'},
      {y: 70, text: '∞', color: '#FFFFFF'}
    ];

    const masterFont = {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: 3.5 + 'px',
      fontWeight: '600'
    }

    return (
      <g>
  {/* Panel Background Group */}
        <g className='panel-bg' opacity={.8}>
    {/* Fader Slit */}
          <rect
            x={19}
            y={10}
            width={2}
            height={60}
            fill='#000000'
            stroke='none'
          />
    {/* Tick Marks */}
          {ticks.map((d, i) => {
            return (
              <g key={i}>
                <rect
                  x={12}
                  y={d.y}
                  width={2}
                  height={.3}
                  fill={d.color}
                  stroke='none'
                />
                <rect
                  x={26}
                  y={d.y}
                  width={1.5}
                  height={.3}
                  fill={d.color}
                  stroke='none'
                />
                <text
                  x={29}
                  y={d.y}
                  style={masterFont}
                  fill={d.color}
                  textAnchor='start'
                  alignmentBaseline='middle'
                >{d.text}</text>
              </g>
            );
          })}
        </g>

  {/* Slider Group */}
        <g className='slider-group'>
          <rect x='15' y='16' width='10' height='20' fill='white' opacity='.5'/>
        </g>

      </g>
          );
  }


  return (
    <div className='inner'>
      <h5>MASTER</h5>
      <svg viewBox='0 0 40 80'>
        {drawSvg()}
      </svg>
    </div>
  );
}
