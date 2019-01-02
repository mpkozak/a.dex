import React, { PureComponent } from 'react';
import './_css/Master.css';
import help from './_help.js';
import { MasterFader } from './_svg.js';

export default class Master extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      volume: .73
    };
    this.min = 0;
    this.max = 1;
    this.changeScalar = 800;
    this.setVolume = this.setVolume.bind(this);
  };

  setVolume(delta) {
    const { masterGain } = this.props;
    const volume = help.getLevel(this.state.volume, delta, this.min, this.max);
    if (volume) {
      help.setAudio(masterGain.gain, volume, masterGain.context);
      this.setState(prevState => ({ volume }));
    };
  };


  render() {
    const { min, max, changeScalar } = this;
    const pct = help.getPercent(this.state.volume, min, max);
    return (
      <div className="master outer">
        <div className="inner" onWheel={(e) => help.handleScroll(e, this.setVolume, changeScalar * 5)}>
          <h5 className="label-small">MASTER</h5>
          <MasterFader pct={pct} handleClick={(e) => help.handleClick(e, this.setVolume, changeScalar)} />
        </div>
      </div>
    );
  };
};
