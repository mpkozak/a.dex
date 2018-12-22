import React, { Component } from 'react';
import './_css/Meters.css';
// import * as d3 from 'd3';
import VU from './_meters/VU.js';
import Wave from './_meters/Wave.js';

export default class Meters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCurve: false,
      dataRms: -60,
      dataPeak: 0,
    };
    this.getData = this.getData.bind(this);
  };

  componentDidMount() {
    requestAnimationFrame(this.getData);
  };

  componentDidUpdate() {
    // console.log('meters updated')
  }

  getData() {
    requestAnimationFrame(this.getData);
    const { analyser } = this.props;
    if (!analyser) return null;
    const fftSize = analyser.fftSize;
    const data = new Float32Array(fftSize);

// d3 scales
    // const waveScaleX = d3.scaleLinear().domain([fftSize - 1, 0]).range([0, 100]);
    // const waveScaleY = d3.scaleLinear().domain([-1, 1]).range([0, 60]);

    const dataCurve = new Array(fftSize);
    let dataSum = 0;
    analyser.getFloatTimeDomainData(data);
    for (let i = 0; i < fftSize; i++) {
      const d = data[i];
      dataSum += Math.pow(d, 2);

// manual calculation
      // dataCurve[i] = [(i / (fftSize - 1)) * 100, (d * 25) + 30];

// manual calculation declared
      const x = (i / (fftSize - 1)) * 100;
      const y = (d * 25) + 30;
      dataCurve[i] = [x, y];

// d3 calculation
      // dataCurve[i] = [waveScaleX(i), waveScaleY(d)];

// d3 calculation declared
      // const x = waveScaleX(i);
      // const y = waveScaleY(d);
      // dataCurve[i] = [x, y];
    };
    const dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
    const dataPeak = dataRms > 15 ? new Date() : this.state.dataPeak;
    this.setState(prevState => ({ dataCurve, dataRms, dataPeak }));
  };


  render() {
    const { dataCurve, dataRms, dataPeak } = this.state;

    return (
      <div className='meters'>
        <div className='meter outer'>
          <Wave curve={dataCurve} />
        </div>
        <div className='meter outer'>
          <VU rms={dataRms} peak={dataPeak} />
        </div>
      </div>
    );
  };
};
