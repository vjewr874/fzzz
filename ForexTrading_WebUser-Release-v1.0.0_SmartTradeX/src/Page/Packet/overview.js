/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Button, Table, notification } from 'antd';
import { useSelector } from 'react-redux';
import { copyToClipboard } from '../../helper/common';
import { routes } from './../../App';
import Statistical from '../../services/statistical';
import Loader from '../../components/Loader';
const DEFAULT_FILTER = {
  limit: 20,
  skip: 0,
};
export default function OverView() {
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const { referQRCode, referLink, username } = useSelector(state => (state.member ? state.member : {}));
  const [isVisible, setIsVisible] = useState(false);
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
  const dataSource = [
    {
      key: '1',
      name: 'Cấp 0',
      age: '0',
      address: '0',
      test: '0',
    },
    {
      key: '1',
      name: 'Cấp 1',
      age: '10',
      address: '1,000,000,000',
      test: '1,000,000,000',
    },
    {
      key: '2',
      name: 'Cấp 2',
      age: '15',
      address: '1,500,000,000',
      test: '1,500,000,000',
    },
    {
      key: '3',
      name: 'Cấp 3',
      age: '30',
      address: '2,000,000,000',
      test: '2,000,000,000',
    },
    {
      key: '4',
      name: 'Cấp 4',
      age: '45',
      address: '2,500,000,000',
      test: '2,500,000,000',
    },
    {
      key: '5',
      name: 'Cấp 5',
      age: '50',
      address: '3,000,000,000',
      test: '3,000,000,000',
    },
    {
      key: '6',
      name: 'Cấp 6',
      age: '60',
      address: '5,000,000,000',
      test: '5,000,000,000',
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
      age: '0.6%',
      address: '0.18%',
      test: '0.18%',
      test2: '0.0162%',
    },
    {
      key: '2',
      name: 'Cấp 1',
      age: '0.7%',
      address: '0.21%',
      test: '0.18%',
      test2: '0.0162%',
    },
    {
      key: '3',
      name: 'Cấp 2',
      age: '0.75%',
      address: '0.225%',
      test: '0.18%',
      test2: '0.0162%',
    },
    {
      key: '4',
      name: 'Cấp 3',
      age: '0.8%',
      address: '0.24%',
      test: '0.18%',
      test2: '0.0162%',
    },
    {
      key: '5',
      name: 'Cấp 4',
      age: '0.85%',
      address: '0.255%',
      test: '0.18%',
      test2: '0.0162%',
    },
    {
      key: '6',
      name: 'Cấp 5',
      age: '0.9%',
      address: '0.27%',
      test: '0.18%',
      test2: '0.0162%',
    },
    {
      key: '7',
      name: 'Cấp 6',
      age: '1%',
      address: '0.3%',
      test: '0.18%',
      test2: '0.0162%',
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
      <div className="overview__guide">{t('guide')}</div>
      <div className="row mt-3 p-2">
        <div className="col-6">
          <div className="overview__card">
            <div className="overview__tile">
              Hoa hồng <br />
              ngày hôm qua
            </div>
            <div className="overview__number">{dataList?.totalBonus?.bonusYesterdayTotal}</div>
            <div className="overview__des overview__des__second">
              Hoa hồng trực tiếp: {dataList?.totalBonus?.bonusYesterdayF1}
            </div>
            <div className="overview__des overview__des__second">
              Hoa hồng đội: {dataList?.totalBonus?.bonusYesterdaySystem}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="overview__card">
            <div className="overview__des">
              Cấp dưới trực tiếp: <span className="overview__des__number">{dataList?.totalMember?.totalF1 || 0}</span>
            </div>
            <div className="overview__des">
              Tổng thành viên: <span className="overview__des__number">{dataList?.totalMember?.totalSystem || 0}</span>
            </div>
            <div className="overview__des">
              F1 mới hôm nay: <span className="overview__des__number">{dataList?.totalMember?.totalNewF1 || 0}</span>
            </div>
            <div className="overview__des">
              Tổng hoa hồng trong tuần:{' '}
              <span className="overview__des__number">{dataList?.bonusThisWeekTotal?.totalMember || 0}</span>
            </div>
            <div className="overview__des">
              Tổng hoa hồng: <span className="overview__des__number">{dataList?.totalBonus?.bonusTotal || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3 p-2">
        <div className="col-6 ">
          <img src={referQRCode} alt="qrcode" className="mb-2" />

          <div className="overview__des">Nhấn và giữ để lưu mã QR</div>
        </div>
        <div className="col-6 overview__qr">
          <Button
            onClick={() => {
              copyToClipboard(referLink);
            }}
            className="mb-3 w-100"
          >
            Sao chép Mã giới thiệu
          </Button>
          <Button
            onClick={() => {
              copyToClipboard(`${window.location.host}${routes.register.path}?refer=${username}`);
            }}
            className="w-100"
          >
            Sao chép đường dẫn
          </Button>
        </div>
      </div>
      <div className="overview__guide mt-3">Bảng Doanh thu đại lý</div>
      <Table className="overview__table" pagination={false} dataSource={dataSource} columns={columns} />
      <div className="overview__guide mt-3">Cách tính hoa hồng</div>
      <Table
        scroll={{
          x: 325,
        }}
        className="overview__table"
        pagination={false}
        dataSource={dataSource2}
        columns={columns2}
      />
      {isVisible ? <Loader /> : null}
    </>
  );
}
