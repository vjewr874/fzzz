/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import './index.scss';
let myTime = null;
const MaskOverBackground = ({ seconds, onTime }) => {
  const [objectTime, setObjectTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: seconds,
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

    myTime = setInterval(() => {
      setObjectTime(secondsToTime(secondsNow));

      if (!secondsNow) {
        if (onTime) {
          onTime();
        }
        clearInterval(myTime);
      }
      secondsNow -= 1;
    }, 1000);
  }, [seconds]);

  return (
    <div className="maskOverBackground">
      <span className="maskOverBackground__item me-2">{objectTime.minutes}</span>
      <span className="maskOverBackground__item ms-2">{objectTime.seconds}</span>
    </div>
  );
};
export default MaskOverBackground;
