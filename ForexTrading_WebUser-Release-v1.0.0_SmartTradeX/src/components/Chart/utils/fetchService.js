/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { BASE_URL } from './constants';
import { parseCandleStickData } from '../service/candleStickService';

export const fetchCandleStickData = async (symbol = 'BTCBUSD', interval = '1m') => {
  const url = `${BASE_URL}symbol=${symbol}&interval=${interval}`;
  const result = await fetch(url);
  const data = await result.json();
  return parseCandleStickData(data);
};

export const fetchMutilCandleStickData = async (symbol = ['BTCBUSD'], interval = '1m') => {
  const url = `${BASE_URL}symbols=${symbol}&interval=${interval}`;
  const result = await fetch(url);
  const data = await result.json();
  return parseCandleStickData(data);
};
