// import React from 'react';
// import * as d3 from 'd3';
// import { MeterVU } from '../_svg.js';

// export default function VU(props) {
//   const { rms, peak } = props;

//   const getRotation = (rms) => {
//     rms = rms === -Infinity ? -60 : rms;
//     const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
//     const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
//     const needleScale = d3.scaleLinear().domain(vu).range(deg);
//     const rotation = needleScale(rms);
//     return rotation;
//   };

//   const isPeak = (new Date() - peak) < 1000;

//   return (
//     <MeterVU rotation={getRotation(rms)} peak={isPeak} />
//   );
// };



    // <div className='inner'>
    //   <MeterVU rotation={getRotation(rms)} peak={isPeak} />
    // </div>


import React, { Component } from 'react';
import * as d3 from 'd3';
import { MeterVU } from '../_svg.js';

export default class VU extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     rotation: -60,
  //     peak:

  //   }
  // }
  // const { rms, peak } = props;
  constructor(props) {
    super(props)
    this.count = 0;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { rms } = this.props;
  //   const delta = Math.abs(rms - nextProps.rms);
  //   if (nextProps.rms < -60 || delta < .5) {
  //     return false
  //   } else {
  //     return true
  //   }
  // };

  componentDidUpdate() {
    this.count += 1;
  }

  getRotation(rms) {
    rms = rms === -Infinity ? -60 : rms;
    const vu = [-60, -20, -10, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 20];
    const deg = [-48, -40, -26, -15, -10.5, -5, -0.5, 5, 10, 15, 20, 25, 30, 35, 48];
    const needleScale = d3.scaleLinear().domain(vu).range(deg);
    const rotation = needleScale(rms);
    return rotation;
  };

  getPeak(peak) {
    return (new Date() - peak) < 1000
  }

  render() {
    console.log('VU rendered', this.count)
    const { rms, peak } = this.props;
    return (
      <MeterVU rotation={this.getRotation(rms)} peak={this.getPeak(peak)} />
    );
  };
};
