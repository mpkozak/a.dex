const help = {};


help.setAudioGain = (gain, val, t, delay) => {
  const prevVal = gain.value;
  gain.cancelScheduledValues(t - 1);
  gain.setValueAtTime(prevVal, t);
  gain.linearRampToValueAtTime(val, t + delay);
};

help.setAudioFreqs = (freqs, val, t, delay) => {
  freqs.forEach(freq => {
    const prevVal = freq.value;
    freq.cancelScheduledValues(t - 1);
    freq.setValueAtTime(prevVal, t);
    freq.exponentialRampToValueAtTime(val, t + delay);
  });
};

help.setAudioParam = (param, val, t) => {
  const prevVal = param.value;
  param.cancelScheduledValues(t - 1);
  param.setValueAtTime(prevVal, t);
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
