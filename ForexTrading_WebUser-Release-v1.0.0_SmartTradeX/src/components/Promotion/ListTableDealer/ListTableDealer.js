/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import TableComponent from '../Table/Table';
import { injectIntl } from 'react-intl';

function ListTableDealer(props) {
  const { intl } = props;
  const dataDealer = [
    {
      key: '1',
      level: 'Cấp 1',
      qty: 30,
      total: 1000000,
      totalGroup: 2000000,
    },
    {
      key: '2',
      level: 'Cấp 2',
      qty: 30,
      total: 1000000,
      totalGroup: 2000000,
    },
    {
      key: '3',
      level: 'Cấp 3',
      qty: 30,
      total: 1000000,
      totalGroup: 2000000,
    },
    {
      key: '4',
      level: 'Cấp 4',
      qty: 30,
      total: 1000000,
      totalGroup: 2000000,
    },
  ];
  const columnDealer = [
    {
      title: 'Cấp đại lý',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Số người',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Danh thu ...',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Tiền nạp đội',
      dataIndex: 'totalGroup',
      key: 'totalGroup',
    },
  ];
  const dataF1 = [0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 1];

  const dataFormula = dataF1.map((item, index) => {
    return {
      key: index,
      level: 'Cấp ' + index,
      total1: item + '%',
      total2: (item * 0.3).toFixed(3) + '%',
      total3: (item * 0.9).toFixed(3) + '%',
      total4: (item * 0.027).toFixed(3) + '%',
    };
  });

  const columnFomula = [
    {
      title: <div>Cấp bậc</div>,
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: (
        <div>
          F1<p>Doanh thu</p>
        </div>
      ),
      dataIndex: 'total1',
      key: 'total1',
    },
    {
      title: (
        <div>
          F2<p>Doanh thu</p>
        </div>
      ),
      dataIndex: 'total2',
      key: 'total2',
    },
    {
      title: (
        <div>
          F3<p>Doanh thu</p>
        </div>
      ),
      dataIndex: 'total3',
      key: 'total3',
    },
    {
      title: (
        <div>
          F4<p>Doanh thu</p>
        </div>
      ),
      dataIndex: 'total4',
      key: 'total4',
    },
  ];
  return (
    <div>
      <section className="promotion__content mb-3">
        <div className="promotion__content-title px-3 mb-3 text-uppercase">
          {intl.formatMessage({ id: 'table_total' })}
        </div>
        <TableComponent intl={intl} dataSource={dataDealer} columns={columnDealer} />
      </section>
      <section className="promotion__content mb-3">
        <div className="promotion__content-title px-3 mb-3">{intl.formatMessage({ id: 'caculation_point' })}</div>
        <TableComponent intl={intl} dataSource={dataFormula} columns={columnFomula} />
      </section>
    </div>
  );
}

export default injectIntl(ListTableDealer);
