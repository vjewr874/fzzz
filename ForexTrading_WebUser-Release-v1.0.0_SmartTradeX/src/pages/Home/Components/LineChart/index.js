/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { fetchCandleStickData } from 'components/Chart/utils/fetchService';
import React, { memo, useCallback, useEffect, useState } from 'react';
import ChartPrice from './chart';

function LineChart({ symbol = 'BTCBUSD', corePercent }) {
  const [dataChart, setDataChart] = useState([]);
  const fetchCandleData = useCallback(async () => {
    const candleData = await fetchCandleStickData(symbol);
    setDataChart(candleData);
  }, [symbol]);

  useEffect(() => {
    fetchCandleData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCandleData();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (dataChart.length === 0) {
    return <div className="loader" />;
  }
  return (
    <div>
      <ChartPrice initialChartData={dataChart} corePercent={corePercent} />
    </div>
  );
}
export default memo(LineChart);
