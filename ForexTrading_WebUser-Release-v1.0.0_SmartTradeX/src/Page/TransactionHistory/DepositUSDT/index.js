/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { formatToUSDTPrice } from '../../../helper/common';
import Loader from '../../../components/Loader';
import { notification, Table, DatePicker } from 'antd';
import PaymentDepositTransaction from '../../../services/paymentDepositTransaction';
import moment from 'moment';
import TransactionRender from 'components/Loader/transactionRender';
import useDateFilter from 'hooks/useDateFilter';
import { useIntl } from 'react-intl';
import { IconNoData } from './../../../assets/icons/index';
import Header from '../../../components/Header';
function RechargeHistory() {
  const { startDate, endDate, onChangeEndDate, onChangeStartDate, filter, setFilter, onKeyDown, disabledDate } =
    useDateFilter({ callback: rechargeHistory });
  const [isVisible, setIsVisible] = useState(false);
  const [dataList, setDataList] = useState({ data: [], total: 0 });

  // useIntl template
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  function rechargeHistory(filter) {
    setIsVisible(true);
    PaymentDepositTransaction.depositHistory(filter).then(result => {
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
      width: '120px',
      render: (text, row, index) => {
        const { createdAt } = row;
        return <span className="">{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
    {
      title: t('status'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text, row, index) => {
        const { paymentStatus } = row;
        return <span className="">{TransactionRender({ paymentStatus, intl })}</span>;
      },
    },
    {
      title: t('deposit_amount'),
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      render: (text, row, index) => {
        const { paymentAmount } = row;
        return <span className="">{formatToUSDTPrice(paymentAmount, false)}</span>;
      },
    },

    {
      title: t('note'),
      dataIndex: 'paymentNote',
      key: 'paymentNote',
      render: (text, row, index) => {
        const { paymentNote } = row;
        return <span className="">{paymentNote}</span>;
      },
    },
  ];

  return (
    <>
      <Header title="Lịch sử nạp tiền" />
      <section className="management recharge_history">
        <div className="management__box">
          <div className="recharge_history__header">
            <div className="recharge_history__group_select_date">
              <DatePicker
                inputReadOnly={true}
                onKeyDown={e => onKeyDown(e)}
                value={startDate}
                format="YYYY-MM-DD"
                placeholder={`${t('from')}: YY-MM-DD`}
                onChange={date => onChangeStartDate(date)}
              />
              <DatePicker
                inputReadOnly={true}
                onKeyDown={e => onKeyDown(e)}
                value={endDate}
                disabledDate={disabledDate}
                placeholder={`${t('to')}: YY-MM-DD`}
                format="YYYY-MM-DD"
                className="recharge_history__select_date"
                onChange={date => onChangeEndDate(date)}
              />
            </div>
          </div>
          {dataList.total ? (
            <Table
              className="overview__table"
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
          ) : (
            <div className="text-center">
              <IconNoData />
            </div>
          )}
        </div>
        {isVisible ? <Loader /> : null}
      </section>
    </>
  );
}
export default RechargeHistory;
