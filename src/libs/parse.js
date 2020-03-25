


export const parseCl = (...args) => {
  return args.reduce((str, d) => {
    if (typeof d === 'string')
      return str += ' ' + d;
    if (Array.isArray(d))
      return str += d.reduce((str, cl) => {
        return str + (typeof cl === 'string' ? (' ' + cl) : '');
      }, '');
    if (typeof d === 'object')
      return str += Object.entries(d)
        .reduce((str, [cl, act]) => str + (!!act ? ' ' + cl : ''), '');
    return '';
  }, '').trim();
};



export const getPct = (val, [min, max]) => ((val - min) / (max - min));



export const clampRange = (val, [min, max]) => {
  if (val >= max) {
    return max;
  };
  if (val <= min) {
    return min;
  };
  return val;
};
