/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import Page from '../../../../../components/Page/Page';
import './new-pasword.scss';
import { injectIntl } from 'react-intl';

import icLock from '../../../../../assets/new-icons/ic-lock.svg';
import icShowPassword from '../../../../../assets/new-icons/ic-show-password.svg';
import icIdentify from '../../../../../assets/new-icons/ic-identify.svg';

function NewPassword(props) {
  const { intl } = props;
  const [isShowPass, setIsShowPass] = useState(false);
  function handleShowHidePassword() {
    setIsShowPass(!isShowPass);
  }
  function check() {
    if (document.getElementsByName('abc').values() == document.getElementsByName('def').values()) {
      return true;
    } else {
      return true;
    }
  }
  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'create-newPassword' })}>
      <div id="new-password">
        <Form>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'password_required' }),
              },
              {
                min: 6,
                max: 20,
                message: intl.formatMessage({ id: 'invalidPass' }),
              },
            ]}
          >
            <div className="container-input">
              <div className={'login__input__icon-phone position-absolute'}>
                <img src={icLock} alt="icon-lock" width={16} height={20} />
              </div>
              <Input
                name="def"
                className="input"
                type={isShowPass ? 'text' : 'password'}
                placeholder={intl.formatMessage({ id: 'new_password_required' })}
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
                message: intl.formatMessage({ id: 'password_required' }),
              },
              {
                min: 6,
                max: 20,
                message: intl.formatMessage({ id: 'invalidPass' }),
              },
              {
                required: check(),
                message: intl.formatMessage({ id: 'passDoesntMatch' }),
              },
            ]}
          >
            <div className="container-input">
              <div className={'login__input__icon-phone position-absolute'}>
                <img src={icIdentify} alt="icon-lock" width={16} height={20} />
              </div>
              <Input
                name="abc"
                className="input"
                type={isShowPass ? 'text' : 'password'}
                placeholder={intl.formatMessage({ id: 'confirm_new_password' })}
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
    </Page>
  );
}
export default injectIntl(NewPassword);
