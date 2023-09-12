/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import { ArrowButton } from './../../assets/icons/index';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function Outer(props) {
  const history = useHistory();
  return (
    <div className="section home__outer">
      <div className="home__banner__outer">
        <div className="container">
          <div data-aos="fade-up">
            <div className="home__title home__title-upper">
              FACCOIN
              <span className="home__active"> Là gì và phương thức hoạt động</span>{' '}
            </div>
            <div className="home__sub home__sub-second">
              Mua tiền mã hoá bằng VND từ hàng nghìn nhà giao dịch trên FC qua chuyển khoản ngân hàng hoặc ví điện tử.
            </div>
            <div className="home__sub home__sub-second">Hoàn toàn MIỄN PHÍ. Nhanh chóng, an toàn và bảo mật</div>
          </div>
          <div className="row  home__content" data-aos="fade-up">
            <div className="col-12 col-md-6">
              <div className="home__title home__title-second">
                Là 1 sàn thương mại điện tử, tích hợp đào các đồng coin DEFI, vốn hóa thị trường phi tập trung
              </div>

              <ul className="home__ul">
                <li>
                  Khi bạn tham gia FAC COIN, bạn sẽ dùng chính nguồn tiền, nguồn tài chính của bạn, giúp dòng tiền của
                  bạn không bị ngưng đọng 1 chỗ.
                </li>
                <li>
                  FAC COIN giúp mọi người có thể đào coin, trao đổi mua bán coin 1 cách nhanh tróng, hiệu quả, an toàn
                  và tiện lợi nhất. FAC COIN giúp tất cả mọi người, dù là nguồn lực tài chính thấp hay cao đều có thể sở
                  hữu các đồng coin 1 cách dễ dàng nhất.
                </li>
                <li>FAC COIN giúp khách hàng có thể tạo ra 1 nguồn thu nhập thụ động.</li>
                <li>
                  Chúng ta không có thể đào các đồng coin có giá trị cao, nhưng để có thể đào được chúng thì tốn rất
                  nhiều thời gian và tiền bạc.
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-6">
              <img src={'/assets/imagesHome/Box1.png'} alt="Box1" style={{ marginTop: '50px' }} />
            </div>
          </div>
          <div className="row home__content" data-aos="fade-up">
            <div className="col-12 col-md-6">
              <img src={'/assets/imagesHome/Box2.png'} alt="Box2" />
            </div>
            <div className="col-12 col-md-6">
              <div className="home__title home__title-second">
                Coin DEFI sẽ là xu thế là sự lựa chọn hoàn hảo cho các nền tảng Block Chain trên Smartphone
              </div>

              <ul className="home__ul">
                <li>
                  Với nền tảng phi tập trung vốn hóa thị trường trên toàn thế giới, thì Coin Defi có thể chạm tay đến
                  bất cứ người dùng nào, miễn là họ đang dùng và sở hữu 1 chiếc điện thoại Smartphone (nền tảng iOS or
                  Android), dựa vào việc đó, thì FAC COIN sẽ hợp tác với khách hàng, là những người đã và đang sử dụng
                  các thiết bị di động thông minh đó.
                </li>
                <li>Để hợp tác song phương, 2 bên cùng có lợi.</li>
                <li>
                  Khách hàng sẽ dùng chính các thiết bị di động thông minh của mình để đào ra các đồng coin và sau đó
                  bán lại cho FAC COIN hoặc ĐẠI LÝ TRỰC THUỘC HỆ THỐNG.
                </li>
              </ul>
              <div
                onClick={() => {
                  history.push({
                    pathname: '/register',
                  });
                }}
                className="home__title home__title-third"
              >
                Trở thành đại lý ngay ->
              </div>
            </div>
          </div>
          <div className="row  home__content" data-aos="fade-up">
            <div className="col-12 col-md-6">
              <div className="home__title home__title-second">
                Tại sao FAC COIN không tự đào mà phải nhờ vào khách hàng ?
              </div>
              <div style={{ color: '#fff' }} className="home__title home__title-four">
                {' '}
                Vô cùng đơn giản nhưng đó là sự thật :{' '}
              </div>
              <ul className="home__ul">
                <li>
                  FAC COIN có thể tự đào được nhưng không thể hiệu quả bằng việc kết hợp với người dùng có sử dụng các
                  thiết bị di động thông minh (SMARTPHONE).
                </li>
                <li>
                  Bởi vì căn bản, 1 thiết bị Smart Phone chỉ có thể đào cùng lúc 1 đồng coin cho đến khi quá trình đào
                  đó kết thúc.
                </li>
              </ul>
              <div className="home__ul-div">Chính vì vậy FAC COIN đã có 1 bước đi vô cùng thông minh:</div>
              <ul className="home__ul">
                <li>
                  Thay vì bỏ tiền ra mua 10 chiếc Smart Phone để đào thì FAC COIN sẽ tìm kiếm 10 khách hàng đã và đang
                  sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li>
                  Thay vì bỏ tiền ra mua 100 chiếc Smart Phone để đào thì FAC COIN sẽ tìm kiếm 100 khách hàng đã và đang
                  sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li>
                  Thay vì bỏ tiền ra mua 1000 chiếc Smart Phone để đào thì FAC COIN sẽ tìm kiếm 1000 khách hàng đã và
                  đang sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li>
                  Thay vì bỏ tiền ra mua 10.000 chiếc Smart Phone để đào thì FAC COIN sẽ tìm kiếm 10.000 khách hàng đã
                  và đang sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li>Tương đương 100.000 chiếc Smart Phone và 100.000 KHÁCH HÀNG.</li>
              </ul>
              <div
                onClick={() => {
                  history.push({
                    pathname: '/register',
                  });
                }}
                className="home__title home__title-third"
              >
                Trở thành đại lý ngay ->
              </div>
            </div>
            <div className="col-12 col-md-6">
              <img src={'/assets/imagesHome/Box3.png'} alt="Box3" style={{ marginTop: '50px' }} />
            </div>

            <div className="text-center mt-5 d-flex align-items-center justify-content-center">
              <Button
                style={{ maxWidth: '300px' }}
                className="login__button d-flex align-items-center justify-content-center"
                type="primary"
                size="large"
                onClick={() => {
                  history.push({
                    pathname: '/register',
                  });
                }}
              >
                <ArrowButton style={{ marginRight: '8px' }} /> Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Outer;
