import React from 'react';
import './_css/Master.css';
import help from './_help.js';
import { slider } from './_svg.js';

export default function Master(props) {
  const { volume } = props.params;
  const volPct = help.getParamPct(volume);
  const level = volPct * .6 + 10;

  const drawSvg = (level) => {
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
    };

    return (
      <g className='master-svg'>

  {/* Panel */}
        <g className='master-panel' opacity='.8'>
    {/* Fader Slit */}
          <rect
            x='19'
            y='10'
            width='2'
            height='60'
            fill='#000000'
          />
    {/* Tick Marks + Text */}
          {ticks.map((d, i) => {
            return (
              <g key={i}>
                <rect
                  x='12'
                  y={d.y}
                  width='2'
                  height='.3'
                  fill={d.color}
                />
                <rect
                  x='26'
                  y={d.y}
                  width='1.5'
                  height='.3'
                  fill={d.color}
                />
                <text style={masterFont} textAnchor='start' alignmentBaseline='middle'
                  x='29' y={d.y} fill={d.color}
                >{d.text}</text>
              </g>
            );
          })}
        </g>

  {/* Slider */}
        <g className='master-slider'
          viewBox='0 0 10 20'
          transform={`translate(${15}, ${70 - level})`}
          onMouseDown={(e) => help.handleClickParamLinear(e, 'volume', props.update)}
        >
          {slider()}
        </g>

      </g>
    );
  }

  return (
    <div className='master'>
      <div className='outer'>

        <div className='inner' onWheel={(e) => help.handleScrollParamLinear(e, 'volume', props.update)}>
          <h5 className='label-small'>MASTER</h5>
          <svg viewBox='0 0 40 80'>
            {drawSvg(level)}
          </svg>
        </div>

      </div>
    </div>
  );
}
