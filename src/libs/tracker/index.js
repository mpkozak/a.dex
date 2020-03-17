import Tracker_v1 from './tracker_v1.js';
import Tracker_v2 from './tracker_v2.js';
import Tracker_v3 from './tracker_v3.js';





let Tracker = undefined;


(() => {
  let hasWorker = false;
  let hasOffscreenCanvas = false;

  if (typeof Worker !== 'undefined') {
    hasWorker = true;
  } else {
    hasWorker = false;
  };

  if (typeof OffscreenCanvas !== 'undefined') {
    hasOffscreenCanvas = true;
  } else {
    hasOffscreenCanvas = false;
  };

  if (!hasWorker && !hasOffscreenCanvas) {
    Tracker = Tracker_v1;
  };

  if (hasWorker && !hasOffscreenCanvas) {
    Tracker = Tracker_v2;
  };

  if (hasWorker && hasOffscreenCanvas) {
    Tracker = Tracker_v3;
  };
})();





export default Tracker;
// export default Tracker_v1;
// export default Tracker_v2;
// export default Tracker_v3;





/*
TRACKER API >>>

  SET:
    video
    svg
    sensitivity
    colors

  GET:
    video
    svg
    sensitivity
    colors
    ready
    active

*/
