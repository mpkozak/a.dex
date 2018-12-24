const help = {};


help.setAudioGain = (gain, val, ctx, delay) => {
  // console.log('setAudioGain fired')
  const t = ctx.currentTime + .0001;
  gain.cancelScheduledValues(t);
  gain.setValueAtTime(gain.value, t);
  gain.linearRampToValueAtTime(val, ctx.currentTime + delay);
};

help.setAudioFreq = (freqs, val, ctx, delay) => {
  // console.log('setAudioFreq fired')
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


help.newHandleScroll = (e, callback, scalar, id) => {
  e.preventDefault();
  scalar = Number.isInteger(scalar) ? scalar : 1000;
  callback(e.deltaY / scalar, id);
};


help.newHandleClick = (e, callback, scalar, id) => {
  e.preventDefault();
  scalar = Number.isInteger(scalar) ? scalar : 100;
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


help.handleLevel = (oldValue, delta, min, max) => {
  const range = max - min;
  const newValue = oldValue + (delta * range);
  if (newValue < min) {
    return min;
  } else if (newValue > max) {
    return max;
  } else return newValue;
};


help.getPercent = (val, min, max) => ((val - min) / (max - min)) * 100;













// help.setAudioParam = async (param, val, ctx) => {
//   const t = ctx.currentTime + .0001;
//   param.cancelScheduledValues(t);
//   param.setValueAtTime(param.value, t);
//   param.linearRampToValueAtTime(val, ctx.currentTime + .01);
//   // return
// };



// help.setAudioParam = async (param, val, time, delay) => {
//   param.cancelScheduledValues(time);
//   param.setValueAtTime(param.value, time);
//   param.linearRampToValueAtTime(val, time + delay);
// };


help.getParamPct = (param, v) => {
  v = v ? v : param.v;
  return ((v - param.min) / (param.max - param.min)) * 100;
};

// help.getParamPct = (param) => {
//   return ((param.v - param.min) / (param.max - param.min)) * 100;
// };


help.handleClickParam = (e, key, callback) => {
  e.preventDefault();
  var handleDrag = (e) => {
    callback((e.movementX - e.movementY) / 500, key);
  };
  window.addEventListener('mousemove', handleDrag);
  var clearEvent = () => {
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', clearEvent);
  };
   window.addEventListener('mouseup', clearEvent);
};


help.handleClickParamLinear = (e, key, callback) => {
  e.preventDefault();
  var handleDrag = (e) => {
    callback((e.movementX - e.movementY) / 100, key);
  };
  window.addEventListener('mousemove', handleDrag);
  var clearEvent = () => {
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', clearEvent);
  };
   window.addEventListener('mouseup', clearEvent);
};


help.handleScrollParam = (e, key, callback) => {
  e.preventDefault();
  callback(e.deltaY / 2000, key);
};


help.handleScrollParamLinear = (e, key, callback) => {
  e.preventDefault();
  callback(e.deltaY / 1000, key);
};



export default help;




  // param.setValueAtTime(param.value, time);
  // param.exponentialRampToValueAtTime(val + .0001, time + delay)

  // const a = await param.cancelScheduledValues(ctx.currentTime);
  // const b = await a.setValueAtTime(parseFloat(a.value), ctx.currentTime);
  // const c = await b.linearRampToValueAtTime(val, parseFloat(ctx.currentTime + delay));
  // await c;
  // return ctx.currentTime;

  // const a = await param.cancelScheduledValues(ctx.currentTime);
  // const b = await a.setValueAtTime(parseFloat(a.value), ctx.currentTime);
  // const c = await b.linearRampToValueAtTime(val, parseFloat(ctx.currentTime + delay));
  // await c;
  // return ctx.currentTime;

  // const now = ctx.currentTime;
  // const a = param.cancelScheduledValues(now);
  // param.setValueAtTime(a.value, now);
  // param.linearRampToValueAtTime(val, ctx.currentTime + delay);
  // return ctx.currentTime;



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

// help.getColorDist = (orig, match) => {
//   return Math.sqrt(
//     Math.pow((orig.r - match.r), 2) +
//     Math.pow((orig.g - match.g), 2) +
//     Math.pow((orig.b - match.b), 2)
//   );
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
