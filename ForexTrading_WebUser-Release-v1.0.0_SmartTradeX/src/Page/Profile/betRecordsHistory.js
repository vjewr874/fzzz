/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { notification, Tabs, Table } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { IconCalendar } from './../../assets/icons/index';
import Loader from './../../components/Loader';
import BetRecordsService from './../../services/betRecordsService';
import { useIntl } from 'react-intl';
import Header from '../../components/Header';
import { number_to_price } from 'helper/common';
import { IconNoData } from './../../assets/icons/index';
const DEFAULT_FILTER = {
  filter: {
    betRecordType: 'WINGO1',
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};

const DEFAULT_FILTER2 = {
  filter: {
    betRecordType: 'K31',
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};

const DEFAULT_FILTER3 = {
  filter: {
    betRecordType: '5D1',
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};
function BetRecordsHistory(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [filter2, setFilter2] = useState(DEFAULT_FILTER2);
  const [filter3, setFilter3] = useState(DEFAULT_FILTER3);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const [dataList2, setDataList2] = useState({ data: [], total: 0 });
  const [dataList3, setDataList3] = useState({ data: [], total: 0 });
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  function getList(filter, setDataFunc) {
    setIsVisible(true);
    BetRecordsService.getList(filter).then(result => {
      const { isSuccess, message, data } = result;
      setIsVisible(false);
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong'),
        });
        return;
      } else {
        setDataFunc(data);
      }
    });
  }

  const onChangeTab = key => {
    setActiveKey(key);
  };

  const columns2 = [
    {
      title: 'Kỳ sổ',
      dataIndex: 'betRecordId',
      key: 'betRecordId',
    },
    {
      title: 'Số lượng',
      dataIndex: 'betRecordAmountIn',
      key: 'betRecordAmountIn',
      render: (text, row, index) => {
        const { betRecordAmountIn } = row;
        return (
          <span className="management__box__coin recharge_history__normal_text">
            {number_to_price(betRecordAmountIn)}
          </span>
        );
      },
    },
    {
      title: 'Lớn nhỏ',
      dataIndex: 'betRecordStatus',
      key: 'betRecordStatus',
    },

    {
      title: 'Kết quả',
      dataIndex: 'betRecordValue',
      key: 'betRecordValue',
    },
  ];

  useEffect(() => {
    getList(filter, setDataList);
    getList(filter2, setDataList2);
    getList(filter3, setDataList3);
  }, []);

  return (
    <section className="management packet mb-0">
      <Header title={'Lịch sử mua'} headerRight={<IconCalendar />}></Header>

      <div>
        <Tabs defaultActiveKey="1" onChange={onChangeTab} className="bg-gray profile__tab">
          <Tabs.TabPane tab={'Win GO'} key="1">
            {!dataList.total ? (
              <div className="text-center">
                <IconNoData />
              </div>
            ) : (
              <Table
                scroll={{
                  x: 325,
                }}
                className="overview__table"
                dataSource={dataList?.data}
                columns={columns2}
                pagination={{
                  onChange: page => {
                    const skip = (page - 1) * filter.limit;
                    const newFilter = {
                      ...filter,
                      skip,
                    };
                    setFilter(newFilter);
                    getList(newFilter, setDataList);
                  },
                  total: dataList.total,
                  pageSize: filter.limit,
                  showSizeChanger: false,
                  position: ['bottomLeft'],
                }}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab={'K3 Lotre'} key="2"></Tabs.TabPane>
          <Tabs.TabPane tab={'5D Lotre'} key="3"></Tabs.TabPane>
        </Tabs>
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  );
}
export default BetRecordsHistory;
