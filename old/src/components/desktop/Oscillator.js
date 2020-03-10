import React, { PureComponent } from 'react';
import './_css/Oscillator.css';
import { GlowButton } from '../_svg.js';

export default class Oscillator extends PureComponent {
  render() {
    const { osc, current } = this.props;
    const oscTypes = ['sine', 'triangle', 'sawtooth', 'square'];
    return (
      <div id={"Oscillator" + osc} className="outer">
        <div className="osc inner border">
          <h4 className="label">{'Osc ' + osc}</h4>
          <div className="button-box">
            {oscTypes.map((d, i) =>
              <GlowButton
                key={'osc' + d + osc}
                icon={d}
                active={d === current}
                handleClick={() => this.props.setOsc('osc' + osc, d)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };
};
