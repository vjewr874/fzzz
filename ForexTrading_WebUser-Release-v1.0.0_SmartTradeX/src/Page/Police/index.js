/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import './index.scss';
import { injectIntl } from 'react-intl';

function Police(props) {
  const { history, intl } = props;

  return (
    <div className="register police">
      <img
        src="/assets/images/icon-back.png"
        alt="icon-back"
        onClick={() => {
          history.goBack();
        }}
      />
      <div id="recaptcha-container"></div>
      {/* <ChangeLanguage className={`my-4 ${nextTab === 'register' ? "" : "d-none"}`} /> */}
      <div className="register-header">{intl.formatMessage({ id: 'police' })}</div>
      <div className="h-100 d-flex align-items-center flex-column mx-auto px-3">
        <p>
          Chính sách Bảo mật này mô tả các chính sách và thủ tục của Chúng tôi về việc thu thập, sử dụng và tiết lộ
          thông tin của Bạn khi Bạn sử dụng Dịch vụ và cho Bạn biết về quyền riêng tư của Bạn và cách luật pháp bảo vệ
          Bạn
        </p>
      </div>
    </div>
  );
}

export default injectIntl(Police);
