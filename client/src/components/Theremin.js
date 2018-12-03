import React, { Component } from 'react';
import tracking from 'tracking';
import * as d3 from 'd3';
import './_css/Theremin.css';
import help from './_help.js';
import { screenFrame, bigKnob, colorSwatch } from './_svg.js';

export default class Theremin extends Component {
    constructor(props) {
    super(props)
    this.state = {
      video: false,
      calib: false,
      colorGain: {r: null, g: null, b: null},
      colorFreq: {r: null, g: null, b: null},
      params: {
        sense: {v: 50, max: 100, min: 0, text: 'SENSITIVITY'},
        range: {v: 4, max: 6, min: 2, text: 'RANGE'},
      },
      dataGain: false,
      dataFreq: false,
    };
    this.handleClickColor = this.handleClickColor.bind(this);
    this.updateParam = this.updateParam.bind(this);
  }

  componentDidMount() {
    const colorGain = JSON.parse(localStorage.getItem('colorGain'));
    const colorFreq = JSON.parse(localStorage.getItem('colorFreq'));
    if (colorGain && colorFreq) {
      this.setState(prevState => ({ colorGain, colorFreq }));
    };
    this.videoInit();
    this.trackerInit();
  }

  componentDidUpdate() {
    this.trackerDraw();
    if (this.state.dataGain && this.state.dataFreq) {
      this.audioRefresh();
    } else {
      this.props.mute();
    };
  }

  videoInit() {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(stream => {
        const { video } = this.refs;
        const { canvas } = this.refs;
        video.srcObject = stream;
        this.setState(prevState => ({ video: true }));
        const width = video.clientWidth;
        const height = video.clientHeight;
        canvas.width = width;
        canvas.height = height;
      });
  }

  trackerInit() {
    const tracking = window.tracking;

    tracking.ColorTracker.registerColor('Gain', (r, g, b) => {
      return help.getColorDist(this.state.colorGain, {r: r, g: g, b: b}) <= this.state.params.sense.v;
    });
    tracking.ColorTracker.registerColor('Freq', (r, g, b) => {
      return help.getColorDist(this.state.colorFreq, {r: r, g: g, b: b}) <= this.state.params.sense.v;
    });
    const colors = new tracking.ColorTracker(['Gain', 'Freq']);

    colors.minDimension = 4;
    colors.minGroupSize = 1000;

    colors.on('track', e => {
      this.filterData(e.data);
    });

    tracking.track('.video', colors);
  }

  filterData(raw) {
    const dataGain = raw.filter(d => d.color === 'Gain').sort((a, b) => b.height - a.height)[0];
    const dataFreq = raw.filter(d => d.color === 'Freq').sort((a, b) => b.width - a.width)[0];
    this.setState(prevState => ({ dataGain, dataFreq }));
  }

  trackerDraw() {
    const node = this.refs.tracker;
    const vWidth = this.refs.video.clientWidth;
    const vHeight = this.refs.video.clientHeight;
    const width = 40;
    const height = 30;

    const xScale = d3.scaleLinear().domain([0, vWidth]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, vHeight]).range([0, height]);
    const colorGain = `rgb(${this.state.colorGain.r}, ${this.state.colorGain.g}, ${this.state.colorGain.b})`;
    const colorFreq = `rgb(${this.state.colorFreq.r}, ${this.state.colorFreq.g}, ${this.state.colorFreq.b})`;

    const parseData = (d) => {
      return ({
        cx: width - xScale(d.x + (d.width / 2)),
        cy: yScale(d.y + (d.height / 2)),
        r: d.color === 'Freq' ? xScale(d.width / 2) : yScale(d.height / 2),
        fill: d.color === 'Freq' ? colorFreq : colorGain
      });
    };

    const data = [];
    if (this.state.dataGain) data.push(parseData(this.state.dataGain));
    if (this.state.dataFreq) data.push(parseData(this.state.dataFreq));

