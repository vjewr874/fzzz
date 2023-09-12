/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Select } from 'antd';
import icLanguage from '../../assets/stock-icons/ic-language.svg';
import icArrow from '../../assets/stock-icons/ic-arrow_drop_down.svg';
import React, { memo, useContext, useState } from 'react';
import './index.scss';
import { Context } from '../../helper/Internationalization';

const languages = [
  {
    value: 'vi',
    label: 'Tiếng Việt',
  },
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'cn',
    label: '中国人',
  },
];

function Language() {
  const context = useContext(Context);
  const [language, setLanguage] = useState(window.localStorage.getItem('lang') || 'vi');

  const handleSwitchLanguage = e => {
    window.localStorage.setItem('lang', e);
    setLanguage(e);
    context.switchLanguage(e);
  };

  return (
    <div style={{ position: 'relative' }} id={'languageContainer'}>
      <Select value={context.locale} onChange={handleSwitchLanguage} defaultValue={language} options={languages} />
      <img src={icLanguage} alt={'icLanguage'} className={'icon-select-custom'} />
      <img src={icArrow} alt={'icArrow'} className={'icon-select-arrow-custom'} />
    </div>
  );
}

export default memo(Language);
