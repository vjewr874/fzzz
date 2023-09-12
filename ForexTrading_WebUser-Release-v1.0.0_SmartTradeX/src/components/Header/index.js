/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import './index.scss';

import React from 'react';

export default function Header({ title, goBack, headerRight }) {
  return (
    <div className="header__navbar">
      <div data-v-106b99c8 className="header__navbar-left">
        {typeof goBack === 'function' && (
          <img alt="test" src={require('../../assets/icons/arrow_left.svg')} className="navbar-back" onClick={goBack} />
        )}
      </div>
      <div data-v-106b99c8 className="header__navbar-title w-100">
        <div data-v-6dddc5f1 data-v-106b99c8 className="c-row c-row-middle-center text-center">
          <text>{title}</text>
        </div>
      </div>
      <div data-v-106b99c8 className="header__navbar-right">
        {headerRight}
      </div>
    </div>
  );
}
