/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import * as actionTypes from '../constants/member';

const handleSignin = data => ({
  type: actionTypes.USER_LOGIN,
  data: data,
});

const handleSignout = () => ({
  type: actionTypes.USER_RESET,
});

const handleUpdateDetail = data => ({
  type: actionTypes.USER_DETAILS_UPDATE,
  data: data,
});

export { handleSignin, handleSignout, handleUpdateDetail };
