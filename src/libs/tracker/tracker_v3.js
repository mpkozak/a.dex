import d3 from '../d3.js';
import { clampRange } from '../parse.js';
import WebWorker from '../WebWorker.js';
import worker from './worker_v3.js';





export default class Tracker {
  constructor({
    video,
    svg,
    sensitivity = 50,
    colors = [],
  } = {}) {
    this._videoElement = video;
    this._svgElement = svg;
    this._sensitivity = sensitivity;
    this._sensitivityRange = [0, 221];
    this._colors = colors;
    this._colorsRGB = [];
    this.scalar = 10;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.canvasElement = undefined;
    this.canvasCtx = undefined;
    this.imageData = undefined;
    this.overlay = undefined;
    this.rAF = undefined;
    this.worker = new WebWorker(worker);
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
    this.imageCapture = null;
  };



/*
    Getters
*/

  get video() {
    if (!this._videoElement) {
      return null;
    };
    return this._videoElement;
  };

  get svg() {
    if (!this._svgElement) {
      return null;
    };
    return this._svgElement;
  };

  get sensitivity() {
    return this._sensitivity;
  };

  get colors() {
    return this._colors;
  };

  get ready() {
    if (this._svgElement && this._videoElement && this.imageCapture) {
      return true;
    };
    return false;
  };

  get active() {
    if (this.rAF) {
      return true;
    };
    return false;
  };



/*
    Setters
*/

  set video(video) {
    this.imageCapture = null;
    if (!video) {
      console.error('TRACKER --- no video element specified');
      return null;
    };
    if (!(video instanceof HTMLElement && video.tagName === 'VIDEO')) {
      console.error('TRACKER --- not a valid video element');
      return null;
    };
    this._videoElement = video;
    this._videoElement.onplay = () => {
      const stream = this._videoElement.captureStream();
      const [track] = stream.getVideoTracks();
      this.imageCapture = new ImageCapture(track);
    };
    this.initCanvas();
  };

  set svg(svg) {
    if (!this._videoElement) {
      console.error('TRACKER --- cannot set svg until video is set');
      return null;
    };
    if (!svg) {
      console.error('TRACKER --- no svg element specified');
      return null;
    };
    if (!(svg instanceof SVGElement && svg.tagName === 'svg')) {
      console.error('TRACKER --- not a valid svg element');
      return null;
    };
    this._svgElement = svg;
    this.initOverlay();
  };

  set sensitivity(val) {
    this._sensitivity = Math.round(clampRange(val, this._sensitivityRange));
    this.configWorker();
  };

  set colors(hex) {
    const colors = [];
    if (typeof hex === 'string') {
      colors.push(hex);
    };
    if (Array.isArray(hex)) {
      colors.push(...hex);
    };
    const hexValidator = new RegExp(/^#([A-Fa-f0-9]{6})$/g);
    const validHex = colors.filter(a => a.match(hexValidator));
    if (!validHex.length) {
      console.error('TRACKER --- invalid hex color format');
      return null;
    };
    this._colors = validHex;
    this._colorsRGB = this._colors.map(d => this.hexToRgb(d));
    this.configWorker();
  };



/*
    Initializers
*/

  initCanvas() {
    this.canvasWidth = this.scaleDown(this._videoElement.clientWidth);
    this.canvasHeight = this.scaleDown(this._videoElement.clientHeight);
    this.canvasElement = new OffscreenCanvas(this.canvasWidth, this.canvasHeight);
    this.canvasCtx = this.canvasElement.getContext('2d', { alpha: false });
    return;
  };

  initOverlay() {
    this.overlay = d3.select(this._svgElement)
      .attr('width', this.canvasWidth)
      .attr('height', this.canvasHeight)
      .attr('viewBox', `0 0 ${this.canvasWidth} ${this.canvasHeight}`);
    return;
  };



/*
  Worker
*/

  configWorker() {
    const init = {
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      colors: this._colors,
      colorsRGB: this._colorsRGB,
      sensitivity: this._sensitivity,
    };
    this.worker.postMessage({ init });
  };

  handleWorkerMessage(msg) {
    if (!this.active) {
      return null;
    };
    this.runtimeIn(msg.data);
  };



/*
  Runtime invocation
*/

  async runtime() {
    const imageBitmap = await this.imageCapture.grabFrame();
    this.worker.postMessage({ imageBitmap }, [imageBitmap]);
  };

  runtimeIn(data) {
    this.drawOverlay(data);
    this.rAF = requestAnimationFrame(this.runtime.bind(this));
  };

  start() {
    if (!this.ready) {
      console.error('TRACKER --- cannot start before initialization');
      return null;
    };
    this.rAF = requestAnimationFrame(this.runtime.bind(this));
  };

  stop() {
    cancelAnimationFrame(this.rAF);
    this.rAF = undefined;
    this.clearOverlay();
  };

  toggle() {
    if (!this.rAF) {
      return this.start();
    };
    return this.stop();
  };



/*
  Runtime methods
*/

  drawOverlay(data) {
    const circles = this.overlay
      .selectAll('circle')
      .data(data.filter(a => !!a));
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

  clearOverlay() {
    this.overlay
      .selectAll('circle')
      .remove();
  };



/*
    Calibration Helpers
*/

  getPointColor(x, y) {
    this.canvasCtx.drawImage(this._videoElement, 0, 0, this.canvasWidth, this.canvasHeight);
    const { data } = this.canvasCtx.getImageData(this.scaleDown(x), this.scaleDown(y), 1, 1);
    const [r, g, b] = data;
    return this.rgbToHex({ r, g, b });
  };



/*
    Parsers + Helpers
*/

  scaleDown(val) {
    return Math.floor(val / this.scalar);
  };

  scaleUp(val) {
    return Math.floor(val * this.scalar);
  };

  hexToRgb(hex) {
    return {
      r: parseInt(hex.substr(1, 2), 16),
      g: parseInt(hex.substr(3, 2), 16),
      b: parseInt(hex.substr(5, 2), 16),
    };
  };

  rgbToHex({r, g, b} = {}) {
    const toDec = hex => (`00${hex.toString(16)}`).slice(-2);
    return `#${toDec(r)}${toDec(g)}${toDec(b)}`;
  };



};
