/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import * as actionTypes from '../constants/app';

export const handleGetAppConfigurationSuccess = data => ({
  type: actionTypes.FETCH_APP_CONFIGURATION_SUCCESS,
  data: data,
});
