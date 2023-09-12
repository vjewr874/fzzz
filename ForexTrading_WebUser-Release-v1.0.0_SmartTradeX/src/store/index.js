/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { createStore } from 'redux';
import reducer from '../reducers';

const store = createStore(reducer);
export default store;
