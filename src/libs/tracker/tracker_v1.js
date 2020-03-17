import d3 from '../d3.js';
import { clampRange } from '../parse.js';





export default class Tracker {
  constructor({
    callback = null,
    sensitivity = 0,
    sensitivityRange = [],
  } = {}) {
    this._cb = callback;
    this._sensitivity = sensitivity;
    this._sensitivityRange = sensitivityRange;
    this._videoElement = undefined;
    this._svgElement = undefined;
    this._colors = [];
    this._colorsRGB = [];
    this.scalar = 10;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.canvasElement = undefined;
    this.canvasCtx = undefined;
    this.imageData = undefined;
    this.overlay = undefined;
    this.queue = [];
    this.rAF = undefined;
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
    if (this._svgElement && this._videoElement) {
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
    if (!video) {
      console.error('TRACKER --- no video element specified');
      return null;
    };
    if (!(video instanceof HTMLElement && video.tagName === 'VIDEO')) {
      console.error('TRACKER --- not a valid video element');
      return null;
    };
    this._videoElement = video;
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
    this.queue = this._colors.map(() => []);
  };



/*
    Initializers
*/

  initCanvas() {
    this.canvasWidth = this.scaleDown(this._videoElement.clientWidth);
    this.canvasHeight = this.scaleDown(this._videoElement.clientHeight);
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.width = this.canvasWidth;
    this.canvasElement.height = this.canvasHeight;
    this.canvasCtx = this.canvasElement.getContext('2d');
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
  Runtime invocation
*/

  runtime() {
    this.queue.forEach(d => d = []);
    this.getData();
    this.parseData();
    const data = this.reduceData().filter(a => !!a);
    this.renderAudio(data);
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

  getData() {
    this.canvasCtx.drawImage(this._videoElement, 0, 0, this.canvasWidth, this.canvasHeight);
    this.imageData = this.canvasCtx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    return;
  };

  renderAudio(data) {
    if (data.length < 2) {
      return this._cb(null);
    };
    const x = (this.canvasWidth - data[1].x) / this.canvasWidth;
    const y = (this.canvasHeight - data[0].y) / this.canvasHeight;
    return this._cb({ x, y });
  };

  parseData() {
    const { data } = this.imageData;
    for (let y = 0; y < this.canvasHeight; ++y) {
      for (let x = 0; x < this.canvasWidth; ++x) {
        let p = (y * this.canvasWidth + x) * 4;
        const r = data[p];
        const g = data[++p];
        const b = data[++p];
        this._colorsRGB.forEach((d, i) => {
          const dist = this.getColorDist(r, g, b, d);
          if (dist <= this._sensitivity) {
            this.queue[i].push({ x, y, dist });
          };
        });
      };
    };
    return;
  };

  reduceData() {
    return this.queue.map((data, i) => {
      if (!data.length) {
        return null;
      };
      const r = Math.sqrt(data.length);
      let sumX = 0,
          sumY = 0,
          denom = 0;
      while (data.length) {
        const { x, y, dist } = data.pop();
        const multi = 1 / (dist + 1);
        denom += multi;
        sumX += x * multi;
        sumY += y * multi;
      };
      return {
        color: this._colors[i],
        x: (sumX / denom),
        y: (sumY / denom),
        r,
      };
    });
  };

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

  getColorDist(r, g, b, c2) {
    return Math.sqrt(
      Math.pow((r - c2.r), 2) +
      Math.pow((g - c2.g), 2) +
      Math.pow((b - c2.b), 2)
    );
  };



};
