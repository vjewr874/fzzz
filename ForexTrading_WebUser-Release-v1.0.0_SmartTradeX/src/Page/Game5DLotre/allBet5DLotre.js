/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { notification, Tabs, Table } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import swal from 'sweetalert';
import Loader from './../../components/Loader';
import BetRecordsService from './../../services/betRecordsService';
import { useIntl } from 'react-intl';
import Header from '../../components/Header';
import { number_to_price } from 'helper/common';
import { IconNoData } from './../../assets/icons/index';
const DEFAULT_FILTER = {
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

const DEFAULT_FILTER2 = {
  filter: {
    betRecordType: '5D3',
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
    betRecordType: '5D5',
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};

const DEFAULT_FILTER4 = {
  filter: {
    betRecordType: '5D10',
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};
function AllBet5DLotre(props) {
  const { history } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('5D1');
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [filter2, setFilter2] = useState(DEFAULT_FILTER2);
  const [filter3, setFilter3] = useState(DEFAULT_FILTER3);
  const [filter4, setFilter4] = useState(DEFAULT_FILTER4);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const [dataList2, setDataList2] = useState({ data: [], total: 0 });
  const [dataList3, setDataList3] = useState({ data: [], total: 0 });
  const [dataList4, setDataList4] = useState({ data: [], total: 0 });
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
    if (key === '5D1') {
      getList(DEFAULT_FILTER, setDataList);
    } else if (key === '5D3') {
      getList(DEFAULT_FILTER2, setDataList2);
    } else if (key === '5D5') {
      getList(DEFAULT_FILTER3, setDataList3);
    } else {
      getList(DEFAULT_FILTER4, setDataList4);
    }
  };

  const columns2 = [
    {
      title: 'Kỳ sổ',
      dataIndex: 'betRecordSection',
      key: 'betRecordSection',
      className: 'text-center',
      render: (text, row, index) => {
        return (
          <>
            <div>{text}</div>
          </>
        );
      },
    },

    {
      title: 'Số tiền',
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
      title: 'Đặt',
      dataIndex: 'betRecordValue',
      key: 'betRecordValue',
      render: (text, row, index) => {
        const { betRecordValue } = row;
        const newData = betRecordValue.split(';');
        let textValue = newData[1];
        if (newData[1] === 'LON') {
          textValue = 'Lớn';
        } else if (newData[1] === 'NHO') {
          textValue = 'Nhỏ';
        } else if (newData[1] === 'CHAN') {
          textValue = 'Chẵn';
        } else if (newData[1] === 'LE') {
          textValue = 'Lẻ';
        }
        return (
          <span className="management__box__coin recharge_history__normal_text">
            {newData[0]};{textValue}
          </span>
        );
      },
    },
    {
      title: 'Kết quả',
      dataIndex: 'betRecordWin',
      key: 'betRecordWin',
      render: (text, row, index) => {
        const { betRecordWin, betRecordStatus } = row;
        return (
          <span
            className={`management__box__coin recharge_history__normal_text ${
              betRecordWin ? 'text-success' : 'text-danger'
            }`}
          >
            {betRecordStatus === 'New' ? '' : betRecordWin}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getList(filter, setDataList);
  }, []);

  return (
    <section className="management packet mb-0">
      <Header
        goBack={() => {
          history.goBack();
        }}
        title={'5D Lotre'}
      ></Header>

      <div>
        <Tabs defaultActiveKey="1" onChange={onChangeTab} className="bg-gray profile__tab">
          <Tabs.TabPane tab={'5D 1 Phút'} key="5D1">
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
          <Tabs.TabPane tab={'5D 3 Phút'} key="5D3">
            {!dataList2.total ? (
              <div className="text-center">
                <IconNoData />
              </div>
            ) : (
              <Table
                scroll={{
                  x: 325,
                }}
                className="overview__table"
                dataSource={dataList2?.data}
                columns={columns2}
                pagination={{
                  onChange: page => {
                    const skip = (page - 1) * filter2.limit;
                    const newFilter = {
                      ...filter2,
                      skip,
                    };
                    setFilter2(newFilter);
                    getList(newFilter, setDataList2);
                  },
                  total: dataList2.total,
                  pageSize: filter2.limit,
                  showSizeChanger: false,
                  position: ['bottomLeft'],
                }}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab={'5D 5 Phút'} key="5D5">
            {!dataList3.total ? (
              <div className="text-center">
                <IconNoData />
              </div>
            ) : (
              <Table
                scroll={{
                  x: 325,
                }}
                className="overview__table"
                dataSource={dataList3?.data}
                columns={columns2}
                pagination={{
                  onChange: page => {
                    const skip = (page - 1) * filter3.limit;
                    const newFilter = {
                      ...filter3,
                      skip,
                    };
                    setFilter3(newFilter);
                    getList(newFilter, setDataList3);
                  },
                  total: dataList3.total,
                  pageSize: filter3.limit,
                  showSizeChanger: false,
                  position: ['bottomLeft'],
                }}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab={'5D 10 Phút'} key="5D10">
            {!dataList4.total ? (
              <div className="text-center">
                <IconNoData />
              </div>
            ) : (
              <Table
                scroll={{
                  x: 325,
                }}
                className="overview__table"
                dataSource={dataList4?.data}
                columns={columns2}
                pagination={{
                  onChange: page => {
                    const skip = (page - 1) * filter4.limit;
                    const newFilter = {
                      ...filter4,
                      skip,
                    };
                    setFilter4(newFilter);
                    getList(newFilter, setDataList4);
                  },
                  total: dataList4.total,
                  pageSize: filter4.limit,
                  showSizeChanger: false,
                  position: ['bottomLeft'],
                }}
              />
            )}
          </Tabs.TabPane>
        </Tabs>
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  );
}
export default AllBet5DLotre;
