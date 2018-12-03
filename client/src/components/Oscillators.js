import React from 'react';
import './_css/Oscillators.css';
import { oscButton } from './_svg.js';

export default function Oscillators(props) {
  const { params } = props;

  const makeOscBox = (current, osc, label) => {
    return (
      <div className='inner'>
        <h4 className='label'>{label}</h4>
        <div className='button-box'>
          <svg className='osc-button' viewBox='0 0 10 10' onClick={() => props.update(osc, 'sine')}>
            {oscButton('sine', current)}
          </svg>
          <svg className='osc-button' viewBox='0 0 10 10' onClick={() => props.update(osc, 'triangle')}>
            {oscButton('triangle', current)}
          </svg>
          <svg className='osc-button' viewBox='0 0 10 10' onClick={() => props.update(osc, 'sawtooth')}>
            {oscButton('sawtooth', current)}
          </svg>
          <svg className='osc-button' viewBox='0 0 10 10' onClick={() => props.update(osc, 'square')}>
            {oscButton('square', current)}
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className='oscillators'>
      <div className='oscillator outer'>
        {makeOscBox(params.osc1, 'osc1', 'Osc 1')}
      </div>
      <div className='oscillator outer'>
        {makeOscBox(params.osc2, 'osc2', 'Osc 2')}
      </div>
    </div>
  );
}
