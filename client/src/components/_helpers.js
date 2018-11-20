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
  const noteStr = ['A', 'A#/B♭', 'B', 'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭'];
  // const A0 = 27.5;
  const ref = 440;
  const semitonesFromRef = (12 * Math.log(Hz / ref)) / Math.log(2);
  const wholeNote = Math.round(semitonesFromRef);
  const cents = Math.floor((semitonesFromRef - wholeNote) * 100);
  const note = Math.round(Math.round(semitonesFromRef % 12) % 12);
  return {str: noteStr[note], cents: cents};
};

help.getColorDist = (orig, match) => {
  return Math.sqrt(
    Math.pow((orig.r - match.r), 2) +
    Math.pow((orig.g - match.g), 2) +
    Math.pow((orig.b - match.b), 2)
  );
};


module.exports = help;
