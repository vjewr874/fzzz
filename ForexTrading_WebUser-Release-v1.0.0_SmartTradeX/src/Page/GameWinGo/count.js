/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

// import { Modal, notification, Tabs, Row, Col } from "antd";
import Countdown from 'react-countdown';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import GameHeader from 'components/GameHeader';

function Count(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  return (
    <>
      <div>
        <div>
          <div>Kỳ sổ</div>
          <div>Thời gian còn lại để mua</div>
        </div>
        <div>
          <div>2022053110684</div>
          <Countdown
            date={Date.now() + 10000}
            intervalDelay={0}
            precision={3}
            renderer={props => <div>{props.total}</div>}
          />
          ,
        </div>
      </div>
    </>
  );
}
export default Count;
