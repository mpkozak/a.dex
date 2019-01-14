const help = {};

// let init = false

help.setAudioGain = (gain, val, ctx, delay) => {


  gain.linearRampToValueAtTime(val, ctx.currentTime + delay);



  // gain.exponentialRampToValueAtTime(val > 0 ? val : .0001, ctx.currentTime + (delay / 4));
  // if (!init) {
  //   gain.setValueAtTime(1, ctx.currentTime)
  //   init = true;
  // }

  // const current = gain.value;
  // const target = (current + val) / 2;
  // const t = ctx.currentTime;
  // gain.cancelScheduledValues(t);
  // gain.setValueAtTime(current, t);
  // gain.linearRampToValueAtTime(target, t + delay / 2);











  // const t = ctx.currentTime;
  // gain.cancelScheduledValues(t);
  // gain.setValueAtTime(gain.value, t);
  // gain.linearRampToValueAtTime(val, t + delay);
};

help.setAudioFreq = (freqs, val, ctx, delay) => {
    const t = ctx.currentTime;
  freqs.forEach(freq => {
    freq.cancelScheduledValues(t);
    freq.setValueAtTime(freq.value, t);
    freq.exponentialRampToValueAtTime(val, t + delay);
  });
};

help.setAudio = (param, val, ctx) => {
  // const t = ctx.currentTime + .0001;
  const t = ctx.currentTime;
  param.cancelScheduledValues(t);
  param.setValueAtTime(param.value, t);
  param.linearRampToValueAtTime(val, t + .05);
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
