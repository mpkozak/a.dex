import { useState, useCallback } from 'react';
import { analyser } from '../../global';





export default function useAnalyser() {
  const [state, setState] = useState({});

  const cb = useCallback(() => {
    console.log('useAnalyser cb ran')
    setState(analyser.data);
    // requestAnimationFrame(runtime);
  }, [setState]);

  if (!analyser.callback) {
    analyser.callback = cb;
  };


  return state;
};
