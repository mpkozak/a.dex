const help = {};

help.setAudioParam = async (param, val, ctx, delay) => {
  // const finish = (t) => new Promise(res => setTimeout(res, t));
  // const now = ctx.currentTime;
  // const now = Math.fround(ctx)
  // const now = ctx
  //
  // try {
  //   const start = ctx.currentTime
  //   const a = await param.cancelScheduledValues(start);
  //   // console.log('a ', ctx.currentTime - start)
  //   const b = await a.setValueAtTime(parseFloat(a.value), start);
  //   // console.log('b ', ctx.currentTime - start)
  //   b.exponentialRampToValueAtTime(val, parseFloat(start + delay));
  //   // console.log('c ', ctx.currentTime - start)
  // } catch (e) {
  //   console.log(e);
  // } finally {
  //   // console.log('finished')
  // }


  // val = val === 0 ? .000001 : val;
  const a = await param.cancelScheduledValues(ctx.currentTime);
  const b = await a.setValueAtTime(parseFloat(a.value), ctx.currentTime);
  // const c = await b.exponentialRampToValueAtTime(val, parseFloat(ctx.currentTime + delay));
  const c = await b.linearRampToValueAtTime(val, parseFloat(ctx.currentTime + delay));

  return c;





  // const start = ctx.currentTime

  // console.log()
  // console.log()
  // console.log()
  // console.log()

  // const a = await param.cancelAndHoldAtTime(now);
  // const b = await a.linearRampToValueAtTime(val, parseFloat(now + delay / 3));


  // param.cancelScheduledValues(now);
  // param.setValueAtTime(parseFloat(param.value), now);
  // param.linearRampToValueAtTime(val, parseFloat(now + delay));

  // param.value = val
  // param.cancelAndHoldAtTime(ctx.currentTime);
  // param.cancelScheduledValues(ctx.currentTime);
  // param.setTargetAtTime(val, now + delay, .01)

  // param.linearRampToValueAtTime(val, ctx.currentTime + delay);

  // param.cancelScheduledValues(now);
  // param.setValueAtTime(param.value, now);
  // param.linearRampToValueAtTime(val, now + delay);
  // await finish(delay * 1000);
  // return ctx.currentTime;
};

help.getParamPct = (param) => {
  return ((param.v - param.min) / (param.max - param.min)) * 100;
};

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

help.makeDomain = (extent, arr) => {
  const iter = arr.length;
  const unit = (extent[1] - extent[0]) / (iter - 1);
  const domain = [];
  for (let i = 0; i < iter; i++) {
    domain.push(extent[0] + i * unit);
  };
  return domain;
};


// Working Helper Functions - Currently Not Being Used //

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

export default help;
