/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Modal, notification, Tabs, Row, Col } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import GameHeader from 'components/GameHeader';

function Time(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  return (
    <Row>
      <Col>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
    </Row>
  );
}
export default Time;