    const circles = d3.select(node).selectAll('circle').data(data);
    circles.enter().append('circle');
    circles
      .attr('cx', d => d.cx)
      .attr('cy', d => d.cy)
      .attr('r', d => d.r)
      .style('fill', d => d.fill)
      .style('opacity', .5)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', '.3%');
    circles.exit().remove();
  }

  handleClickColor(target) {
    const frame = this.refs.canvas;
    this.setState(prevState => ({ calib: target }))

    const getCoords = (e) => {
      frame.removeEventListener('click', getCoords);

      const width = this.refs.canvas.width;
      const height = this.refs.canvas.height;
      const canvasCtx = this.refs.canvas.getContext('2d');

      canvasCtx.drawImage(this.refs.video, 0, 0, width, height);
      const colorRaw = canvasCtx.getImageData(width - e.offsetX, e.offsetY, 1, 1).data;
      const color = {r: colorRaw[0], g: colorRaw[1], b: colorRaw[2]};
      canvasCtx.clearRect(0, 0, width, height);

      localStorage.setItem(target, JSON.stringify(color));
      this.setState(prevState => ({
        [target]: color,
        calib: false
      }));
    };
    frame.addEventListener('click', getCoords);
  }

  updateParam(amt, key) {
    const prev = this.state.params[key];
    const delta = amt * prev.max;
    const current = prev.v + delta;
    if (current >= prev.min && current <= prev.max) {
      this.setState(prevState => ({
        params: {...prevState.params, [key]: {...prevState.params[key], v: current}}
      }));
    };
  }

  audioRefresh() {
    const { dataGain } = this.state;
    const { dataFreq } = this.state;
    const width = this.refs.video.clientWidth;
    const height = this.refs.video.clientHeight;

    const x = dataFreq.x + (dataFreq.width / 2);
    const y = dataGain.y + (dataGain.height / 2);
    const freq = Math.pow(2, (width - x)/(width / this.state.params.range.v));
    const level = (height - y) / height;
    this.props.refresh(level, freq);
  }

  makeControlBox() {
    const { params } = this.state;

    const components = Object.keys(params).map((d, i) => {
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
      <div className='settings-box'>
        {components}
      </div>
    );
  }

  render() {
    const { calib } = this.state;
    const { colorGain } = this.state;
    const { colorFreq } = this.state;
    const colorG = `rgb(${colorGain.r}, ${colorGain.g}, ${colorGain.b})`;
    const colorF = `rgb(${colorFreq.r}, ${colorFreq.g}, ${colorFreq.b})`;

    return (
      <div className='Theremin'>

        <div className='video-box outer'>
          <svg className='border' ref='border' viewBox='0 0 40 30'>
            {screenFrame(this.state.video)}
          </svg>
          <div className='inner'>
            <video className='video' ref='video' preload='true' autoPlay loop muted/>
            <svg className='tracker' ref='tracker' viewBox='0 0 40 30'/>
            <canvas className='canvas' ref='canvas'/>
          </div>
        </div>

        <div className='color-box inner'>
          <div className='settings-box'>
          <h4 className='label'>Set Colors</h4>
            <div className='element'>
              <svg className='swatch colorGain' viewBox='0 0 10 10' onClick={() => this.handleClickColor('colorGain')}>
                {colorSwatch(colorG, calib, 'colorGain')}
              </svg>
              <h5 className='label-small'>GAIN</h5>
            </div>
            <div className='element'>
              <svg className='swatch colorFreq' viewBox='0 0 10 10' onClick={() => this.handleClickColor('colorFreq')}>
                {colorSwatch(colorF, calib, 'colorFreq')}
              </svg>
              <h5 className='label-small'>PITCH</h5>
            </div>
          </div>
        </div>

        <div className='control-box inner'>
          {this.makeControlBox()}
        </div>

      </div>
    );
  }
}
