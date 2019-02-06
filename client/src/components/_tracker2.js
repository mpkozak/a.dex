export default class Tracker {
  constructor(video, colors, callback, reducer = 5, sensitivity = 50) {
    this.callback = callback;
    this.sensitivity = sensitivity;
    this.cropX = 0;
    this.cropY = 0;
    this.videoSrc = video;
    this.scale = reducer;
    this.colors = colors;
  };
  set videoSrc(video) {
    if (!(video instanceof HTMLElement) || video.tagName !== 'VIDEO') {
      return console.error('Tracker Error: Video is not a valid VIDEO HTMLElement.');
    };
    this.video = video;
    return true;
  };
  set colors(colors) {
    this.colorsHex = [];
    this.colorsRgb = [];
    colors.forEach(d => {
      if (typeof d !== 'string' || !d.match(/^#[0-9a-f]{6}$/i)) {
        return console.error(`Tracker Error: "${d}" is not a valid hex color. Colors must be of the format "#FFFFFF".`);
      };
      this.colorsHex.push(d.toUpperCase());
      this.colorsRgb.push(this.hexToRgb(d));
    });
    return true;
  };
  set scale(reducer) {
    const { video } = this;
    if (!video) {
      return console.error('Tracker Error: Video Element must be set in order to set Scale.');
    };
    this.trackerW = Math.floor(video.width / reducer);
    this.trackerH = Math.floor(video.height / reducer);
    this.scalar = video.width / this.trackerW;
    return true;
  };




  init() {
    this.tracker = document.createElement('canvas');
    this.tracker.width = this.trackerW;
    this.tracker.height = this.trackerH;
    this.trackerCtx = this.tracker.getContext('2d');
    return { ctx: this.trackerCtx, tW: this.trackerW, tH: this.trackerH, scalar: this.scalar };
  };


  async runtime() {
    this.getData()
      .then(data => this.getDistance(data))
      .then(dist => this.reduceData(dist))
      .then(res => this.callback(res));
  };
  async getData() {
    const { video, trackerCtx, trackerW, trackerH } = this;
    trackerCtx.drawImage(video, 0, 0, trackerW, trackerH);
    return trackerCtx.getImageData(0, 0, trackerW, trackerH).data;
  };
  async getDistance(data) {
    const { trackerW, trackerH, colorsRgb, sensitivity } = this;
    const trackData = colorsRgb.map(() => []);
    for (let y = 0; y < trackerH; ++y) {
      for (let x = 0; x < trackerW; ++x) {
        let i = (y * trackerW + x) * 4;
        const r = data[i];
        const g = data[++i];
        const b = data[++i];
        colorsRgb.forEach((c, ci) => {
          // const dist = this.getColorDist(r, g, b, c);
          const dist = this.getColorDist(r, g, b, ...c);
          dist <= sensitivity && trackData[ci].push([x, y, dist]);
        });
      };
    };
    return trackData;
  };
  async reduceData(data) {
    const { scalar, cropX = 0, cropY = 0 } = this;
    return data.map((c, ci) => {
      const pts = c.length;
      if (!pts) return {};
      let sumX = 0,
          sumY = 0,
          denom = 0;
      for (let i = 0; i < pts; i++) {
        const pt = c[i];
        const multi = 1 / (pt.pop() + 1);
        denom += multi;
        sumY += pt.pop() * multi;
        sumX += pt.pop() * multi;
      };
      return {
        x: (sumX / denom) * scalar - cropX,
        y: (sumY / denom) * scalar - cropY,
        r: Math.sqrt(pts) * scalar,
        color: this.colorsHex[ci]
      };
    });
  };
  hexToRgb(hex) {
    return [
      parseInt(hex.substring(1, 3), 16),
      parseInt(hex.substring(3, 5), 16),
      parseInt(hex.substring(5, 7), 16)
    ];
  };
  getColorDist(r, g, b, r1, g1, b1) {
    // console.log('r', (r - r1) ** 2)
    return ((r - r1) ** 2 + (g - g1) ** 2 + (b - b1) ** 2) ** .5

    // return Math.sqrt(
    //   Math.pow((r - c[0]), 2) +
    //   Math.pow((g - c[1]), 2) +
    //   Math.pow((b - c[2]), 2)
    // );
  };
  // getColorDist(r, g, b, c) {
    // return Math.sqrt(
    //   Math.pow((r - c[0]), 2) +
    //   Math.pow((g - c[1]), 2) +
    //   Math.pow((b - c[2]), 2)
    // );
  // };
};
