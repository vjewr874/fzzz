/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState, useEffect } from 'react';
import { Form, notification, Button } from 'antd';
import './forgotPass.scss';
import Header from '../../components/Header';
import LoginService from '../../services/loginService';
import { injectIntl } from 'react-intl';
import { routes } from './../../App';
import SystemConfiguration from '../../services/systemConfiguration';

function ForgotPass(props) {
  const [form] = Form.useForm();
  const { history, intl } = props;
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
    <div className="">
      <Header
        goBack={() => {
          history.push(routes.login.path);
        }}
        title={intl.formatMessage({ id: 'forgot' })}
      ></Header>
      <div className="h-100 d-flex align-items-center flex-column mx-auto mt-3 text-center">
        Vui lòng liên hệ Admin để lấy lại mật khẩu. <br />
        Hân hạnh phục vụ Quý khách 24/7.
      </div>
      <div className="mt-3 w-100 text-center">
        <Button
          onClick={() => {
            window.open(system?.telegramGroupUrl);
          }}
          className="mt-3"
        >
          Liên hệ ngay
        </Button>
      </div>
    </div>
  );
}

export default injectIntl(ForgotPass);
