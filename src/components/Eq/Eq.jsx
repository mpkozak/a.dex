import React, { memo, useState, useCallback } from 'react';
import './Eq.css';
import { params, audio } from '../../global';
import { parseCl } from '../../libs/parse.js';
import { KnobDrag } from '../_shared';
import EqDigits from './EqDigits.jsx';





const Eq = memo(({ cl = '', eqKey = '', label = '' } = {}) => {
  const [freq, setFreq] = useState(params.initial[eqKey]);

  const { unit, scalar } = params.units[eqKey];


  const eqCallback = useCallback(val => {
    audio[eqKey] = val;
    setFreq(val);
  }, [eqKey, setFreq]);


  return (
    <div className={parseCl(['Eq', cl, 'outer'])}>
      <div className="Eq--inner inner border vert">
        <div className="Eq--label label">
          <h3>{label}</h3>
        </div>
        <KnobDrag
          cl="Eq--knob"
          paramKey={eqKey}
          color="#3A3125"
          cb={eqCallback}
        />
        <EqDigits
          val={freq * scalar}
          dec={scalar !== 1 ? 2 : 0}
          unit={unit}
        />
      </div>
    </div>
  );
});





export const EqHpf = memo(() => <Eq cl="Eq-hpf" eqKey="hpf" label="HPF" />);
export const EqLpf = memo(() => <Eq cl="Eq-lpf" eqKey="lpf" label="LPF" />);
