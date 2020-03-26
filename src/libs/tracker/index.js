import Tracker from './tracker.js';
import Tracker_v2 from './tracker_v2.js';
import Tracker_v3 from './tracker_v3.js';





let supportedTracker = Tracker;


(() => {
  let hasWorker = typeof Worker !== 'undefined';
  let hasOffscreenCanvas = typeof OffscreenCanvas !== 'undefined';

  if (!hasWorker && !hasOffscreenCanvas) {
    supportedTracker = Tracker_v3;
  };

  if (hasWorker && !hasOffscreenCanvas) {
    supportedTracker = Tracker_v2;
  };
})();





export { supportedTracker as default };
