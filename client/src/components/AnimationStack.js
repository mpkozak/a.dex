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













// import React, { PureComponent } from 'react';
// import './_css/Meters.css';
// import { line, curveLinear } from 'd3-shape';
// import { scaleLinear } from 'd3-scale';

// import Theremin from './Theremin.js';
// // import Meters from './Meters.js';

// import MeterVU from './MeterVU.js';
// import MeterWave from './MeterWave.js';

// export default class AnimationStack extends PureComponent {
//   constructor(props) {
//     super(props)
//     this.state = {
//       wave: 'M 0 30 L 100 30',
//       opacity: 1,
//       rotation: -48,
//       peak: 0
//     };
//     this.analyser = props.analyser;
//     this.needleScale = scaleLinear()
//       .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
//       .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
//     this.waveScaleCurve = line().curve(curveLinear);
//     this.fftSize = this.analyser.fftSize;
//     this.data = new Float32Array(this.fftSize);
//     this.dataCurve = new Array(this.fftSize);
//     this.getData = this.getData.bind(this);
// // this.videoStream = props.videoStream.bind(this);
// // this.audioRefresh = props.audioRefresh.bind(this);
// // this.audioMute = props.audioMute.bind(this);

//   };

//   getData() {
//     const { analyser, needleScale, waveScaleCurve, fftSize, data, dataCurve } = this;
//     analyser.getFloatTimeDomainData(data);
//     let dataSum = 0;
//     for (let i = 0; i < fftSize; i++) {
//       const d = data[i];
//       dataSum += Math.pow(d, 2);
//       dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 50) + 30];
//     };
//     const dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
//     const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);

//     const wave = waveScaleCurve(dataCurve);
//     // const opacity = 1;
//     const rotation = this.state.rotation * (5 / 6) + (needleScale(rms) / 6);
//     const peak = dataRms > 15 ? new Date() : this.state.peak;
//     // console.log(dataRms)
//     // if (this.state.rotation !== rotation) console.log('no rotation change')
//     this.setState(prevState => ({ wave, rotation, peak }));
//     // console.log(rotation)
//     // this.setState(prevState => ({ wave, rotation, peak }));
//   };




//   render() {
//     const { videoStream, audioRefresh, audioMute } = this.props;
//     const { wave, opacity, rotation, peak } = this.state;
//     return (
//       <React.Fragment>
//         <Theremin videoStream={videoStream} refresh={audioRefresh} mute={audioMute} animFrame={this.getData} />
//         <div className="meters outer">
//           <MeterWave wave={wave} opacity={opacity} />
//           <MeterVU rotation={rotation} peak={(new Date() - peak) < 1000} />
//         </div>
//       </React.Fragment>
//     );
//   };
// };





