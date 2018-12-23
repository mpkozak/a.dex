import React, { PureComponent } from 'react';
import './_css/Oscillators.css';
import { GlowButton } from './_svg.js';

export default class Oscillators extends PureComponent {
  makeOscBox(current, osc, label) {
    const waves = ['sine', 'triangle', 'sawtooth', 'square'];
    return (
      <div className='inner'>
        <h4 className='label'>{label}</h4>
        <div className='button-box'>
          {waves.map((d, i) =>
            <GlowButton key={osc + i} icon={d} active={d === current} handleClick={() => this.props.update(osc, d)} />
          )}
        </div>
      </div>
    );
  };

  render() {
    // console.log('oscillators updated')
    const { osc1, osc2 } = this.props;
    return (
      <div className='oscillators outer'>
        {this.makeOscBox(osc1, 'osc1', 'Osc 1')}
        {this.makeOscBox(osc2, 'osc2', 'Osc 2')}
      </div>
    );
  };
};
