/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { CHANGE_AUDIO } from '../constants/setting';

const initialState = {
  audio: true,
};

export default function settingReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_AUDIO:
      const data = action.payload;
      console.log(data);
      return {
        ...state,
        ...data,
      };

    default:
      return state;
  }
}
