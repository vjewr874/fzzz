/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './loading.scss';
import img from '../../assets/new-images/img-loading.png';
function Loading(props) {
  return (
    <div id="loading">
      <div className="container">
        <div className="container-img" style={{ backgroundImage: `url(${img})` }} />
        {/* <div className='container-text'>Đang tải dữ liệu...</div> */}
      </div>
    </div>
  );
}
export default Loading;
