import React, { PureComponent } from 'react';
import './_css/Oscillators.css';
import { GlowButton } from './_svg.js';

export default class Oscillators extends PureComponent {

  makeElement(osc) {
    const oscTypes = ['sine', 'triangle', 'sawtooth', 'square']
    return (
      <div className="osc border">
        <div className="label-box">
          <h4>{'Osc ' + osc.slice(-1)}</h4>
        </div>
        <div className="button-box">
          {oscTypes.map((d, i) =>
            <GlowButton
              key={osc + d}
              icon={d}
              active={d === this.props[osc]}
              handleClick={() => this.props.setOsc(osc, d)}
            />
          )}
        </div>
      </div>
    );
  };


  render() {
    return (
      <div className="oscillators outer">
        {this.makeElement('osc1')}
        {this.makeElement('osc2')}
      </div>
    );
  };
};
