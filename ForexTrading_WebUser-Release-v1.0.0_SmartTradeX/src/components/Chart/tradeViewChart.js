/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { memo, useEffect, useCallback, useState } from 'react';
import { fetchCandleStickData, fetchMutilCandleStickData } from './utils/fetchService';
import { PriceChart } from './chart';
import { WS_URL } from './utils/constants';
import { candleSocketAdaptor } from './utils/adaptor';
import { candleStickDefaultConfig } from './utils/constants';

const TradeViewChart = ({
  pair = 'BTCBUSD',
  interval = '1m',
  candleStickConfig = candleStickDefaultConfig,
  setPriceNewCoin,
}) => {
  const [candleStickData, setCandleData] = useState([]);

  // const [mutilCandleStickData, setMutilCandleData] = useState([]);
  const fetchCandleData = useCallback(async () => {
    const candleData = await fetchCandleStickData(pair);
    setCandleData(candleData);
    setPriceNewCoin(candleData[499]?.close);
  }, [pair]);
  // const fetchMutilCandleData = useCallback(async () => {
  //   const pairs =['BTCBUSD', 'ETHUSDT', 'TUSDT', 'BNBUSDT', 'XRPUSDT']
  //   const candleData = await fetchMutilCandleStickData(pairs);
  //   setMutilCandleData(candleData);
  // }, [pair]);

  useEffect(() => {
    fetchCandleData();
    // fetchMutilCandleData();
    // }, [fetchCandleData, fetchMutilCandleData]);
  }, [fetchCandleData]);
  useEffect(() => {
    if (candleStickData.length > 0) {
      const ws = new WebSocket(`${WS_URL}/${pair.toLocaleLowerCase()}@kline_${interval}`);
      ws.onmessage = e => {
        const message = JSON.parse(e.data);
        const parsedMessage = candleSocketAdaptor(message);
        setPriceNewCoin(parseFloat(message?.k?.c));
        const newData = [...candleStickData];
        const oldLastTicker = candleStickData[candleStickData.length - 1];
        if (oldLastTicker.date.getTime() === parsedMessage.date.getTime()) {
          newData.pop();
        } else {
          newData.shift();
        }
        newData.push(parsedMessage);
        setCandleData(newData);
      };
      ws.onclose = () => {};
      return () => {
        ws.close();
      };
    }
  }, [candleStickData]);

  if (candleStickData.length === 0) {
    return <div className="loader" />;
  }

  return <PriceChart initialChartData={candleStickData} />;
};

export default memo(TradeViewChart);
