/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Pagination, notification, Table } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { IconNoData } from './../../assets/icons/index';
import GameRecordsService from './../../services/gameRecordService';
import { useIntl } from 'react-intl';
import Loader from 'components/Loader';
import moment from 'moment';
import _ from 'lodash';
const DEFAULT_FILTER = {
  filter: {
    gameRecordType: 'WINGO1',
  },
  skip: 0,
  limit: 20,
};
function History(props) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  useEffect(() => {
    handleFetchData(filter);
  }, []);

  function handleFetchData(filter) {
    setIsVisible(true);
    GameRecordsService.getList(filter).then(result => {
      const { isSuccess, message, data } = result;
      setIsVisible(false);
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong'),
        });
        return;
      } else {
        setDataList(data);
      }
    });
  }
  const columns = [
    {
      title: 'Kỳ sổ',
      dataIndex: 'gameRecordSection',
      key: 'gameRecordSection',
      render: (text, row, index) => {
        const { gameRecordSection } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">{gameRecordSection}</span>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'gameRecordUnit',
      key: 'gameRecordUnit',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">{text}</span>
          </div>
        );
      },
    },
    {
      title: 'Lớn nhỏ',
      dataIndex: 'gameRecordValue',
      key: 'gameRecordValue',
      render: (text, row, index) => {
        const { gameRecordValue } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {parseInt(gameRecordValue) > 4 ? 'Lớn' : 'Nhỏ'}
            </span>
          </div>
        );
      },
    },
    {
      title: 'màu sắc',
      dataIndex: 'totalpackagePaymentAmount',
      key: 'totalpackagePaymentAmount',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {/* {userLevel(row?.appUsermembershipId)} */}
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <section className="management packet">
      <Table
        scroll={{
          x: 325,
        }}
        className="overview__table win-go__table__history"
        pagination={false}
        dataSource={dataList?.data || []}
        columns={columns}
        locale={{
          emptyText: (
            <div className="text-center">
              <IconNoData />
            </div>
          ),
        }}
      />
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
      {isVisible ? <Loader /> : null}
    </section>
  );
}
export default History;
