/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { notification, Table } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import PaymentServicePackage from 'services/paymentServicePackage';
import moment from 'moment';
import _ from 'lodash';
const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 10,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};
function FigureHistory(props) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  //   const dispatch = useDispatch();
  //   const history = useHistory();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  function rechargeHistory(filter) {
    // setIsVisible(true);
    const dateFilter = filter.filter;
    const newFilter = _.omit(filter, 'filter');
    // PaymentServicePackage.userGetListBranch(
    //   Object.assign(newFilter, dateFilter)
    // ).then((result) => {
    //   const { isSuccess, message, data } = result;
    //   // setIsVisible(false);
    //   if (!isSuccess || !data) {
    //     notification["error"]({
    //       message: "",
    //       description: message || t("something_wrong"),
    //     });
    //     return;
    //   } else {
    //     setDataList(data);
    //   }
    // });
  }
  useEffect(() => {
    rechargeHistory(filter);
  }, []);

  const columns = [
    {
      title: 'Kỳ sổ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, row, index) => {
        const { createdAt } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">{text}</span>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">{text}</span>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="figure_history__header d-flex ">
        <div className="figure_history__betNumber">Kỳ sổ</div>
        <div className="figure_history__quantity">Số lượng</div>
      </div>
      <div className="figure_history__support">
        <div>Hỗ trợ tham khảo (100 kỳ trước)</div>
        <div className="d-flex justify-content-end">
          <div className="d-flex">
            Số kỳ chưa xổ
            <div className="d-flex">
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex">
            Bình quân số kỳ
            <div className="d-flex">
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex">
            Tần số xuất hiện
            <div className="d-flex">
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
              <span>15</span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex">
            Lần xổ liên tiếp
            <div className="d-flex">
              <span>2</span>
              <span>1</span>
              <span>5</span>
              <span>2</span>
              <span>1</span>
              <span>5</span>
              <span>2</span>
              <span>1</span>
              <span>5</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      <Table
        dataSource={dataList.data}
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
        }}
      />
    </div>
  );
}
export default FigureHistory;
