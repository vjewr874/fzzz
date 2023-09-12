/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Carousel } from 'antd';
import Header from 'components/Header';
import { useSystem } from 'context/SystemContext';
import React, { useCallback, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import './index.scss';
import SystemConfiguration from '../../services/systemConfiguration';
import moment from 'moment';
import CustomerService from '../../services/customerMessage';
// import WebTimes from "components/WebTimes";
import { routes } from './../../App';
const DeaFaultFilter = {
  skip: 0,
  limit: 10,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};
export default function Home() {
  let myInterval = null;
  const [step, setstep] = useState(1);
  const [system, setsystem] = useState({});
  const [index, setindex] = useState(0);
  const [gameIndex, setgameIndex] = useState(1);
  const [notificationText, setNotifiactionText] = useState([]);
  const history = useHistory();
  const data = [
    {
      title: 'WIN GO',
      content: 'Đoán màu xanh lá cây/tím/đỏ để giành chiến thắng',
      bg_color: '#64bfff, #2b5dfe',
      dataUsers: [
        { name: 'Thiên An', amount: '100,000 đ' },
        { name: 'Ngọc Bảo', amount: '200,000 đ' },
        { name: 'Nguyên Chương', amount: '1,000,000 đ' },
        { name: 'CườngHQ', amount: '500,000 đ' },
        { name: 'Thanh Duy', amount: '50,000 đ' },
        { name: 'Quốc Khánh', amount: '20,000 đ' },
        { name: 'Thành Lợi', amount: '10,000 đ' },
        { name: 'Hoàng Phi', amount: '40,000 đ' },
        { name: 'Hoàng Anh', amount: '900,000 đ' },
        { name: 'Ngọc Diệp', amount: '700,000 đ' },
      ],
      logo: require('../../assets/images/logo-wingo.png'),
      onClick: () => {
        history.push(routes.gameWinGo.path);
      },
    },
    {
      title: '5D LOTRE',
      content: 'Đoán số/lớn/nhỏ/lẻ/chẵn',
      bg_color: '#a373ff,#7850f9',
      dataUsers: [
        { name: 'Hoàng Anh', amount: '900,000 đ' },
        { name: 'Ngọc Diệp', amount: '700,000 đ' },
        { name: 'Hà Giang', amount: '100,000 đ' },
        { name: 'Quốc Nhật', amount: '10,000 đ' },
        { name: 'Hoàng Phi', amount: '40,000 đ' },
        { name: 'Khánh Vy', amount: '200,000 đ' },
        { name: 'Thảo Vy', amount: '1,000,000 đ' },
        { name: 'Phương Trang', amount: '500,000 đ' },
        { name: 'Hoàng Gia', amount: '50,000 đ' },
        { name: 'Quốc Khánh', amount: '20,000 đ' },
      ],
      logo: require('../../assets/images/logo-5D_Lotre.png'),
      onClick: () => {
        history.push(routes.game5DLotre.path);
      },
    },
    {
      title: 'K3 LOTRE',
      content: 'Đoán số/lớn/nhỏ/lẻ/chẵn',
      bg_color: '#fc3a3a,#ff0',
      dataUsers: [
        { name: 'Ngọc Diệp', amount: '700,000 đ' },
        { name: 'Hà Giang', amount: '100,000 đ' },
        { name: 'Quốc Nhật', amount: '10,000 đ' },
        { name: 'Phương Trang', amount: '500,000 đ' },
        { name: 'Hoàng Phi', amount: '40,000 đ' },
        { name: 'Khánh Vy', amount: '200,000 đ' },
        { name: 'Thảo Vy', amount: '1,000,000 đ' },
        { name: 'Hoàng Anh', amount: '900,000 đ' },
        { name: 'Hoàng Gia', amount: '50,000 đ' },
        { name: 'Quốc Khánh', amount: '20,000 đ' },
      ],
      logo: require('../../assets/images/logo-k3_lotre.png'),
      onClick: () => {
        history.push(routes.game5DLotre.path);
      },
    },
  ];

  useEffect(() => {
    SystemConfiguration.systemConfigurationGetDetail().then(res => {
      const { data, isSuccess } = res;
      if (isSuccess) {
        setsystem(data);
      }
    });
    handleGetNotification();
  }, []);

  useEffect(() => {
    startInterval();
  }, [index]);

  function handleGetNotification() {
    CustomerService.getGroupCustomerMessage(DeaFaultFilter).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        if (data?.data && data.data) {
          setNotifiactionText(data.data);
        }
      }
    });
  }
  const startInterval = () => {
    myInterval = setInterval(() => {
      setindex(index + 1);
      clearInterval(myInterval);
    }, 1999);
  };

  // useIntl template
  const intl = useIntl();
  const t = useCallback(
    id => {
      return intl.formatMessage({ id });
    },
    [intl],
  );

  const renderContent = () => {
    return (
      <div className="swipText">
        <div style={{ fontWeight: 600, marginBottom: 20 }} className="swipText">
          {step === 1
            ? 'Chọn 1 trò chơi bạn yêu thích'
            : step === 2
            ? 'Chọn con số may mắn của bạn'
            : step === 3
            ? 'Mua số'
            : step === 4
            ? 'Giành giải thưởng'
            : null}
        </div>
        <div className="swipText">
          {step === 1
            ? 'Bạn có thể chơi các trog chơi sổ số trong vòng 1 phút, 3 phút, 5 phút và 10 phút'
            : step === 2
            ? 'Chọn con số hoặc màu sắc may mắn của bạn'
            : step === 3
            ? 'Chọn số tiền bạn muốn mua số và xác nhận'
            : step === 4
            ? 'Khi bạn chọn con số may mắn cho kỳ hiện tại, hệ thống sẽ tự động cộng tiền thưởng vào số dư của bạn'
            : null}
        </div>
      </div>
    );
  };

  return (
    <div className="home pt-0 overflow-hidden position-relative">
      <Header
        title={
          <img src={require('../../assets/images/headerLogo.png')} className="navbar-back" height={38} width={100} />
        }
      />

      <div className="position-relative h-100">
        <Carousel className="Carousel" autoplay dots slidesToShow={1}>
          <img className="img-fluid img-banner" src={system?.bannerImage1} alt="" />
          <img className="img-fluid img-banner" src={system?.bannerImage2} alt="" />
          <img className="img-fluid img-banner" src={system?.bannerImage3} alt="" />
          <img className="img-fluid img-banner" src={system?.bannerImage4} alt="" />
          <img className="img-fluid img-banner" src={system?.bannerImage5} alt="" />
        </Carousel>

        <div className="rowSlide">
          <div className="ic_loud">
            <img className="icon" src={require('../../assets/icons/ic_loud.png')} />
          </div>

          <marquee className="van-notice-bar__content">
            {notificationText?.map(item => {
              return <span style={{ marginRight: '200px' }}>{item.groupCustomerMessageTitle}</span>;
            })}
          </marquee>

          <div className="notify">
            <img className="ic-fire" src={require('../../assets/icons/ic_fire.svg')} />
            <div>Thông báo mới nhất</div>
          </div>
        </div>

        <div className="gameWrap">
          <div onClick={() => setgameIndex(1)} className="game1">
            <img className="gameIcon" src={require('../../assets/icons/game1.svg')} />
            {gameIndex === 1 && <img className="polygon" src={require('../../assets/icons/Polygon.svg')} />}
          </div>
          <div onClick={() => setgameIndex(2)} className="game2">
            <img className="gameIcon" src={require('../../assets/icons/Game2.svg')} />
            {gameIndex === 2 && <img className="polygon" src={require('../../assets/icons/Polygon.svg')} />}
          </div>
        </div>

        <div>
          {data.map(item => {
            // let i = index %2 == 0? 0 :index %3 == 0? 1 : index %5 == 0?2 :index %7 == 0?3 : 4
            let e = Math.floor(Math.random() * 5);
            return (
              <div onClick={item.onClick} className="item pointer">
                <div className="logo">
                  <img className="logosrc" src={item.logo} />
                </div>
                <div
                  className="info"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${item.bg_color})`,
                  }}
                >
                  <text className="gameTitle">{item.title}</text>
                  <text className="gameContent">{item.content}</text>
                </div>
                <button className="rowBetween">
                  <div className="itemdiv rowBetween">
                    <div>
                      <img className="avatar" src={require('../../assets/icons/avatar.svg')} />
                      <text>{item.dataUsers[e].name}</text>
                    </div>
                    <text>thắng {item.dataUsers[e].amount}</text>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* <div className="bonus-box">
          <div
            className="img van-image"
            styles={{ width: "100%", height: "170px" }}
          >
            <img
              src={require("../../assets/images/coin-bonus.png")}
              className="van-image__img"
            />
          </div>
          <div className="bonus-bg" styles={{}}>
            <div className="inner">
              <span >{system.totalBetRecordWinAmount} ₫</span>
            </div>
          </div>
        </div> */}
        <div className="webInfo">
          <div className="info-item">
            <div>
              <img className="icon" src={require('../../assets/icons/ic_user.svg')} />
            </div>
            <div className="info-value">{system?.totalSystemUser}</div>
            <div className="bottom">Số lượng người dùng</div>
          </div>

          <div className="info-item">
            <div>
              <img className="icon" src={require('../../assets/icons/ic_num-bet.svg')} />
            </div>
            <div className="info-value">{system?.totalBetAmount}</div>
            <div className="bottom">Số lần mua</div>
          </div>

          <div className="info-item">
            <div>
              <img className="icon" src={require('../../assets/icons/ic_online.svg')} />
            </div>
            <div className="info-value">{system.totalActiveUser}</div>
            <div className="bottom">Số người trực tuyến</div>
          </div>
        </div>

        <div className="home-how">
          <div className="how-info">
            <div className="tit"> Làm thế nào để mua ? </div>
            <div className="tab c-row c-flex-warp c-row-between">
              <div
                onClick={() => setstep(1)}
                style={{ borderColor: step === 1 && '#C72114' }}
                className="item-info c-row c-row-between action c-row-middle"
              >
                <div style={{ flex: 1, marginRight: 5 }}>
                  <div className="step" style={{ color: step === 1 && '#C72114' }}>
                    {' '}
                    Bước đầu{' '}
                  </div>
                  <div color="#e45d61" className="name" style={{ color: step === 1 && '#C72114' }}>
                    {' '}
                    Chọn một trò chơi{' '}
                  </div>
                </div>
                <div>
                  <div className="van-image" style={{ width: 20, height: 20 }}>
                    <img
                      src={
                        step === 1
                          ? require('../../assets/icons/ic_step1_active.svg')
                          : require('../../assets/icons/ic_step1.svg')
                      }
                      className="step-img"
                    />
                  </div>
                </div>
              </div>
              <div
                onClick={() => setstep(2)}
                style={{ borderColor: step === 2 && '#C72114' }}
                className="item-info c-row c-row-between c-row-middle"
              >
                <div style={{ flex: 1, marginRight: 5 }}>
                  <div className="step" style={{ color: step === 2 && '#C72114' }}>
                    {' '}
                    Bước hai{' '}
                  </div>
                  <div color="#000" className="name" style={{ color: step === 2 && '#C72114' }}>
                    {' '}
                    Chọn con số may mắn của bạn{' '}
                  </div>
                </div>
                <div>
                  <div className="van-image" style={{ width: 20, height: 20 }}>
                    <img
                      src={
                        step === 2
                          ? require('../../assets/icons/ic_step2_active.svg')
                          : require('../../assets/icons/ic_step2.svg')
                      }
                      className="step-img"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tab c-row c-flex-warp c-row-between">
              <div
                onClick={() => setstep(3)}
                style={{ borderColor: step === 3 && '#C72114' }}
                className="item-info c-row c-row-between c-row-middle"
              >
                <div style={{ flex: 1, marginRight: 5 }}>
                  <div className="step" style={{ color: step === 3 && '#C72114' }}>
                    {' '}
                    Bước ba{' '}
                  </div>
                  <div color="#000" className="name" style={{ color: step === 3 && '#C72114' }}>
                    {' '}
                    Mua số{' '}
                  </div>
                </div>
                <div>
                  <div className="van-image" style={{ width: 20, height: 20 }}>
                    <img
                      src={
                        step === 3
                          ? require('../../assets/icons/ic_step3_active.svg')
                          : require('../../assets/icons/ic_step3.svg')
                      }
                      className="step-img"
                    />
                  </div>
                </div>
              </div>
              <div
                onClick={() => setstep(4)}
                style={{ borderColor: step === 4 && '#C72114' }}
                className="item-info c-row c-row-between c-row-middle"
              >
                <div style={{ flex: 1, marginRight: 5 }}>
                  <div className="step" style={{ color: step === 4 && '#C72114' }}>
                    {' '}
                    Bước bốn{' '}
                  </div>
                  <div color="#000" className="name" style={{ color: step === 4 && '#C72114' }}>
                    {' '}
                    Nhận tiền thưởng{' '}
                  </div>
                </div>
                <div>
                  <div className="van-image" style={{ width: 20, height: 20 }}>
                    <img
                      src={
                        step === 4
                          ? require('../../assets/icons/ic_step4_active.svg')
                          : require('../../assets/icons/ic_step4.svg')
                      }
                      className="step-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="swipe-container">
            <div
              onClick={() => {
                if (step > 1) {
                  setstep(step - 1);
                } else setstep(4);
              }}
              style={{ position: 'absolute', left: 10 }}
            >
              <img src={require('../../assets/icons/Buttonprevious.svg')} className="arrow_button" />
            </div>

            <div className="content">{renderContent()}</div>

            <div
              onClick={() => {
                if (step < 4) {
                  setstep(step + 1);
                } else setstep(1);
              }}
              style={{ position: 'absolute', right: 10 }}
            >
              <img src={require('../../assets/icons/Buttonnext.svg')} className="arrow_button" />
            </div>
          </div>
        </div>

        {/* bảng xếp hạng */}
        {/* <div>
          <div className="rankHead">
            <img
              src={require("../../assets/images/rankbanner.png")}
              className="rank-banner"
            />
          </div>

          <div className="rank-box">
            {dataRank.map((item, index) => (
              <div className="">
                <div className="rowBetween">
                  <div styles={{width:'30%'}}>
                    <img
                      className="avatar"
                      src={require("../../assets/icons/avatar.svg")}
                    />
                    <text className="username">{item.name}</text>
                  </div>
                  <text className="user-amount">{item.amount}.00đ</text>
                  <text>{item.time}</text>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
