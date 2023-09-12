/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import './styles/FAQs.scss';
import React, { useState } from 'react';
import ic_Next from '../../assets/new-icons/ic-next-black.svg';
import ic_Next_White from '../../assets/new-icons/ic-next-white.svg';
import icGuide from '../../assets/new-icons/ic-guide-play.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from '../../App';
import ModalNotification from '../../components/Modal/components/ModalNotification/ModalNotification';
function FAQs() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isShowNotification, setIsShowNotification] = useState(
    searchParams?.get('status') ? searchParams?.get('status') : false,
  );
  const icon = {
    ic_Next: ic_Next,
  };
  const faqs = [
    {
      path: 'TicketBuyGuide',
      title: 'I. Hướng dẫn mua vé',
    },
    {
      path: 'Referral',
      title: 'II. Hoa hồng giới thiệu bạn bè',
    },
    {
      path: 'Rules',
      title: 'III. Điều khoản sử dụng',
    },
  ];
  return (
    <Page
      isShowMenu={true}
      headerTitle={'Câu hỏi thường gặp'}
      isShowNotification={true}
      handleShowNotification={() => setIsShowNotification(!isShowNotification)}
    >
      <div id="FAQs">
        <div className="FAQs">
          <div className="FAQs-container">
            {faqs.map((faq, index) => (
              <div
                onClick={() =>
                  history.push(index === 2 ? `${routes.termsOfUse.path}` : `${routes.faqs.path}${faq.path}`)
                }
                className="FAQs-item"
                key={index}
              >
                <p className="FAQs-item-title">{faq.title}</p>
                <div
                  className="background-image FAQs-item-icon"
                  style={{ backgroundImage: `url("${icon.ic_Next}")` }}
                />
              </div>
            ))}
          </div>
          <div onClick={() => history.push(routes.guide.path)}>
            <div className="FAQs-guide">
              <div className="FAQs-guide-left">
                <div className="FAQs-item-icon" style={{ backgroundImage: `url(${icGuide})` }} />
                <div className="FAQs-guide-text">Hướng dẫn chơi</div>
              </div>
              <div className="background-image FAQs-item-icon" style={{ backgroundImage: `url("${ic_Next_White}")` }} />
            </div>
          </div>
        </div>
        <ModalNotification isOpen={isShowNotification} closeModal={() => setIsShowNotification(false)} />
      </div>
    </Page>
  );
}
export default FAQs;
