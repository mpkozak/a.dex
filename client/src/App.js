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
///////////////////
// POLYFILL FROM: https://github.com/mohayonao/get-float-time-domain-data/blob/master/lib/get-float-time-domain-data.js
///////////////////
    if (global.AnalyserNode && !global.AnalyserNode.prototype.getFloatTimeDomainData) {
      var uint8 = new Uint8Array(2048);
      global.AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
        this.getByteTimeDomainData(uint8);
        for (var i = 0, imax = array.length; i < imax; i++) {
          array[i] = (uint8[i] - 128) * 0.0078125;
        }
      };
    };
///////////////////
///////////////////
    if (!!global.AnalyserNode.prototype.getFloatTimeDomainData) {
      this.streamInit();
    } else {
      this.setState(prevState => ({ compatible: false }));
    };
  };

  // { width: 640, height: 480 }

  streamInit() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
      // {
      //   width: {ideal: 640},
      //   height: {ideal: 480}
      // }
    })
      .then(stream => {
        const { width, height } = stream.getVideoTracks()[0].getSettings();
        // const width = stream.getVideoTracks()[0].getSettings().width;
        // const height = stream.getVideoTracks()[0].getSettings().height;
        const audioStream = new MediaStream([stream.getAudioTracks()[0]]);
        const videoStream = new MediaStream([stream.getVideoTracks()[0]]);
        this.setState(prevState => ({ audioStream, videoStream, width, height }));
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({ compatible: false }));
      });
  };


  render() {
    const { compatible, audioStream, videoStream, width, height } = this.state;
    return (
      <div className="App">
        {compatible
          ? (audioStream && videoStream &&
              <React.Fragment>
                <SvgDefs />
                <Main audioStream={audioStream} videoStream={videoStream} width={width} height={height} />
              </React.Fragment>
            )
          : <React.Fragment>
              <div className="logo">
                <Logo />
              </div>
              <div className="message">
                <h2>This browser does not fully support WebAudio.</h2>
                <br />
                <h3>For best results, please use the latest version of Chrome.</h3>
              </div>
            </React.Fragment>
        }
      </div>
    );
  };
};
