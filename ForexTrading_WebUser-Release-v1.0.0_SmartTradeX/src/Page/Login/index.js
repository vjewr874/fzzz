/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from './../../components/Loader';
import { Form, Input, Button } from 'antd';

import { handleSignin } from '../../actions';
import LoginService from './../../services/loginService';
import { routes } from './../../App';
import swal from 'sweetalert';
import { injectIntl } from 'react-intl';

function Login(props) {
  const [isVisible, setIsVisible] = useState(false);
  const { history, intl } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  function onFinish(values) {
    setIsVisible(true);
    LoginService.Signin(values).then(result => {
      const { isSuccess, data } = result;
      // const isSuccess = true
      setIsVisible(false);
      if (!isSuccess) {
        swal(`${intl.formatMessage({ id: 'login' })}  ${intl.formatMessage({ id: 'fail' })}`, {
          icon: 'warning',
        });
        return;
      } else {
        dispatch(handleSignin(data));
        form.resetFields();
        history.push('/');
      }
    });
  }

  return (
    <div className="login-container">
      <img
        src="/assets/images/icon-back.png"
        alt="icon-back"
        onClick={() => {
          history.push(routes.home.path);
        }}
      />
      <div className="login-banner">
        <img src="/assets/images/headlogo.png" alt="icon-lottery" />
      </div>
      <div className="login-center">
        <div>
          <div className="login__title">{intl.formatMessage({ id: 'loginTitle' })}</div>
        </div>
        <p className="login__desc">{intl.formatMessage({ id: 'formatPhone' })}</p>
        <Form
          name="login"
          autoComplete="off"
          form={form}
          onFinish={values => {
            onFinish(values);
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'phone_required' }),
              },
            ]}
          >
            <div className="login__input__icon">
              <div className="login__input__icon-phone position-absolute">
                <img src="/assets/images/icon-phone.png" alt="icon-phone" className="position-static" width={14} />
                <span>+84</span>
              </div>
              <Input
                className="login__input login__input-phone"
                placeholder={intl.formatMessage({ id: 'phone' })}
                type="number"
                size="large"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'password_required' }),
              },
              {
                min: 6,
                message: intl.formatMessage({ id: 'invalidPass' }),
              },
            ]}
          >
            <div className="login__input__icon">
              <img src="/assets/images/icon-lock.png" alt="icon-lock" width={16} height={20} />
              <Input
                className="login__input"
                type="password"
                placeholder={intl.formatMessage({ id: 'password' })}
                size="large"
              />
            </div>
          </Form.Item>

          <div className="w-100 d-flex justify-content-center">
            <Button className="login__button blue_button" type="primary" htmlType="submit" size="large">
              {intl.formatMessage({ id: 'login' })}
            </Button>
          </div>
          <div className="login__footer">
            <span
              onClick={() => {
                history.push(routes.register.path);
              }}
              className="login__footer--text"
            >
              {intl.formatMessage({ id: 'register' })}
            </span>
            <span
              onClick={() => {
                history.push(routes.forgotPass.path);
              }}
              className="login__footer--text"
            >
              {intl.formatMessage({ id: 'forgotTitle' })}&nbsp;
            </span>
          </div>
        </Form>
      </div>
      {isVisible ? <Loader /> : null}
    </div>
  );
}
export default injectIntl(Login);
