import React, { Component } from 'react';
import * as d3 from 'd3';
import './_css/Theremin.css';
import help from './_help.js';
import Tracker from './_tracker.js';
import { ColorSwatch, BigKnob, screenFrame } from './_svg.js';

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      params: {
        sense: {v: 50, max: 255, min: 0, text: 'SENSITIVITY'},
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

  // trackerDraw() {
  //   const { data } = this.state;
  //   const { svgTracker } = this.refs;
  //   const rects = d3.select(svgTracker).selectAll('rect').data(data);
  //   rects.enter().append('rect');
  //   rects
  //     .attr('x', d => d.rx)
  //     .attr('y', d => d.ry)
  //     .attr('width', d => d.rw)
  //     .attr('height', d => d.rh)
  //     .style('fill', d => d.color)
  //     .style('opacity', .5)
  //     .style('stroke', '#FFFFFF')
  //     .style('stroke-width', '.3%');
  //   rects.exit().remove();
  //   const circles = d3.select(svgTracker).selectAll('circle').data(data);
  //   circles.enter().append('circle');
  //   circles
  //     .attr('cx', d => d.x)
  //     .attr('cy', d => d.y)
  //     .attr('r', d => d.r)
  //     .style('fill', d => d.color)
  //     .style('opacity', .5)
  //     .style('stroke', '#FFFFFF')
  //     .style('stroke-width', '.3%');
  //   circles.exit().remove();
  // }

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



  makeColorBox() {
    const { calib, colorGain, colorFreq } = this.state;
    const components = [
      {color: colorGain, name: 'colorGain', text: 'GAIN'},
      {color: colorFreq, name: 'colorFreq', text: 'PITCH'}
    ];
    const elements = components.map((d, i) => {
      return (
        <div className='element' key={d.name}>
          <ColorSwatch color={d.color} active={calib === d.name} handleClick={() => this.trackerColorSet(d.name)} />
          <h5 className='label-small'>{d.text}</h5>
        </div>
      );
    });
    return (
      <div className='settings-box'>
        <h4 className='label'>Set Colors</h4>
        {elements}
      </div>
    );
  }

  makeControlBox() {
    const { params } = this.state;
    const elements = Object.keys(params).map((d, i) => {
      return (
        <div className='element' key={i}>
        <BigKnob rotation={help.getParamPct(params[d])} color='#313638' handleClick={(e) => help.handleClickParam(e, d, this.updateParam)} handleScroll={(e) => help.handleScrollParam(e, d, this.updateParam)} />
          <h5 className='label-small'>{params[d].text}</h5>
        </div>
      );
    });
    return (
      <div className='settings-box'>
        {elements}
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

          <div className='color-box inner'>
            {this.makeColorBox()}
          </div>
          <div className='control-box inner'>
            {this.makeControlBox()}
          </div>

        </div>
      </div>
    );
  }
}






            // <svg className='border' ref='border' viewBox='0 0 40 30'>
            //   {screenFrame(this.state.video)}
            // </svg>
