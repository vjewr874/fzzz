/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './styles/footer.scss';
import { useHistory } from 'react-router-dom';
import { injectIntl } from 'react-intl';
//icon
import HomeBtn from '../../../../assets/stock-icons/ic-home.svg';
import HomeActiveBtn from '../../../../assets/stock-icons/ic-homeActive.svg';
import TransitionHistoryBtn from '../../../../assets/forex-icons/ic-transition-history.svg';
import TransitionHistoryActiveBtn from '../../../../assets/forex-icons/ic-transition-history-active.svg';
import OrderBtn from '../../../../assets/stock-icons/ic-order.svg';
import OrderActiveBtn from '../../../../assets/stock-icons/ic-orderActive.svg';
import AboutMeBtn from '../../../../assets/stock-icons/ic-rofile.svg';
import AboutMeActiveBtn from '../../../../assets/stock-icons/ic-profileActive.svg';
const footerList = [
  {
    id: 1,
    label: 'footer.home',
    url: '/',
    ic_url: HomeBtn,
    ic_active_url: HomeActiveBtn,
  },
  {
    id: 2,
    label: 'TransitionHistory',
    url: '/betRecord',
    ic_url: TransitionHistoryBtn,
    ic_active_url: TransitionHistoryActiveBtn,
  },
  {
    id: 3,
    label: 'footer.aboutMe',
    url: '/myProfile',
    ic_url: AboutMeBtn,
    ic_active_url: AboutMeActiveBtn,
  },
];
function Footer(props) {
  const { intl } = props;

  const history = useHistory();
  return (
    <footer className="container-footer">
      {footerList?.map((item, index) => {
        return (
          <div
            className={`container-footer__item ${item?.url === props?.pathname ? 'active' : ''}`}
            key={index}
            onClick={() => history.push(item?.url)}
          >
            <div
              className={'background-image footer-icon'}
              style={{
                backgroundImage: `url('${item?.url === props?.pathname ? item?.ic_active_url : item?.ic_url}')`,
              }}
            />
            <p className={'footer-label'}>{intl.formatMessage({ id: `${item.label}` })}</p>
            <div className="active-bar" />
          </div>
        );
      })}
    </footer>
  );
}
export default injectIntl(Footer);
