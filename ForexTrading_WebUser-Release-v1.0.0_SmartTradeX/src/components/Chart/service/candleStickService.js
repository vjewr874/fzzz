/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { candleStickAdaptor } from '../utils/adaptor';

export const parseCandleStickData = (candleArray = []) => {
  const transformedData = candleArray.reduce((accu, curr) => {
    const candle = candleStickAdaptor(curr);
    accu.push(candle);
    return accu;
  }, []);
  return transformedData;
};

export const yExtentsCalculator = ({ plotData }) => {
  let min;
  let max;
  for (const { low, high } of plotData) {
    if (min === undefined) min = low;
    if (max === undefined) max = high;
    if (low !== undefined && min > low) min = low;
    if (high !== undefined && max < high) max = high;
  }
  if (min === undefined) min = 0;
  if (max === undefined) max = 0;

  const padding = (max - min) * 0.1;
  // console.log('min - padding ', min - padding);
  // console.log('max + padding ', max + padding * 2);
  return [min - padding, max + padding * 2];
};
