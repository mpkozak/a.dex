const help = {};


help.setAudioGain = (gain, val, ctx, delay) => {
  const t = ctx.currentTime + .0001;
  gain.cancelScheduledValues(t);
  gain.setValueAtTime(gain.value, t);
  gain.linearRampToValueAtTime(val, ctx.currentTime + delay);
};

help.setAudioFreq = (freqs, val, ctx, delay) => {
  freqs.forEach(freq => {
    const t = ctx.currentTime + .0001;
    freq.cancelScheduledValues(t);
    freq.setValueAtTime(freq.value, t);
    freq.exponentialRampToValueAtTime(val, ctx.currentTime + delay);
  });
};

help.setAudio = (param, val, ctx) => {
  const t = ctx.currentTime + .0001;
  param.cancelScheduledValues(t);
  param.setValueAtTime(param.value, t);
  param.linearRampToValueAtTime(val, ctx.currentTime + .05);
};

help.handleScroll = (e, callback, scalar, id) => {
  e.preventDefault();
  scalar = Number.isInteger(scalar) ? scalar : 1000;
  callback(e.deltaY / scalar, id);
};

help.handleClick = (e, callback, scalar, id) => {
  e.preventDefault();
  scalar = Number.isInteger(scalar) ? scalar : 200;
  var handleDrag = (e) => {
    callback((e.movementX - e.movementY) / scalar, id);
  };
  window.addEventListener('mousemove', handleDrag);
  var clearEvent = () => {
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', clearEvent);
  };
   window.addEventListener('mouseup', clearEvent);
};

help.getLevel = (oldValue, delta, min, max) => {
  const range = max - min;
  const newValue = oldValue + (delta * range);
  if (newValue < min) {
    return min;
  } else if (newValue > max) {
    return max;
  } else return newValue;
};

help.getPercent = (val, min, max) => ((val - min) / (max - min)) * 100;


export default help;



// Working Helper Functions - Currently Not Being Used //

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

// help.getLevelLog = (oldValue, delta, min, max) => {
//   const range = max - min;
//   const base = (oldValue / range) * 10000;
//   const newValue = oldValue + (delta * base);
//   if (newValue < min) {
//     return min;
//   } else if (newValue > max) {
//     return max;
//   } else return newValue;
// };

// help.getPercentLog = (val, min, max) => (Math.log(val - min + 1) / Math.log(max - min)) * 100;
