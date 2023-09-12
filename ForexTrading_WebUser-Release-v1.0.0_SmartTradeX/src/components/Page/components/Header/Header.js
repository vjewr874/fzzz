/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import './styles/header.scss';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../../App';
import MenuList from './components/MenuList/MenuList';
import CustomerService from '../../../../services/customerMessage';
//icons
import icBack from '../../../../assets/stock-icons/ic-arrow-left-square.svg';
import icNotification from '../../../../assets/new-icons/ic-notification.svg';
import icShopCart from '../../../../assets/new-icons/ic-shopcart.svg';
import icTrash from '../../../../assets/new-icons/ic-trash.svg';
import icSchedule from '../../../../assets/new-icons/ic-schedule.svg';
import icSetting from '../../../../assets/stock-icons/ic-setting.svg';

import icLinkToHistory from '../../../../assets/stock-icons/ic-toHistory.svg';
import { useUser } from '../../../../context/UserContext';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const { user } = useUser();
  const data = JSON.parse(localStorage.getItem(`buyLottery${user.username}`));
  const [active, setActive] = useState();
  useEffect(() => {
    getUnreadNotificationCount();
  }, []);

  function getUnreadNotificationCount() {
    if (props?.isShowNotification === true) {
      CustomerService.getUnreadNotificationCount({ filter: {} }).then(r => {
        const { isSuccess, data } = r;
        if (isSuccess) {
          setActive(data);
        }
      });
    }
  }

  const openUrl = url => {
    window.location.href = url;
  };
  const historyBack = () => {
    history.goBack();
  };
  return (
    <div>
      <div className={'container-header'}>
        <div className={'container-item__left'}>
          {props?.isNoIconLeft && (
            <div
              style={{
                height: '24px',
                width: '24px',
              }}
            />
          )}
          {props?.isShowSetting && (
            <div
              className={'background-image icon-back'}
              style={{ backgroundImage: `url('${icSetting}')` }}
              onClick={() => history.push(routes.profile.path)}
            />
          )}
          {!props?.isShowMenu && !props?.isShowSetting && !props?.isNoIconLeft && (
            <div
              className={'background-image icon-back'}
              style={{ backgroundImage: `url('${icBack}')` }}
              onClick={() => {
                if (window.location.pathname === '/customer-service') {
                  openUrl('/');
                } else {
                  props?.backToHome ? history.push(routes.home.path) : historyBack();
                }
              }}
            />
          )}
          {props?.isShowMenu && (
            <div className={'container-menu-toggle'} onClick={() => setIsOpen(!isOpen)}>
              <div className={'bar bar--top'} />
              <div className={'bar bar--middle'} />
              <div className={'bar bar--bottom'} />
            </div>
          )}
          {}
        </div>
        <div className={'container-item__center'}>{props?.headerTitle}</div>
        <div className={'container-item__right'}>
          {!props?.isHideItemRight && (
            <div className={'container-item__right'}>
              {props?.isShowNotification && (
                <div
                  className={'container-icon container-icon__notification background-image'}
                  style={{ backgroundImage: `url('${icNotification}')` }}
                  onClick={() => history.push(routes.notification.path)}
                >
                  <div className={`notification ${active?.total > 0 ? 'active' : ''}`} />
                </div>
              )}
              {props?.isShowSchedule && (
                <div
                  className={'container-icon container-icon__notification background-image'}
                  style={{ backgroundImage: `url('${icSchedule}')` }}
                  onClick={() => history.push(routes.lotteryCalendar.path)}
                ></div>
              )}
              {props?.isShowShopCart && (
                <div
                  className={'container-icon container-icon__notification background-image'}
                  style={{ backgroundImage: `url('${icShopCart}')` }}
                  onClick={() => history.push(routes.shopCart.path)}
                >
                  <div
                    className={`shop-cart ${
                      data?.productSingleList?.length > 0 || data?.productSpecialList?.length > 0 ? 'active' : ''
                    }`}
                  />
                </div>
              )}
              {props?.isShowTrash && (
                <div
                  className={'container-icon container-icon__notification background-image'}
                  style={{ backgroundImage: `url('${icTrash}')` }}
                  onClick={() => props?.handleRemove()}
                />
              )}
              {props?.isLinkToHistory && (
                <div
                  className={'container-icon container-icon__notification background-image'}
                  style={{ backgroundImage: `url('${icLinkToHistory}')` }}
                  onClick={() => history.push()}
                />
              )}
              {props.headerRight}
            </div>
          )}
          {props?.isHideItemRight && <div className={'icon-back'} />}
        </div>
      </div>
      {props?.isShowMenu && <MenuList isOpen={isOpen} closeMenu={() => setIsOpen(false)} />}
    </div>
  );
}

export default Header;
