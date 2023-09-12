/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';

let myTime = null;
const CountDown = ({ seconds, onTime }) => {
  const [objectTime, setObjectTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    days: 0,
  });

  function secondsToTime(secs) {
    let secondsToNow = secs;

    if (secondsToNow <= 0) {
      clearInterval(myTime);
    }
    const secondPerMinute = 60;
    const secondPerHour = 3600;
    const secondPerDay = 3600 * 24;
    let days = Math.floor(secondsToNow / secondPerDay);
    let hours = Math.floor((secondsToNow - days * secondPerDay) / secondPerHour);
    let minutes = Math.floor((secondsToNow - days * secondPerDay - hours * secondPerHour) / secondPerMinute);
    let seconds = secondsToNow - days * secondPerDay - hours * secondPerHour - minutes * secondPerMinute;

    const obj = {
      hours,
      minutes,
      seconds,
      days,
    };
    return obj;
  }

  useEffect(() => {
    let secondsNow = seconds || 0;

    if (typeof secondsNow !== 'number') {
      secondsNow = 0;
    }
    if (myTime) {
      clearInterval(myTime);
    }

    myTime = setInterval(() => {
      setObjectTime(secondsToTime(secondsNow));

      if (!secondsNow) {
        clearInterval(myTime);
      }
      secondsNow -= 1;
      if (secondsNow === 5) {
        onTime();
      }
    }, 1000);
  }, [seconds]);

  return (
    <div className="d-flex game5D__count__box">
      <div className="game5D__count__box__content">{objectTime.hours || 0}</div>
      <div className="game5D__count__box__content">{objectTime.minutes || 0}</div>
      <div className="game5D__count__box__content">:</div>
      <div className="game5D__count__box__content">{`${objectTime.seconds}`[1] ? `${objectTime.seconds}`[0] : 0}</div>
      <div className="game5D__count__box__content">
        {`${objectTime.seconds}`[1]
          ? `${objectTime.seconds}`[1]
          : `${objectTime.seconds}`[0]
          ? `${objectTime.seconds}`[0]
          : 0}
      </div>
    </div>
  );
};

export default CountDown;
