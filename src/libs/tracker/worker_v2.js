
/* eslint no-restricted-globals: off */

export default function() {
  self.params = {
    canvasWidth: 0,
    canvasHeight: 0,
    colors: [],
    colorsRGB: [],
    sensitivity: 0,
  };
  self.queue = [];


  self.onmessage = function(msg) {
    if (msg.data.init) {
      handleInit(msg.data.init);
      return;
    };
    if (msg.data.imageData) {
      runtime(msg.data.imageData);
      return;
    };
  };


  function handleInit(payload) {
    self.params = payload;
    self.queue = self.params.colors.map(() => []);
    return;
  };


  function runtime(imageData) {
    self.queue.forEach(d => d = []);
    parseData(imageData);
    const data = reduceData().filter(a => !!a);
    postMessage(data);
    return;
  };



  function parseData(imageData) {
    const { data } = imageData;
    for (let y = 0; y < self.params.canvasHeight; ++y) {
      for (let x = 0; x < self.params.canvasWidth; ++x) {
        let p = (y * self.params.canvasWidth + x) * 4;
        const r = data[p];
        const g = data[++p];
        const b = data[++p];
        self.params.colorsRGB.forEach((d, i) => {
          const dist = getColorDist(r, g, b, d);
          if (dist <= self.params.sensitivity) {
            self.queue[i].push({ x, y, dist });
          };
        });
      };
    };
    return;
  };


  function reduceData() {
    return self.queue.map((data, i) => {
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
        color: self.params.colors[i],
        x: (sumX / denom),
        y: (sumY / denom),
        r,
      };
    });
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
