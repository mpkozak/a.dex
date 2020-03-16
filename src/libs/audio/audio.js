






export default class Audio() {
  constructor({

  } = {}) {




  };


}




    const baseHz = 110;
    const latency = 0.05;
    const ctx = new AudioContext();
    const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(baseHz, ctx.currentTime);
    const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseHz, ctx.currentTime);
      osc2.detune.setValueAtTime(-1200, ctx.currentTime);
    const fmGain = ctx.createGain();
      fmGain.gain.setValueAtTime(1500, ctx.currentTime);
    const instGain = ctx.createGain();
      instGain.gain.setValueAtTime(0, ctx.currentTime);
    const hpf = ctx.createBiquadFilter();
      hpf.type = 'highpass';
      hpf.frequency.setValueAtTime(0, ctx.currentTime);
      hpf.Q.setValueAtTime(1, ctx.currentTime);
    const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(2200, ctx.currentTime);
      lpf.Q.setValueAtTime(1, ctx.currentTime);
    const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(0, ctx.currentTime);
    const delayGain = ctx.createGain();
      delayGain.gain.setValueAtTime(0, ctx.currentTime);
    const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(.73, ctx.currentTime);
    const analyser = ctx.createAnalyser();
      analyser.fftSize = 2 ** 8;
      analyser.minDecibels = -100;
      analyser.maxDecibels = -30;
      analyser.smoothingTimeConstant = 0;

    osc1.connect(fmGain);
    fmGain.connect(osc2.frequency);
    osc2.connect(instGain);
    instGain.connect(hpf);
    hpf.connect(lpf);
    lpf.connect(masterGain);
    lpf.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGain);
    masterGain.connect(analyser);
    masterGain.connect(ctx.destination);
    osc1.start();
    osc2.start();
