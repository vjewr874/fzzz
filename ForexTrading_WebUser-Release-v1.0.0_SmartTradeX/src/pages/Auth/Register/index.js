/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import { routes } from '../../../App';
import { Button, Form, Input } from 'antd';
import Loader from '../../../components/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginService from '../../../services/loginService';
import swal from 'sweetalert';
import { handleSignin } from '../../../actions';
import './styles/register.scss';
import { injectIntl } from 'react-intl';

//icons
import icWave from '../../../assets/stock-icons/ic-wave.svg';
import icEmail from '../../../assets/stock-icons/ic-email.svg';
import icPassword from '../../../assets/stock-icons/ic-password.svg';
import icShowPassword from '../../../assets/stock-icons/ic-show.svg';
import icConfirm from '../../../assets/stock-icons/ic-confirm.svg';
import icRefer from '../../../assets/stock-icons/ic-scan.svg';
import icPasswordOff from '../../../assets/stock-icons/ic-password-off.svg';

function Register(props) {
  const [isVisible, setIsVisible] = useState(false);
  const { history, location, intl } = props;
  const search = location.search;
  const dispatch = useDispatch();
  const params = new URLSearchParams(search);
  const [form] = Form.useForm();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowRePass, setIsShowRePass] = useState(false);
  const [typeRegister, setTypeRegister] = useState('email');

  function onFinish(values) {
    if (values.password === values.secondaryPassword) {
      // handleConfirmOTP(values)
      handleRegister(values);
    } else {
      swal(intl.formatMessage({ id: 'confirm_new_password_incorrect' }), {
        icon: 'warning',
      });
    }
  }

  useEffect(() => {
    if (params.get('refer')) {
      form.setFieldsValue({
        referCode: params.get('refer') || '',
      });
    }
  }, []);

  const handleRegister = values => {
    setIsVisible(true);
    if (typeRegister === 'email') {
      const newData = {
        email: values.email,
        password: values.password,
        secondaryPassword: values.secondaryPassword,
        // referCode: values?.referCode,
      };
      LoginService.RegisterByEmail(newData).then(result => {
        const { isSuccess, message } = result;
        setIsVisible(false);
        if (!isSuccess) {
          handledErrorUser(message);
        } else {
          handleLogin();
        }
      });
    }

    if (typeRegister === 'phone') {
      const newData = {
        phoneNumber: values.phoneNumber,
        password: values.password,
        //secondaryPassword: values.secondaryPassword,
        // referCode: values?.referCode,
      };
      LoginService.Register(newData).then(result => {
        const { isSuccess, message } = result;
        setIsVisible(false);

        if (!isSuccess) {
          handledErrorUser(message);
        } else {
          handleLogin();
        }
      });
    }
  };

  function handleConfirmOTP(values) {
    if (typeRegister === 'email') {
      const newData = {
        email: values?.email,
        otp: values.otp,
      };
      LoginService.verifyOtpByEmail(newData).then(result => {
        const { isSuccess, data, error } = result;
        if (!isSuccess) {
          handleErrorOTP(error);
        } else {
          handleRegister(values);
        }
      });
    }
    if (typeRegister === 'phone') {
      const newData = {
        phoneNumber: values?.phoneNumber,
        otp: values.otp,
      };
      LoginService.verifyOtp(newData).then(result => {
        const { isSuccess, data, error } = result;
        if (!isSuccess) {
          handleErrorOTP(error);
        } else {
          handleRegister(values);
        }
      });
    }
  }

  function handleLogin() {
    const FieldsValue = form.getFieldsValue();
    if (typeRegister === 'email') {
      const values = {
        username: FieldsValue?.email,
        password: FieldsValue?.password,
      };
      LoginService.SigninByUsername(values).then(result => {
        const { isSuccess, data } = result;
        setIsVisible(false);
        if (!isSuccess) {
          swal(`${intl?.formatMessage({ id: 'login' })}  ${intl?.formatMessage({ id: 'failed' })}`, {
            icon: 'warning',
          });
        } else {
          dispatch(handleSignin(data));
          form.resetFields();
          history.push('/');
        }
      });
    }
    if (typeRegister === 'phone') {
      const values = {
        username: FieldsValue?.phoneNumber,
        password: FieldsValue?.password,
      };
      LoginService.SigninByUsername(values).then(result => {
        const { isSuccess, data } = result;
        setIsVisible(false);
        if (!isSuccess) {
          swal(`${intl?.formatMessage({ id: 'login' })}  ${intl?.formatMessage({ id: 'failed' })}`, {
            icon: 'warning',
          });
        } else {
          dispatch(handleSignin(data));
          form.resetFields();
          history.push('/');
        }
      });
    }
  }

  function handleShowHidePassword() {
    setIsShowPass(!isShowPass);
  }
  function handleShowHideRePassword() {
    setIsShowRePass(!isShowRePass);
  }

  function handleSendEmailOTP() {
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const patternPhone = /^[0][0-9]{9}$/;
    const { email, phoneNumber } = form.getFieldsValue();
    if (email && pattern?.test(email)) {
      LoginService.requestEmailOTP({ email }).then(res => {
        const { isSuccess, error } = res;
        if (!isSuccess) {
          if (error === 'SEND_OTP_FAILED') {
            swal(intl.formatMessage({ id: 'SEND_OTP_FAILED' }), {
              icon: 'error',
            });
          } else {
            swal(` ${intl?.formatMessage({ id: 'fail' })}`, {
              icon: 'error',
            });
          }
        } else {
          swal(intl?.formatMessage({ id: 'send_email_otp_success' }), {
            icon: 'success',
          });
        }
      });
    } else {
      form.validateFields(['email']).then();
    }

    if (phoneNumber && patternPhone.test(phoneNumber)) {
      LoginService.requestPhoneOTP({ phoneNumber }).then(res => {
        const { isSuccess, error } = res;
        if (!isSuccess) {
          if (error === 'SEND_OTP_FAILED') {
            swal(intl.formatMessage({ id: 'SEND_OTP_FAILED' }), {
              icon: 'error',
            });
          } else {
            swal(` ${intl?.formatMessage({ id: 'fail' })}`, {
              icon: 'error',
            });
          }
        } else {
          swal(intl?.formatMessage({ id: 'send_phone_otp_success' }), {
            icon: 'success',
          });
        }
      });
    } else {
      form.validateFields(['phoneNumber']).then();
    }
  }

  function handleChangeTypeRegister(type) {
    form.resetFields();
    setTypeRegister(type);
  }

  function handleErrorOTP(error) {
    if (error === 'NOT_CONFIRMED_YET') {
      swal(intl.formatMessage({ id: 'NOT_CONFIRMED_YET' }), {
        icon: 'warning',
      });
    } else if (error === 'CAN_NOT_STORE_OTP') {
      swal(intl.formatMessage({ id: 'CAN_NOT_STORE_OTP' }), {
        icon: 'warning',
      });
    } else if (error === 'SEND_OTP_FAILED') {
      swal(intl.formatMessage({ id: 'SEND_OTP_FAILED' }), {
        icon: 'warning',
      });
    } else if (error === 'CONFIRM_OTP_FAILED') {
      swal(intl.formatMessage({ id: 'CONFIRM_OTP_FAILED' }), {
        icon: 'warning',
      });
    } else if (error === 'OTP_EXPIRED') {
      swal(intl.formatMessage({ id: 'OTP_EXPIRED' }), {
        icon: 'warning',
      });
    } else if (error === 'OTP_NOT_FOUND') {
      swal(intl.formatMessage({ id: 'OTP_NOT_FOUND' }), {
        icon: 'warning',
      });
    } else {
      swal(intl.formatMessage({ id: 'invalidOTP' }), {
        icon: 'warning',
      });
    }
  }
  function handledErrorUser(error) {
    if (error === 'DUPLICATED_USER') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER' }), {
        icon: 'warning',
      });
    } else if (error === 'DUPLICATED_USER_EMAIL') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER_EMAIL' }), {
        icon: 'warning',
      });
    } else if (error === 'DUPLICATED_USER_PHONE') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER_PHONE' }), {
        icon: 'warning',
      });
    } else if (error === 'INVALID_REFER_USER') {
      swal(intl.formatMessage({ id: 'INVALID_REFER_USER' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_AUTHORIZED') {
      swal(intl.formatMessage({ id: 'NOT_AUTHORIZED' }), {
        icon: 'warning',
      });
    } else if (error === 'USER_LOCKED') {
      swal(intl.formatMessage({ id: 'USER_LOCKED' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_VERIFIED_EMAIL') {
      swal(intl.formatMessage({ id: 'NOT_VERIFIED_EMAIL' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_VERIFIED_PHONE') {
      swal(intl.formatMessage({ id: 'NOT_VERIFIED_PHONE' }), {
        icon: 'warning',
      });
    } else if (error === 'REFER_USER_NOT_FOUND') {
      swal(intl.formatMessage({ id: 'REFER_USER_NOT_FOUND' }), {
        icon: 'warning',
      });
    } else if (error === 'OTP_NOT_FOUND') {
      swal(intl.formatMessage({ id: 'OTP_NOT_FOUND' }), {
        icon: 'warning',
      });
    } else {
      swal(intl.formatMessage({ id: 'error' }), {
        icon: 'warning',
      });
    }
  }
  return (
    <div id={'register-container'}>
      <div className="container-login">
        <div className="login-welcom">
          <div style={{ marginRight: '8px' }}>{intl.formatMessage({ id: 'Welcome, ' })}</div>
          <img src={icWave} alt={icWave} />
        </div>
        <div className={`login-typeRegister justify-content-start`}>
          <span
            className={`${typeRegister === 'email' ? 'typeActive' : 'typeInactive'} cursor-pointer`}
            onClick={() => handleChangeTypeRegister('email')}
          >
            {intl.formatMessage({ id: 'Register by email' })}
          </span>
          <span
            className={`${typeRegister === 'phone' ? 'typeActive' : 'typeInactive'} cursor-pointer`}
            onClick={() => handleChangeTypeRegister('phone')}
          >
            {intl.formatMessage({ id: 'Register by phone' })}
          </span>
        </div>
        <div className="login-content">
          <Form
            name="login"
            autoComplete="off"
            form={form}
            initialValues={{
              referCode: params.get('refer') || '',
            }}
            onFinish={values => {
              onFinish(values);
            }}
          >
            {typeRegister === 'email' ? (
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
                    autoComplete="email"
                    placeholder={intl.formatMessage({ id: 'Please enter your email' })}
                    size="large"
                    style={{ backgroundColor: '#26264E', textAlign: 'left', paddingLeft: '38px' }}
                  />
                </div>
              </Form.Item>
            ) : (
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                  {
                    pattern: '^[0][0-9]{9}$',
                    message: intl.formatMessage({ id: 'inValidPhone' }),
                  },
                ]}
                style={{ marginBottom: '30px' }}
              >
                <div className="container-input">
                  <div className="login__input__icon-phone position-absolute">
                    <p style={{ color: '#FFFFFF', fontSize: '16px' }}>+84</p>
                  </div>
                  <Input
                    className="input"
                    autoComplete="phoneNumber"
                    placeholder={intl.formatMessage({ id: 'Please enter the phone number' })}
                    size="large"
                    style={{ backgroundColor: '#26264E', textAlign: 'left', paddingLeft: '48px' }}
                  />
                </div>
              </Form.Item>
            )}
            {/* <Form.Item
                            name="otp"
                            rules={[
                                {
                                    required: true,
                                    message: ""
                                },
                                {
                                    min: 6,
                                    message: intl.formatMessage({id: 'Min 6 characters'})
                                }
                            ]}
                            style={{marginBottom: '30px'}}
                        >
                            <div className="container-input">
                                <div className='login__input__icon-phone position-absolute'>
                                    <img src={icConfirm} alt='icon-phone' className='position-static' width={20} height={20} />
                                </div>
                                <Input
                                    className="input"
                                    autoComplete="otp"
                                    placeholder={intl.formatMessage({id: "Please enter the verified code"})}
                                    size="large"
                                    style={{backgroundColor: '#26264E', textAlign: 'left', paddingLeft: '38px'}}
                                />
                                <div className={'ic-show-password position-absolute'} >
                                    <Button className="get-code" onClick={handleSendEmailOTP}>{intl.formatMessage({id: "Get code"})}</Button>
                                </div>
                            </div>
                        </Form.Item> */}
            <Form.Item
              name="password"
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
                  autoComplete="new-password"
                  type={isShowPass ? 'text' : 'password'}
                  placeholder={intl.formatMessage({ id: 'Please enter your login password' })}
                  size="large"
                  style={{ background: '#26264E', textAlign: 'left', paddingLeft: '38px' }}
                />
                <div className={'ic-show-password position-absolute'}>
                  <img
                    src={!isShowPass ? icShowPassword : icPasswordOff}
                    alt="icon-lock"
                    width={24}
                    height={24}
                    onClick={() => handleShowHidePassword()}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="secondaryPassword"
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
              style={{ marginBottom: '32px' }}
            >
              <div className="container-input">
                <div className={'login__input__icon-phone position-absolute'}>
                  <img src={icPassword} alt="icon-lock" width={20} height={20} />
                </div>
                <Input
                  className="input"
                  autoComplete="re-password"
                  type={isShowRePass ? 'text' : 'password'}
                  placeholder={intl.formatMessage({ id: 'Please enter the password you just entered' })}
                  size="large"
                  style={{ background: '#26264E', textAlign: 'left', paddingLeft: '38px' }}
                />
                <div className={'ic-show-password position-absolute'}>
                  <img
                    src={!isShowRePass ? icShowPassword : icPasswordOff}
                    alt="icon-lock"
                    width={24}
                    height={24}
                    onClick={() => handleShowHideRePassword()}
                  />
                </div>
              </div>
            </Form.Item>
            {/* <Form.Item
                            name="referCode"
                            style={{marginBottom: '40px'}}
                        >
                            <div className="container-input">
                                <div className='login__input__icon-phone position-absolute'>
                                    <img src={icRefer} alt='icon-phone' width={20} height={20} />
                                </div>
                                <Input
                                    className="input"
                                    placeholder={intl.formatMessage({id: "Please enter referral code"})}
                                    type="text"
                                    size="large"
                                    defaultValue={params.get("refer") || ''}
                                    style={{background: '#26264E', paddingLeft: '38px'}}
                                />
                            </div>
                        </Form.Item> */}
            <div className="w-100 d-flex justify-content-center">
              <Button className="btn-main w-100" htmlType="submit" size="large">
                {intl.formatMessage({ id: 'Register' })}
              </Button>
            </div>
            <div className="login-footer">
              <span
                onClick={() => {
                  history.push(routes.login.path);
                }}
              >
                {intl.formatMessage({ id: 'Back to login' })}
              </span>
            </div>
          </Form>
        </div>
        {isVisible ? <Loader /> : null}
      </div>
    </div>
  );
}
export default injectIntl(Register);
