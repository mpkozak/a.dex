import React, { PureComponent } from 'react';
import './_css/FmSynth.css';
import help from './_help.js';
import { BigKnob } from './_svg.js';

export default class Eq extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      low: props.low.frequency.value,
      high: props.high.frequency.value
    };
    this.low = { min: 0, max: 440, mod: 'frequency' };
    this.high = { min: 2200, max: 22000, mod: 'frequency' };
    this.changeScalar = 500;
    this.setValue = this.setValue.bind(this);
  };

  setValue(delta, param) {
    const { ctx } = this.props;
    const { min, max, mod } = this[param];
    const val = help.getLevel(this.state[param], delta, min, max);
    if (val) {
      help.setAudio(this.props[param][mod], val, ctx);
      this.setState(prevState => ({ [param]: val }));
    };
  };

  makeElement(param) {
    const { changeScalar } = this;
    const { min, max } = this[param];
    const pct = help.getPercent(this.state[param], min, max);
    return (
      <div className="element">
        <BigKnob
          rotation={pct}
          color={'#313638'}
          handleClick={(e) => help.handleClick(e, this.setValue, changeScalar, param)}
          handleScroll={(e) => help.handleScroll(e, this.setValue, changeScalar * 5, param)}
        />
        <h5 className="label-small">{param.toUpperCase()}</h5>
      </div>
    );
  };


  render() {
    console.log('Eq rendered');
    return (
      <div className="eq outer">
        <div className="inner">
          <h4 className="label">EQ</h4>
          <div className="knob-box">
            {this.makeElement('low')}
            {this.makeElement('high')}
          </div>
        </div>
      </div>
    );
  };
};
