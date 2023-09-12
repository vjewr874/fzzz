/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Page from '../../../../../components/Page/Page';
import './change-success.scss';
import { injectIntl } from 'react-intl';
import img from '../../../../../assets/new-images/im-sign-up.png';
import icLogin from '../../../../../assets/new-icons/ic-login.svg';
import icHome from '../../../../../assets/new-icons/ic-home.svg';

function ChangeSuccess(props) {
  const { intl } = props;
  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'forgotSuccessTitle' })}>
      <div id="change-success">
        <div className={'background-image img-sign'} style={{ backgroundImage: `url(${img})` }} />
        <p className="text">Đổi mật khẩu thành công. Vui lòng đăng nhập lại để tiếp tục sử dụng trọn vẹn dịch vụ.</p>
        <a href={'/login'}>
          <div className="btn-login change-success-btn">
            <img src={icLogin} width={16} height={16} /> Đăng nhập
          </div>
        </a>
        <a href={'/'}>
          <div className="btn-home change-success-btn">
            <img src={icHome} width={17} height={16} /> Trở về trang chủ
          </div>
        </a>
      </div>
    </Page>
  );
}
export default injectIntl(ChangeSuccess);
