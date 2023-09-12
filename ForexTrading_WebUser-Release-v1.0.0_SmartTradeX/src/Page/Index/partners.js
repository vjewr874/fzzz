/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Partner1 from '../../assets/icons/partner1.png';
import Partner2 from '../../assets/icons/partner2.png';
import Partner3 from '../../assets/icons/partner3.png';
import Partner4 from '../../assets/icons/partner4.png';
import Partner5 from '../../assets/icons/partner5.png';
import Partner6 from '../../assets/icons/partner6.png';
import Partner7 from '../../assets/icons/partner7.png';
import Partner8 from '../../assets/icons/partner8.png';

function Partners(props) {
  return (
    <div className="container">
      <div data-aos="fade-up">
        <div className="home__title home__title-upper">
          Đối tác <span className="home__active">đồng hành</span>
        </div>
      </div>
      <div className="home__partner__content" data-aos="fade-up">
        <div className="home__partner__item">
          <img src={Partner1} alt="" />
        </div>
        <div className="home__partner__item">
          <img src={Partner2} alt="" />
        </div>
        <div className="home__partner__item">
          <img src={Partner3} alt="" />
        </div>
        <div className="home__partner__item">
          <img src={Partner4} alt="" />
        </div>
        <div className="home__partner__item">
          <img src={Partner5} alt="" />
        </div>
        <div className="home__partner__item">
          <img src={Partner6} alt="" />
        </div>
        <div className="home__partner__item">
          <img src={Partner7} alt="" />
        </div>
        <div className="home__partner__item">
          <img src={Partner8} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Partners;
