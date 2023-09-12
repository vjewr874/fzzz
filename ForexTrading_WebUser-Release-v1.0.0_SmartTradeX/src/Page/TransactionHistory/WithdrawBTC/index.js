/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { formatToBTCPrice } from '../../../helper/common';
import Loader from '../../../components/Loader';
import { notification, Table, DatePicker } from 'antd';
import PaymentWithdrawTransaction from '../../../services/paymentWithdrawTransaction';
import moment from 'moment';
import TransactionRender from 'components/Loader/transactionRender';
import useDateFilter from 'hooks/useDateFilter';
import { useIntl } from 'react-intl';
import Header from '../../../components/Header';

function WithdrawBTC() {
  const { startDate, endDate, onChangeEndDate, onChangeStartDate, filter, setFilter, onKeyDown, disabledDate } =
    useDateFilter({ callback: rechargeHistory });

  const [isVisible, setIsVisible] = useState(false);
  const [dataList, setDataList] = useState({ data: [], total: 0 });

  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  function rechargeHistory(filter) {
    setIsVisible(true);
    const dateFilter = filter.filter;
    const newFilter = _.omit(filter, 'filter');
    PaymentWithdrawTransaction.withdrawHistory(Object.assign(newFilter, dateFilter)).then(result => {
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
    rechargeHistory(filter);
  }, []);

  const columns = [
    {
      title: t('time'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, row, index) => {
        const { createdAt } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="">{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
        );
      },
    },
    {
      title: t('status'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text, row, index) => {
        const { paymentStatus } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="">{TransactionRender({ paymentStatus, intl })}</span>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      with: '100px',
      className: 'text-center',
      render: (text, row, index) => {
        const { paymentAmount } = row;
        return (
          <div className="d-flex align-items-center text-center">
            <span className="">{formatToBTCPrice(paymentAmount, false)}</span>
          </div>
        );
      },
    },

    {
      title: t('note'),
      dataIndex: 'paymentNote',
      key: 'paymentNote',
      render: (text, row, index) => {
        const { paymentNote } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="">{paymentNote}</span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Header title="Lịch sử rút tiền" />
      <section className="management recharge_history">
        <div className="management__box">
          <div className="recharge_history__header">
            <div className="recharge_history__group_select_date">
              <DatePicker
                inputReadOnly={true}
                onKeyDown={e => onKeyDown(e)}
                value={startDate}
                placeholder={`${t('from')}: YY-MM-DD`}
                onChange={date => onChangeStartDate(date)}
              />
              <DatePicker
                inputReadOnly={true}
                onKeyDown={e => onKeyDown(e)}
                value={endDate}
                disabledDate={disabledDate}
                placeholder={`${t('to')}: YY-MM-DD`}
                className="recharge_history__select_date"
                onChange={date => onChangeEndDate(date)}
              />
            </div>
          </div>
          <Table
            dataSource={dataList.data}
            scroll={{ x: 400 }}
            columns={columns}
            pagination={{
              onChange: page => {
                const skip = (page - 1) * filter.limit;
                const newFilter = {
                  ...filter,
                  skip,
                };
                setFilter(newFilter);
                rechargeHistory(newFilter);
              },
              total: dataList.total,
              pageSize: filter.limit,
              showSizeChanger: false,
              position: ['bottomLeft'],
            }}
          />
        </div>
        {isVisible ? <Loader /> : null}
      </section>
    </>
  );
}
export default WithdrawBTC;
