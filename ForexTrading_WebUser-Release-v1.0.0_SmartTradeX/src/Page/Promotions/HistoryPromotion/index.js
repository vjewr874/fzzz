/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import MenuPromotion from 'components/Promotion/MenuPromotion/MenuPromotion';
import TableComponent from 'components/Promotion/Table/Table';
import React from 'react';
import { injectIntl } from 'react-intl';

function HistoryPromotion(props) {
  const { history, intl } = props;
  const dataHistory = [];
  const columnHistory = [
    {
      title: intl.formatMessage({ id: 'time' }),
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: intl.formatMessage({ id: 'money' }),
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: intl.formatMessage({ id: 'detail' }),
      dataIndex: 'detail',
      key: 'detail',
    },
  ];
  return (
    <div className="promotion historyPromotion pb-4">
      <MenuPromotion history={history} intl={intl} />
      <section className="promotion__content mt-4">
        <TableComponent intl={intl} dataSource={dataHistory} columns={columnHistory} />
      </section>
    </div>
  );
}

export default injectIntl(HistoryPromotion);
