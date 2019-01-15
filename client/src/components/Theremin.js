import React, { PureComponent } from 'react';
import { select } from 'd3-selection';
import './_css/Theremin.css';
import help from './_help.js';
import Tracker from './_tracker.js';
import { ColorSwatch, BigKnob, ScreenFrame } from './_svg.js';

export default class Theremin extends PureComponent {
    constructor(props) {
    super(props)
    this.state = {
      vW: 0,
      vH: 0,
      colorGain: '#FF0000',
      colorFreq: '#00FF00',
      sensitivity: 30,
      range: 4,
      calibTarget: false,
    };
    this.sensitivity = { min: 0, max: 221 };
    this.range = { min: 2, max: 6 };
    this.changeScalar = 1000;
    this.tracker = undefined;
    this.canvas = undefined;
    this.videoInit = this.videoInit.bind(this);
    this.trackerColorRefresh = this.trackerColorRefresh.bind(this);
    this.trackerHandleData = this.trackerHandleData.bind(this);
    this.trackerGetCoords = this.trackerGetCoords.bind(this);
    this.handleParam = this.handleParam.bind(this);
  };

  componentDidMount() {
    const colorGain = localStorage.getItem('colorGain');
    const colorFreq = localStorage.getItem('colorFreq');
    if (colorGain && colorFreq) {
      this.setState(prevState => ({ colorGain, colorFreq }), this.videoInit);
    } else {
      this.videoInit();
    };
  };

  audioRefresh(x, y) {
    const { vW, vH, range } = this.state;
    const posX = (vW - x) * (range / vW);
    const posY = (vH - y) / vH;
    this.props.refresh(posX, posY);
  };

  videoInit() {
    const { video } = this.refs;
    video.srcObject = this.props.videoStream;
    const vW = video.clientWidth;
    const vH = video.clientHeight;
    this.setState(prevState => ({ vW, vH }));
    this.trackerInit();
  };

  trackerInit() {
    const { colorGain, colorFreq, sensitivity } = this.state;
    this.tracker = new Tracker(this.trackerHandleData, this.refs.video, colorGain, colorFreq, sensitivity, 5);
    this.canvas = this.tracker.init();
    this.tracker.start();
  };

  trackerHandleData(data) {
    this.props.animFrame();
    this.trackerDraw(data);
    if (data.length === 2) {
      this.audioRefresh(data[1].x, data[0].y);
    } else {
      this.props.mute();
    };
  };

  trackerDraw(data) {
    const circles = select(this.refs.svgTracker).selectAll('circle')
      .data(data)
    circles
      .enter()
      .append('circle');
    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .style('fill', d => d.color)
      .style('opacity', .5)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', '.3%');
    circles
      .exit()
      .remove();
  };

  trackerColorRefresh() {
    const { colorGain, colorFreq } = this.state;
    this.tracker.setColors(colorGain, colorFreq);
  };

  trackerGetCoords(e) {
    const { calibTarget } = this.state;
    const { clickBox, video } = this.refs;
    const { ctx, tW, tH, scalar } = this.canvas;
    clickBox.removeEventListener('click', this.trackerGetCoords);
    ctx.drawImage(video, 0, 0, tW, tH);
    const rgb = ctx.getImageData(e.offsetX / scalar, e.offsetY / scalar, 1, 1).data;
    const decTo2Hex = (dec) => ('0' + dec.toString(16)).slice(-2);
    const color = `#${decTo2Hex(rgb[0])}${decTo2Hex(rgb[1])}${decTo2Hex(rgb[2])}`;
    localStorage.setItem(calibTarget, color);
    this.setState(prevState => ({
      [calibTarget]: color,
      calibTarget: false
    }), this.trackerColorRefresh);
  };

  handleColor(calibTarget) {
    this.setState(prevState => ({ calibTarget }));
    this.refs.clickBox.addEventListener('click', this.trackerGetCoords);
  };

  handleParam(delta, param) {
    const { min, max } = this[param];
    const val = help.getLevel(this.state[param], delta, min, max);
    if (val) {
      if (param === 'sensitivity') this.tracker.sensitivity = val;
      this.setState(prevState => ({ [param]: val }));
    };
  };

  makeColorSwatch(color, text) {
    const { calibTarget } = this.state;
    return(
      <div className='element'>
        <ColorSwatch
          color={this.state[color]}
          active={calibTarget === color}
          handleClick={() => this.handleColor(calibTarget ? false : color)}
        />
        <h5 className='label-small'>{text}</h5>
      </div>
    );
  };

  makeControlKnob(param) {
    const { changeScalar } = this;
    const { min, max } = this[param];
    const pct = help.getPercent(this.state[param], min, max);
    return (
      <div className='element'>
        <BigKnob
          rotation={pct}
          color='#1F2224'
          handleClick={(e) => help.handleClick(e, this.handleParam, changeScalar, param)}
          handleScroll={(e) => help.handleScroll(e, this.handleParam, changeScalar * 5, param)}
        />
        <h5 className='label-small'>{param.toUpperCase()}</h5>
      </div>
    );
  };


  render() {
    const { vW, vH, calibTarget } = this.state;
    return (
      <div className="theremin outer">
        <div className="video-box outer">
          <div className="video-layers">
            <ScreenFrame />
            <video className="video-0 video-element" ref="video" preload="true" autoPlay loop muted />
            <svg className="video-1 video-element" ref="svgTracker" width={vW} height={vH} />
            {calibTarget &&
              <div className="video-2 video-element">
                <h2 className="osd">Calibrating...</h2>
              </div>
            }
            <div className="video-3 video-element" ref="clickBox" width={vW} height={vH} />
          </div>
        </div>
        <div className="settings-box outer">
          <div className="color-box inner">
            <h4 className="label">Set Colors</h4>
            {this.makeColorSwatch('colorGain', 'GAIN')}
            {this.makeColorSwatch('colorFreq', 'PITCH')}
          </div>
          <div className="control-box inner">
            {this.makeControlKnob('sensitivity')}
            {this.makeControlKnob('range')}
          </div>
        </div>
      </div>
    );
  };
};
