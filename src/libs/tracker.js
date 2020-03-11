import d3 from './d3.js';



export default class Tracker {
  constructor({
    video,
    svg,
    scalar = 10,
    sensitivity = 5,
  } = {}) {
    this.videoElement = video;
    this.scalar = scalar;
    this.sensitivity = sensitivity;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.canvasElement = undefined;
    this.canvasCtx = undefined;
    this.imageData = undefined;
    this.colors = [];
    this.queue = [];
    this.rAF = undefined;
    this.svgElement = svg;
    this.overlay = undefined;
    // if (video) {
    //   this.initCanvas();
    //   if (svg) {
    //     this.initOverlay();
    //   };
    // };
  };


/*
    Setters
*/

  set video(video) {
    if (!video) {
      console.error('TRACKER --- no video element');
      return null;
    };
    this.initCanvas(video);
  };

  set svg(svg) {
    if (!this.videoElement) {
      console.error('TRACKER --- cannot set svg until video is set');
      return null;
    };
    this.initOverlay(svg);
  };

  set color(hex) {
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
      console.error('TRACKER --- invalid color format');
      return null;
    };
    this.colors = validHex;
    this.colorsRGB = this.colors.map(d => {
      return this.hexToRgb(d);
    });
    this.queue = new Array(this.colors.length).fill([]);
  };


/*
    Getters
*/

  get viewBox() {
    if (!this.videoElement) {
      return null;
    };
    return `0 0 ${this.canvasWidth} ${this.canvasHeight}`;
  };


