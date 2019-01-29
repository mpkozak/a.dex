import React, { PureComponent } from 'react';
import { Logo, SvgDefs } from './components/_svg.js';
import Main from './components/Main.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      compatible: true,
      audioStream: false,
      videoStream: false,
    };
  };

  componentDidMount() {
// POLYFILL FROM https://github.com/mohayonao/get-float-time-domain-data/blob/master/lib/get-float-time-domain-data.js
    if (global.AnalyserNode && !global.AnalyserNode.prototype.getFloatTimeDomainData) {
      var uint8 = new Uint8Array(2048);
      global.AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
        this.getByteTimeDomainData(uint8);
        for (var i = 0, imax = array.length; i < imax; i++) {
          array[i] = (uint8[i] - 128) * 0.0078125;
        }
      };
    };
////////////
    if (!!window.AnalyserNode.prototype.getFloatTimeDomainData) {
      this.streamInit();
    } else {
      this.setState(prevState => ({ compatible: false }));
    };
  };

  streamInit() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => {
        const audioStream = new MediaStream([stream.getAudioTracks()[0]]);
        const videoStream = new MediaStream([stream.getVideoTracks()[0]]);
        this.setState(prevState => ({ audioStream, videoStream }));
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({ compatible: false }));
      });
  };


  render() {
    const { compatible, audioStream, videoStream } = this.state;
    return (
      <div className="App">
        {compatible
          ? (audioStream && videoStream &&
              <React.Fragment>
                <SvgDefs />
                <Main audioStream={audioStream} videoStream={videoStream} />
              </React.Fragment>
            )
          : <React.Fragment>
              <div className="logo">
                <Logo />
              </div>
              <div className="message">
                <h2>This browser does not fully support WebAudio.</h2>
                <br />
                <h3>For best results, please use Chrome.</h3>
              </div>
            </React.Fragment>
        }
      </div>
    );
  };
};
