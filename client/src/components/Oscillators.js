import React from 'react';
import './_css/Oscillators.css';
import { GlowButton } from './_svg.js';

export default function Oscillators(props) {
  const { osc1, osc2 } = props;
  const waves = ['sine', 'triangle', 'sawtooth', 'square'];

  const makeOscBox = (current, osc, label) => {
    return (
      <div className='inner'>
        <h4 className='label'>{label}</h4>
        <div className='button-box'>
          {waves.map((d, i) =>
            <GlowButton key={osc + i} icon={d} active={d === current} handleClick={() => props.update(osc, d)} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='oscillators'>
      <div className='oscillator outer'>
        {makeOscBox(osc1, 'osc1', 'Osc 1')}
      </div>
      <div className='oscillator outer'>
        {makeOscBox(osc2, 'osc2', 'Osc 2')}
      </div>
    </div>
  );
};
