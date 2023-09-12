/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import loginGimolottImage from '../../../../assets/new-images/LoginGimolott.png';
import './styles/loginGimolott.scss';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import LoginService from '../../../../services/loginService';
import swal from 'sweetalert';
import { handleSignin } from '../../../../actions';

function LoginGimolott(props) {
  const { intl } = props;
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const handleLoginGimolott = tokens => {
    LoginService.SigninGimolottByToken({ token: tokens }).then(result => {
      const { isSuccess, data } = result;
      if (!isSuccess) {
        swal(`${intl?.formatMessage({ id: 'loginGimolott' })}  ${intl?.formatMessage({ id: 'fail' })}`, {
          icon: 'warning',
        });
        history.push('/login');
      } else {
        dispatch(handleSignin(data));
        history.push('/');
      }
    });
    return;
  };
  handleLoginGimolott(token);
  return (
    <div id={'loginGimolott'}>
      <img src={loginGimolottImage} className={'background-image loginGimolott'} alt="loginGimolottImage" />
    </div>
  );
}
export default injectIntl(LoginGimolott);
