const help = {};

help.makeDomain = (extent, arr) => {
  const num = arr.length;
  const unit = (extent[1] - extent[0]) / (num - 1);
  const out = [];
  for (let i = 0; i < num; i++) {
    out.push(extent[0] + i * unit);
  };
  return out;
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
}




module.exports = help;
