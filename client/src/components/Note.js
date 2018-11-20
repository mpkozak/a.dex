import React, { Component } from 'react';
import * as d3 from 'd3';
import help from './_helpers.js';

const notes = [
  { str: 'C0', int: 16.35 },
  { str: 'C#0/D♭0', int: 17.32 },
  { str: 'D0', int: 18.35 },
  { str: 'D#0/E♭0', int: 19.45 },
  { str: 'E0', int: 20.6 },
  { str: 'F0', int: 21.83 },
  { str: 'F#0/G♭0', int: 23.12 },
  { str: 'G0', int: 24.5 },
  { str: 'G#0/A♭0', int: 25.96 },
  { str: 'A0', int: 27.5 },
  { str: 'A#0/B♭0', int: 29.14 },
  { str: 'B0', int: 30.87 },
  { str: 'C1', int: 32.7 },
  { str: 'C#1/D♭1', int: 34.65 },
  { str: 'D1', int: 36.71 },
  { str: 'D#1/E♭1', int: 38.89 },
  { str: 'E1', int: 41.2 },
  { str: 'F1', int: 43.65 },
  { str: 'F#1/G♭1', int: 46.25 },
  { str: 'G1', int: 49 },
  { str: 'G#1/A♭1', int: 51.91 },
  { str: 'A1', int: 55 },
  { str: 'A#1/B♭1', int: 58.27 },
  { str: 'B1', int: 61.74 },
  { str: 'C2', int: 65.41 },
  { str: 'C#2/D♭2', int: 69.3 },
  { str: 'D2', int: 73.42 },
  { str: 'D#2/E♭2', int: 77.78 },
  { str: 'E2', int: 82.41 },
  { str: 'F2', int: 87.31 },
  { str: 'F#2/G♭2', int: 92.5 },
  { str: 'G2', int: 98 },
  { str: 'G#2/A♭2', int: 103.83 },
  { str: 'A2', int: 110 },
  { str: 'A#2/B♭2', int: 116.54 },
  { str: 'B2', int: 123.47 },
  { str: 'C3', int: 130.81 },
  { str: 'C#3/D♭3', int: 138.59 },
  { str: 'D3', int: 146.83 },
  { str: 'D#3/E♭3', int: 155.56 },
  { str: 'E3', int: 164.81 },
  { str: 'F3', int: 174.61 },
  { str: 'F#3/G♭3', int: 185 },
  { str: 'G3', int: 196 },
  { str: 'G#3/A♭3', int: 207.65 },
  { str: 'A3', int: 220 },
  { str: 'A#3/B♭3', int: 233.08 },
  { str: 'B3', int: 246.94 },
  { str: 'C4', int: 261.63 },
  { str: 'C#4/D♭4', int: 277.18 },
  { str: 'D4', int: 293.66 },
  { str: 'D#4/E♭4', int: 311.13 },
  { str: 'E4', int: 329.63 },
  { str: 'F4', int: 349.23 },
  { str: 'F#4/G♭4', int: 369.99 },
  { str: 'G4', int: 392 },
  { str: 'G#4/A♭4', int: 415.3 },
  { str: 'A4', int: 440 },
  { str: 'A#4/B♭4', int: 466.16 },
  { str: 'B4', int: 493.88 },
  { str: 'C5', int: 523.25 },
  { str: 'C#5/D♭5', int: 554.37 },
  { str: 'D5', int: 587.33 },
  { str: 'D#5/E♭5', int: 622.25 },
  { str: 'E5', int: 659.25 },
  { str: 'F5', int: 698.46 },
  { str: 'F#5/G♭5', int: 739.99 },
  { str: 'G5', int: 783.99 },
  { str: 'G#5/A♭5', int: 830.61 },
  { str: 'A5', int: 880 },
  { str: 'A#5/B♭5', int: 932.33 },
  { str: 'B5', int: 987.77 },
  { str: 'C6', int: 1046.5 },
  { str: 'C#6/D♭6', int: 1108.73 },
  { str: 'D6', int: 1174.66 },
  { str: 'D#6/E♭6', int: 1244.51 },
  { str: 'E6', int: 1318.51 },
  { str: 'F6', int: 1396.91 },
  { str: 'F#6/G♭6', int: 1479.98 },
  { str: 'G6', int: 1567.98 },
  { str: 'G#6/A♭6', int: 1661.22 },
  { str: 'A6', int: 1760 },
  { str: 'A#6/B♭6', int: 1864.66 },
  { str: 'B6', int: 1975.53 },
  { str: 'C7', int: 2093 },
  { str: 'C#7/D♭7', int: 2217.46 },
  { str: 'D7', int: 2349.32 },
  { str: 'D#7/E♭7', int: 2489.02 },
  { str: 'E7', int: 2637.02 },
  { str: 'F7', int: 2793.83 },
  { str: 'F#7/G♭7', int: 2959.96 },
  { str: 'G7', int: 3135.96 },
  { str: 'G#7/A♭7', int: 3322.44 },
  { str: 'A7', int: 3520 },
  { str: 'A#7/B♭7', int: 3729.31 },
  { str: 'B7', int: 3951.07 },
  { str: 'C8', int: 4186.01 },
  { str: 'C#8/D♭8', int: 4434.92 },
  { str: 'D8', int: 4698.63 },
  { str: 'D#8/E♭8', int: 4978.03 },
  { str: 'E8', int: 5274.04 },
  { str: 'F8', int: 5587.65 },
  { str: 'F#8/G♭8', int: 5919.91 },
  { str: 'G8', int: 6271.93 },
  { str: 'G#8/A♭8', int: 6644.88 },
  { str: 'A8', int: 7040 },
  { str: 'A#8/B♭8', int: 7458.62 },
  { str: 'B8', int: 7902.13 }
];

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleBase: 15, // valid range: 5-15
      freq: 0
    };
    this.getData = this.getData.bind(this);
    this.getNote = this.getNote.bind(this);
  }

  componentDidMount() {
    // if (this.props.mic) this.getData(this.props.audioCtx, this.props.mic, this.state.scaleBase);
    setTimeout(() => {
      this.getData(this.props.audioCtx, this.props.mic, this.state.scaleBase);
    }, 1000);
  }

  getData(audioCtx, mic, scaleBase) {
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = Math.pow(2, scaleBase);
    analyser.minDecibels = -100;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0;
    mic.connect(analyser);
    // analyser.connect(audioCtx.destination);

    const fftBins = analyser.frequencyBinCount;
    const sampleRate = audioCtx.sampleRate;
    const bandwidth = (sampleRate / 2) / fftBins;
    const freq = new Float32Array(fftBins);

    setInterval(() => {
      analyser.getFloatFrequencyData(freq);
      const max = d3.max(freq);
      const min = d3.min(freq);
      const median = d3.median(freq);
      const index = freq.indexOf(max);

      const val = (max - median > median - min) ? index : 0;
      // const val = index;
      this.setState(prevState => ({
        freq: val * bandwidth
      }))
    }, 200);

    // const setFreq = () => {
    //   requestAnimationFrame(setFreq);

    //   analyser.getFloatFrequencyData(freq);
    //   const max = d3.max(freq);
    //   const min = d3.min(freq);
    //   const median = d3.median(freq);
    //   const index = freq.indexOf(max);

    //   // const val = (max - median > median - min) ? index : 0;
    //   const val = index;
    //   this.setState(prevState => ({
    //     freq: val * bandwidth
    //   }));
    // };
    // setFreq();

  }

  getNote(freq) {
    let noteIndex = 0;
    let note = notes[noteIndex];
    notes.forEach((d, i) => {
      if (Math.abs(freq - d.int) < Math.abs(freq - note.int)) {
        note = d;
        noteIndex = i;
      };
    });

    const cents = 1200 * Math.log2(freq / note.int)

    return(
      <div>
        <h1>{help.getNote(freq)}</h1>
        <h3>{Math.round(freq)} Hz</h3>
        <h6>variance: {Math.round(cents)} ct</h6>
        <h4>{note.str}</h4>
      </div>
    );
  }

  render() {
    const { freq } = this.state;

    return (
      <div className='Note'>
        {freq ? this.getNote(freq) : ''}
      </div>
    );
  }
}
