import React, { PureComponent } from 'react';
import './_css/Meters.css';
import { d3 } from '../_d3';
// import MeterVU from './MeterVU.js'
// import MeterWave from './MeterWave.js'
import { MeterWave, MeterVU } from '../_svg.js';

export default class Meters extends PureComponent {
  constructor(props) {
    super(props);
    this.audio = props.audio;
    this.fftSize = props.audio._analyser.fftSize;
    this.waveData = props.audio._waveData;
    this.xScalar = (100 / (props.audio.fftSize - 1));
    this.needleScale = d3.scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48])
      .clamp(true);
    this.waveScaleCurve = d3.line().curve(d3.curveLinear);
    this.getData = this.getData.bind(this);
  };

  componentDidMount() {
    this.waveNode = d3.select('#wave-node');
    this.rotatorNode1 = d3.select('#rotator-node1');
    this.rotatorNode2 = d3.select('#rotator-node2');
    this.peakNode1 = d3.select('#peak-node1');
    this.peakNode2 = d3.select('#peak-node2');
    this.peakNode3 = d3.select('#peak-node3');
    this.props.passback(this.getData);
  };

  getData() {
    const { audio, waveData, needleScale, waveScaleCurve, fftSize, xScalar } = this;
    audio.waveData();
    const dataCurve = [];
    let dataSum = 0;
    for (let i = 0; i < fftSize; i++) {
      const d = waveData[i];
      dataSum += (d ** 2);
      dataCurve.push([(i * xScalar), (d * 50) + 30]);
    };
    this.drawWave(waveScaleCurve(dataCurve));
    this.drawNeedle(needleScale(20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20));
    const now = new Date() * .001;
    this.drawPeak(this.peak = (this.peak > now) ? this.peak : (dataSum > 14 && now + 1));
  };

  drawWave(wave) {
    this.waveNode.attr('d', wave);
  };

  drawNeedle(rotation) {
    this.rotatorNode1.attr('transform', `translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)`);
    this.rotatorNode2.attr('transform', `rotate(${rotation}, 50, 57)`);
  };

  drawPeak(peak) {
    if (peak) {
      this.peakNode1.attr('opacity', .5);
      this.peakNode2.attr('fill', '#FF452F');
      this.peakNode3.attr('opacity', 1);
    } else {
      this.peakNode1.attr('opacity', 1);
      this.peakNode2.attr('fill', '#AB2D1E');
      this.peakNode3.attr('opacity', 0);
    };
  };


  render() {
    return (
      <div id="MetersMobile" className="outer">
        <MeterWave />
        <MeterVU  />
      </div>
    );
  };
};


// import React, { PureComponent } from 'react';
// import './_css/Meters.css';
// import { d3 } from '../_d3.js';
// // import { MeterWave, MeterVU } from '../_svg.js';
// import MeterVU from './MeterVU.js'
// import MeterWave from './MeterWave.js'

// export default class Meters extends PureComponent {
//   constructor(props) {
//     super(props)
//     this.state = {
//       wave: 'M 0 30 L 100 30',
//       rotation: -48,
//       peak: 0
//     };
//     this.audio = props.audio;
//     // this.analyser = props.audio._analyser;
//     this.waveData = props.audio._waveData;
//     this.needleScale = d3.scaleLinear()
//       .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
//       .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48])
//       .clamp(true);
//     this.waveScaleCurve = d3.line().curve(d3.curveLinear);
//     this.fftSize = props.audio._analyser.fftSize;
//     this.dataCurve = new Array(this.fftSize);
//     this.xScalar = (100 / (this.fftSize - 1));
//     this.getData = this.getData.bind(this);


//     // this.waveNode = null;
//   };

//   componentDidMount() {
//     this.props.passback(this.getData);
//     this.waveNode = d3.select('#d3-meter-wave');
//     this.vuNode1 = d3.select('#d3-meter-vu1');
//     this.vuNode2 = d3.select('#d3-meter-vu2');
//     // console.log('in meters', this.analyser)
//   };


//   // getData() {
//   //   // console.time('getData')
//   //   const { analyser, needleScale, waveScaleCurve, fftSize } = this;
//   //   let dataSum = 0;
//   //   // const data = this.props.audio.waveData;
//   //   // for (let i = 0; i < fftSize; i++) {
//   //   //   const d = data[i];
//   //   //   dataSum += Math.pow(d, 2);
//   //   //   dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 50) + 30];
//   //   // };

//   //   const dataCurve = this.props.audio.waveData.map((d, i) => {
//   //     dataSum += Math.pow(d, 2);
//   //     return [(i / (fftSize - 1)) * 100, (d * 50) + 30];
//   //   });
//   //   const dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
//   //   const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);

