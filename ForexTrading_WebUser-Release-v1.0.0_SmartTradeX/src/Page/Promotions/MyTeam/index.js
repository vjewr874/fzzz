/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Input, Select } from 'antd';
import MenuPromotion from 'components/Promotion/MenuPromotion/MenuPromotion';
import TableComponent from 'components/Promotion/Table/Table';
import React from 'react';
import { injectIntl } from 'react-intl';
import './index.scss';

function MyTeam(props) {
  const { history, intl } = props;
  const dataTeam = [];
  const columnTeam = [
    {
      title: 'UID',
      dataIndex: 'UID',
      key: 'UID',
    },
    {
      title: intl.formatMessage({ id: 'name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: intl.formatMessage({ id: 'total' }),
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'TT',
      dataIndex: 'TT',
      key: 'TT',
    },
    {
      title: intl.formatMessage({ id: 'detail' }),
      dataIndex: 'detail',
      key: 'detail',
    },
  ];
  const children = [];

  for (let i = 1; i < 6; i++) {
    children.push(
      <Select.Option key={i}>
        {intl.formatMessage({ id: 'level' })} {i}
      </Select.Option>,
    );
  }
  return (
    <div className="promotion myTeam pb-4">
      <MenuPromotion history={history} intl={intl} />
      <section className="promotion__content">
        <div className="promotion__content-title px-3">
          {intl.formatMessage({ id: 'team_live' })} (0 {intl.formatMessage({ id: 'all_people' })})
        </div>
        <div className="promotion__content-filter px-3">
          <p className="text-center">
            Ngày 1 Tháng 6 Năm 2022 <img src="/assets/images/icon-filter.png" width={15} alt="icon-filter" />
          </p>
          <div className="filter">
            <Input className="login__input filter-input" type="text" size="default" placeholder="UID" />
            <Select
              className="filter-select"
              size="middle"
              defaultValue="Xin vui lòng..."
              style={{
                width: 200,
              }}
            >
              {children}
            </Select>
            <button className="filter-button">{intl.formatMessage({ id: 'search' })}</button>
          </div>
          <div className="total">
            <span>{intl.formatMessage({ id: 'place_a_bet' })}:0</span>
            <span>{intl.formatMessage({ id: 'total_price' })}:0</span>
          </div>
        </div>
        <TableComponent intl={intl} dataSource={dataTeam} columns={columnTeam} />
      </section>
    </div>
  );
}

export default injectIntl(MyTeam);
