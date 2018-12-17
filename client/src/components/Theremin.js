import React, { Component } from 'react';
// import tracking from 'tracking';
import * as d3 from 'd3';
import './_css/Theremin.css';
import help from './_help.js';
import Tracker from './_tracker.js';
import { screenFrame, colorSwatch, bigKnob } from './_svg.js';

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      params: {
        sense: {v: 25, max: 100, min: 0, text: 'SENSITIVITY'},
        range: {v: 4, max: 6, min: 2, text: 'RANGE'},
      },
      video: null,
      vW: 0,
      vH: 0,
      tracker: false,
      canvas: false,
      data: [],
      muted: true,
      colorGain: '#FF0000',
      colorFreq: '#00FF00',
      calib: false,
    };
    this.trackerColorSet = this.trackerColorSet.bind(this);
    this.trackerHandleData = this.trackerHandleData.bind(this);
    this.updateParam = this.updateParam.bind(this);
  }

  componentWillMount() {
    const colorGain = localStorage.getItem('colorGain');
    const colorFreq = localStorage.getItem('colorFreq');
    if (colorGain && colorFreq) {
      this.setState(prevState => ({ colorGain, colorFreq }));
    };
  }

  componentDidMount() {
    this.videoInit();
  }

  componentDidUpdate() {
    const { data, muted } = this.state;
    if (data.length === 2) {
      this.audioRefresh();
      if (muted) this.setState(prevState => ({ muted: false }));
    } else if (!muted) {
      this.setState(prevState => ({ muted: true }));
      this.props.mute();
    };
    this.trackerDraw();
  }

  videoInit() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const { video } = this.refs;
        video.srcObject = stream;
        const vW = video.clientWidth;
        const vH = video.clientHeight;
        this.setState(prevState => ({ video, vW, vH }));
        this.trackerInit();
      });
  }

  trackerInit() {
    const { video, colorGain, colorFreq, params } = this.state;
    const tracker = new Tracker(this.trackerHandleData, video, colorGain, colorFreq, params.sense.v);
    const canvas = tracker.init();
    tracker.start();
    this.setState(prevState => ({ tracker, canvas }));
  }

  trackerColorSet(target) {
    this.setState(prevState => ({ calib: target }));
    const { video, canvas } = this.state;
    const { ctx, tW, tH, scalar } = canvas;
    const { svgTracker } = this.refs;

    const getCoords = (e) => {
      svgTracker.removeEventListener('click', getCoords);

      ctx.drawImage(video, 0, 0, tW, tH);
      const rgb = ctx.getImageData(e.offsetX / scalar, e.offsetY / scalar, 1, 1).data;
      const r = ('0' + rgb[0].toString(16)).slice(-2);
      const g = ('0' + rgb[1].toString(16)).slice(-2);
      const b = ('0' + rgb[2].toString(16)).slice(-2);
      const color = `#${r}${g}${b}`;
      // ctx.clearRect(0, 0, tW, tH);

      localStorage.setItem(target, color);
      this.setState(prevState => ({
        [target]: color,
        calib: false
      }));
      this.trackerColorRefresh();
    };

    svgTracker.addEventListener('click', getCoords);
  }

  trackerColorRefresh() {
    const { tracker, colorGain, colorFreq } = this.state;
    tracker.color1 = colorGain;
    tracker.color2 = colorFreq;
  }

  trackerHandleData(data) {
    this.setState(prevState => ({ data }));
  }

  trackerDraw() {
    const { data } = this.state;
    const { svgTracker } = this.refs;
    const circles = d3.select(svgTracker).selectAll('circle').data(data);
    circles.enter().append('circle');
    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .style('fill', d => d.color)
      .style('opacity', .5)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', '.3%');
    circles.exit().remove();
  }

  updateParam(amt, key) {
    const { params, tracker } = this.state;
    const param = params[key];
    const deltaV = amt * param.max;
    const newV = param.v + deltaV;
    if (newV >= param.min && newV <= param.max) {
      if (key === 'sense') {
        tracker.sense = newV;
      };
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: newV}}
      }));
    };
  }



  audioRefresh() {
    const { data, vW, vH, params } = this.state;
    const level = (vH - data[0].y) / vH;
    const freq = Math.pow(2, (vW - data[1].x) / (vW / params.range.v));
    this.props.refresh(level, freq);
  }




  // trackerInit() {
  //   const tracking = window.tracking;

  //   tracking.ColorTracker.registerColor('Gain', (r, g, b) => {
  //     return help.getColorDist(this.state.colorGain, {r: r, g: g, b: b}) <= this.state.params.sense.v;
  //   });
  //   tracking.ColorTracker.registerColor('Freq', (r, g, b) => {
  //     return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.state.params.sense.v;
  //   });
  //   const colors = new tracking.ColorTracker(['Gain', 'Freq']);

  //   colors.minDimension = 4;
  //   colors.minGroupSize = 1000;

  //   colors.on('track', e => {
  //     this.filterData(e.data);
  //   });

  //   tracking.track('.video', colors);
  // }


  // filterData(raw) {
  //   const dataGain = raw.filter(d => d.color === 'Gain').sort((a, b) => b.height - a.height)[0];
  //   const dataFreq = raw.filter(d => d.color === 'Freq').sort((a, b) => b.width - a.width)[0];
  //   this.setState(prevState => ({ dataGain, dataFreq }));
  // }

  // trackerDraw() {
  //   const node = this.refs.tracker;
  //   const vWidth = this.refs.video.clientWidth;
  //   const vHeight = this.refs.video.clientHeight;
  //   const width = 40;
  //   const height = 30;

  //   const xScale = d3.scaleLinear().domain([0, vWidth]).range([0, width]);
  //   const yScale = d3.scaleLinear().domain([0, vHeight]).range([0, height]);
  //   const colorGain = `rgb(${this.state.colorGain.r}, ${this.state.colorGain.g}, ${this.state.colorGain.b})`;
  //   const colorFreq = `rgb(${this.state.colorFreq.r}, ${this.state.colorFreq.g}, ${this.state.colorFreq.b})`;

  //   const parseData = (d) => {
  //     return ({
  //       cx: width - xScale(d.x + (d.width / 2)),
  //       cy: yScale(d.y + (d.height / 2)),
  //       r: d.color === 'Freq' ? xScale(d.width / 2) : yScale(d.height / 2),
  //       fill: d.color === 'Freq' ? colorFreq : colorGain
  //     });
  //   };
  //   const data = [];
  //   if (this.state.dataGain) data.push(parseData(this.state.dataGain));
  //   if (this.state.dataFreq) data.push(parseData(this.state.dataFreq));

  //   const circles = d3.select(node).selectAll('circle').data(data);
  //   circles.enter().append('circle');
  //   circles
  //     .attr('cx', d => d.cx)
  //     .attr('cy', d => d.cy)
  //     .attr('r', d => d.r)
  //     .style('fill', d => d.fill)
  //     .style('opacity', .5)
  //     .style('stroke', '#FFFFFF')
  //     .style('stroke-width', '.3%');
  //   circles.exit().remove();
  // }

  // trackerDraw() {
  //   const { data } = this.state;
  //   const { canvas } = this.refs;
  //   const ctx = this.refs.canvas.getContext('2d')
  //   ctx.clearRect(0, 0, canvas.width, canvas.height)
  //     ctx.strokeStyle = '#FFFFFF'
  //     data.forEach(d => {
  //       ctx.beginPath();
  //       ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
  //       ctx.fillStyle = d.color;
  //       ctx.fill();
  //       ctx.stroke();
  //     });
  // }





  makeColorBox() {
    const { calib, colorGain, colorFreq } = this.state;
    const components = [
      {color: colorGain, name: 'colorGain', text: 'GAIN'},
      {color: colorFreq, name: 'colorFreq', text: 'PITCH'}
    ];

    const elements = components.map((d, i) => {
      return (
        <div className='element' key={d.name}>
          <svg className={`swatch ${d.name}`} viewBox='0 0 10 10' onClick={() => this.trackerColorSet(d.name)}>
            {colorSwatch(d.color, calib, d.name)}
          </svg>
          <h5 className='label-small'>{d.text}</h5>
        </div>
      );
    });

    return (
      <div className='color-box inner'>
        <div className='settings-box'>
          <h4 className='label'>Set Colors</h4>
          {elements}
        </div>
      </div>
    );
  }

  makeControlBox() {
    const { params } = this.state;

    const elements = Object.keys(params).map((d, i) => {
      return (
        <div className='element' key={i}>
          <svg className='knob' viewBox='0 0 100 100' onMouseDown={(e) => help.handleClickParam(e, d, this.updateParam)} onWheel={(e) => help.handleScrollParam(e, d, this.updateParam)}>
            {bigKnob(help.getParamPct(params[d]), '#313638')}
          </svg>
          <h5 className='label-small'>{params[d].text}</h5>
        </div>
      );
    });

    return (
      <div className='control-box inner'>
        <div className='settings-box'>
          {elements}
        </div>
      </div>
    );
  }

  render() {
    const { vW, vH } = this.state;
    return (
      <div className='theremin'>
        <div className='outer'>

          <div className='video-box outer'>

            <div className='inner'>
              <video className='video' ref='video' preload='true' autoPlay loop muted/>
              <svg className='tracker' ref='svgTracker' width={vW} height={vH}/>
            </div>
          </div>

          {this.makeColorBox()}

          {this.makeControlBox()}

        </div>
      </div>
    );
  }
}

            // <svg className='border' ref='border' viewBox='0 0 40 30'>
            //   {screenFrame(this.state.video)}
            // </svg>

              // <canvas className='canvas' ref='canvas' width={vW} height={vH}/>
              //
