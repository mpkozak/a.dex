const help = {};

help.makeDomain = (extent, arr) => {
  const iter = arr.length;
  const unit = (extent[1] - extent[0]) / (iter - 1);
  const domain = [];
  for (let i = 0; i < iter; i++) {
    domain.push(extent[0] + i * unit);
  };
  return domain;
};

help.getNote = (Hz) => {
  const A4 = 440;
  const A0 = 27.5;
  const noteStr = ['A', 'A#/B♭', 'B', 'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭'];
  const n = (12 * Math.log(Hz / A4)) / Math.log(2);
  let oct;
  // if (n > -9 && n <= 2) console.log('four oct')
  // const note = Math.round(n % 12) === 12 ? 0 : Math.round(n % 12);
  const note = Math.round(Math.round(n % 12) % 12);
  // console.log(n, note)
  return noteStr[note];
};

help.getColorDist = (orig, match) => {
  return Math.sqrt(
    Math.pow((orig.r - match.r), 2) +
    Math.pow((orig.g - match.g), 2) +
    Math.pow((orig.b - match.b), 2)
  );
};


module.exports = help;
