import Tracker from './tracker.js';
import Tracker_v2 from './tracker_v2.js';
import Tracker_v3 from './tracker_v3.js';





let supportedTracker = undefined;


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
    supportedTracker = Tracker;
  };

  if (hasWorker && !hasOffscreenCanvas) {
    supportedTracker = Tracker_v2;
  };

  if (hasWorker && hasOffscreenCanvas) {
    supportedTracker = Tracker_v3;
  };
})();





export { supportedTracker as default };
// export default Tracker;
// export default Tracker_v2;
// export default Tracker_v3;
