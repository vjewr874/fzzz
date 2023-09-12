/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useCallback, useState } from 'react';
import './styles/modal-forgot.scss';
import { Button, Form, Input } from 'antd';
//icon
import icBack from '../../../../assets/new-icons/ic-arow-left.svg';
import icLock from '../../../../assets/new-icons/ic-lock.svg';
import icShowPassword from '../../../../assets/new-icons/ic-show-password.svg';
import icIdentify from '../../../../assets/new-icons/ic-identify.svg';
import { useIntl } from 'react-intl';
import swal from 'sweetalert';

function ModalForgot(props) {
  const [form] = Form.useForm();
  const [isShowPass, setIsShowPass] = useState(false);
  const intl = useIntl();
  const t = useCallback(
    id => {
      return intl.formatMessage({ id });
    },
    [intl],
  );
  function handleShowHidePassword() {
    setIsShowPass(!isShowPass);
  }
  function onFinish(values) {
    handleConfirm(values);
  }
  function handleConfirm(values) {
    values = form.getFieldsValue();
    if (values?.password === values?.rePassword) {
      props.forgotPass(values);
    } else {
      swal(`Mật khẩu nhập lại không giống với mật khẩu`, {
        icon: 'warning',
      });
    }
  }
  return (
    <div id={'otp'} className={`container-otp ${props?.isOpen ? 'show' : ''}`}>
      <div className={'container-header'}>
        <div className={'container-item__left'}>
          <div
            className={'background-image icon-back'}
            style={{ backgroundImage: `url('${icBack}')` }}
            onClick={() => props?.closeOTP()}
          />
        </div>
        <div className={'container-item__center'}>Xác thực SĐT</div>
        <div className={'icon-back'} />
      </div>
      <div id="new-password">
        <Form name="forgot" autoComplete="off" form={form} onFinish={onFinish}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('password_required'),
              },
              {
                min: 6,
                max: 20,
                message: t('invalidPass'),
              },
            ]}
          >
            <div className="container-input">
              <div className={'login__input__icon-phone position-absolute'}>
                <img src={icLock} alt="icon-lock" width={16} height={20} />
              </div>
              <Input
                name="password"
                className="input"
                type={isShowPass ? 'text' : 'password'}
                placeholder={t('new_password_required')}
                size="large"
              />
              <div className={'ic-show-password position-absolute'} onClick={() => handleShowHidePassword()}>
                <img src={icShowPassword} alt="icon-lock" width={16} height={20} />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="rePassword"
            rules={[
              {
                required: true,
                message: t('password_required'),
              },
              {
                min: 6,
                max: 20,
                message: t('invalidPass'),
              },
            ]}
          >
            <div className="container-input">
              <div className={'login__input__icon-phone position-absolute'}>
                <img src={icIdentify} alt="icon-lock" width={16} height={20} />
              </div>
              <Input
                name="acceptPassword"
                className="input"
                type={isShowPass ? 'text' : 'password'}
                placeholder={t('confirm_new_password')}
                size="large"
              />
              <div className={'ic-show-password position-absolute'} onClick={() => handleShowHidePassword()}>
                <img src={icShowPassword} alt="icon-lock" width={16} height={20} />
              </div>
            </div>
          </Form.Item>
          <div className="btn-new-password w-100 d-flex justify-content-center">
            <Button className="btn-main w-100" htmlType="submit" size="large">
              {intl.formatMessage({ id: 'kyc_profile' })}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ModalForgot;
