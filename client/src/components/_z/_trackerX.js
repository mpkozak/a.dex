
///////////////////
// STABLE BRANCH //
///////////////////

export default class Tracker {
  constructor(callback, video, color1, color2, sense, reducer) {
    this.callback = callback;
    this.video = video;
    this.vWidth = video.clientWidth;
    this.vHeight = video.clientHeight;
    this.sense = sense ? sense : 50;
    this.reducer = reducer ? reducer : 10;
    this.tracker = null;
    this.tCtx = null;
    this.tWidth = Math.floor(this.vWidth / this.reducer);
    this.tHeight = Math.floor(this.vHeight / this.reducer);
    this.scalar = this.vWidth / this.tWidth;
    this.thresh = this.sense / Math.sqrt(Math.pow(this.tWidth, 2) + Math.pow(this.tHeight, 2));
    this.color1 = color1;
    this.color2 = color2;
    this.c1 = this.hexToRgb(color1);
    this.c2 = this.hexToRgb(color2);
    this.rAF = null;
  };
  setColors(color1, color2) {
    this.color1 = color1;
    this.color2 = color2;
    this.c1 = this.hexToRgb(color1);
    this.c2 = this.hexToRgb(color2);
  };
  init() {
    this.tracker = document.createElement('canvas');
    this.tCtx = this.tracker.getContext('2d');
    this.tracker.width = this.tWidth;
    this.tracker.height = this.tHeight;
    return {ctx: this.tCtx, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar};
  };
  start() {
    this.rAF = requestAnimationFrame(this.getData.bind(this));
  };
  stop() {
    cancelAnimationFrame(this.rAF);
  };
  getData() {
    this.rAF = requestAnimationFrame(this.getData.bind(this));
    const { tWidth, tHeight, tCtx, video } = this;
    // tCtx.clearRect(0, 0, tWidth, tHeight);
    tCtx.drawImage(video, 0, 0, tWidth, tHeight);
    const data = tCtx.getImageData(0, 0, tWidth, tHeight);
    this.filterData(data.data);
  };
  filterData(data) {
    const length = data.length;
    const { sense, color1, color2, tWidth, thresh } = this;
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
    const queue = [];
    if (area1.length > thresh) {
      queue.push({data: area1, color: color1});
    };
    if (area2.length > thresh) {
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



















////////////////////
// ?????????????? //
////////////////////

// export default class Tracker {
//   constructor(callback, video, color1, color2, sense, reducer) {
//     this.callback = callback;
//     this.video = video;
//     this.vWidth = video.clientWidth;
//     this.vHeight = video.clientHeight;
//     this.sense = sense ? sense : 50;
//     this.reducer = reducer ? reducer : 10;
//     this.tracker = undefined;
//     this.tCtx = undefined;
//     this.tWidth = Math.floor(this.vWidth / this.reducer);
//     this.tHeight = Math.floor(this.vHeight / this.reducer);
//     this.scalar = this.vWidth / this.tWidth;
//     this.thresh = this.sense / Math.sqrt(Math.pow(this.tWidth, 2) + Math.pow(this.tHeight, 2));
//     this.color1 = color1;
//     this.color2 = color2;
//     this.rAF = undefined;
//     this.start = 0;
//   };
//   init() {
//     this.tracker = document.createElement('canvas');
//     this.tCtx = this.tracker.getContext('2d');
//     this.tracker.width = this.tWidth;
//     this.tracker.height = this.tHeight;
//     return {ctx: this.tCtx, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar};
//   };
//   start() {
//     this.rAF = requestAnimationFrame(this.getData.bind(this));
//   };
//   stop() {
//     cancelAnimationFrame(this.rAF);
//   };
//   getData() {
//     this.start = new Date();
//     this.rAF = requestAnimationFrame(this.getData.bind(this));
//     const { tWidth, tHeight, tCtx, video } = this;
//     // tCtx.clearRect(0, 0, tWidth, tHeight);
//     tCtx.drawImage(video, 0, 0, tWidth, tHeight);
//     const data = tCtx.getImageData(0, 0, tWidth, tHeight);
//     this.filterData(data.data);
//   };
//   filterData(data) {
//     const length = data.length;
//     const { sense, color1, color2, tWidth, thresh } = this;
//     const c1 = this.hexToRgb(color1);
//     const c2 = this.hexToRgb(color2);
//     const area1 = [];
//     const area2 = [];
//     for (let i = 0; i < length; i += 4) {
//       const scale = i / 4;
//       const r = data[i];
//       const g = data[i + 1];
//       const b = data[i + 2];
//       const dist1 = this.getColorDist({r, g, b}, c1);
//       const dist2 = this.getColorDist({r, g, b}, c2);
//       if (dist1 <= sense) {
//         const dist = dist1;
//         const x = scale % tWidth;
//         const y = Math.floor(scale / tWidth);
//         area1.push({x, y, dist});
//       };
//       if (dist2 <= sense) {
//         const dist = dist2;
//         const x = scale % tWidth;
//         const y = Math.floor(scale / tWidth);
//         area2.push({x, y, dist});
//       };
//     };
//     const queue = [];
//     if (area1.length > thresh) {
//       queue.push({data: area1, color: color1});
//     };
//     if (area2.length > thresh) {
//       queue.push({data: area2, color: color2});
//     };
//     if (queue.length) {
//       this.reduceData(queue);
//     } else {
//       this.callback([]);
//     };
//   };
//   reduceData(data) {
//     const queue = [];
//     data.forEach(d => {
//       const { scalar } = this;
//       const data = d.data;
//       const color = d.color;
//       const length = data.length;
//       let sumX = 0;
//       let sumY = 0;
//       let denom = 0;
//       for (let i = 0; i < length; i++) {
//         const dataX = data[i].x;
//         const dataY = data[i].y;
//         const dataDist = data[i].dist;
//         const multi = 1 / (dataDist + 1);
//         denom += multi;
//         sumX += dataX * multi;
//         sumY += dataY * multi;
//       };
//       const x = sumX / denom * scalar;
//       const y = sumY / denom * scalar;
//       const r = Math.sqrt(length) * scalar;
//       queue.push({x, y, r, color});
//     });
//     const end = new Date();
//     console.log(end - this.start)
//     this.callback(queue);
//   };
//   hexToRgb(hex) {
//     const r = parseInt(hex.substr(1, 2), 16);
//     const g = parseInt(hex.substr(3, 2), 16);
//     const b = parseInt(hex.substr(5, 2), 16);
//     return {r, g, b};
//   };
//   getColorDist(c1, c2) {
//     return Math.sqrt(
//       Math.pow((c1.r - c2.r), 2) +
//       Math.pow((c1.g - c2.g), 2) +
//       Math.pow((c1.b - c2.b), 2)
//     );
//   };
// };










//////////////
// BRANCH 1 //
//////////////

// import * as d3 from 'd3';

// export default class Tracker {
//   constructor(callback, video, color1, color2, sense, reducer) {
//     this.callback = callback;
//     this.video = video;
//     this.vWidth = video.clientWidth;
//     this.vHeight = video.clientHeight;
//     this.reducer = reducer ? reducer : 10;
//     this.tWidth = Math.floor(this.vWidth / this.reducer);
//     this.tHeight = Math.floor(this.vHeight / this.reducer);
//     this.hyp = Math.sqrt(Math.pow(this.tWidth, 2) + Math.pow(this.tHeight, 2));
//     this.scalar = this.vWidth / this.tWidth;
//     this.color1 = color1;
//     this.color2 = color2;
//     this.sense = sense ? sense : 50;
//     this.tracker = null;
//     this.t = null;
//     this.rAF = null;
//     this.tstamp = 0;
//     this.frame = 0
//     this.period = 0
//   };
//   init() {
//     this.tracker = document.createElement('canvas');
//     this.t = this.tracker.getContext('2d');
//     this.tracker.width = this.tWidth;
//     this.tracker.height = this.tHeight;
//     return {ctx: this.t, tW: this.tWidth, tH: this.tHeight, scalar: this.scalar};
//   };
//   start() {
//     setInterval(this.getData.bind(this), 10)
//     // this.rAF = requestAnimationFrame(this.getData.bind(this));
//   };
//   stop() {
//     cancelAnimationFrame(this.rAF);
//   };
//   getData(timestamp) {
//               // const period = timestamp - this.tstamp;
//               // this.frame += 1;
//               // console.log(period, this.frame);
//               // this.tstamp = timestamp;
//     // this.rAF = requestAnimationFrame(this.getData.bind(this));
//     const { tWidth, tHeight, t, video } = this;
//     t.clearRect(0, 0, tWidth, tHeight);
//     t.drawImage(video, 0, 0, tWidth, tHeight);
//     const data = t.getImageData(0, 0, tWidth, tHeight);
//     this.filterData(data.data)
//   };
//   filterData(data) {
//     const length = data.length;
//     const { sense, color1, color2, tWidth, hyp } = this;
//     const c1 = this.hexToRgb(color1);
//     const c2 = this.hexToRgb(color2);
//     const area1 = [];
//     const area2 = [];
//     for (let i = 0; i < length; i += 4) {
//       const scale = i / 4;
//       const r = data[i];
//       const g = data[i + 1];
//       const b = data[i + 2];
//       const dist1 = this.getColorDist({r, g, b}, c1);
//       const dist2 = this.getColorDist({r, g, b}, c2);
//       if (dist1 <= sense) {
//         const dist = dist1;
//         const x = scale % tWidth;
//         const y = Math.floor(scale / tWidth);
//         area1.push({x, y, dist});
//       };
//       if (dist2 <= sense) {
//         const dist = dist2;
//         const x = scale % tWidth;
//         const y = Math.floor(scale / tWidth);
//         area2.push({x, y, dist});
//       };
//     };
//     const limit = sense / hyp;
//     const queue = [];
//     if (area1.length > limit) {
//       queue.push({data: area1, color: color1});
//     };
//     if (area2.length > limit) {
//       queue.push({data: area2, color: color2});
//     };
//     if (queue.length) {
//       this.reduceData(queue);
//     } else {
//       this.callback([]);
//     };
//   };
//   reduceData(data) {
//     const queue = [];
//     data.forEach(d => {
//       const { scalar } = this;
//       const data = d.data;
//       const color = d.color;
//       const length = data.length;
//       let sumX = 0;
//       let sumY = 0;

//             // let minX = this.tWidth;
//             // let maxX = 0;
//             // let minY = this.tHeight;
//             // let maxY = 0;

//       // const Xs = data.map(d => d.x);
//       // const Ys = data.map(d => d.y);
//       // const extentX = d3.extent(Xs);
//       // const extentY = d3.extent(Ys);
//       // const rx = extentX[0] * scalar;
//       // const ry = extentY[0] * scalar;
//       // const rw = (extentX[1] - extentX[0]) * scalar;
//       // const rh = (extentY[1] - extentY[0]) * scalar;

//       let denom = 0;
//       for (let i = 0; i < length; i++) {
//         const dataX = data[i].x;
//         const dataY = data[i].y;

//               // minX = dataX < minX ? dataX : minX;
//               // maxX = dataX > maxX ? dataX : maxX;
//               // minY = dataY < minY ? dataY : minY;
//               // maxY = dataY > maxY ? dataY : maxY;

//         const dataDist = data[i].dist;
//         const multi = 1 / (dataDist + 1);
//         denom += multi;
//         sumX += dataX * multi;
//         sumY += dataY * multi;
//       };
//               // const rx = minX * scalar;
//               // const ry = minY * scalar;
//               // const rw = (maxX - minX) * scalar;
//               // const rh = (maxY - minY) * scalar;

//       const x = sumX / denom * scalar;
//       const y = sumY / denom * scalar;
//       const r = Math.sqrt(length) * scalar;
//       queue.push({x, y, r, color});
//     });
//     this.callback(queue);
//   };
//   hexToRgb(hex) {
//     const r = parseInt(hex.substr(1, 2), 16);
//     const g = parseInt(hex.substr(3, 2), 16);
//     const b = parseInt(hex.substr(5, 2), 16);
//     return {r, g, b};
//   };
//   getColorDist(c1, c2) {
//     return Math.sqrt(
//       Math.pow((c1.r - c2.r), 2) +
//       Math.pow((c1.g - c2.g), 2) +
//       Math.pow((c1.b - c2.b), 2)
//     );
//   };
// };
