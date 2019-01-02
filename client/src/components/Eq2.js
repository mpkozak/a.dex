import React, { PureComponent } from 'react';
import './_css/Eq2.css';
import help from './_help.js';
import { BigKnob, SevenSegment } from './_svg.js';

export default class Eq2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      freq: props.eq.frequency.value,
      q: props.eq.Q.value,
      gain: props.eq.gain.value
    };
    this.freq = { min: 110, max: 2200, mod: 'frequency', digits: 4 };
    this.q = { min: 1, max: 10, mod: 'Q', digits: 2 };
    this.gain = { min: -10, max: 10, mod: 'gain', digits: 3 };
    this.changeScalar = 500;
    this.setValue = this.setValue.bind(this);
  };

  setValue(delta, param) {
    const ctx = this.props.eq.context;
    const { min, max, mod } = this[param];
    const val = help.getLevel(this.state[param], delta, min, max);
    if (val) {
      help.setAudio(this.props.eq[mod], val, ctx);
      this.setState(prevState => ({ [param]: val }));
    };
  };

  makeElement(param) {
    const { changeScalar } = this;
    const { min, max, digits } = this[param];
    const value = this.state[param];
    const pct = help.getPercent(value, min, max);
    return (
      <div className="element">
        <BigKnob
          rotation={pct}
          color={'#3A3125'}
          handleClick={(e) => help.handleClick(e, this.setValue, changeScalar, param)}
          handleScroll={(e) => help.handleScroll(e, this.setValue, changeScalar * 5, param)}
        />
        <SevenSegment value={value} digits={digits} />
        <h5 className="label-small">{param.toUpperCase()}</h5>
      </div>
    );
  };


  render() {
    return (
      <div className="eq2 outer">
        <div className="inner">
          <h4 className="label">EQ</h4>
          <div className="knob-box">
            {this.makeElement('freq')}
            {this.makeElement('q')}
            {this.makeElement('gain')}
          </div>
        </div>
      </div>
    );
  };
};