/*
    Initializers
*/

  initCanvas(video = this.videoElement, scalar = this.scalar) {
    this.videoElement = video;
    this.scalar = scalar;
    this.canvasWidth = this.scaleDown(this.videoElement.clientWidth);
    this.canvasHeight = this.scaleDown(this.videoElement.clientHeight);
    // this.canvasElement = document.createElement('canvas');
    // this.canvasElement.width = this.canvasWidth;
    // this.canvasElement.height = this.canvasHeight;
    // this.canvasCtx = this.canvasElement.getContext('2d');
    this.canvasElement = new OffscreenCanvas(this.canvasWidth, this.canvasHeight);
    this.canvasCtx = this.canvasElement.getContext('2d', { alpha: false });
    return;
  };

  initOverlay(svg = this.svgElement) {
    if (!svg) {
      console.error('TRACKER --- no svg element');
      return null;
    };
    this.svgElement = svg;
    this.overlay = d3.select(this.svgElement)
      .attr('width', this.canvasWidth)
      .attr('height', this.canvasHeight)
      .attr('viewBox', this.viewBox);
    return;
  };



  getPointColor(x, y) {
    this.canvasCtx.drawImage(this.videoElement, 0, 0, this.canvasWidth, this.canvasHeight);
    const { data } = this.canvasCtx.getImageData(this.scaleDown(x), this.scaleDown(y), 1, 1);
    const [r, g, b] = data;
    return this.rgbToHex({ r, g, b });
  };


  getData() {
    this.canvasCtx.drawImage(this.videoElement, 0, 0, this.canvasWidth, this.canvasHeight);
    this.imageData = this.canvasCtx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    return;
  };

  parseData() {
    const { data } = this.imageData;
    for (let y = 0; y < this.canvasHeight; ++y) {
      for (let x = 0; x < this.canvasWidth; ++x) {
        let p = (y * this.canvasWidth + x) * 4;
        const r = data[p];
        const g = data[++p];
        const b = data[++p];
        this.colorsRGB.forEach((d, i) => {
          const dist = this.getColorDist(r, g, b, d);
          if (dist <= this.sensitivity) {
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
      let sumX = 0;
      let sumY = 0;
      let denom = 0;
      while (data.length) {
        const { x, y, dist } = data.pop();
        const multi = 1 / (dist + 1);
        denom += multi;
        sumX += x * multi;
        sumY += y * multi;
      };
      // for (let i = 0; i < data.length; i++) {
      //   const multi = 1 / (data[i].dist + 1);
      //   denom += multi;
      //   sumX += data[i].x * multi;
      //   sumY += data[i].y * multi;
      // };
      return {
        color: this.colors[i],
        x: (sumX / denom),
        y: (sumY / denom),
        r,
      };
    });
  };

  drawOverlay(data) {
    const circles = this.overlay
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
      // .style('opacity', .5)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', '.3%');
    circles
      .exit()
      .remove();
  };


  runtime() {
    this.queue.forEach(d => d = []);
    this.getData();
    this.parseData();
    const data = this.reduceData();
    this.drawOverlay(data.filter(a => !!a));
    this.rAF = requestAnimationFrame(this.runtime.bind(this));
  };

  start() {
    console.log('Starting tracker with:', this.colors)
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
    Parsers + Helpers
*/

  scaleDown(val) {
    return Math.floor(val / this.scalar);
  };

  scaleUp(val) {
    return Math.floor(val * this.scalar);
  };

  hexToRgb(hex) {
    // return {
    //   b: parseInt(hex.slice(-2), 16),
    //   g: parseInt(hex.slice(-2), 16),
    //   r: parseInt(hex.slice(-2), 16)
    // };
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return { r, g, b };
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











  // async getData() {
  //   const { tWidth, tHeight, tCtx, video } = this;
  //   tCtx.drawImage(video, 0, 0, tWidth, tHeight);
  //   return tCtx.getImageData(0, 0, tWidth, tHeight).data;
  // };


  // start() {
  //   this.rAF = requestAnimationFrame(this.runtime.bind(this));
  // };

  // async runtime() {
  //   const data = await this.getData();
  //   const filtered = await this.filterData(data);
  //   const reduced = filtered ? await this.reduceData(filtered) : [];
  //   this.callback(reduced);
  //   this.rAF = requestAnimationFrame(this.runtime.bind(this));
  // };



  // init() {
  //   this.tracker = document.createElement('canvas');
  //   this.tracker.width = this.tWidth;
  //   this.tracker.height = this.tHeight;
  //   this.tCtx = this.tracker.getContext('2d');
  //   return { ctx: this.tCtx, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar };
  // };




  // setColors(color1, color2) {
  //   this.color1 = color1;
  //   this.color2 = color2;
  //   this.c1 = this.hexToRgb(color1);
  //   this.c2 = this.hexToRgb(color2);
  // };
  // start() {
  //   this.rAF = requestAnimationFrame(this.runtime.bind(this));
  // };
  // stop() {
  //   cancelAnimationFrame(this.rAF);
  // };
  // async runtime() {
  //   const data = await this.getData();
  //   const filtered = await this.filterData(data);
  //   const reduced = filtered ? await this.reduceData(filtered) : [];
  //   this.callback(reduced);
  //   this.rAF = requestAnimationFrame(this.runtime.bind(this));
  // };
  // async getData() {
  //   const { tWidth, tHeight, tCtx, video } = this;
  //   tCtx.drawImage(video, 0, 0, tWidth, tHeight);
  //   return tCtx.getImageData(0, 0, tWidth, tHeight).data;
  // };
  // async filterData(data) {
  //   const { sensitivity, color1, color2, c1, c2, tWidth, tHeight } = this;
  //   const queue = [];
  //   const area1 = [];
  //   const area2 = [];
  //   for (let y = 0; y < tHeight; ++y) {
  //     for (let x = 0; x < tWidth; ++x) {
  //       let i = (y * tWidth + x) * 4;
  //       const r = data[i];
  //       const g = data[++i];
  //       const b = data[++i];
  //       const dist1 = this.getColorDist(r, g, b, c1);
  //       const dist2 = this.getColorDist(r, g, b, c2);
  //       if (dist1 <= sensitivity) area1.push({ x, y, dist: dist1 });
  //       if (dist2 <= sensitivity) area2.push({ x, y, dist: dist2 });
  //     };
  //   };
  //   if (area1.length) queue.push({ data: area1, color: color1 });
  //   if (area2.length) queue.push({ data: area2, color: color2 });
  //   return queue.length ? queue : false;
  // };
  // async reduceData(data) {
  //   const queue = data.map(d => {
  //     const { scalar } = this;
  //     const data = d.data;
  //     const color = d.color;
  //     const length = data.length;
  //     let sumX = 0;
  //     let sumY = 0;
  //     let denom = 0;
  //     for (let i = 0; i < length; i++) {
  //       const f = data[i];
  //       const multi = 1 / (f.dist + 1);
  //       denom += multi;
  //       sumX += f.x * multi;
  //       sumY += f.y * multi;
  //     };
  //     const x = (sumX / denom) * scalar;
  //     const y = (sumY / denom) * scalar;
  //     const r = Math.sqrt(length) * scalar;
  //     return { x, y, r, color };
  //   });
  //   return queue;
  // };
  // hexToRgb(hex) {
  //   const r = parseInt(hex.substr(1, 2), 16);
  //   const g = parseInt(hex.substr(3, 2), 16);
  //   const b = parseInt(hex.substr(5, 2), 16);
  //   return { r, g, b };
  // };
  // getColorDist(r, g, b, c2) {
  //   return Math.sqrt(
  //     Math.pow((r - c2.r), 2) +
  //     Math.pow((g - c2.g), 2) +
  //     Math.pow((b - c2.b), 2)
  //   );
  // };



    // return this.queue;


    // const data = [
    //   {
    //     x: Math.random() * this.canvasWidth,
    //     y: Math.random() * this.canvasHeight,
    //     r: Math.random() * this.canvasHeight / 2,
    //     color: 'red',
    //   },
    //   {
    //     x: Math.random() * this.canvasWidth,
    //     y: Math.random() * this.canvasHeight,
    //     r: Math.random() * this.canvasHeight / 2,
    //     color: 'red',
    //   },
    // ];
    // console.log('data', data.slice(0,50));
};
