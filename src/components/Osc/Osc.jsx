import React, { memo } from 'react';
import './Osc.css';
import { useGlobalState } from '../../libs/hooks';
import { parseCl } from '../../libs/parse.js';
import OscButton from './OscButton.jsx';





const Osc = memo(({ cl = '', oscKey = '', label = '' } = {}) => {
  const { params } = useGlobalState();
  const { osc } = params.types;


  return (
    <div className={parseCl(['Osc', cl, 'outer'])}>
      <div className="Osc--inner inner border vert">
        <div className="Osc--label label">
          <h3>{label}</h3>
        </div>
        <div className="Osc--buttonbox">
          {osc.map(d =>
            <OscButton
              key={oscKey + d}
              oscKey={oscKey}
              waveType={d}
            />
          )}
        </div>
      </div>
    </div>
  );
});





export const Osc1 = memo(() => <Osc cl="Osc-1" oscKey="osc1" label="Osc 1" />);
export const Osc2 = memo(() => <Osc cl="Osc-2" oscKey="osc2" label="Osc 2" />);
