import React, { PureComponent } from 'react';
import './_css/FmSynth.css';
// import help from './_help.js';
import { BigKnob } from '../_svg.js';

export default class FmSynth extends PureComponent {
  constructor(props) {
    super(props);
    this.scrollTime = 0;
  }

  handleScroll(e, id) {
    e.preventDefault();
    this.props.setFm(id, e.deltaY * .2, e.timeStamp);
  };

  handleClick(e, id) {
    e.preventDefault();
    var handleDrag = (e) => {
      this.props.setFm(id, (e.movementX - e.movementY), e.timeStamp);
    };
    window.addEventListener('mousemove', handleDrag);
    var handleClear = () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleClear);
    };
   window.addEventListener('mouseup', handleClear);
  };

  makeKnobElement(pct, id) {
    return (
      <div className="element">
        <BigKnob
          color={'#313638'}
          rotation={pct}
          // handleClick={(e) => help.handleClick(e, this.setValue, changeScalar, param)}
          handleClick={(e) => this.handleClick(e, id)}
          handleScroll={(e) => this.handleScroll(e, id)}
        />
        <h5 className="label-small">{id.substring(2).toUpperCase()}</h5>
      </div>
    );
  };


  render() {
    const { fmDepth, fmWidth } = this.props
    return (
      <div id="FmSynth" className="outer">
        <div className="inner border">
          <h4 className="label">FM Synth</h4>
          <div className="knob-box">
            {this.makeKnobElement(fmDepth, 'fmDepth')}
            {this.makeKnobElement(fmWidth, 'fmWidth')}
          </div>
        </div>
      </div>
    );
  };
};
