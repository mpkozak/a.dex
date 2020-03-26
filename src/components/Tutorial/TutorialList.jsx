import React, { memo } from 'react';





export default memo(({ cl = '' } = {}) =>
  <ul className={cl}>
    <li>Instructions--</li>
    <li>Select two handheld objects of different colors - markers work well. These will be your controllers.</li>
    <li>Click on one of the orbs in "Set Colors". Hold up one of your controllers and click where it appears within the video frame. You should see a tracking circle appear that matches the color of your controller. Repeat for the other controller.</li>
    <li>If a tracking circle doesn’t appear (or only appears intermittently), use the "Sensitivity" knob to adjust.</li>
    <li>Volume is controlled by moving the corresponding controller up and down.</li>
    <li>Pitch is controlled by moving the corresponding controller left and right.</li>
    <li>Press the power button to continue.</li>
  </ul>
);