//   //   const wave = waveScaleCurve(dataCurve);
//   //   const rotation = this.state.rotation * (5 / 6) + (needleScale(rms) / 6);
//   //   const peak = dataRms > 15 ? new Date() : this.state.peak;
//   //   this.setState(prevState => ({ wave, rotation, peak }));
//   //   // console.timeEnd('getData')
//   // };

//   // getData() {
//   //   // console.time('getData')
//   //   const { analyser, needleScale, waveScaleCurve, fftSize, dataCurve } = this;
//   //   let dataSum = 0;
//   //   const data = this.props.audio.waveData;
//   //   for (let i = 0; i < fftSize; i++) {
//   //     const d = data[i];
//   //     dataSum += Math.pow(d, 2);
//   //     dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 50) + 30];
//   //   };
//   //   const dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
//   //   const rms = dataRms < -60 ? -60 : (dataRms > 20 ? 20 : dataRms);

//   //   const wave = waveScaleCurve(dataCurve);
//   //   const rotation = this.state.rotation * (5 / 6) + (needleScale(rms) / 6);
//   //   const peak = dataRms > 15 ? new Date() : this.state.peak;
//   //   this.setState(prevState => ({ wave, rotation, peak }));
//   //   // console.timeEnd('getData')
//   // };

//   // getData() {
//   //   // console.time('getData')
//   //   const { audio, needleScale, waveScaleCurve } = this;
//   //   const { fftSize } = audio;
//   //   const dataCurve = [];
//   //   audio.waveData();

//   //   const xScalar = (100 / (fftSize - 1));
//   //   let dataSum = 0;
//   //   for (let i = 0; i < fftSize; i++) {
//   //     const d = audio._waveData[i];
//   //     dataSum += (d ** 2);
//   //     // dataCurve.push([(i / (fftSize - 1)) * 100, (d * 50) + 30]);
//   //     dataCurve.push([(i * xScalar), (d * 50) + 30]);
//   //   };
//   //   const wave = waveScaleCurve(dataCurve);
//   //   const rotation = needleScale(20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20)
//   //   const peak = rotation > 35 ? new Date() : this.state.peak;
//   //   this.setState(prevState => ({ wave, rotation, peak }));
//   //   // console.timeEnd('getData')
//   // };


//   getData() {
//     // console.time('getData')
//     const { audio, waveData, needleScale, waveScaleCurve, fftSize, xScalar } = this;
//     // const { fftSize } = audio;
//     const dataCurve = [];
//     audio.waveData();

//     // const xScalar = (100 / (fftSize - 1));
//     let dataSum = 0;
//     for (let i = 0; i < fftSize; i++) {
//       // const d = audio._waveData[i];
//       const d = waveData[i];
//       dataSum += (d ** 2);
//       dataCurve.push([(i * xScalar), (d * 50) + 30]);
//       // dataCurve[i] = [(i * xScalar), (d * 50) + 30];
//     };
//     // const wave = waveScaleCurve(dataCurve);
//     const rotation = needleScale(20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20);
//     // console.log(dataSum, rotation)
//     // const peak = rotation > 35 ? new Date() : this.state.peak;
//     // const peak = dataSum > 35 ? new Date() : this.state.peak;
//     // this.setState(prevState => ({ wave, rotation, peak }));
//     // console.log(this.waveNode)
//     this.waveNode && this.waveNode.attr('d', waveScaleCurve(dataCurve));
//     this.vuNode1 && this.vuNode1.attr('transform', `translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)`)
//     this.vuNode2 && this.vuNode2.attr('transform', `rotate(${rotation}, 50, 57)`)


//     // transform={`rotate(${rotation}, 50, 57)`}
//     // this.setState({
//     //   // wave: waveScaleCurve(dataCurve),
//     //   rotation: needleScale(20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20),
//     //   peak: dataSum > 12 ? new Date() : this.state.peak
//     // })
//     // console.timeEnd('getData')
//   };
//       // <MeterWave wave={wave} />

//         // <MeterVU rotation={rotation} peak={(new Date() - peak) < 1000} />
//         // <MeterWave wave={wave} />
//         // <MeterVU rotation={rotation} peak={(new Date() - peak) < 1000} />

//         // <MeterVU rotation={rotation} peak={(new Date() - peak) < 1000} />

//   render() {
//     // const { wave, rotation, peak } = this.state;
//     return (
//       <div id="MetersMobile" className="outer">
//         <MeterWave />
//         <MeterVU />
//       </div>
//     );
//   };
// };
