
/* eslint no-restricted-globals: off */

export default function() {
  this.width = 0;
  this.height = 0;
  this.canvas = null;
  this.ctx = null;
  this.colors = [];
  this.colorsRGB = [];
  this.sensitivity = 0;
  this.queue = [];


  self.onmessage = function(msg) {
    const { data } = msg;
    if (data.imageBitmap) {
      return runtime(data.imageBitmap);
    };
    this.queue.forEach(d => d = []);
    if (data.canvas) {
      return setCanvas(data.canvas);
    };
    if (data.colors) {
      return setColors(data.colors);
    };
    if ('sensitivity' in data) {
      return setSensitivity(data.sensitivity);
    };
  };


  function setCanvas(payload) {
    const { width, height } = payload;
    this.width = width;
    this.height = height;
    this.canvas = new OffscreenCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    return;
  };

  function setColors(payload) {
    this.colors = payload;
    this.colorsRGB = payload.map(d => hexToRgb(d));
    this.queue = payload.map(() => []);
    return;
  };

  function setSensitivity(payload) {
    this.sensitivity = payload;
    return;
  };



  function runtime(imageBitmap) {
    this.queue.forEach(d => d = []);
    const imageData = getData(imageBitmap);
    parseData(imageData);
    const rawData = reduceData();
    const output = formatData(rawData);
    return postMessage(output);
  };


  function getData(imageBitmap) {
    this.ctx.drawImage(imageBitmap, 0, 0, this.width, this.height);
    return this.ctx.getImageData(0, 0, this.width, this.height);
  };

  function parseData(imageData) {
    const { data } = imageData;
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        let p = (y * this.width + x) * 4;
        const r = data[p];
        const g = data[++p];
        const b = data[++p];
        this.colorsRGB.forEach((d, i) => {
          const dist = getColorDist(r, g, b, d);
          if (dist <= this.sensitivity) {
            this.queue[i].push({ x, y, dist });
          };
        });
      };
    };
    return;
  };

  function reduceData() {
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
        color: this.colors[i],
        x: (sumX / denom),
        y: (sumY / denom),
        r,
      };
    });
  };

  function formatData(rawData) {
    const data = rawData.filter(a => !!a);
    const output = {
      draw: data,
      audio: null,
    };
    if (data.length === 2) {
      output.audio = {
        x: (this.width - data[1].x) / this.width,
        y: (this.height - data[0].y) / this.height,
      };
    };
    return output;
  };


  function hexToRgb(hex) {
    return {
      r: parseInt(hex.substr(1, 2), 16),
      g: parseInt(hex.substr(3, 2), 16),
      b: parseInt(hex.substr(5, 2), 16),
    };
  };

  function getColorDist(r, g, b, c2) {
    return Math.sqrt(
      Math.pow((r - c2.r), 2) +
      Math.pow((g - c2.g), 2) +
      Math.pow((b - c2.b), 2)
    );
  };
};

// eslint no-restricted-globals: on
