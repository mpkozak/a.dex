export default class Tracker {
  constructor(video, colors, callback = undefined, sensitivity = 50, reducer = 10) {
    this.video = video;
    this.colors = [];
    this.callback = callback;
    this.sensitivity = sensitivity;
    this.reducer = reducer;

    this.rgbColors = [];
    this.vWidth = video.width;
    this.vHeight = video.height;
    this.tWidth = Math.floor(this.vWidth / this.reducer);
    this.tHeight = Math.floor(this.vHeight / this.reducer);
    this.scalar = this.vWidth / this.tWidth;

    this.tracker = undefined;
    this.tCtx = undefined;

    this.setColors(colors);
    this.setVideo(video);
  };
  setColors(colors) {
// d.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
    colors.forEach((d, i) => {
      if (typeof d === 'string' && d.match(/^#[0-9a-f]{6}$/i)) {
        this.colors.push(d.toUpperCase());
        this.rgbColors.push(this.hexToRgb(d));
      } else {
        console.error(`Tracker Error: "${d}" is not a valid hex color. Colors must be of the format "#FFFFFF".`)
      };
    });
  };
  setVideo(video) {
    // const { tagName, nodeName, attributes } = video;
    if (video instanceof HTMLElement && video.tagName === 'VIDEO') {
      this.video = video;
    } else {
      console.error('Tracker Error: Video is not a valid VIDEO HTMLElement.');
    };
  };
  init() {
    this.tracker = document.createElement('canvas');
    this.tracker.width = this.tWidth;
    this.tracker.height = this.tHeight;
    this.tCtx = this.tracker.getContext('2d');
    return { ctx: this.tCtx, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar };
  };


  async masterStack() {
    // const start = window.performance.now()
    const data = await this.getData();
    const distance = await this.getDistance(data);
    const reduce = await this.reduceData(distance);
    // console.log('in track', window.performance.now() - start)
    this.callback(reduce)
    // console.log(reduce)
    // return await this.reduceData(distance);
  };


  async getData() {
    const { tWidth, tHeight, tCtx, video } = this;
    tCtx.drawImage(video, 0, 0, tWidth, tHeight);
    return tCtx.getImageData(0, 0, tWidth, tHeight).data;
  };
  async getDistance(data) {
    const { tWidth, tHeight, rgbColors, sensitivity } = this;
    const trackData = rgbColors.map(() => []);
    for (let y = 0; y < tHeight; ++y) {
      for (let x = 0; x < tWidth; ++x) {
        let i = (y * tWidth + x) * 4;
        const r = data[i];
        const g = data[++i];
        const b = data[++i];
        rgbColors.forEach((c, ci) => {
          const dist = this.getColorDist(r, g, b, c);
          dist <= sensitivity && trackData[ci].push([x, y, dist]);
        });
      };
    };
    return trackData;
  };
  async reduceData(data) {
    const { scalar } = this;
    return data.map((c, ci) => {
      const pts = c.length;
      if (!pts) return [];
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
        x: (sumX / denom) * scalar,
        y: (sumY / denom) * scalar,
        r: Math.sqrt(pts) * scalar,
        // x: (sumX / denom) * scalar || 0,
        // y: (sumY / denom) * scalar || 0,
        // r: 50,
        color: this.colors[ci]
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
  getColorDist(r, g, b, c) {
    return Math.sqrt(
      Math.pow((r - c[0]), 2) +
      Math.pow((g - c[1]), 2) +
      Math.pow((b - c[2]), 2)
    );
  };
};
