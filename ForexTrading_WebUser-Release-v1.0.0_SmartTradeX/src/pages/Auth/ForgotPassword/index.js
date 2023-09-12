/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import Page from '../../../components/Page/Page';
import { injectIntl } from 'react-intl';
import LoginService from '../../../services/loginService';
import swal from 'sweetalert';
import { routes } from '../../../App';

//styles
import './styles/forgot-password.scss';

//icons
import icEmail from '../../../assets/stock-icons/ic-email.svg';
import icPassword from '../../../assets/stock-icons/ic-password.svg';
import icConfirm from '../../../assets/stock-icons/ic-confirm.svg';
import icShowPassword from '../../../assets/stock-icons/ic-show.svg';
import icPasswordOff from '../../../assets/stock-icons/ic-password-off.svg';
import Loader from '../../../components/Loader';

function ForgotPassword(props) {
  const { history, intl } = props;
  const [form] = Form.useForm();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onFinish(values) {
    sendOTP(values);
  }

  function sendOTP(values) {
    values = form.getFieldsValue();
    const newData = {
      email: values?.email,
      newPassword: values?.newPassword,
      otpCode: values?.otpCode,
    };
    setIsLoading(true);
    LoginService.changePasswordViaEmailOTP(newData).then(result => {
      const { isSuccess, error } = result;
      setIsLoading(false);
      if (!isSuccess) {
        if (error === 'OTP_CODE_INVALID') {
          swal(intl.formatMessage({ id: 'invalidOTP' }), {
            icon: 'warning',
          });
        } else if (error === 'INVALID_EMAIL') {
          swal(intl.formatMessage({ id: 'email_error' }), {
            icon: 'warning',
          });
        }
      } else {
        form.resetFields();
        history.push(routes.login.path);
      }
    });
  }

  function handleShowHidePassword() {
    setIsShowPass(!isShowPass);
  }

  function handleSendEmailOTP() {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email } = form.getFieldsValue();
    if (email && pattern?.test(email)) {
      setIsLoading(true);
      LoginService.requestEmailOTP({ email }).then(res => {
        setIsLoading(false);
        const { isSuccess } = res;
        if (!isSuccess) {
          swal(` ${intl?.formatMessage({ id: 'fail' })}`, {
            icon: 'error',
          });
        } else {
          swal(intl?.formatMessage({ id: 'send_email_otp_success' }), {
            icon: 'success',
          });
        }
      });
    } else {
      form.validateFields(['email']).then();
    }
  }

  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'forgot_password' })}>
      {isLoading ? <Loader /> : null}
      <div id="forgot">
        <div className="forgot-container">
          <Form
            name="login"
            autoComplete="off"
            form={form}
            onFinish={values => {
              onFinish(values);
            }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: '',
                },
                {
                  pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                  message: intl.formatMessage({ id: 'inValidEmail' }),
                },
              ]}
              style={{ marginBottom: '30px' }}
            >
              <div className="container-input">
                <div className="login__input__icon-phone position-absolute">
                  <img src={icEmail} alt="icon-phone" className="position-static" width={20} height={20} />
                </div>
                <Input
                  className="input"
                  placeholder={intl.formatMessage({ id: 'Please enter your email' })}
                  size="large"
                  style={{ backgroundColor: '#26264E', textAlign: 'left', paddingLeft: '38px' }}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="otpCode"
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
              style={{ marginBottom: '30px' }}
            >
              <div className="container-input">
                <div className="login__input__icon-phone position-absolute">
                  <img src={icConfirm} alt="icon-phone" className="position-static" width={20} height={20} />
                </div>
                <Input
                  className="input"
                  autoComplete="off"
                  placeholder={intl.formatMessage({ id: 'Please enter the verified code' })}
                  size="large"
                  style={{ backgroundColor: '#26264E', textAlign: 'left', paddingLeft: '38px' }}
                />
                <div className={'ic-show-password position-absolute'}>
                  <Button className="get-code" onClick={handleSendEmailOTP}>
                    {intl.formatMessage({ id: 'Get code' })}
                  </Button>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: '',
                },
                {
                  min: 6,
                  message: intl.formatMessage({ id: 'invalidPass' }),
                },
              ]}
              style={{ marginBottom: '40px' }}
            >
              <div className="container-input">
                <div className={'login__input__icon-phone position-absolute'}>
                  <img src={icPassword} alt="icon-lock" width={20} height={20} />
                </div>
                <Input
                  className="input"
                  type={isShowPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder={intl.formatMessage({ id: 'enter_new_password' })}
                  size="large"
                  style={{ background: '#26264E', textAlign: 'left', paddingLeft: '38px' }}
                />
                <div className={'ic-show-password position-absolute'}>
                  <img
                    src={!isShowPass ? icShowPassword : icPasswordOff}
                    alt="icon-lock"
                    width={24}
                    height={24}
                    onClick={handleShowHidePassword}
                  />
                </div>
              </div>
            </Form.Item>
            <div className="w-100 d-flex justify-content-center">
              <Button className="btn-main w-100" htmlType="submit" size="large">
                {intl.formatMessage({ id: 'setting_password' })}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Page>
  );
}
export default injectIntl(ForgotPassword);
