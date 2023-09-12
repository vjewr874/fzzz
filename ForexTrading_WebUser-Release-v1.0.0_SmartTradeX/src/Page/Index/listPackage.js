/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Button, notification } from 'antd';
import { formatToUSDPrice, formatToPrice } from 'helper/common';
import React, { useEffect, useState } from 'react';
import PaymentServicePackage from '../../services/paymentServicePackage';
import { ThunderButton, IconHourglass, IconGold, IconThunderbolt } from '../../assets/icons';
import Loader from 'components/Loader';
import { useHistory } from 'react-router-dom';
import SystemConfiguration from './../../services/systemConfiguration';
const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 8,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};
function ListPackage() {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const [configData, setConfigData] = useState({});

  function systemConfigurationFind() {
    SystemConfiguration.systemConfigurationFind().then(result => {
      const { isSuccess, message, data } = result;
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong'),
        });
        return;
      } else {
        if (data.data) {
          setConfigData(data.data[0]);
        }
      }
    });
  }

  function getList() {
    setIsVisible(true);
    PaymentServicePackage.getListPackageHome(DEFAULT_FILTER).then(result => {
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
    getList();
    systemConfigurationFind();
  }, []);
  return (
    <div data-aos="fade-up" className="aos-init">
      <div className="list_package">
        <span className="home__title home__title-upper">
          {' '}
          <span className="list_package__green">Bảng giá</span> Gói đào coin
        </span>
        <div className="container">
          <div className="row">
            {dataList.data.map(item => {
              return (
                <div className="col-12 col-lg-4 col-md-6">
                  <div className="packet__box packet__box--home-page">
                    <div className="packet__box__name">{item.packageName}</div>
                    <div className="packet__box__name packet__box__name-second">
                      {/* {item.packagePrice && formatToUSDPrice(item.packagePrice)} */}
                      {item.packagePrice && configData.exchangeVNDPrice && (
                        <span className="packet__box__name-sub">
                          {formatToPrice(item.packagePrice * configData.exchangeVNDPrice)} vnd
                        </span>
                      )}
                    </div>
                    <div className="packet__box__des">{item.packageDescription}</div>
                    <div className="d-flex align-items-center ">
                      <div className="packet__item-left">
                        <IconThunderbolt /> Năng suất
                      </div>
                      <div className="ml-auto  packet__item-right packet__item-right-second">
                        {item.packagePerformance} coin / ngày
                      </div>
                    </div>
                    <div className="management__box__hr packet__box__hr"></div>
                    <div className="d-flex align-items-center ">
                      <div className="packet__item-left">
                        <IconHourglass /> Kì hạn
                      </div>
                      <div className="ml-auto packet__item-right">{item.packageDuration} ngày</div>
                    </div>
                    <div className="management__box__hr packet__box__hr"></div>
                    <div className="d-flex align-items-center ">
                      <div className="packet__item-left">
                        <IconGold /> Loại coin
                      </div>
                      <div className="ml-auto  packet__item-right">Coin FAC</div>
                    </div>
                    <Button
                      className="login__button login__button-transparent blue_button mt-3 py-2"
                      type="primary"
                      size="large"
                      onClick={() => {
                        history.push('/management/packet');
                      }}
                    >
                      MUA NGAY
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Button
            className="login__button list_package__btn_see_all py-2"
            type="primary"
            type="submit"
            size="large"
            onClick={() => {
              history.push('/management/packet');
            }}
          >
            <ThunderButton /> Xem tất cả
          </Button>
        </div>
        {isVisible ? <Loader /> : null}
      </div>
    </div>
  );
}
export default ListPackage;
