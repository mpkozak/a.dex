import React, { PureComponent } from 'react';
import { select } from 'd3-selection';
import './_css/Theremin.css';
import help from './_help.js';
import Tracker from './_tracker5.js';
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
      sensitivity: 30,
      range: 4,
      calibTarget: false,
    };
    this.sensitivity = { min: 0, max: 221 };
    this.range = { min: 2, max: 6 };
    this.changeScalar = 1000;
    this.tracker = undefined;
    this.canvas = undefined;
    this.trackerHandleData = this.trackerHandleData.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.getCoords = this.getCoords.bind(this);
  };

  componentDidMount() {
    const colorGain = localStorage.getItem('colorGain');
    const colorFreq = localStorage.getItem('colorFreq');
    if (colorGain && colorFreq) this.setState(prevState => ({ colorGain, colorFreq }));
    this.videoInit();
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
    const { video, colorGain, colorFreq, sensitivity } = this.state;
    this.tracker = new Tracker(this.trackerHandleData, video, colorGain, colorFreq, sensitivity, 5);
    this.canvas = this.tracker.init();
    this.tracker.start();
  };

  trackerHandleData(data) {
    this.trackerDraw(data);
    if (data.length === 2) {
      this.audioRefresh(data);
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

  getCoords(e) {
    const { calibTarget } = this.state;
    const { ctx, tW, tH, scalar } = this.canvas;
    this.refs.clickBox.removeEventListener('click', this.getCoords);
    ctx.drawImage(this.state.video, 0, 0, tW, tH);
    const rgb = ctx.getImageData(e.offsetX / scalar, e.offsetY / scalar, 1, 1).data;
    const r = ('0' + rgb[0].toString(16)).slice(-2);
    const g = ('0' + rgb[1].toString(16)).slice(-2);
    const b = ('0' + rgb[2].toString(16)).slice(-2);
    const color = `#${r}${g}${b}`;
    localStorage.setItem(calibTarget, color);
    this.setState(prevState => ({
      [calibTarget]: color,
      calibTarget: false
    }));
    this.trackerColorRefresh();
  };

  updateColor(calibTarget) {
    this.setState(prevState => ({ calibTarget }));
    this.refs.clickBox.addEventListener('click', this.getCoords);
  };

  updateParam(delta, param) {
    const { min, max } = this[param];
    const val = help.getLevel(this.state[param], delta, min, max);
    if (val) {
      if (param === 'sensitivity') this.tracker.sensitivity = val;
      this.setState(prevState => ({ [param]: val }));
    };
  };

  audioRefresh(data) {
    const { vW, vH, range } = this.state;
    const x = (vW - data[1].x) / (vW / range);
    const y = (vH - data[0].y) / vH;
    this.props.refresh(x, y);
  };

  makeColorSwatch(color, text) {
    const { calibTarget } = this.state;
    return(
      <div className='element'>
        <ColorSwatch
          color={this.state[color]}
          active={calibTarget === color}
          handleClick={() => this.updateColor(calibTarget ? false : color)}
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
          color='#313638'
          handleClick={(e) => help.handleClick(e, this.updateParam, changeScalar, param)}
          handleScroll={(e) => help.handleScroll(e, this.updateParam, changeScalar * 5, param)}
        />
        <h5 className='label-small'>{param.toUpperCase()}</h5>
      </div>
    );
  };


  render() {
    // console.log('Theremin rendered')
    const { vW, vH } = this.state;
    return (
      <div className="theremin outer">
        <div className="video-box outer">
          <div className="video-layers">
            <ScreenFrame />
            <video className="video-0 video-element" ref="video" preload="true" autoPlay loop muted />
            <svg className="video-1 video-element" ref="svgTracker" width={vW} height={vH} />
            <svg className="video-2 video-element" ref="clickBox" width={vW} height={vH} />
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

            // {this.tracker &&
            //   <React.Fragment>
            //     <button onClick={() => this.tracker.stop()}>stop</button>
            //     <button onClick={() => this.tracker.start()}>start</button>
            //   </React.Fragment>
            // }
            //
