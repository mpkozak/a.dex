import Audio from './audio.js';
import Audio_v2 from './audio_v2.js';





let supportedAudio = Audio;


(() => {
  try {
    const ctx = new AudioContext();
    new OscillatorNode(ctx);
    ctx.close();
  } catch (err) {
    supportedAudio = Audio_v2;
  };
})();





export { supportedAudio as default };
// export default Audio;
// export default Audio_v2;
