import d3 from '../d3.js';
import WebWorker from '../WebWorker.js';
import worker from './worker_v3.js';





export default class Tracker {
  constructor({
    scalar = 10,
    callback = null,
    sensitivity = 0,
    colors = [],
  } = {}) {
    this._scalar = scalar;
    this._cb = callback;
    this._sensitivity = sensitivity;
    this._colors = colors.map(d => this.validateHex(d)).filter(a => !!a);
    this._videoElement = undefined;
    this._imageCapture = null;
    this._svgElement = undefined;
    this._width = 0;
    this._height = 0;
    this._canvas = undefined;
    this._ctx = undefined;
    this._overlay = undefined;
    this._rAF = undefined;
    this.runtime = this.runtime.bind(this);
    this.worker = new WebWorker(worker);
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
  };



/*
    Getters
*/

  get ready() {
    if (!this._svgElement || !this._videoElement || !this._imageCapture) {
      return false;
    };
    return true;
  };

  get active() {
    if (this._rAF) {
      return true;
    };
    return false;
  };



/*
    Setters
*/

  set sensitivity(val) {
    const newVal = Math.round(val);
    if (newVal === this._sensitivity) {
      return null;
    };
    this._sensitivity = newVal;
    this.workerSetSensitivity();
  };

  set colors(hexColors) {
    this._colors = hexColors
      .map(d => this.validateHex(d))
      .filter(a => !!a);
    this.workerSetColors();
  };

  set video(video) {
    this._imageCapture = null;
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
      this._imageCapture = new ImageCapture(track);
    };
    this.initialize();
  };

  set svg(svg) {
    if (!svg) {
      console.error('TRACKER --- no svg element specified');
      return null;
    };
    if (!(svg instanceof SVGElement && svg.tagName === 'svg')) {
      console.error('TRACKER --- not a valid svg element');
      return null;
    };
    this._svgElement = svg;
    this.initialize();
  };



/*
    Initializers
*/

  initialize() {
    if (!this._videoElement || !this._svgElement) {
      return null;
    };
    this._width = this.scaleDown(this._videoElement.clientWidth);
    this._height = this.scaleDown(this._videoElement.clientHeight);
    this.initCanvas();
    this.initOverlay();
    this.initWorker();
    return;
  };

  initCanvas() {
    this._canvas = new OffscreenCanvas(this._width, this._height);
    this._ctx = this._canvas.getContext('2d', { alpha: false });
    return;
  };

  initOverlay() {
    this._overlay = d3.select(this._svgElement)
      .attr('width', this._width)
      .attr('height', this._height)
      .attr('viewBox', `0 0 ${this._width} ${this._height}`);
    return;
  };

  initWorker() {
    this.workerSetCanvas();
    this.workerSetColors();
    this.workerSetSensitivity();
    return;
  };



/*
  Worker
*/

  workerSetCanvas() {
    return this.worker.postMessage({
      canvas: {
        width: this._width,
        height: this._height,
      },
    });
  };

  workerSetColors() {
    return this.worker.postMessage({ colors: [...this._colors] });
  };

  workerSetSensitivity() {
    return this.worker.postMessage({ sensitivity: this._sensitivity });
  };

  handleWorkerMessage(msg) {
    if (!this.active) {
      return null;
    };
    return this.runtimeIn(msg.data);
  };



/*
  Runtime invocation
*/

  async runtime() {
    const imageBitmap = await this._imageCapture.grabFrame();
    this.worker.postMessage({ imageBitmap }, [imageBitmap]);
  };

  runtimeIn(data) {
    const { draw, audio } = data;
    this.drawOverlay(draw);
    this._cb(audio);
    this._rAF = requestAnimationFrame(this.runtime);
  };

  start() {
    if (!this.ready) {
      console.error('TRACKER --- cannot start before initialization');
      return null;
    };
    this._rAF = requestAnimationFrame(this.runtime);
  };

  stop() {
    cancelAnimationFrame(this._rAF);
    this._rAF = undefined;
    this._cb(null);
    this.clearOverlay();
  };

  toggle() {
    if (!this._rAF) {
      return this.start();
    };
    return this.stop();
  };



/*
    Draw stack
*/

  drawOverlay(data) {
    const circles = this._overlay
      .selectAll('circle')
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

  clearOverlay() {
    this._overlay
      .selectAll('circle')
      .remove();
  };



/*
    Color calibration
*/

  getPointColor(x, y) {
    this._ctx.drawImage(this._videoElement, 0, 0, this._width, this._height);
    const { data } = this._ctx.getImageData(this.scaleDown(x), this.scaleDown(y), 1, 1);
    const [r, g, b] = data;
    return this.rgbToHex({ r, g, b });
  };



/*
    Scalars + Parsers
*/

  scaleDown(val = 0) {
    return Math.floor(val / this._scalar);
  };

  validateHex(hex = '') {
    const hexValidator = new RegExp(/^#([A-Fa-f0-9]{6})$/g);
    if (!hex.match(hexValidator)) {
      return null;
    };
    return hex;
  };

  rgbToHex({r, g, b} = {}) {
    const toDec = hex => (`00${hex.toString(16)}`).slice(-2);
    return `#${toDec(r)}${toDec(g)}${toDec(b)}`;
  };
};
