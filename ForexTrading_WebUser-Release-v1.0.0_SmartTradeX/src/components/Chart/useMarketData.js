/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { tsvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const parseDate = timeParse('%Y-%m-%d');

const parseData = () => d => {
  const date = parseDate(d.date);
  date ? (d.date = new Date(date)) : (d.date = new Date(Number(d.date)));

  for (const key in d) {
    if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
      d[key] = +d[key];
    }
  }

  return d;
};

// https://www.joshwcomeau.com/snippets/react-hooks/use-interval/
const useInterval = (callback, delay) => {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
};

export function useMarketData(dataSet = 'MINUTES', updating = false) {
  const [data, setData] = useState();
  const [length, setLength] = useState(500);
  const socketUrl = 'wss://stream.binance.com:9443/stream';

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

  const handleSendMessage = useCallback(() => {
    sendJsonMessage({
      method: 'SUBSCRIBE',
      params: ['dogeaud@kline_1m', true],
      id: 1,
    });

    setData();
  }, [sendJsonMessage]);
  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: 'UNSUBSCRIBE',
        params: ['dogeaud@ticker'],
        id: 1,
      }),
    [sendJsonMessage],
  );
  const messageHistory = useRef([]);

  messageHistory.current = useMemo(() => messageHistory.current.concat(lastJsonMessage ?? []), [lastJsonMessage]);

  useEffect(() => {
    handleSendMessage();
    return () => handleClickUnSendMessage();
  }, []);

  useEffect(() => {
    setData();
  }, [lastJsonMessage]);

  return {
    data: updating ? data?.slice(0, length + 1) : data,
    loaded: Boolean(data),
  };
}
