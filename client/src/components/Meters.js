import React, { PureComponent } from 'react';
import './_css/Meters.css';
import * as d3 from 'd3';
import { MeterWave, MeterVU } from './_svg.js';

export default class Meters extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      waveNode1: null,
      vuNode1: null,
      vuNode2: null,
      vuNode3: null
    };
  };

  componentDidMount() {
    const waveNode1 = document.getElementById('meter-wave-node1');
    const vuNode1 = document.getElementById('meter-vu-node1');
    const vuNode2 = document.getElementById('meter-vu-node2');
    const vuNode3 = document.getElementById('meter-vu-node3');
    this.setState(prevState => ({ waveNode1, vuNode1, vuNode2, vuNode3 }));
  };

  componentDidUpdate() {
    if (!this.state.active) {
      this.animate(this.props.analyser);
      this.setState(prevState => ({ active: true }));
    };
  };

  animate(analyser) {
    const { waveNode1, vuNode1, vuNode2, vuNode3 } = this.state;
    const needleScale = d3.scaleLinear()
      .domain([-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20])
      .range([-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48]);
    const waveScaleCurve = d3.line().curve(d3.curveLinear);

    const fftSize = analyser.fftSize;
    const data = new Float32Array(fftSize);
    const dataCurve = new Array(fftSize);
    let dataRms = -60;
    let dataPeak = 0;

    let wave = 'M 0 30 L 100 30';
    let opacity = 1;
    let rotation = -48;
    let peak = false;

    const drawData = () => {
      waveNode1.innerHTML =
        `<path
          id='meter-vu-node1-path'
          d='${wave}'
          opacity='${opacity}'
          fill='none'
          stroke='#A0FFA0'
          stroke-width='.15%'
        />`
      vuNode1.innerHTML =
        `<circle fill='url(#vu-led-shadow)' opacity=${peak ? .5 : 1} cx='88.5' cy='24.9' r='2.2' />
        <circle fill='url(#vu-led-border)' cx='87.95' cy='24.57' r='2.1' />
        <circle fill=${peak ? '#FF452F' : '#AB2D1E'} cx='88' cy='24.6' r='1.875' />
        <circle fill='url(#vu-led-contour)' cx='88' cy='24.6' r='1.875' />
        <circle fill='url(#vu-led-glare)' cx='88' cy='24.6' r='1.875' />
        <circle fill='url(#vu-led-halo)' opacity=${peak ? 1 : 0} cx='88' cy='24.6' r='4' />`
      vuNode2.innerHTML =
        `<g transform='translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)'>
          <rect fill='url(#vu-needle-shadow)' x='50' y='13.2' width='0.4' height='48.18' />
        </g>`
      vuNode3.innerHTML =
        `<g transform='rotate(${rotation}, 50, 57)'>
          <rect x='50' y='12' width='0.2' height='45' fill='#000000' />
          <rect x='46.5' y='54.3' rx='0.2' width='7' height='1.8' fill='#333333' stroke='#000000' stroke-width='.1%' />
          <rect fill='url(#vu-coil-shadow)' x='46.5' y='54.3' rx='0.2' width='7' height='1.8' />
          <rect fill='url(#vu-coil-wire)' x='47' y='54' rx='0.5' width='6' height='2.4' stroke='#000000' stroke-width='.2%' />
          <rect fill='url(#vu-coil-shadow)' x='47' y='54' rx='0.5' width='6' height='2.44' />
        </g>`
    };
    drawData();

    const parseData = () => {
      const waveLength = waveNode1.firstChild.getTotalLength();
      const rms = dataRms < -60 ? -60 : dataRms;
      wave = waveScaleCurve(dataCurve);
      opacity = (100 - Math.sqrt(waveLength)) / 100;
      rotation = rotation * (5/6) + (needleScale(rms) / 6);
      peak = (new Date() - dataPeak) < 1000;
      drawData();
    };

    const getData = () => {
      requestAnimationFrame(getData);
      analyser.getFloatTimeDomainData(data);
      let dataSum = 0;
      for (let i = 0; i < fftSize; i++) {
        const d = data[i];
        dataSum += Math.pow(d, 2);
        const x = (i / (fftSize - 1)) * 100;
        const y = (d * 50) + 30;
        dataCurve[i] = [x, y];
      };
      dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
      dataPeak = dataRms > 15 ? new Date() : dataPeak;
      parseData();
    };

    requestAnimationFrame(getData);
  };


  render() {
    // console.log('Meters rendered')
    return (
      <div className='meters outer'>
        <MeterWave />
        <MeterVU />
      </div>
    );
  };
};
