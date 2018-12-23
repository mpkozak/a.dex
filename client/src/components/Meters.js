import React, { Component } from 'react';
import './_css/Meters.css';
import * as d3 from 'd3';
import { MeterWave, MeterVU } from './_svg.js';

export default class Meters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      haveNodes: false,
      active: false,
      waveNode1: null,
      vuNode1: null,
      vuNode2: null,
      vuNode3: null
    };
  };

  componentDidUpdate() {
    console.log('Meters Updated');
    if (!this.state.haveNodes) {
      const waveNode1 = document.getElementById('meter-wave-node1');
      const vuNode1 = document.getElementById('meter-vu-node1');
      const vuNode2 = document.getElementById('meter-vu-node2');
      const vuNode3 = document.getElementById('meter-vu-node3');
      this.setState(prevState => ({ haveNodes: true, waveNode1, vuNode1, vuNode2, vuNode3 }));
    } else if (!this.state.active) {
      console.log('raf activated')
      this.animate(this.props.analyser);
      this.setState(prevState => ({ active: true }));
    };
  };

  animate(analyser) {
    const { waveNode1, vuNode1, vuNode2, vuNode3 } = this.state;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const needleScale = d3.scaleLinear().domain(vu).range(deg);
    const waveScaleCurve = d3.line().curve(d3.curveLinear);

    let dataCurve = false;
    let dataRms = -60;
    let dataPeak = 0;

    let wave = 'M 0 30 L 60 30 Z';
    let opacity = 1;
    let rotation = -48;
    let peak = false;

    const refreshWave = () => {
      waveNode1.innerHTML = `
          <path
            d='${wave}'
            opacity='${opacity}'
            fill='none'
            stroke='#A0FFA0'
            stroke-width='.15%'
          />
        `
    };

    const refreshVu = () => {
      vuNode1.innerHTML = `
          <circle fill='url(#vu-led-shadow)' opacity=${peak ? .5 : 1} cx='88.5' cy='24.9' r='2.2' />
          <circle fill='url(#vu-led-border)' cx='87.95' cy='24.57' r='2.1' />
          <circle fill=${peak ? '#FF452F' : '#AB2D1E'} cx='88' cy='24.6' r='1.875' />
          <circle fill='url(#vu-led-contour)' cx='88' cy='24.6' r='1.875' />
          <circle fill='url(#vu-led-glare)' cx='88' cy='24.6' r='1.875' />
          <circle fill='url(#vu-led-halo)' opacity=${peak ? 1 : 0} cx='88' cy='24.6' r='4' />
        `
      vuNode2.innerHTML = `
          <g transform='translate(${rotation * 0.01}, ${rotation * 0.012 + 1.2}) rotate(${rotation}, 50, 57)'>
            <rect fill='url(#vu-needle-shadow)' x='50' y='13.2' width='0.4' height='48.18' />
          </g>
        `
      vuNode3.innerHTML = `
          <g transform='rotate(${rotation}, 50, 57)'>
            <rect x='50' y='12' width='0.2' height='45' fill='#000000' />
            <rect x='46.5' y='54.3' rx='0.2' width='7' height='1.8' fill='#333333' stroke='#000000' stroke-width='.1%' />
            <rect fill='url(#vu-coil-shadow)' x='46.5' y='54.3' rx='0.2' width='7' height='1.8' />
            <rect fill='url(#vu-coil-wire)' x='47' y='54' rx='0.5' width='6' height='2.4' stroke='#000000' stroke-width='.2%' />
            <rect fill='url(#vu-coil-shadow)' x='47' y='54' rx='0.5' width='6' height='2.44' />
          </g>
        `
    };

    const parseData = () => {
      const curvePath = d3.select('.invisible').append('path').attr('d', wave).remove();
      const curveNode = curvePath.node();
      const curvePathLength = curveNode.getTotalLength();
      opacity = (100 - Math.sqrt(curvePathLength)) / 100;
      wave = waveScaleCurve(dataCurve);

      dataRms = dataRms < -60 ? -60 : dataRms;
      rotation = rotation * (5/6) + (needleScale(dataRms) / 6);
      peak = (new Date() - dataPeak) < 1000;
    }

    // const handleWave = () => {
    //   const curvePath = d3.select('.invisible').append('path').attr('d', wave).remove();
    //   const curveNode = curvePath.node();
    //   const curvePathLength = curveNode.getTotalLength();
    //   opacity = (100 - Math.sqrt(curvePathLength)) / 100;
    //   wave = waveScaleCurve(dataCurve);
    //   refreshWave();
    // };

    // const handleVu = () => {
    //   dataRms = dataRms < -60 ? -60 : dataRms;
    //   rotation = rotation * (5/6) + (needleScale(dataRms) / 6);
    //   peak = (new Date() - dataPeak) < 1000;
    //   refreshVu();
    // };

    const getData = () => {
      requestAnimationFrame(getData);
      const fftSize = analyser.fftSize;
      const data = new Float32Array(fftSize);
      dataCurve = new Array(fftSize);
      let dataSum = 0;
      analyser.getFloatTimeDomainData(data);
      for (let i = 0; i < fftSize; i++) {
        const d = data[i];
        dataSum += Math.pow(d, 2);
        const x = (i / (fftSize - 1)) * 100;
        const y = (d * 25) + 30;
        dataCurve[i] = [x, y];
      };
      dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
      dataPeak = dataRms > 15 ? new Date() : dataPeak;
      parseData();
      // handleWave();
      // handleVu();
    };

    requestAnimationFrame(getData);
  };

  render() {
    return (
      <div className='meters outer'>
        <MeterWave />
        <MeterVU />
      </div>
    );
  };
};


// export default function Meters(props) {
//   const { analyser } = props;
//   let dataCurve = false;
//   let dataRms = -60;
//   let dataPeak = 0;

//   let rotation = -48
//   let peak = false


//   const handleVu = () => {
//     dataRms = dataRms < -60 ? -60 : dataRms;
//     const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
//     const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
//     const needleScale = d3.scaleLinear().domain(vu).range(deg);
//     rotation = needleScale(dataRms);
//     peak = (new Date() - dataPeak) < 1000;
//     refreshVu(rotation);
//     // console.log(rotation, peak)
//   };

//   const refreshVu = (rotation) => {
//     let needleShadow = document.getElementById('meter-vu-needleshadow-rotator');
//     let needle = document.getElementById('meter-vu-needle-rotator');
//     needle.transform=`rotate(${rotation}, 50, 57)`
//   // console.log(needleShadow, needle)
//   }


//   const getData = () => {
//     requestAnimationFrame(getData);
//     if (!analyser) return null;
//     const fftSize = analyser.fftSize;
//     const data = new Float32Array(fftSize);
//     dataCurve = new Array(fftSize);
//     let dataSum = 0;
//     analyser.getFloatTimeDomainData(data);
//     for (let i = 0; i < fftSize; i++) {
//       const d = data[i];
//       dataSum += Math.pow(d, 2);
//       const x = (i / (fftSize - 1)) * 100;
//       const y = (d * 25) + 30;
//       dataCurve[i] = [x, y];
//     };
//     dataRms = 20 * Math.log10(Math.sqrt(dataSum / fftSize)) + 20;
//     dataPeak = dataRms > 15 ? new Date() : dataPeak;

//     handleVu()
//     // console.log(dataCurve, dataRms, dataPeak)
//   };


//   requestAnimationFrame(getData);

//     // const { dataCurve, dataRms, dataPeak } = this;

// };
