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
function MyTicket(props) {
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
      title: 'Lớn nhỏ',
      dataIndex: 'branch',
      key: 'branch',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">{/* {userRole(row, user)} */}</span>
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
    <div className="d-flex align-items-center justify-content-center">
      <img src="assets/images/NoData.png" alt="no-data" />
    </div>
  );
}
export default MyTicket;
