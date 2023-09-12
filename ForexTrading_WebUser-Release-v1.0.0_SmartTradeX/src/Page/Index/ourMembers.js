/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import ProfileImg from '../../assets/icons/profile.png';

function OurMembers() {
  return (
    <div className="container home_member">
      <div data-aos="fade-up">
        <div className="home__title home__title-upper">
          Đội ngũ <span className="home__active">của chúng tôi</span>
        </div>
        <p className="home__sub home__sub-second">
          Được sáng lập vào năm 2009 , FAC Network hiện đã có mặt tại hơn 190 quốc gia trên thế giới với hơn 13.000.000
          <br />
          nhà đầu tư giao dịch trên toàn cầu và vẫn đang phát triển hàng ngày. Toàn cầu hiện nay chúng tôi đã có hơn
          268.000 đối
          <br />
          tác, mỗi ngày có hơn 5000 tài khoản được tạo mới.
        </p>
        <p className="home__sub home__sub-second">
          Chúng tôi có những chuyên viên cao cấp và chuyên nghiệp nhất, tại Việt Nam các chuyên viên và chuyên gia của
          FAC
          <br />
          Network đã có hơn 40 giải thưởng quốc tế trong ngành.Đội ngũ chuyên gia và bộ phân chăm sóc khách hàng chuyên
          <br />
          nghiệp sẽ mang lại trải nghiệm tốt nhất cho các nhà đầu tư của chúng tôi.
        </p>
      </div>
      <div className="home__member__content" data-aos="fade-up">
        <div className="home__member__item">
          <img src={ProfileImg} alt="" />
          <div className="home__member__title">Ông Nguyễn Văn A</div>
          <span>Co-Founder & CEO</span>
        </div>
        <div className="home__member__item">
          <img src={ProfileImg} alt="" />
          <div className="home__member__title">Ông Nguyễn Văn A</div>
          <span>Co-Founder & CEO</span>
        </div>
        <div className="home__member__item">
          <img src={ProfileImg} alt="" />
          <div className="home__member__title">Ông Nguyễn Văn A</div>
          <span>Co-Founder & CEO</span>
        </div>
        <div className="home__member__item">
          <img src={ProfileImg} alt="" />
          <div className="home__member__title">Ông Nguyễn Văn A</div>
          <span>Co-Founder & CEO</span>
        </div>
        <div className="home__member__item">
          <img src={ProfileImg} alt="" />
          <div className="home__member__title">Ông Nguyễn Văn A</div>
          <span>Co-Founder & CEO</span>
        </div>
        <div className="home__member__item">
          <img src={ProfileImg} alt="" />
          <div className="home__member__title">Ông Nguyễn Văn A</div>
          <span>Co-Founder & CEO</span>
        </div>
      </div>
    </div>
  );
}

export default OurMembers;
