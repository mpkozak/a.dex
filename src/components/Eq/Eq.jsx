import React, { memo } from 'react';
import './Eq.css';
import { parseCl } from '../../libs/parse.js';
import { KnobDrag } from '../_shared';
import EqDigits from './EqDigits.jsx';





export default memo(({ cl = '', eqKey = '', label = '' } = {}) =>
  <div className={parseCl(['Eq', cl, 'outer'])}>
    <div className="Eq--inner inner border vert">
      <div className="Eq--label label">
        <h3>{label}</h3>
      </div>
      <KnobDrag
        cl="Eq--knob"
        stateKey={eqKey}
        color="#3A3125"
      />
      <EqDigits eqKey={eqKey} />
    </div>
  </div>
);
