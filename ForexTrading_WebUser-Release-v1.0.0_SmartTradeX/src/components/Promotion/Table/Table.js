/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import { Table } from 'antd';
import './Table.scss';
import { injectIntl } from 'react-intl';

function TableComponent(props) {
  const { dataSource, columns } = props;
  const { intl } = props;
  let locale = {
    emptyText: (
      <div>
        <img width={163} height={163} src="assets/images/no-data.png" alt="no-data" />
        <p className="no-data">{intl.formatMessage({ id: 'no_data' })}</p>
      </div>
    ),
  };
  return <Table className="cpn_table px-3" locale={locale} dataSource={dataSource} columns={columns} />;
}

export default injectIntl(TableComponent);
