/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Table, DatePicker, Input, Select, Button, notification } from 'antd';
import './myTeam.scss';
import moment from 'moment';
import Loader from '../../components/Loader';
import _ from 'lodash';
import { formatToPrice } from '../../helper/common';
import Statistical from '../../services/statistical';
const { Option } = Select;
const DEFAULT_FILTER = {
  limit: 20,
  skip: 0,
};
export default function OverView() {
  const intl = useIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  function userSummaryReferUser(filter) {
    setIsVisible(true);
    Statistical.userSummaryReferUser(filter).then(result => {
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

  useEffect(() => {
    userSummaryReferUser(filter);
  }, []);

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Nạp ',
      dataIndex: 'totalDeposit',
      key: 'totalDeposit',
      render: (text, row, index) => {
        return <div>{formatToPrice(text)}</div>;
      },
    },
    {
      title: 'Rút ',
      dataIndex: 'totalWithdraw',
      key: 'totalWithdraw',
      render: (text, row, index) => {
        return <div>{formatToPrice(text)}</div>;
      },
    },
    {
      title: 'Mua ',
      dataIndex: 'totalBuy',
      key: 'totalBuy',
      render: (text, row, index) => {
        return <div>{formatToPrice(text)}</div>;
      },
    },
    {
      title: 'Hoa hồng',
      dataIndex: 'totalBonus',
      key: 'totalBonus',
      render: (text, row, index) => {
        return <div>{formatToPrice(text)}</div>;
      },
    },
  ];

  return (
    <>
      <div className="overview__guide">Đội trực tiếp ({dataList.total} người)</div>
      {/* <div className="myTeam__date">
            <DatePicker  defaultValue={moment()} />
        </div>
        <div className="row">
            <div className="col-4">
                <Input placeholder="UID"></Input>
            </div>
            <div className="col-4">
              <Select  className="w-100" placeholder="Xin vui lòng...">
                <Option value={"1"}>Cấp 1</Option>
                <Option value={"2"}>Cấp 2</Option>
                <Option value={"3"}>Cấp 3</Option>
                <Option value={"4"}>Cấp 4</Option>
              </Select>
            </div>
            <div className="col-4">
              <Button className="w-100">Tìm kiếm</Button>
            </div>
        </div> */}
      <div className="p-3 pt-0 pb-0">
        <div className="mt-3 ">
          Tổng số tiền mua: <strong>{dataList?.totalBuy}</strong>
        </div>
        <div className="mb-3">
          Tổng số tiền hoa hồng: <strong>{dataList?.totalBonus?.bonusTotal}</strong>
        </div>
      </div>
      <Table
        scroll={{
          x: 325,
        }}
        className="overview__table"
        dataSource={dataList?.data || []}
        columns={columns}
        pagination={
          dataList.total < filter.limit
            ? false
            : {
                onChange: page => {
                  const skip = (page - 1) * filter.limit;
                  const newFilter = {
                    ...filter,
                    skip,
                  };
                  setFilter(newFilter);
                  userSummaryReferUser(newFilter);
                },
                total: dataList.total,
                pageSize: filter.limit,
                showSizeChanger: false,
                position: ['bottomLeft'],
              }
        }
      />
      {isVisible ? <Loader /> : null}
    </>
  );
}
