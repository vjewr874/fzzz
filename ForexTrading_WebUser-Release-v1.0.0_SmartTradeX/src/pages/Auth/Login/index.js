/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { routes } from '../../../App';
import { Button, Form, Input, Checkbox } from 'antd';
import Loader from '../../../components/Loader';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginService from '../../../services/loginService';
import swal from 'sweetalert';
import { handleSignin } from '../../../actions';
import './styles/login.scss';
import { injectIntl } from 'react-intl';
//icons
import icShowPassword from '../../../assets/stock-icons/ic-show.svg';
import imLogo from '../../../assets/stock-images/im-logo.png';
import icEmail from '../../../assets/stock-icons/ic-email.svg';
import icPassword from '../../../assets/stock-icons/ic-password.svg';
import icPasswordOff from '../../../assets/stock-icons/ic-password-off.svg';
import zntcApk from '../../../assets/files/ZntC.apk';
import ModalCustomerService from '../../../components/Modal/components/ModalCustomerService/ModalCustomerService';
import Language from '../../../components/Language';
// import zntcIpa from '../../../assets/files/ZntC.ipa'

function Login(props) {
  const [isVisible, setIsVisible] = useState(false);
  const { history, intl } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isShowPass, setIsShowPass] = useState(false);
  const [typeSubmit, setTypeSubmit] = useState('');
  const [isChecked, setIsChecked] = useState(localStorage.getItem('record') ? true : false);
  const isIOS = window?.navigator?.userAgent?.indexOf('Mac OS X') !== -1;
  const [isOpenModalCustomerService, setIsOpenModalCustomerService] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('record')) {
      form.setFieldsValue({
        email: JSON.parse(localStorage.getItem('record')).username,
        password: JSON.parse(localStorage.getItem('record')).password,
      });
    }
  }, []);
  function onFinish(values) {
    setIsVisible(true);

    if (typeSubmit === 'local') {
      const param = {
        username: values.email,
        password: values.password,
      };
      LoginService.SigninByUsername(param).then(result => {
        const { isSuccess, data } = result;
        // const isSuccess = true
        setIsVisible(false);
        if (!isSuccess) {
          swal(`${intl?.formatMessage({ id: 'Login failed' })}`, {
            icon: 'warning',
          });
        } else {
          if (isChecked) {
            localStorage.removeItem('record');
            localStorage.setItem('record', JSON.stringify(param));
          } else {
            localStorage.removeItem('record');
          }
          dispatch(handleSignin(data));
          form.resetFields();
          history.push(`/`);
        }
      });
    }
  }

  function handleShowHidePassword() {
    setIsShowPass(!isShowPass);
  }

  function handleCheckRecord() {
    setIsChecked(!isChecked);
  }

  return (
    <div id={'login-container'}>
      <div className="container-login">
        <div className="d-flex justify-content-between mt-2 align-items-center">
          <div />
          {/* <a href={isIOS ? "https://install.appcenter.ms/users/studiogame/apps/bmsc/distribution_groups/bmsc" : zntcApk} download={'BMSC'} className={'text-white text-decoration-none'}>{intl.formatMessage({id: "Download app"})}</a> */}
          <Language />
        </div>
        <div className="img-logo">
          <img src={imLogo} alt={'imLogo'} />
        </div>
        <div className="login-content">
          <Form
            name="login"
            autoComplete="off"
            form={form}
            onFinish={values => {
              onFinish(values);
            }}
          >
            <div className="position-relative">
              <Form.Item
                name="email"
                style={{ marginBottom: '16px' }}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'please_enter_account' }),
                  },
                ]}
              >
                <Input
                  className="input"
                  prefix={
                    <div className="login__input__icon-phone position-absolute">
                      <img src={icEmail} alt="icon-phone" className="position-static" width={20} height={20} />
                    </div>
                  }
                  autoComplete="off"
                  placeholder={intl.formatMessage({ id: 'account' })}
                  size="large"
                  style={{
                    color: '#FFF',
                    backgroundColor: '#26264E',
                    background: '#26264E',
                    paddingLeft: '38px',
                  }}
                />
              </Form.Item>
            </div>
            <div className="position-relative">
              <Form.Item
                name="password"
                style={{ marginBottom: '30px' }}
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
              >
                <Input
                  className="input"
                  prefix={
                    <div className={'login__input__icon-phone position-absolute'}>
                      <img src={icPassword} alt="icon-lock" width={20} height={20} />
                    </div>
                  }
                  suffix={
                    <div className={'ic-show-password position-absolute'} onClick={() => handleShowHidePassword()}>
                      <img
                        src={!isShowPass ? icShowPassword : icPasswordOff}
                        alt="icon-lock"
                        width={24}
                        height={24}
                        style={{
                          color: '#130F26',
                        }}
                      />
                    </div>
                  }
                  type={isShowPass ? 'text' : 'password'}
                  autoComplete="off"
                  placeholder={intl.formatMessage({ id: 'password' })}
                  size="large"
                  style={{
                    color: '#FFF',
                    backgroundColor: '#26264E',
                    paddingLeft: '38px',
                    background: '#26264E',
                  }}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <div className="d-flex justify-content-between">
                <Checkbox className="checkbox-record" checked={isChecked} onClick={() => handleCheckRecord()}>
                  {intl.formatMessage({ id: 'Remember password' })}
                </Checkbox>
                <div
                  onClick={() => {
                    setIsOpenModalCustomerService(true);
                  }}
                  className="login-footer__text"
                >
                  {intl.formatMessage({ id: 'forgot_password' })}
                </div>
              </div>
            </Form.Item>
            <div className="w-100 d-flex justify-content-center">
              <Button
                className="w-100 btn-login"
                htmlType="submit"
                size="large"
                onClick={() => {
                  setTypeSubmit('local');
                }}
                style={{ background: '#36FFB5' }}
              >
                {intl.formatMessage({ id: 'login' })}
              </Button>
            </div>
            <div className="login-footer">
              <p style={{ marginRight: '5px' }}>{intl.formatMessage({ id: 'Do not have an account?' })} </p>
              <div
                onClick={() => {
                  history.push(routes.register.path);
                }}
                className="login-footer__text"
              >
                {intl.formatMessage({ id: 'Register now' })}
              </div>
            </div>
          </Form>
        </div>
        {isVisible ? <Loader /> : null}
      </div>
      <ModalCustomerService
        status={isOpenModalCustomerService}
        title={intl.formatMessage({ id: 'forgot_password' })}
        closeDrawer={() => setIsOpenModalCustomerService(false)}
        setIsOpenModalCustomerService={setIsOpenModalCustomerService}
      />
    </div>
  );
}
export default injectIntl(Login);
