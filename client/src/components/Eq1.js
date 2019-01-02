import React, { PureComponent } from 'react';
import './_css/Eq1.css';
import help from './_help.js';
import { BigKnob, SevenSegment } from './_svg.js';

export default class Eq1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hpf: props.hpf.frequency.value,
      lpf: props.lpf.frequency.value
    };
    this.hpf = { min: 0, max: 2200, mod: 'frequency', digits: 4, exact: false, unit: 'Hz' };
    this.lpf = { min: 2200, max: 22000, mod: 'frequency', digits: 4, exact: true, unit: 'kHz' };
    this.changeScalar = 500;
    this.setValue = this.setValue.bind(this);
  };

  setValue(delta, param) {
    const ctx = this.props[param].context;
    const { min, max, mod } = this[param];
    const val = help.getLevel(this.state[param], delta, min, max);
    if (val) {
      help.setAudio(this.props[param][mod], val, ctx);
      this.setState(prevState => ({ [param]: val }));
    };
  };

  makeElement(param) {
    const { changeScalar } = this;
    const { min, max, digits, exact, unit } = this[param];
    const value = this.state[param];
    const pct = help.getPercent(value, min, max);
    return (
      <div className="element">
        <h5 className="label-small">{param.toUpperCase()}</h5>
        <div className="row">
          <BigKnob
            rotation={pct}
            color={'#3A3125'}
            handleClick={(e) => help.handleClick(e, this.setValue, changeScalar, param)}
            handleScroll={(e) => help.handleScroll(e, this.setValue, changeScalar * 5, param)}
          />
          <div className="display">
            <SevenSegment value={exact ? (value / 1000).toFixed(2) : value} digits={digits} exact={exact} />
            <h6 className="label-small">{unit}</h6>
          </div>
        </div>
      </div>
    );
  };


  render() {
    return (
      <div className="eq1 outer">
        <div className="inner">
          <h4 className="label">EQ</h4>
          <div className="knob-box">
            {this.makeElement('hpf')}
            {this.makeElement('lpf')}
          </div>
        </div>
      </div>
    );
  };
};
