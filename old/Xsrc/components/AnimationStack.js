import React, { PureComponent } from 'react';
import './_css/Meters.css';
import Theremin from './Theremin.js';
import Meters from './Meters.js';

export default class AnimationStack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animFrame: false,
    };
    this.handleCallback = this.handleCallback.bind(this);
  };

  handleCallback(getData) {
    this.setState(prevState => ({ animFrame: getData }));
  };

  render() {
    const { videoStream, audioRefresh, audioMute, analyser } = this.props;
    const { animFrame } = this.state;
    return (
      <React.Fragment>
        <Theremin videoStream={videoStream} refresh={audioRefresh} mute={audioMute} animFrame={animFrame} />
        <Meters analyser={analyser} handleCallback={this.handleCallback} />
      </React.Fragment>
    );
  };
};
