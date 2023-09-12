/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './index.scss';
import SystemConfiguration from '../../services/systemConfiguration';
import { IconButtonCSKH, IconNextBlack, IconButtonTelegram } from './../../assets/icons/index';

function Customer(props) {
  const { history } = props;
  const [system, setsystem] = useState({});

  useEffect(() => {
    SystemConfiguration.systemConfigurationGetDetail().then(res => {
      const { data, isSuccess } = res;
      if (isSuccess) {
        setsystem(data);
      }
    });
  }, []);

  return (
    <div className="profile pb-3">
      <Header
        goBack={() => {
          history.goBack();
        }}
        title="Khách hàng"
      />
      <div className="relative-parent">
        <img src={require('../../assets/images/customerBanner.png')} className="profile__customer-banner" />
        <div className="profile__customer-banner__text">
          Hỗ trợ bạn
          <br /> mọi lúc,
          <br /> mọi nơi.
        </div>
      </div>

      <div className="branch__footer branch__footer__second">
        <div
          onClick={() => {
            window.open(system.supportChatUrlVI || '');
          }}
          className="d-flex align-items-center branch__footer__item"
        >
          <IconButtonCSKH className="me-2" /> CSKH trực tuyến <IconNextBlack className="ms-auto" />
        </div>
      </div>
      <div className="branch__footer branch__footer__second">
        <div
          onClick={() => {
            window.open(system.telegramGroupUrl || '');
          }}
          className="d-flex align-items-center branch__footer__item"
        >
          <IconButtonTelegram className="me-2" /> Telegram <IconNextBlack className="ms-auto" />
        </div>
      </div>
    </div>
  );
}

export default Customer;
