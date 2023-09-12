/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { combineReducers } from 'redux';
import app from './app';
import member from './member';
import setting from './setting';
const rootReducer = combineReducers({
  member,
  app,
  setting,
});

export default rootReducer;
