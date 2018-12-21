import React, { Component } from 'react';
import * as d3 from 'd3';
import './_css/Meters.css';
import { MeterWave, MeterVU } from './_svg.js';

export default class Meters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wave: 'M 0 30 L 100 30',
      peak: false,
      rotation: -48,
      opacity: 1,
    };
  }

  componentDidMount() {
    const { data, fftSize } = this.props;
    this.parseData(data, fftSize);
  }

  componentDidUpdate() {

  }

  parseData(data, fftSize) {

    const extent = d3.extent(data);
    const waveScaleX = d3.scaleLinear().domain([0, data.length - 1]).range([0, 100]);
    const waveScaleY = d3.scaleLinear().domain([extent[0] - .1, extent[1] + .1]).range([5, 55]);
    const dataCurve = [];
    let dataSum = 0;
    let dataMax = 0;


    for (let i = 0; i < fftSize; i++) {
      const d = data[i];
      dataMax = d > dataMax ? d : dataMax;
      dataCurve.push([waveScaleX(i), waveScaleY(d)]);
      dataSum += Math.pow(d, 2);
    };
    // peak = dataMax > .5 ? true : false;
    const dataVU = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
    this.getWave(dataCurve);
    this.getVU(dataVU);
  }


  getWave(dataCurve) {
    const waveScaleCurve = d3.line().curve(d3.curveLinear);
    // const curvePath = d3.select('.invisible').append('path').attr('d', waveScaleCurve(dataCurve)).remove();
    // const curveNode = curvePath.node();
    // const curvePathLength = curveNode.getTotalLength();
    // opacity = (100 - Math.sqrt(curvePathLength)) / 100;
    const wave = waveScaleCurve(dataCurve);
    this.setState(prevState => ({ wave }));
  };

  getVU(rmsVU) {
    const rms = rmsVU === -Infinity ? -60 : rmsVU;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const vuScaleRotation = d3.scaleLinear().domain(vu).range(deg);
    const rotation = vuScaleRotation(rms);

    let peak
    const now = new Date();
    if (rmsVU > 10) {
      peak = now + 1000;
    } else if (peak < now) {
      peak = false;
    };
    this.setState(prevState => ({ rotation, peak }));
  };





  render() {
    const { data, fftSize } = this.props;
    this.parseData(data, fftSize);

    const { wave, opacity, rotation, peak } = this.state;
    return (
      <div className='meters'>
        <div className='meter outer'>
          <div className='inner'>
            <MeterWave wave={wave} opacity={opacity} />
          </div>
        </div>
        <div className='meter outer'>
          <div className='inner'>
            <MeterVU rotation={rotation} peak={peak} />
          </div>
        </div>
      </div>
    );
  }
};
