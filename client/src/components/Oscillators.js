import React from 'react';
import './_css/Oscillators.css';
import { GlowButton } from './_svg.js';

export default function Oscillators(props) {
  const { params } = props;
  const waves = ['sine', 'triangle', 'sawtooth', 'square'];

  const makeButtons = (osc, current) => {
    const buttons = waves.map((d, i) => {
      return (
        <GlowButton key={osc + i} icon={d} active={d === current} handleClick={() => props.update(osc, d)} />
      );
    });
    return (
      <div className='button-box'>
        {buttons}
      </div>
    );
  }

  const makeOscBox = (current, osc, label) => {
    return (
      <div className='inner'>
        <h4 className='label'>{label}</h4>
        {makeButtons(osc, current)}
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
