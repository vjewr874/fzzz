/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Pagination, Collapse } from 'antd';

import React, { useEffect, useState } from 'react';
import { IconArrowUp } from '../../assets/icons/index';

import Header from '../../components/Header';
import CustomerService from '../../services/customerMessage';
import './index.scss';
const { Panel } = Collapse;
const DEFAULT_FILTER = {
  filter: {
    isRead: 0,
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};

function Packet(props) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  useEffect(() => {
    handleFetchData(filter);
  }, []);

  function handleFetchData(filter) {
    CustomerService.getListNotification(filter).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataList(data);
      }
    });
  }

  return (
    <section className="management packet pb-5">
      <Header title={'Thông báo mới nhất'} />
      {dataList?.total ? (
        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <IconArrowUp className={!isActive ? 'factory__up-arrow' : ''} rotate={isActive ? 90 : 0} />
          )}
          defaultActiveKey={['0']}
        >
          {dataList?.data?.map((item, index) => (
            <Panel header={item.customerMessageTitle} key={`${index}`}>
              {item.customerMessageContent}
            </Panel>
          ))}
        </Collapse>
      ) : (
        <div className="ms-2 mt-3">Không có thông báo nào</div>
      )}
      {dataList?.total < 20 ? null : (
        <Pagination
          onChange={page => {
            const newFilter = {
              ...filter,
              skip: (page - 1) * 20,
            };
            setFilter(newFilter);
            handleFetchData(newFilter);
          }}
          className="factory__pagination"
          simple
          pageSize={20}
          current={+filter.skip / 20 + 1}
          total={dataList?.total}
        />
      )}
    </section>
  );
}
export default Packet;
