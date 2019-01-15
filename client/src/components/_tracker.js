export default class Tracker {
  constructor(callback, video, color1, color2, sensitivity = 50, reducer = 10) {
    this.callback = callback;
    this.video = video;
    this.vWidth = video.clientWidth;
    this.vHeight = video.clientHeight;
    this.color1 = color1;
    this.color2 = color2;
    this.c1 = this.hexToRgb(color1);
    this.c2 = this.hexToRgb(color2);
    this.sensitivity = sensitivity;
    this.reducer = reducer;
    this.tracker = undefined;
    this.tWidth = Math.floor(this.vWidth / this.reducer);
    this.tHeight = Math.floor(this.vHeight / this.reducer);
    this.tCtx = undefined;
    this.scalar = this.vWidth / this.tWidth;
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
    return { ctx: this.tCtx, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar };
  };
  start() {
    this.rAF = requestAnimationFrame(this.masterStack.bind(this));
  };
  stop() {
    cancelAnimationFrame(this.rAF);
    this.callback([]);
  };
  async masterStack() {
    const data = await this.getData();
    const filtered = await this.filterData(data);
    const reduced = await this.reduceData(filtered);
    this.callback(reduced);
    this.rAF = requestAnimationFrame(this.masterStack.bind(this));
  };
  async getData() {
    const { tWidth, tHeight, tCtx, video } = this;
    tCtx.drawImage(video, 0, 0, tWidth, tHeight);
    return tCtx.getImageData(0, 0, tWidth, tHeight).data;
  };
  async filterData(data) {
    const { sensitivity, color1, color2, c1, c2, tWidth, tHeight } = this;
    const queue = [];
    const area1 = [];
    const area2 = [];
    for (let y = 0; y < tHeight; ++y) {
      for (let x = 0; x < tWidth; ++x) {
        let i = (y * tWidth + x) * 4;
        const r = data[i];
        const g = data[++i];
        const b = data[++i];
        const dist1 = this.getColorDist(r, g, b, c1);
        const dist2 = this.getColorDist(r, g, b, c2);
        if (dist1 <= sensitivity) area1.push({ x, y, dist: dist1 });
        if (dist2 <= sensitivity) area2.push({ x, y, dist: dist2 });
      };
    };
    if (area1.length) queue.push({ data: area1, color: color1 });
    if (area2.length) queue.push({ data: area2, color: color2 });
    return queue.length ? queue : [];
  };
  async reduceData(data) {
    const queue = data.map(d => {
      const { scalar } = this;
      const data = d.data;
      const color = d.color;
      const length = data.length;
      let sumX = 0;
      let sumY = 0;
      let denom = 0;
      for (let i = 0; i < length; i++) {
        const f = data[i];
        const multi = 1 / (f.dist + 1);
        denom += multi;
        sumX += f.x * multi;
        sumY += f.y * multi;
      };
      const x = (sumX / denom) * scalar;
      const y = (sumY / denom) * scalar;
      const r = Math.sqrt(length) * scalar;
      return { x, y, r, color };
    });
    return queue;
  };
  hexToRgb(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return { r, g, b };
  };
  getColorDist(r, g, b, c2) {
    return Math.sqrt(
      Math.pow((r - c2.r), 2) +
      Math.pow((g - c2.g), 2) +
      Math.pow((b - c2.b), 2)
    );
  };
};