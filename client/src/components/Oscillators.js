import React, { PureComponent } from 'react';
import './_css/Oscillators.css';
import { GlowButton } from './_svg.js';

export default class Oscillators extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   osc1: props.osc1,
    //   osc2: props.osc2
    // };
    this.oscTypes = ['sine', 'triangle', 'sawtooth', 'square'];
    // this.setOsc = this.setOsc.bind(this);
  };

  setOsc(osc, type) {
    this.props.setOsc(osc, type);
    // this.setState(prevState => ({ [osc]: type }));
  };

  // setOsc(e) {
  //   const { id } = e.target.parentNode;
  //   const osc = id.substring(0, 4);
  //   const type = id.substring(4);
  //   this.oscTypes.includes(type) && this.props.setOsc(osc, type, this.oscSet);
  //   setTimeout(() => {
  //     this.forceUpdate()
  //   }, 100)
  // };

  makeElement(osc, label) {
    return (
      <div className="osc border">
        <div className="label-box">
          <h4>{label}</h4>
        </div>
        <div className="button-box">
          {this.oscTypes.map((d, i) =>
            <GlowButton
              key={label + i}
              id={osc + d}
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
        {this.makeElement('osc1', 'Osc 1')}
        {this.makeElement('osc2', 'Osc 2')}
      </div>
    );
  };
};
