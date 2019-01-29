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
      vW: 640,
      vH: 480,
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
      this.canvasInit();
      this.videoInit();

    };
  };

  componentDidUpdate() {
    if (this.refs.video) this.refs.video.play();
  };


  // componentDidUpdate() {
  //   const { video, videoCanvas, svgTracker, clickBox } = this.refs;
  //   console.log('client', videoCanvas.clientWidth, svgTracker.clientWidth, clickBox.clientWidth)
  //   if (video) console.log('video', video.width, 'canvas', videoCanvas.width, 'svg', svgTracker.width, 'clickbox', clickBox.width)
  // }

  audioRefresh(x, y) {
    const { vW, vH, range } = this.state;
    const posX = (vW - x) * (range / vW);
    const posY = (vH - y) / vH;
    this.props.refresh(posX, posY);
  };

  videoInit() {
    this.refs.video = document.createElement('video');
    const { vW, vH } = this.state;
    this.refs.video.width = vW;
    this.refs.video.height = vH;
    this.refs.video.srcObject = this.props.videoStream;
    this.refs.video.classList.add("video-x");
    // video.classList.add("video-element");
    this.refs.video.preload = true;
    this.refs.video.loop = true;
    this.refs.video.muted = true;
    this.refs.video.playsInline = true;
    this.refs.video.play();
    this.trackerInit();
  };


  canvasInit() {
    const { videoCanvas } = this.refs;
    // const vW = videoCanvas.clientWidth;
    // const vH = videoCanvas.clientHeight;
    videoCanvas.width = 640;
    videoCanvas.height = 480;
    // videoCanvas.width = vW;
    // videoCanvas.height = vH;
    // const drawCtx = videoCanvas.getContext('2d');
    // this.setState(prevState => ({ vW, vH }));
  };

  trackerInit() {
    const { colorGain, colorFreq, sensitivity } = this.state;
    this.tracker = new Tracker(this.trackerHandleData, this.refs.video, colorGain, colorFreq, sensitivity, 5);
    this.canvas = this.tracker.init();
    this.tracker.start();
  };

  trackerHandleData(data) {
    this.props.animFrame();
    this.canvasDraw();
    this.trackerDraw(data);
    if (data.length === 2) {
      this.audioRefresh(data[1].x, data[0].y);
    } else {
      this.props.mute();
    };
  };

  canvasDraw() {
    const { vW, vH } = this.state;
    // this.refs.video.play();
    const drawCtx = this.refs.videoCanvas.getContext('2d');
    drawCtx.drawImage(this.refs.video, 0, 0, vW, vH);
  };

  trackerDraw(data) {
    const circles = select(this.refs.svgTracker).selectAll('circle')
      .data(data);
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
    console.log(e)
    const { calibTarget, vW, vH } = this.state;
    const { clickBox, videoCanvas } = this.refs;
    // const { ctx, tW, tH, scalar } = this.canvas;
    clickBox.removeEventListener('click', this.trackerGetCoords);
    // ctx.drawImage(videoCanvas, 0, 0, tW, tH);
    // const rgb = ctx.getImageData(e.offsetX / scalar, e.offsetY / scalar, 1, 1).data;

    const drawCtx = this.refs.videoCanvas.getContext('2d')
    const hitSpotX = vW - Math.floor(e.layerX * (vW / videoCanvas.clientWidth));
    const hitSpotY = Math.floor(e.layerY * (vH / videoCanvas.clientHeight))
    const rgb = drawCtx.getImageData(hitSpotX, hitSpotY, 1, 1).data;
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
    console.log('in theremin', this.props.width, this.props.height)
    // console.log(vW, vH)
    // const { videoCanvas } = this.refs;
    // // if (videoCanvas) console.log(videoCanvas.clientWidth)
    // const noClick = calibTarget
    //   ? {}
    //   : {pointerEvents: 'none'};
    return (
      <div className="theremin outer">
        <div className="video-box outer">
          <div className="video-layers">
            <ScreenFrame />
{/*
            <video className="video-0 video-element" ref="video" playsInline autoplay />
*/}
            <canvas className="video-0 video-element" ref="videoCanvas" width={vW} height={vH} />
            <svg className="video-1 video-element" ref="svgTracker" viewBox={`0 0 ${vW} ${vH}`} />
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
