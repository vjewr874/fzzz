import React, { useState } from 'react';
import Page from '../../../components/Page/Page';
import './styles/change-password.scss';
import { injectIntl } from 'react-intl';
import img from '../../../assets/new-images/im-change-pass.png';
import { Button, Form, Input } from 'antd';
import icShowPassword from '../../../assets/new-icons/ic-show-password.svg';
import icEdit from '../../../assets/stock-icons/ic-edit.svg';
import LoginService from '../../../services/loginService';
import swal from 'sweetalert';
import { routes } from '../../../App';
import { useHistory } from 'react-router-dom';
import icPasswordOff from '../../../assets/stock-icons/ic-password-off.svg';
import Loader from '../../../components/Loader';

function ChangePassword(props) {
  const history = useHistory();
  const { intl } = props;
  const [form] = Form.useForm();
  const [isShowOldPass, setIsShowOldPass] = useState(false);
  const [isShowNewPass, setIsShowNewPass] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function handleShowHidePassword() {
    setIsShowPass(!isShowPass);
  }
  function handleShowHideOldPassword() {
    setIsShowOldPass(!isShowOldPass);
  }
  function handleShowHideNewPassword() {
    setIsShowNewPass(!isShowNewPass);
  }
  function onFinish(values) {
    if (values?.newPassword === values?.passwordAgain) {
      const data = {
        password: values?.password,
        newPassword: values?.newPassword,
      };
      setIsLoading(true);
      LoginService.ChangeUserPassWord(data).then(result => {
        const { isSuccess } = result;
        setIsLoading(false);
        if (!isSuccess) {
          swal(`${intl?.formatMessage({ id: 'change-pass' })}  ${intl?.formatMessage({ id: 'Fail' })}`, {
            icon: 'warning',
          });
        } else {
          swal(`${intl?.formatMessage({ id: 'change-pass' })}  ${intl?.formatMessage({ id: 'Success' })}`, {
            icon: 'success',
          }).then(() => {
            history.push(routes.home.path);
          });
        }
      });
    } else {
      swal(intl.formatMessage({ id: 'New password and re-enter password are not the same, Please check again' }), {
        icon: 'warning',
      });
    }
  }
  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'changePassword.changePassword' })}>
      {isLoading ? <Loader /> : null}
      <div id="changePassword">
        <Form
          id="change-password"
          name="change-password"
          autoComplete="off"
          form={form}
          onFinish={values => {
            onFinish(values);
          }}
        >
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
            <div className="container-input">
              <span className={'label'}>{intl.formatMessage({ id: 'changePassword.old_password' })}</span>
              <Input
                className="input"
                type={isShowOldPass ? 'text' : 'password'}
                placeholder={intl.formatMessage({ id: 'changePassword.please_enter_old_password' })}
                size="large"
                style={{ background: '#26264E' }}
              />
              <div className={'ic-show-password position-absolute'} onClick={() => handleShowHideOldPassword()}>
                <img src={!isShowOldPass ? icShowPassword : icPasswordOff} alt="icon-lock" width={16} height={20} />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="newPassword"
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
            <div className="container-input">
              <span className={'label'}>{intl.formatMessage({ id: 'changePassword.new_password' })}</span>
              <Input
                className="input"
                type={isShowNewPass ? 'text' : 'password'}
                placeholder={intl.formatMessage({ id: 'changePassword.please_enter_new_password' })}
                size="large"
                style={{ background: '#26264E' }}
              />
              <div className={'ic-show-password position-absolute'} onClick={() => handleShowHideNewPassword()}>
                <img src={!isShowNewPass ? icShowPassword : icPasswordOff} alt="icon-lock" width={16} height={20} />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="passwordAgain"
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
            <div className="container-input">
              <span className={'label'}>{intl.formatMessage({ id: 'changePassword.again_password' })}</span>
              <Input
                className="input"
                type={isShowPass ? 'text' : 'password'}
                placeholder={intl.formatMessage({ id: 'changePassword.please_enter_again_password' })}
                size="large"
                style={{ background: '#26264E' }}
              />
              <div className={'ic-show-password position-absolute'} onClick={() => handleShowHidePassword()}>
                <img src={!isShowPass ? icShowPassword : icPasswordOff} alt="icon-Identify" width={16} height={20} />
              </div>
            </div>
          </Form.Item>
          <div className="w-100 d-flex justify-content-center changePassBtn">
            <Button className="btn-main w-100" htmlType="submit" size="large">
              {intl.formatMessage({ id: 'changePassword.update' })}
              <img src={icEdit} alt="" />
            </Button>
          </div>
        </Form>
      </div>
    </Page>
  );
}
export default injectIntl(ChangePassword);
