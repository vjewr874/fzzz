/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Select } from 'antd';
import React, { useMemo, useState } from 'react';
import './ball.scss';
import classNames from 'classnames';

function Ball({ number, type }) {
  const customeClass = () => {
    let className = '';
    switch (type) {
      case 'RESULT':
      case 'ROLL':
      case 'SHOW':
      default:
        break;
    }
    return className;
  };
  return (
    <div className={classNames('ball', customeClass())}>
      <div className="fade-number">{number}</div>
    </div>
  );
}

export default Ball;
