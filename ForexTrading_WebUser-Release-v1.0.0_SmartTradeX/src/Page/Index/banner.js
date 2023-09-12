/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect } from 'react';
import { Button } from 'antd';
import { ThunderButton } from './../../assets/icons/index';
import { useHistory } from 'react-router-dom';

function Banner(props) {
  const history = useHistory();

  return (
    <div className="banner">
      {' '}
      {/* =================影片區================= */}
      <div className="home__banner aos-init aos-animate" data-aos="fade-up">
        <div className="container">
          <div className="home__title home__banner__title home__active">Tích luỹ ví tiền của bạn ngay hôm nay!</div>
          <div className="home__sub home__banner__sub">Tại FAC COIN, bạn có thể xây dựng một danh mục đầu tư tốt</div>
          <div className="home__sub home__banner__sub">và học hỏi các phương pháp hay nhất về tiền điện tử.</div>
          <div className="home__summary">
            <div className="home__summary__item">
              <p className="home__summary__title">25M +</p>
              <p className="home__summary__sub">Tổng số tài khoản đang khai thác đồng FAC</p>
            </div>
            <div className="home__summary__item">
              <p className="home__summary__title">1,234,567 +</p>
              <p className="home__summary__sub">Tổng số đồng FAC đã được khai thác</p>
            </div>
          </div>
          <div className="text-center mt-5 d-flex">
            <Button
              style={{ width: '296px' }}
              className="login__button d-flex align-items-center justify-content-center"
              type="primary"
              size="large"
              onClick={() => {
                history.push({
                  pathname: '/register',
                });
              }}
            >
              <ThunderButton style={{ marginRight: '8px' }} /> Bắt đầu đào ngay
            </Button>
          </div>
        </div>
        {/* <div className="home__trend text-center d-flex align-items-center justify-content-center">
         <img src={"/assets/imagesHome/MarketTrendOne.png"} alt="MarketTrendOne" className="home__trend__mobile"/>
         <div className="home__trend__desktop">
            <div className="home__trend__desktop__text">Xu hướng thị trường</div>
            <div className="mt-5"><img src={"/assets/imagesHome/IconBTCOne.png"} alt="IconBTCOne"/></div>
            <div className="mt-5"><img src={"/assets/imagesHome/IconETHOne.png"} alt="IconBTCOne"/></div>
            <div className="mt-5"><img src={"/assets/imagesHome/IconBNBOne.png"} alt="IconBTCOne"/></div>
            <div className="mt-5 mb-5"><img src={"/assets/imagesHome/IconUSDTOne.png"} alt="IconBTCOne"/></div>
         </div>
        </div> */}
      </div>
    </div>
  );
}
export default Banner;
