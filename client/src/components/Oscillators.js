import React, { PureComponent } from 'react';
import './_css/Oscillators.css';
import help from './_help.js';
import { GlowButton } from './_svg.js';

export default class Oscillators extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      osc1: props.osc1.type,
      osc2: props.osc2.type
    };
    this.oscillators = ['sine', 'triangle', 'sawtooth', 'square'];
    this.setOsc = this.setOsc.bind(this);
  };

  setOsc(osc, type) {
    const { instGain } = this.props;
    help.setAudioGain(instGain.gain, 0, instGain.context, .01);
    setTimeout(() => this.props[osc].type = type, 10);
    this.setState(prevState => ({ [osc]: type }));
  }

  makeElement(osc, label) {
    return (
      <div className="inner">
        <h4 className="label">{label}</h4>
        <div className="button-box">
          {this.oscillators.map((d, i) =>
            <GlowButton
              key={label + i}
              icon={d}
              active={d === this.state[osc]}
              handleClick={() => this.setOsc(osc, d)}
            />
          )}
        </div>
      </div>
    );
  };


  render() {
    // console.log('Oscillators rendered')
    return (
      <div className="oscillators outer">
        {this.makeElement('osc1', 'Osc 1')}
        {this.makeElement('osc2', 'Osc 2')}
      </div>
    );
  };
};
