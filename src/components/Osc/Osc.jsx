import React, { memo, useState, useCallback } from 'react';
import './Osc.css';
import { params, audio } from '../../global';
import { parseCl } from '../../libs/parse.js';
import OscButton from './OscButton.jsx';





const Osc = memo(({ cl = '', oscKey = '', label = '' } = {}) => {
  const [wave, setWave] = useState(params.initial[oscKey]);

  const oscCallback = useCallback(type => {
    if (type === wave) {
      return null;
    };
    audio[oscKey] = type;
    setWave(type);
  }, [oscKey, wave, setWave]);


  return (
    <div className={parseCl(['Osc', cl, 'outer'])}>
      <div className="Osc--inner inner border vert">
        <div className="Osc--label label">
          <h3>{label}</h3>
        </div>
        <div className="Osc--buttonbox">
          {params.types.osc.map(d =>
            <OscButton
              key={oscKey + d}
              waveType={d}
              active={d === wave}
              cb={oscCallback}
            />
          )}
        </div>
      </div>
    </div>
  );
});





export const Osc1 = memo(() => <Osc cl="Osc-1" oscKey="osc1" label="Osc 1" />);
export const Osc2 = memo(() => <Osc cl="Osc-2" oscKey="osc2" label="Osc 2" />);
