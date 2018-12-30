import React, { PureComponent } from 'react';
import './_css/Meters.css';
import { line, curveLinear } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { MeterWave, MeterVU } from './_svg.js';

export default class Meters extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      wave: 'M 0 30 L 100 30',
      opacity: 1,
      rotation: -48,
      peak: 0
    };
  };

  componentDidMount() {
    this.animate(this.props.analyser);
  };

  animate(analyser) {
    const needleScale = scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
    const waveScaleCurve = line().curve(curveLinear);
    const fftSize = analyser.fftSize;
    const data = new Float32Array(fftSize);
    const dataCurve = new Array(fftSize);
    // let dataRms = -60;
    let dataPeak = 0;

    const parseData = (dataRms) => {
      const waveLength = document.getElementById('wave-path').getTotalLength();
      const rms = dataRms < -60 ? -60 : dataRms;
      const wave = waveScaleCurve(dataCurve);
      const opacity = (100 - Math.sqrt(waveLength)) / 100;
      const rotation = this.state.rotation * (5 / 6) + (needleScale(rms) / 6);
      const peak = (new Date() - dataPeak) < 1000;
      this.setState(prevState => ({ wave, opacity, rotation, peak }));
    };

    const getData = () => {
      requestAnimationFrame(getData);
      analyser.getFloatTimeDomainData(data);
      let dataSum = 0;
      for (let i = 0; i < fftSize; i++) {
        const d = data[i];
        dataSum += Math.pow(d, 2);
        // const x = (i / (fftSize - 1)) * 100;
        // const y = (d * 50) + 30;
        // dataCurve[i] = [x, y];
        dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 50) + 30];
      };
      const dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
      dataPeak = dataRms > 15 ? new Date() : dataPeak;
      parseData(dataRms);
    };

    requestAnimationFrame(getData);
  };


  render() {
    // console.log('Meters rendered')
    const { wave, opacity, rotation, peak } = this.state;
    return (
      <div className="meters outer">
        <MeterWave wave={wave} opacity={opacity} />
        <MeterVU rotation={rotation} peak={peak} />
      </div>
    );
  };
};





// import React, { PureComponent } from 'react';
// import './_css/Meters.css';
// import * as d3 from 'd3';
// import { MeterWave, MeterVU } from './_svg.js';

// export default class Meters extends PureComponent {
//   constructor(props) {
//     super(props)
//     this.state = {
//       wave: 'M 0 30 L 100 30',
//       opacity: 1,
//       rotation: -48,
//       peak: 0
//     };
//     this.analyser = this.props.analyser;
//     this.fftSize = this.analyser.fftSize;
//     this.data = new Float32Array(this.fftSize);
//     this.dataCurve = new Array(this.fftSize);
//     this.dataRms = -60;
//     this.dataPeak = 0;
//     this.needleScale = d3.scaleLinear()
//       .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
//       .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
//     this.waveScaleCurve = d3.line().curve(d3.curveLinear);

//     this.getData = this.getData.bind(this);
//     this.parseData = this.parseData.bind(this);
//   };

//   componentDidMount() {
//     this.getData();
//   };

//   getData() {
//     this.analyser.getFloatTimeDomainData(this.data);
//     let dataSum = 0;
//     for (let i = 0; i < this.fftSize; i++) {
//       const d = this.data[i];
//       dataSum += Math.pow(d, 2);
//       const x = (i / (this.fftSize - 1)) * 100;
//       const y = (d * 50) + 30;
//       this.dataCurve[i] = [x, y];
//     };
//     this.dataRms = 20 * Math.log10(Math.sqrt(dataSum / this.fftSize)) + 20;
//     this.dataPeak = this.dataRms > 15 ? new Date() : this.dataPeak;
//     this.parseData();
//   };

//   parseData() {
//     const { dataCurve, dataRms, dataPeak } = this;
//     const waveLength = document.getElementById('wave-path').getTotalLength();
//     const wave = this.waveScaleCurve(dataCurve);
//     const opacity = (100 - Math.sqrt(waveLength)) / 100;
//     const rms = dataRms < -60 ? -60 : dataRms;
//     const rotation = this.state.rotation * (5 / 6) + (this.needleScale(rms) / 6);
//     const peak = (new Date() - dataPeak) < 1000;
//     this.setState(prevState => ({ wave, opacity, rotation, peak }));
//     requestAnimationFrame(this.getData);
//   };


//   render() {
//     // console.log('Meters rendered')
//     const { wave, opacity, rotation, peak } = this.state;
//     return (
//       <div className='meters outer'>
//         <MeterWave wave={wave} opacity={opacity} />
//         <MeterVU rotation={rotation} peak={peak} />
//       </div>
//     );
//   };
// };



