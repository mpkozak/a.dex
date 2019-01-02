import React, { PureComponent } from 'react';
import './_css/Delay.css';
import help from './_help.js';
import { BigKnob, SevenSegment } from './_svg.js';

export default class Delay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      delay: props.delay.delayTime.value,
      wet: props.wet.gain.value,
    };
    this.delay = { min: 0, max: .999, mod: 'delayTime' };
    this.wet = { min: 0, max: 1, mod: 'gain' };
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
    const { min, max } = this[param];
    const pct = help.getPercent(this.state[param], min, max);
    return (
      <div className="element">
        <BigKnob
          rotation={pct}
          color={'#22253A'}
          handleClick={(e) => help.handleClick(e, this.setValue, changeScalar, param)}
          handleScroll={(e) => help.handleScroll(e, this.setValue, changeScalar * 5, param)}
        />
        <h5 className="label-small">{param.toUpperCase()}</h5>
      </div>
    );
  };


  render() {
    const { delay } = this.state;
    return (
      <div className="delay outer">
        <div className="inner">
          <h4 className="label">Delay</h4>
          <div className="knob-box">
            <div className="element">
              <SevenSegment value={delay * 1000} digits={3} />
              <h5 className="label-small">ms</h5>
            </div>
            {this.makeElement('delay')}
            {this.makeElement('wet')}
          </div>
        </div>
      </div>
    );
  };
};
