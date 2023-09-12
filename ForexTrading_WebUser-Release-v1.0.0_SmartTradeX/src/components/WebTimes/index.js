/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './index.scss';

const time = 'Wed May 02 2021 13:15:46 GMT+0700';

export default function index() {
  let myInterval = null;
  const [day, setDay] = useState('');
  const [hours, setHours] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  useEffect(() => {
    myInterval = setInterval(() => {
      const diffDay = moment(new Date()).diff(time, 'days');
      const diffHours = moment(new Date()).diff(time, 'hours') % 24;
      const diffMinute = moment(new Date()).diff(time, 'minutes') % 60;
      const diffSecond = moment(new Date()).diff(time, 'seconds') % 60;
      setDay(diffDay);
      setHours(diffHours);
      setMinute(diffMinute);
      setSecond(diffSecond);
    }, 1000);
  }, []);

  return (
    <div className="container">
      <text className="title">Thời gian chạy trang web</text>
      <div className="calendar">
        <div className="items">
          <div className="value">{day}</div>
          <div className="label">Ngày</div>
        </div>

        <div className="items">
          <div className="value">{hours}</div>
          <div className="label">Giờ</div>
        </div>

        <div className="items">
          <div className="value">{minute}</div>
          <div className="label">Phút</div>
        </div>

        <div className="items">
          <div className="value">{second}</div>
          <div className="label">Giây</div>
        </div>
      </div>
    </div>
  );
}
