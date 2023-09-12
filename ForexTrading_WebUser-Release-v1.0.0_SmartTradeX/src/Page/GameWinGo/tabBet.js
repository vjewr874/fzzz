/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

// import { Modal, notification, Tabs, Row, Col } from "antd";
import Countdown from 'react-countdown';
import { Tabs } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import GameHeader from 'components/GameHeader';
import TabInner from './tabInner';

const DEFAULT_ARR = [0, 1, 2, 3, 4, , 5, 6, 7, 8, 9];
function TabBet(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const onChangeTab = () => {};
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={onChangeTab} className="bg-gray ">
        <Tabs.TabPane tab={t('overview')} key="1">
          <TabInner />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('my_team')} key="2">
          <TabInner />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('history_recive')} key="3">
          <TabInner />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('guide')} key="4">
          <TabInner />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
export default TabBet;
