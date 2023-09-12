/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import { IconFb, IconTeleGram, IconZalo } from '../../assets/icons';

function Customers(props) {
  return (
    <div className="container home__customer" data-aos="fade-up">
      <div className="home__title home__title-upper">
        chăm sóc <span className="home__active">khách hàng</span>
      </div>
      <p className="home__sub home__sub-second">
        FACCOIN hân hạnh phục vụ Quý khách 24/7.
        <br />
        Mọi thắc mắc và hỗ trợ, quý khách vui lòng liên hệ với chúng tôi thông qua các kênh dưới đây:
      </p>
      <div className="home__customer__content">
        <div className="home__customer__item">
          <IconZalo />
          <p>Zalo</p>
        </div>
        <div className="home__customer__item">
          <IconFb />
          <p>Messeger</p>
        </div>
        <div className="home__customer__item">
          <IconTeleGram />
          <p>Telegram</p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="aos-init d-flex justify-content-center"
        style={{ paddingTop: '200px', paddingBottom: '64px' }}
      >
        <img src={'/assets/imagesHome/BannerSupport.png'} alt="Box3" />
      </div>
    </div>
  );
}

export default Customers;
