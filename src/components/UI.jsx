import React, { Fragment, memo } from 'react';
import {
  Placard,
  Latency,
  Mic,
  Screen,
  Colors,
  Settings,
  Osc1,
  Osc2,
  FmSynth,
  EqHpf,
  EqLpf,
  Delay,
  Master,
  MeterWave,
  MeterVu,
} from './';





export default memo(() =>
  <Fragment>
    <Placard />
    <Latency />
    <Mic />
    <Screen />
    <Colors />
    <Settings />
    <Osc1 />
    <Osc2 />
    <FmSynth />
    <EqHpf />
    <EqLpf />
    <Delay />
    <Master />
    <MeterWave />
    <MeterVu />
  </Fragment>
);
