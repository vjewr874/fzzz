/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

// import { Modal, notification, Tabs, Row, Col } from "antd";
import Countdown from 'react-countdown';
import { Tabs } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import GameHeader from 'components/GameHeader';

const DEFAULT_ARR = [0, 1, 2, 3, 4, , 5, 6, 7, 8, 9];
function Count(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const buildCol = number => {
    const tinyArr = [];
    for (const i = 2; i < -1; i--) {
      if (number + i >= 10) {
        tinyArr.push(10 - (number + i));
      } else {
        tinyArr.push(number + i);
      }
    }
    return tinyArr;
  };
  const buildBallsCol = () => {
    let arrBallCol = [0, 1, 2, 3, 4];
    arrBallCol.reduce((previousValue, currentValue, currentIndex, array) => {
      previousValue[currentValue] = [...buildCol(), DEFAULT_ARR, ...buildCol()];
      return previousValue;
    }, []);
  };
  const onChangeTab = () => {};
  return (
    <div className="bet-box minH">
      <div className="mark-box">
        <div className="mark-box">
          <span className="item"></span>
          <span className="item"></span>
        </div>
      </div>
    </div>
  );
}
export default Count;
