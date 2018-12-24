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
    this.setVolume = this.setVolume.bind(this);
  };

  setVolume(delta) {
    const { ctx, masterGain } = this.props;
    const volume = help.handleLevel(this.state.volume, delta, this.min, this.max);
    if (volume) {
      help.setAudio(masterGain.gain, volume, ctx);
      this.setState(prevState => ({ volume }));
    };
  };


  render() {
    // console.log('Master rendered');
    const pct = help.getPercent(this.state.volume, this.min, this.max);
    return (
      <div className='master outer'>
        <div className='inner' onWheel={(e) => help.newHandleScroll(e, this.setVolume)}>
          <h5 className='label-small'>MASTER</h5>
          <MasterFader pct={pct} handleClick={(e) => help.newHandleClick(e, this.setVolume)} />
        </div>
      </div>
    );
  };
};
