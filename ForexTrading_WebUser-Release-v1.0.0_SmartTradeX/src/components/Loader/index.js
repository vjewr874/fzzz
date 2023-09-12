/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './index.scss';
function Loader(props) {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: '#36FFB5',
      }}
      spin
    />
  );
  return (
    <div className="Loader">
      <Spin indicator={antIcon} />
    </div>
  );
}
export default Loader;
