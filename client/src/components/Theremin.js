import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import './_css/Theremin.css';
import help from './_help.js';
import Tracker from './_tracker3.js';
import { ColorSwatch, BigKnob, ScreenFrame } from './_svg.js';

export default class Theremin extends PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      video: false,
      vW: 0,
      vH: 0,
      colorGain: '#FF0000',
      colorFreq: '#00FF00',
      paramSense: 30,
      paramRange: 4,
      calib: false,
    };
    this.trackerHandleData = this.trackerHandleData.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.colors = {
      gain: {id: 'colorGain', text: 'GAIN'},
      freq: {id: 'colorFreq', text: 'PITCH'}
    };
    this.params = {
      sense: {id: 'paramSense', max: 442, min: 0, text: 'SENSITIVITY'},
      range: {id: 'paramRange', max: 6, min: 2, text: 'RANGE'}
    };
    this.tracker = undefined;
    this.canvas = undefined;
  };

  componentDidMount() {
    const colorGain = localStorage.getItem('colorGain');
    const colorFreq = localStorage.getItem('colorFreq');
    if (colorGain && colorFreq) {
      this.setState(prevState => ({ colorGain, colorFreq }));
    };
  };

  componentDidUpdate() {
    if (!this.state.video) {
      this.setState(prevState => ({ video: true }));
      this.videoInit();
    };
  };

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
  };

  trackerInit() {
    const { video, colorGain, colorFreq, paramSense } = this.state;
    this.tracker = new Tracker(this.trackerHandleData, video, colorGain, colorFreq, paramSense, 5);
    this.canvas = this.tracker.init();
    this.tracker.start();
  };

  trackerColorRefresh() {
    const { colorGain, colorFreq } = this.state;
    this.tracker.setColors(colorGain, colorFreq);
  };

  trackerHandleData(data) {
    if (data.length === 2) {
      this.audioRefresh(data);
    } else {
      this.props.mute();
    };
    this.trackerDraw(data);
  };

  trackerDraw(data) {
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
  };

  audioRefresh(data) {
    const { vW, vH, paramRange } = this.state;
    // const level = (vH - data[0].y) / vH;
    // const freq = Math.pow(2, (vW - data[1].x) / (vW / paramRange));
    // this.props.refresh(level, freq);
    const x = (vW - data[1].x) / (vW / paramRange);
    const y = (vH - data[0].y) / vH;
    this.props.refresh(x, y)
  };

  updateColor(target) {
    this.setState(prevState => ({ calib: target }));
    const { ctx, tW, tH, scalar } = this.canvas;
    const { clickBox } = this.refs;
    const getCoords = (e) => {
      clickBox.removeEventListener('click', getCoords);
      ctx.drawImage(this.state.video, 0, 0, tW, tH);
      const rgb = ctx.getImageData(e.offsetX / scalar, e.offsetY / scalar, 1, 1).data;
      const r = ('0' + rgb[0].toString(16)).slice(-2);
      const g = ('0' + rgb[1].toString(16)).slice(-2);
      const b = ('0' + rgb[2].toString(16)).slice(-2);
      const color = `#${r}${g}${b}`;
      localStorage.setItem(target, color);
      this.setState(prevState => ({
        [target]: color,
        calib: false
      }));
      this.trackerColorRefresh();
    };
    if (target) clickBox.addEventListener('click', getCoords);
  };

  updateParam(delta, key) {
    const { id, max, min } = this.params[key];
    const v = this.state[id];
    const newV = v + (delta * max);
    if (newV >= min && newV <= max) {
      if (id === 'paramSense') this.tracker.sensitivity = newV;
      this.setState(prevState => ({ [id]: newV }));
    };
  };

  makeColorBox() {
    const { calib } = this.state;
    return (
      <div className='settings-box'>
        <h4 className='label'>Set Colors</h4>
        {Object.keys(this.colors).map(d => {
          const obj = this.colors[d];
          const id = obj.id;
          const color = this.state[id];
          return (
            <div className='element' key={id}>
              <ColorSwatch
                color={color}
                active={calib === id}
                handleClick={() => this.updateColor(calib ? false : id)}
              />
              <h5 className='label-small'>{obj.text}</h5>
            </div>
          );
        })}
      </div>
    );
  };

  makeControlBox() {
    return (
      <div className='settings-box'>
        {Object.keys(this.params).map(d => {
          const obj = this.params[d];
          const id = obj.id;
          return (
            <div className='element' key={id}>
              <BigKnob
                rotation={help.getParamPct(obj, this.state[id])}
                color='#313638'
                handleClick={(e) => help.handleClickParam(e, d, this.updateParam)}
                handleScroll={(e) => help.handleScrollParam(e, d, this.updateParam)}
              />
              <h5 className='label-small'>{obj.text}</h5>
            </div>
          );
        })}
      </div>
    );
  };


  render() {
    // console.log('Theremin rendered')
    const { vW, vH } = this.state;
    return (
      <div className='theremin'>
        <div className='outer'>
          <div className='video-box outer'>
            <ScreenFrame />
            <div className='inner'>
              <video className='video' ref='video' preload='true' autoPlay loop muted/>
              <svg className='tracker' ref='svgTracker' width={vW} height={vH}/>
              <svg className='click-box' ref='clickBox' width={vW} height={vH}/>
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
  };
};
