
export default class Tracker {
  constructor(callback, video, color1, color2, sense, reducer) {
    this.callback = callback;
    this.video = video;
    this.vWidth = video.clientWidth;
    this.vHeight = video.clientHeight;
    this.reducer = reducer ? reducer : 10;
    this.tWidth = Math.floor(this.vWidth / this.reducer);
    this.tHeight = Math.floor(this.vHeight / this.reducer);
    this.hyp = Math.sqrt(Math.pow(this.tWidth, 2) + Math.pow(this.tHeight, 2));
    this.scalar = this.vWidth / this.tWidth;
    this.color1 = color1;
    this.color2 = color2;
    this.sense = sense ? sense : 50;
    this.tracker = null;
    this.t = null;
    this.rAF = null;
  };
  init() {
    this.tracker = document.createElement('canvas');
    this.t = this.tracker.getContext('2d');
    this.tracker.width = this.tWidth;
    this.tracker.height = this.tHeight;
    return {ctx: this.t, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar};
  };
  start() {
    this.rAF = requestAnimationFrame(this.getData.bind(this));
  };
  stop() {
    cancelAnimationFrame(this.rAF);
  };
  getData() {
    this.rAF = requestAnimationFrame(this.getData.bind(this));
    const { tWidth, tHeight, t, video } = this;
    t.clearRect(0, 0, tWidth, tHeight);
    t.drawImage(video, 0, 0, tWidth, tHeight);
    const data = t.getImageData(0, 0, tWidth, tHeight);
    this.filterData(data.data);
  };
  filterData(data) {
    const length = data.length;
    const { sense, color1, color2, tWidth, hyp } = this;
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);
    const area1 = [];
    const area2 = [];
    for (let i = 0; i < length; i += 4) {
      const scale = i / 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const dist1 = this.getColorDist({r, g, b}, c1);
      const dist2 = this.getColorDist({r, g, b}, c2);
      if (dist1 <= sense) {
        const dist = dist1;
        const x = scale % tWidth;
        const y = Math.floor(scale / tWidth);
        area1.push({x, y, dist});
      };
      if (dist2 <= sense) {
        const dist = dist2;
        const x = scale % tWidth;
        const y = Math.floor(scale / tWidth);
        area2.push({x, y, dist});
      };
    };
    const limit = sense / hyp;
    const queue = [];
    if (area1.length > limit) {
      queue.push({data: area1, color: color1});
    };
    if (area2.length > limit) {
      queue.push({data: area2, color: color2});
    };
    if (queue.length) {
      this.reduceData(queue);
    } else {
      this.callback([]);
    };
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
    this.callback(queue);
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
};
