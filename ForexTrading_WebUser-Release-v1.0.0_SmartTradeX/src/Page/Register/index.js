/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Loader from './../../components/Loader';
import { Form, Input, Button, notification, Checkbox, Tabs } from 'antd';
import LoginService from './../../services/loginService';
import { routes } from './../../App';
import swal from 'sweetalert';
import './register.scss';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { handleUpdateDetail } from '../../actions';

function Register(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCheckBox, setIsCheckBox] = useState(true);
  const [isCheckBoxError, setIsCheckBoxError] = useState(true);
  const [nextTab, setNextTab] = useState('register');
  const { history, location, intl } = props;
  const search = location.search;
  const dispatch = useDispatch();
  const params = new URLSearchParams(search);
  const [form] = Form.useForm();
  function onFinish(values) {
    handleRegister(values);
  }

  useEffect(() => {
    form.setFieldsValue({
      referCode: params.get('refer') || '',
    });
  }, [params]);

  const handleRegister = values => {
    if (!isCheckBox) {
      return;
    }
    setIsVisible(true);
    values = form.getFieldsValue();
    const newData = {
      phoneNumber: values.phone,
      referCode: values.referCode,
      password: values.password,
    };
    LoginService.Register(newData).then(result => {
      const { isSuccess, message, data } = result;
      setIsVisible(false);

      if (!isSuccess) {
        if (message === 'REFER_USER_NOT_FOUND') {
          swal(intl.formatMessage({ id: 'invalidRefer' }), {
            icon: 'warning',
          });
        } else if (message === 'DUPLICATED_USER' || message === 'DUPLICATED_USER_PHONE') {
          swal(intl.formatMessage({ id: 'phoneUsed' }), {
            icon: 'warning',
          });
        } else if (message === 'DUPLICATED_USER_EMAIL') {
          swal(intl.formatMessage({ id: 'phoneUsed' }), {
            icon: 'warning',
          });
        } else {
          swal(intl.formatMessage({ id: 'error' }), {
            icon: 'warning',
          });
        }
      } else {
        swal(intl.formatMessage({ id: 'success' }), {
          icon: 'success',
        }).then(() => {
          dispatch(handleUpdateDetail(data));
          form.resetFields();
          history.push('/');
        });
      }
    });
  };

  return (
    <div className="register">
      <img
        src="/assets/images/icon-back.png"
        alt="icon-back"
        onClick={() => {
          history.goBack();
        }}
      />
      <div id="recaptcha-container"></div>
      {/* <ChangeLanguage className={`my-4 ${nextTab === 'register' ? "" : "d-none"}`} /> */}
      <div className="register-header">{intl.formatMessage({ id: 'register' })}</div>
      <div
        className={`
        register-container
        ${nextTab === 'register' ? 'small' : 'full'}
        ${nextTab === 'success' ? 'd-flex justify-content-center align-items-center' : ''}
        `}
      >
        <p className="register__desc">{intl.formatMessage({ id: 'formatPhone' })}</p>
        {/* <Tabs activeKey={nextTab}> */}
        <div className="d-flex align-items-end flex-column">
          <Form
            name="login"
            autoComplete="new-password"
            initialValues={{
              referCode: params.get('refer') || '',
            }}
            form={form}
            onFinish={values => {
              onFinish(values);
            }}
          >
            <Form.Item
              name="phone"
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
                <Input.Password
                  autoComplete="new-password"
                  className="login__input"
                  type="password"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  placeholder={intl.formatMessage({ id: 'password' })}
                  size="large"
                />
              </div>
            </Form.Item>

            <div className="login__input__icon">
              <div className="login__input__icon">
                <img
                  src="/assets/images/icon-card.png"
                  alt="icon-lock"
                  className="login__input__icon-card"
                  width={18}
                  height={16}
                />
                <Form.Item
                  name="referCode"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'referRequired' }),
                    },
                  ]}
                >
                  <Input
                    className="login__input"
                    placeholder={intl.formatMessage({ id: 'refer' })}
                    type="text"
                    size="large"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="login__parent register__parent">
              <Checkbox
                checked={isCheckBox}
                onChange={e => {
                  const checked = e.target.checked;
                  setIsCheckBoxError(checked);
                  setIsCheckBox(checked);
                }}
              >
                <span
                  className="register-agree"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({ id: 'agree' }),
                  }}
                />
              </Checkbox>
              <span
                onClick={() => {
                  history.push(routes.police.path);
                }}
                className="register-police"
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({ id: 'police' }),
                }}
              />
            </div>
            {isCheckBoxError ? null : (
              <div className="ant-form-item-explain ant-form-item-explain-error">
                <div role="alert" className="ant-form-item-explain-error">
                  {intl.formatMessage({ id: 'ruledRequired' })}
                </div>
              </div>
            )}
            {/* <div className="login__parent register__parent">
                  <div>
                    <Checkbox
                      checked={isCheckBox}
                      onChange={(e) => {
                        const { checked } = e.target
                        if (checked) {
                          setIsCheckBoxError(false)
                        }
                        setIsCheckBox(checked)
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: intl.formatMessage({ id: "rules" })
                        }}
                      />
                    </Checkbox>
                    {
                      isCheckBoxError ? <div className="ant-form-item-explain ant-form-item-explain-error"><div role="alert" className="ant-form-item-explain-error">{intl.formatMessage({ id: "ruledRequired" })}</div></div> : null
                    }

                  </div>
                </div> */}

            <div className="w-100 d-flex justify-content-center">
              <Button
                className="login__button blue_button register__button"
                type="primary"
                htmlType="submit"
                size="large"
              >
                {intl.formatMessage({ id: 'register' })}
              </Button>
            </div>
            {/* <div className="login__footer">
                  {intl.formatMessage({ id: 'alreadyHaveAccount' })}&nbsp;<span onClick={() => { history.push(routes.login.path) }} className="login__footer--text">{intl.formatMessage({ id: 'loginNow' })}</span>
                </div> */}
          </Form>
        </div>
        {/* <Tabs.TabPane tab="otp" key="otp" >
            <div className='mb-5 mt-3 cursor-pointer' onClick={() => setNextTab('register')}>
              <ArrowLeftOutlined className='backIcon' />
            </div>
            <div className='register-otp'>
              <img src={window.origin + "/assets/images/otp.png"} alt="img" />
            </div>
            <div className="register__otp_border">
              <ConfirmOtpForm
                handleVerifyOTP={(otp) => handleVerifyOTP(otp)}
                resendOTP={() => {
                  onFinish(form.getFieldsValue())
                }}
                nextTab={nextTab}
                setNextTab={() => setNextTab('success')}
                setPreviousTab={() => setNextTab('register')}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='success' key="success">
            <div className='register-success'>
              <div className='m-auto mb-5'>
                <img src={window.origin + '/assets/images/success.png'} />
              </div>
              <div className='text-center h4 mb-2'>
                {intl.formatMessage({
                  id: 'activeSuccessful'
                })}
              </div>
              <div className='text-center mb-4'>
                {intl.formatMessage({
                  id: 'activeSuccessfulSubtitle'
                }
                ).replace('{{account}}', form.getFieldValue('email'))}
              </div>
              <Button onClick={() => history.push('/login')} size="large" className='login__button blue_button'>
                <LoginOutlined />{intl.formatMessage({ id: 'login' })}
              </Button>
            </div>
          </Tabs.TabPane> */}
        {/* </Tabs> */}
      </div>
      {isVisible ? <Loader /> : null}
    </div>
  );
}
export default injectIntl(Register);
