import React, { PureComponent } from 'react';
import './_css/FmSynth.css';
import help from './_help.js';
import { BigKnob } from './_svg.js';

export default class FmSynth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      depth: props.depth.gain.value,
      width: props.width.detune.value
    };
    this.depth = {min: 0, max: 3000, mod: 'gain'};
    this.width = {min: -1200, max: 1200, mod: 'detune'};
    this.changeSpeed = 500;
    this.setValue = this.setValue.bind(this);
  };

  setValue(delta, param) {
    const { ctx } = this.props;
    const { min, max, mod } = this[param];
    const val = help.handleLevel(this.state[param], delta, min, max);
    if (val) {
      help.setAudio(this.props[param][mod], val, ctx);
      this.setState(prevState => ({ [param]: val }));
    };
  };

  makeElement(param) {
    const { changeSpeed } = this;
    const { min, max } = this[param];
    const pct = help.getPercent(this.state[param], min, max);
    return (
      <div className='element'>
        <BigKnob
          rotation={pct}
          color='#313638'
          handleClick={(e) => help.newHandleClick(e, this.setValue, changeSpeed, param)}
          handleScroll={(e) => help.newHandleScroll(e, this.setValue, changeSpeed * 5, param)}
        />
        <h5 className='label-small'>{param.toUpperCase()}</h5>
      </div>
    );
  };


  render() {
    // console.log('FmSynth rendered');
    return (
      <div className='fmsynth outer'>
        <div className='inner'>
          <h4 className='label'>FM Synth</h4>
          <div className='knob-box'>
            {this.makeElement('depth')}
            {this.makeElement('width')}
          </div>
        </div>
      </div>
    );
  };
};
