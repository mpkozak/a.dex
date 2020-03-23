import { useState, useCallback } from 'react';
import { params } from './';
import Audio from '../libs/audio';
import Analyser from '../libs/analyser';
import Tracker from '../libs/tracker';





function audioInit() {
  const options = {
    octaves: params.initial.octaves,
    osc1Type: params.initial.osc1,
    osc2Type: params.initial.osc2,
    osc2Detune: params.initial.width,
    fmGainGain: params.initial.depth,
    hpfFreq: params.initial.hpf,
    lpfFreq: params.initial.lpf,
    delayTime: params.initial.delay,
    delayGain: params.initial.wet,
    masterGain: params.initial.master,
  };
  try {
    const audio = new Audio(options);
    audio.init();
    return audio;
  } catch (err) {
    console.error('audioInit', err);
    throw err;
  };
};


function analyserInit(analyserNode) {
  try {
    const analyser = new Analyser(analyserNode);
    return analyser;
  } catch (err) {
    console.error('analyserInit', err);
    throw err;
  };
};


async function streamInit() {
  const options = {
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
    audio: true,
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(options);
    const mediaStreams = {
      mediaAudioStream: new MediaStream([stream.getAudioTracks()[0]]),
      mediaVideoStream: new MediaStream([stream.getVideoTracks()[0]]),
    };
    return mediaStreams;
  } catch (err) {
    console.error('streamInit', err);
    throw err;
  };
};


function trackerInit(audioCallback) {
  const options = {
    callback: audioCallback,
    sensitivity: params.initial.sensitivity,
    colors: [
      params.initial.colorGain,
      params.initial.colorFreq,
    ],
  };
  try {
    const tracker = new Tracker(options);
    return tracker;
  } catch (err) {
    console.error('trackerInit', err);
    throw err;
  };
};





let audio = {},
    analyser = {},
    tracker = {},
    videoStream = {};

async function initialize() {
  try {
    audio = audioInit();
    // console.log('audio', audio)
    analyser = analyserInit(audio.analyser);
    analyser.toggle();
    // console.log('analyser', analyser)
    tracker = trackerInit(audio.trackerCallback);
    // console.log('tracker', tracker)
    const {
      mediaAudioStream,
      mediaVideoStream,
    } = await streamInit();
    videoStream = mediaVideoStream;
    audio.mic = mediaAudioStream;
    // console.log('mediaStreams', mediaAudioStream, mediaVideoStream)
    return true;
  } catch (err) {
    console.error('initialize', err);
    return false;
  };
};





function useInit() {
  const [init, setInit] = useState(false);

  const toggleInit = useCallback((e) => {
    if (init === false) {
      setInit('pending');
      initialize()
        .then(initOk => {
          if (initOk) {
            return setInit(true);
          };
          return setInit('unsupported');
        })
        .catch(err => {
          console.error('Init error', err);
          return null;
        });
    };
  }, [init, setInit]);

  return [init, toggleInit];
};





export {
  audio,
  analyser,
  tracker,
  videoStream,
  useInit as default
};
