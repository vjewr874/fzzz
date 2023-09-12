/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

// import { Modal, notification, Tabs, Row, Col } from "antd";
import Countdown from 'react-countdown';
import { Tabs } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Ball from 'components/Ball';

function TabInner(props) {
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  return (
    <div>
      <div>Lớn 2</div>Nhỏ 2<div>lẻ 2</div>
      <div>chẵn 2</div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
      <div>
        <Ball />
        <span>9</span>
      </div>
    </div>
  );
}
export default TabInner;
