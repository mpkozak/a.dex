import React from 'react';
import './_css/Oscillators.css';
import help from './_help.js';

export default function Oscillators(props) {

  const handleOscillatorType = (e, osc, type) => {
    e.preventDefault();
    e.target.parentNode.childNodes.forEach(d => d.className = 'inactive');
    e.target.className = 'active';
    const { audio } = props;
    help.setAudioParam(audio.instGain.gain, 0, audio.ctx, .01)
      .then(res => {
        osc.type = type;
        // help.setAudioParam(audio.instGain.gain, 0, audio.ctx, .01);
      });
  };

  const makeOscBox = (label, node) => {
    return (
      <div className='inner'>
        <h4 className='label'>{label}</h4>
        <div className='button-box'>
          <button className='active' onClick={(e) => handleOscillatorType(e, node, 'sine')}>&#x223f;</button>
          <button onClick={(e) => handleOscillatorType(e, node, 'triangle')}>&#x22c0;</button>
          <button onClick={(e) => handleOscillatorType(e, node, 'sawtooth')}>&#x2a58;</button>
          <button onClick={(e) => handleOscillatorType(e, node, 'square')}>&#x2a05;</button>
        </div>
      </div>
    );
  };

  const { osc1 } = props.audio;
  const { osc2 } = props.audio;

  return (
    <div className='oscillators'>
      <div className='oscillator outer'>
        {makeOscBox('Osc 1', osc1)}
      </div>
      <div className='oscillator outer'>
        {makeOscBox('Osc 2', osc2)}
      </div>
    </div>
  );
}
