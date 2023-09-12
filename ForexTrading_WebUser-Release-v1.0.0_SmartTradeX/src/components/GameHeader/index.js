/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import './index.scss';
import Header from 'components/Header';

import React from 'react';

export default function GameHeader({ title, goBack, headerRight, iconList }) {
  return (
    <div className=" home pt-0 overflow-hidden position-relative">
      <Header title={title} goBack={goBack} headerRight={headerRight} iconList={iconList} />
    </div>
  );
}
