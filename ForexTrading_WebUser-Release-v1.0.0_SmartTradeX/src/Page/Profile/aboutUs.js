/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './index.scss';
import SystemConfiguration from '../../services/systemConfiguration';
import { IconButtonCSKH, IconNextBlack, IconButtonTelegram } from './../../assets/icons/index';
import { routes } from './../../App';
function AboutUs(props) {
  const { history } = props;

  return (
    <div className="profile pb-3">
      <Header
        goBack={() => {
          history.goBack();
        }}
        title="Giới thiệu về chúng tôi"
      />
      <div className="relative-parent">
        <img src={require('../../assets/images/aubot-us.png')} className="profile__customer-banner" />
        <div className="profile__customer-banner__text">
          LuckyLott68
          <br /> Trò chơi,
          <br /> V1.0.0.
        </div>
      </div>

      <div className="branch__footer branch__footer__second">
        <div
          onClick={() => {
            history.push(routes.managementProfilePolicy.path);
          }}
          className="d-flex align-items-center branch__footer__item"
        >
          Chính sách bảo mật <IconNextBlack className="ms-auto" />
        </div>
      </div>
      <div className="branch__footer branch__footer__second">
        <div
          onClick={() => {
            history.push(routes.managementProfileIntroOverview.path);
          }}
          className="d-flex align-items-center branch__footer__item"
        >
          Thảo luận tiết lộ rủi ro
          <IconNextBlack className="ms-auto" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
