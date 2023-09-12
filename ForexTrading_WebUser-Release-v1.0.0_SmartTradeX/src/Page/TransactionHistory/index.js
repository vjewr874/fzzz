/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import RechargeHistory from './DepositUSDT';
import { useHistory } from 'react-router-dom';
import WithDrawalHistory from './WithdrawUSDT';
import { useIntl } from 'react-intl';
import Header from '../../components/Header';
export default function TransactionHistory({ defaultActiveKey = '1' }) {
  const history = useHistory();
  const onChangeTab = () => {};
  return (
    <section className="management packet mb-0">
      <Header
        goBack={() => {
          history.goBack();
        }}
        title={'Lịch sử giao dịch'}
      ></Header>

      <Tabs className="bg-gray profile__tab" defaultActiveKey={defaultActiveKey} onChange={onChangeTab}>
        <Tabs.TabPane tab={'Lịch sử nạp tiền'} key="1">
          <RechargeHistory />
        </Tabs.TabPane>
        <Tabs.TabPane tab={'Lịch sử rút tiền'} key="2">
          <WithDrawalHistory />
        </Tabs.TabPane>
      </Tabs>
    </section>
  );
}
