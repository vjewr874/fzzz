/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import * as actionTypes from '../constants/setting';

export const handleChangeAudio = audio => ({
  type: actionTypes.CHANGE_AUDIO,
  payload: {
    audio,
  },
});
