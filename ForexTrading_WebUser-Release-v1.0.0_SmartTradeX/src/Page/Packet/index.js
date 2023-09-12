/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Modal, notification, Tabs } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconCalendar } from './../../assets/icons/index';
import { useIntl } from 'react-intl';
import Header from '../../components/Header';
import OverView from './overview';
import MyTeam from './myTeam';
import HistoryRecive from './history';
import Guide from './guide';
const DEFAULT_FILTER = {
  filter: {
    packageType: 'A100FAC',
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};

function Packet(props) {
  const { secondaryPassword, referQRCode, appUserId } = useSelector(state => (state.member ? state.member : {}));

  const [activeKey, setActiveKey] = useState('1');
  const [dataFrom, setDataForm] = useState({});
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  const dispatch = useDispatch();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  const onChangeTab = key => {
    setActiveKey(key);
    const newFilter = {
      ...filter,
      filter: {
        ...filter.filter,
        packageType: `A${key}`,
      },
    };
  };

  return (
    <section className="management packet mb-0 pb-5">
      <Header title={t('store')} headerRight={<IconCalendar />}></Header>

      <div>
        <Tabs defaultActiveKey="1" onChange={onChangeTab} className="bg-gray ">
          <Tabs.TabPane tab={t('overview')} key="1">
            {activeKey === '1' ? <OverView activeKey={activeKey} /> : null}
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('my_team')} key="2">
            {activeKey === '2' ? <MyTeam activeKey={activeKey} /> : null}
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('history_recive')} key="3">
            {activeKey === '3' ? <HistoryRecive activeKey={activeKey} /> : null}
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('guide')} key="4">
            {activeKey === '4' ? <Guide activeKey={activeKey} /> : null}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </section>
  );
}
export default Packet;
