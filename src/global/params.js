export default Object.freeze({
  initial: {
    colorGain: '#00FF00',
    colorFreq: '#FF0000',
    osc1: 'triangle',
    osc2: 'sine',
    sensitivity: 30,
    octaves: 4,
    depth: 1500,
    width: -1200,
    hpf: 0,
    lpf: 22000,
    delay: 0,
    wet: 0,
    master: .73,
  },
  types: {
    osc: [
      'sine',
      'triangle',
      'sawtooth',
      'square',
    ],
  },
  range: {
    sensitivity: [0, 221],
    octaves: [2, 6],
    depth: [0, 3000],
    width: [-1200, 1200],
    hpf: [0, 2200],
    lpf: [2200, 22000],
    delay: [0, .999],
    wet: [0, 1],
    master: [0, 1],
  },
  units: {
    hpf: {
      unit: 'Hz',
      scalar: 1,
    },
    lpf: {
      unit: 'kHz',
      scalar: 1e-3,
    },
    delay: {
      unit: 'ms',
      scalar: 1e3,
    },
  },
});
