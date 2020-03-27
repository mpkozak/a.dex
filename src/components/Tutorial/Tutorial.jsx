import React, { memo } from 'react';
import './Tutorial.css';
import TutorialList from './TutorialList.jsx';





export default memo(() =>
  <div className="Tutorial">
    <TutorialList cl="TutorialList glitch-1" />
    <TutorialList cl="TutorialList" />
    <TutorialList cl="TutorialList glitch-2" />
  </div>
);
