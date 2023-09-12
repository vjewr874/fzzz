/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import { UserGroup, TradeGroup, CoinGroup, SaveGroup } from './../../assets/icons/index';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function WelCome(props) {
  const history = useHistory();
  return (
    <>
      <div className="section bg-white" style={{ padding: '100px 0' }}>
        <div className="container">
          <div data-aos="fade-up">
            <div className="home__title">
              Bắt đầu đào Coin<span className="home__active"> như thế nào?</span>
            </div>
            <div className="home__sub home__sub-second">
              Mua tiền mã hoá bằng VND từ hàng nghìn nhà giao dịch trên FC qua chuyển khoản ngân hàng hoặc ví điện tử.
            </div>
            <div className="home__sub home__sub-second">Hoàn toàn MIỄN PHÍ. Nhanh chóng, an toàn và bảo mật</div>
            <div style={{ marginTop: '70px', marginBottom: '40px' }} className="row">
              <div className="col-12 col-md-3 mt-5">
                <div className="home__welcom__card">
                  <UserGroup className="home__welcom__icon"></UserGroup>
                  <div className="home__welcom__title">1. Tạo 1 tài khoản</div>
                  <div className="home__welcom__sub">
                    Đăng nhập hoặc đăng kí 1 tài khoản tại website. Hoặc tải ngay app để thuận tiện quản lý giao dịch.
                  </div>
                  <div
                    onClick={() => {
                      history.push({
                        pathname: '/register',
                      });
                    }}
                    className="home__title home__title-third"
                  >
                    Đăng kí ngay ->
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3  mt-5">
                <div className="home__welcom__card">
                  <CoinGroup className="home__welcom__icon"></CoinGroup>
                  <div className="home__welcom__title">2. Sử dụng Gói đào Coin</div>
                  <div className="home__welcom__sub">
                    Lựa chọn 1 Gói đào Coint thích hợp để tăng tốc quá trình tích luỹ Coint trong ví của bạn.
                  </div>
                  <div
                    onClick={() => {
                      history.push({
                        pathname: '/register',
                      });
                    }}
                    className="home__title home__title-third"
                  >
                    Mua Gói ->
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3  mt-5">
                <div className="home__welcom__card">
                  <SaveGroup className="home__welcom__icon"></SaveGroup>
                  <div className="home__welcom__title">3. Tích luỹ và theo dõi</div>
                  <div className="home__welcom__sub">
                    Theo dõi giá cả của các đồng coin trên thị trường. Luôn kiểm tra số lượng coint đào được trong ví.
                  </div>
                  <div
                    onClick={() => {
                      history.push({
                        pathname: '/register',
                      });
                    }}
                    className="home__title home__title-third"
                  >
                    Kiểm tra ví ->
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-3  mt-5">
                <div className="home__welcom__card">
                  <TradeGroup className="home__welcom__icon"></TradeGroup>
                  <div className="home__welcom__title">4. Giao dịch</div>
                  <div className="home__welcom__sub">
                    Lựa chọn thời điểm thích hợp để tiến hành giao dịch: Bán hoặc Quy đổi để thu vê lợi nhuận tốt.
                  </div>
                  <div
                    onClick={() => {
                      history.push({
                        pathname: '/register',
                      });
                    }}
                    className="home__title home__title-third"
                  >
                    Giao dịch ngay ->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WelCome;
