const help = {};

help.setAudioParam = async (param, val, ctx, delay) => {
  const finish = (t) => new Promise(res => setTimeout(res, t));
  // param.cancelScheduledValues(ctx.currentTime);
  // param.setValueAtTime(param.value, ctx.currentTime);
  // param.linearRampToValueAtTime(val, ctx.currentTime + delay);

  const now = ctx.currentTime;
  // param.cancelScheduledValues(now);
  param.setTargetAtTime(param.value, now, delay);
  param.setTargetAtTime(val, now + delay, delay);
  await finish(delay * 1000);
  return ctx.currentTime
};

help.getColorDist = (orig, match) => {
  return Math.sqrt(
    Math.pow((orig.r - match.r), 2) +
    Math.pow((orig.g - match.g), 2) +
    Math.pow((orig.b - match.b), 2)
  );
};


// help.makeDomain = (extent, arr) => {
//   const iter = arr.length;
//   const unit = (extent[1] - extent[0]) / (iter - 1);
//   const domain = [];
//   for (let i = 0; i < iter; i++) {
//     domain.push(extent[0] + i * unit);
//   };
//   return domain;
// };

// help.getNote = (Hz) => {
//   const noteStr = ['A', 'A#/B♭', 'B', 'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭'];
//   // const A0 = 27.5;
//   const ref = 440;
//   const semitonesFromRef = (12 * Math.log(Hz / ref)) / Math.log(2);
//   const wholeNote = Math.round(semitonesFromRef);
//   const cents = Math.floor((semitonesFromRef - wholeNote) * 100);
//   const note = Math.round(Math.round(semitonesFromRef % 12) % 12);
//   return {str: noteStr[note], cents: cents};
// };

// help.makeDistortion = (amt, sr) => {
//   const arr = new Float32Array(sr);
//   const deg = Math.PI / 180;
//   for (let i = 0; i < sr; i++) {
//     const x = (i * 2) / sr - 1;
//     arr[i] = (3 + amt) * x * 20 * deg / (Math.PI + amt * Math.abs(x));
//   };
//   return arr;
// };



export default help;

// module.exports = help;
