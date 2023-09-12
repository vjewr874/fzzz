/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Button, Table } from 'antd';
import Loader from './../../components/Loader';
export default function OverView() {
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  }, []);
  const dataSource = [
    {
      key: '1',
      name: 'Cấp 0',
      age: '0',
      address: '1,000,000,000',
      test: '1,000,000,000',
    },
  ];

  const columns = [
    {
      title: 'Cấp đại lý',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số người',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tiền nạp đội',
      dataIndex: 'test',
      key: 'test',
    },
  ];
  const dataSource2 = [
    {
      key: '1',
      name: 'Cấp 0',
      age: '0%',
      address: '0%',
      test: '0%',
      test2: '0%',
    },
  ];

  const columns2 = [
    {
      title: 'Cấp bậc',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'F1 Doanh thu',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'F2 Doanh thu',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'F3 Doanh thu',
      dataIndex: 'test',
      key: 'test',
    },
    {
      title: 'F4 Doanh thu',
      dataIndex: 'test',
      key: 'test2',
    },
  ];
  return (
    <>
      {isVisible ? <Loader /> : null}
      <embed
        height="800px"
        src={`${require('../../assets/images/guideline.pdf')}#toolbar=0&navpanes=0&scrollbar=0`}
        className="profile__customer-banner w-100"
      />
    </>
  );
}
