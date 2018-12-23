
export default class Tracker {
  constructor(callback, video, color1, color2, sensitivity, reducer) {
    this.callback = callback;
    this.video = video;
    this.vWidth = video.clientWidth;
    this.vHeight = video.clientHeight;
    this.color1 = color1;
    this.color2 = color2;
    this.c1 = this.hexToRgb(color1);
    this.c2 = this.hexToRgb(color2);
    this.sensitivity = sensitivity ? sensitivity : 50;
    this.reducer = reducer ? reducer : 10;
    this.tracker = undefined;
    this.tWidth = Math.floor(this.vWidth / this.reducer);
    this.tHeight = Math.floor(this.vHeight / this.reducer);
    this.tCtx = undefined;
    this.scalar = this.vWidth / this.tWidth;
    this.thresh = this.sensitivity / Math.sqrt(Math.pow(this.tWidth, 2) + Math.pow(this.tHeight, 2));
    this.rAF = undefined;
  };
  setColors(color1, color2) {
    this.color1 = color1;
    this.color2 = color2;
    this.c1 = this.hexToRgb(color1);
    this.c2 = this.hexToRgb(color2);
  };
  init() {
    this.tracker = document.createElement('canvas');
    this.tracker.width = this.tWidth;
    this.tracker.height = this.tHeight;
    this.tCtx = this.tracker.getContext('2d');
    return {ctx: this.tCtx, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar};
  };
  start() {
    this.rAF = requestAnimationFrame(this.masterStack.bind(this));
    return true;
  };
  stop() {
    cancelAnimationFrame(this.rAF);
    return false;
  };
  masterStack() {
    this.getData()
      .then(res => this.filterData(res))
      .then(res => this.reduceData(res))
      .then(res => this.callback(res))
      .then(res => {
        this.rAF = requestAnimationFrame(this.masterStack.bind(this));
      });
  };
  async getData() {
    const { tWidth, tHeight, tCtx, video } = this;
    tCtx.drawImage(video, 0, 0, tWidth, tHeight);
    const data = tCtx.getImageData(0, 0, tWidth, tHeight);
    return data.data;
  };
  filterData(data) {
    const { sensitivity, color1, color2, c1, c2, tWidth, tHeight, thresh } = this;
    const queue = [];
    const area1 = [];
    const area2 = [];
    for (let y = 0; y < tHeight; ++y) {
      for (let x = 0; x < tWidth; ++x) {
        let i = (y * tWidth + x) * 4;
        const r = data[i];
        const g = data[++i];
        const b = data[++i];
        const dist1 = this.getColorDist({r, g, b}, c1);
        const dist2 = this.getColorDist({r, g, b}, c2);
        if (dist1 <= sensitivity) area1.push({x, y, dist: dist1});
        if (dist2 <= sensitivity) area2.push({x, y, dist: dist2});
      };
    };
    if (area1.length > thresh) {
      queue.push({data: area1, color: color1});
    };
    if (area2.length > thresh) {
      queue.push({data: area2, color: color2});
    };
    return queue.length ? queue : [];
  };
  reduceData(data) {
    const queue = [];
    data.forEach(d => {
      const { scalar } = this;
      const data = d.data;
      const color = d.color;
      const length = data.length;
      let sumX = 0;
      let sumY = 0;
      let denom = 0;
      for (let i = 0; i < length; i++) {
        const dataX = data[i].x;
        const dataY = data[i].y;
        const dataDist = data[i].dist;
        const multi = 1 / (dataDist + 1);
        denom += multi;
        sumX += dataX * multi;
        sumY += dataY * multi;
      };
      const x = sumX / denom * scalar;
      const y = sumY / denom * scalar;
      const r = Math.sqrt(length) * scalar;
      queue.push({x, y, r, color});
    });
    return queue;
  };
  hexToRgb(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return {r, g, b};
  };
  getColorDist(c1, c2) {
    return Math.sqrt(
      Math.pow((c1.r - c2.r), 2) +
      Math.pow((c1.g - c2.g), 2) +
      Math.pow((c1.b - c2.b), 2)
    );
  };
  _devStart(handleResult, iterations) {
    this.handleResult = handleResult;
    this.endIter = iterations;
    this.px = 0;
    this.iter = 0;
    this.runtime = 0;
    this.begin = 0;
    this.rAF = requestAnimationFrame(this._devStack.bind(this));
  };
  _devStack() {
    this.begin = new Date();
    this.getData()
      .then(res => this.filterData(res))
      .then(res => {
        res.forEach(d => this.px += d.data.length);
        return this.reduceData(res);
      })
      .then(res => {
        const err = {'': 'finished...'}
        this.callback(res);
        this.iter++;
        this.runtime += new Date() - this.begin;
        if (this.iter >= this.endIter) throw err;
        this.rAF = requestAnimationFrame(this._devStack.bind(this));
      })
      .catch(err => {
        this.stop();
        console.log(err);
        const results = {
          '': this.__proto__.constructor.name + ' _r' + this.reducer + ' _s' + this.sensitivity + ' _i' + this.iter,
          'ms / cycle': this.runtime / this.iter,
          '% duty cycle': ((this.runtime / (this.iter * (1000 / 60))) * 100).toFixed(2),
          '% pixels matched': ((this.px / (this.tWidth * this.tHeight * this.iter * 2)) * 100).toFixed(2),
          'ms runtime (active / total)': this.runtime + ' / ' + Math.round(this.iter * (1000 / 60)),
          'pixels / ms (actual / scaled)': Math.round(this.px / this.runtime) + ' / ' + Math.round(Math.pow(this.reducer, 2) * (this.px / this.runtime)),
          'pixels processed': this.px,
        };
        this.handleResult(results);
      });
  };
};
