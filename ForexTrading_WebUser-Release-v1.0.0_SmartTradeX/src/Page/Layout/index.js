/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import classNames from 'classnames';
import { useModal } from 'context/ModalContext';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { routes } from './../../App';
import { Image } from 'antd';
import { useSelector } from 'react-redux';
import './index.scss';

function LayoutPage(props) {
  const { Component, className = '', isHiddenFooter } = props;
  const isUserLoggedIn = useSelector(state => (state.member ? state.member.isUserLoggedIn : false));
  const { memberReferIdF1 } = useSelector(state => state.member || {});
  const { location, history } = props;
  const { pathname = '' } = location;
  const modal = useModal();

  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  const isHome = useMemo(() => {
    return pathname === routes?.home?.path;
  }, [pathname]);

  const isFactory = useMemo(() => {
    return pathname === routes?.managementPackageBonus?.path;
  }, [pathname]);

  const isStore = useMemo(() => {
    return pathname === routes?.managementPacket?.path;
  }, [pathname]);

  const isBranch = useMemo(() => {
    return pathname === routes?.branch?.path;
  }, [pathname]);

  const isProfile = useMemo(() => {
    return pathname === routes?.managementProfile?.path;
  }, [pathname]);

  function handleClickFooterIcon(path) {
    history.push(path);
    modal.hide();
  }

  useEffect(() => {
    window.addEventListener('scroll', e => {
      const headerId = document.getElementById('header-sticky');
      if (headerId && headerId.classList) {
        if (window.pageYOffset > 0) {
          headerId.classList.toggle('sticky');
        } else {
          headerId.classList.remove('sticky');
        }
      }
    });
  }, []);

  useEffect(() => {
    if (props.isAuth) {
      // document.getElementById('root').styles.height = 'calc(100vh - 120px)'
    } else {
      document.getElementById('root').style.height = '100vh';
    }
  }, [props, props.isAuth]);

  useEffect(() => {
    const bodyId = document.getElementById('body-root');
    if (bodyId) {
      // bodyId.className = "bg-gray"
      bodyId.classList.add(className || '');
    }
  }, [className]);

  const renderTabIcons = routename => {
    switch (routename) {
      case 'home':
        if (isHome) {
          return (
            <Image
              preview={false}
              src={require('../../assets/icons/homeTab/ic_homeActive.png')}
              height={30}
              width={30}
            />
          );
        } else
          return (
            <Image preview={false} src={require('../../assets/icons/homeTab/ic_home.png')} height={30} width={30} />
          );
      case 'attendance':
        if (isFactory) {
          return (
            <Image
              preview={false}
              src={require('../../assets/icons/homeTab/ic_attendanceActive.png')}
              height={30}
              width={30}
            />
          );
        } else
          return (
            <Image
              preview={false}
              src={require('../../assets/icons/homeTab/ic_attendance.png')}
              height={30}
              width={30}
            />
          );

      case 'marketing':
        return (
          <Image preview={false} src={require('../../assets/icons/homeTab/ic_marketing.png')} height={50} width={50} />
        );
      case 'wallet':
        if (isBranch) {
          return (
            <Image
              preview={false}
              src={require('../../assets/icons/homeTab/ic_walletActive.png')}
              height={30}
              width={30}
            />
          );
        } else
          return (
            <Image preview={false} src={require('../../assets/icons/homeTab/ic_wallet.png')} height={30} width={30} />
          );

      case 'user':
        if (isProfile) {
          return (
            <Image
              preview={false}
              src={require('../../assets/icons/homeTab/ic_userActive.png')}
              height={30}
              width={30}
            />
          );
        } else
          return (
            <Image preview={false} src={require('../../assets/icons/homeTab/ic_user.png')} height={30} width={30} />
          );
      default:
        break;
    }
  };
  return (
    <>
      <div style={{ marginBottom: 90 }}>
        <Component {...props} />
      </div>
      {!isHiddenFooter ? (
        <footer className="d-block bg-white p-0 fixed-bottom footer__mobile">
          <div
            className="d-flex justify-content-between footer__item py-2 px-1 navigation text-center"
            style={{ height: '88px' }}
          >
            <div
              className={classNames('footer__item py-2', { 'border-bottom-active': isHome, 'text-primary': isHome })}
              role="button"
              onClick={() => handleClickFooterIcon(routes?.home?.path)}
            >
              {renderTabIcons('home')}
              {/* {isHome ? <HomeFilled className="fs-5" /> : <HomeOutlined className="fs-5" />} */}
              <p className="fs-7 mt-1">{t('homepage')}</p>
            </div>
            <div
              className={classNames('footer__item py-2', {
                'border-bottom-active': isFactory,
                'text-primary': isFactory,
              })}
              role="button"
              onClick={() =>
                handleClickFooterIcon(isUserLoggedIn ? routes?.managementPackageBonus?.path : routes?.login?.path)
              }
            >
              {renderTabIcons('attendance')}
              <p className="fs-7 mt-1">{t('attendance')}</p>
            </div>
            {memberReferIdF1 === 1 ? (
              <div
                className={classNames('relative', { 'text-primary': isStore })}
                role="button"
                onClick={() =>
                  handleClickFooterIcon(isUserLoggedIn ? routes?.managementPacket?.path : routes?.login?.path)
                }
              >
                <div className="muan">{renderTabIcons('marketing')}</div>
                <div className="centertxt">
                  <p className="fs-7">{t('marketing')}</p>
                </div>
              </div>
            ) : null}

            <div
              className={classNames('footer__item py-2', {
                'border-bottom-active': isBranch,
                'text-primary': isBranch,
              })}
              role="button"
              onClick={() => handleClickFooterIcon(isUserLoggedIn ? routes?.branch?.path : routes?.login?.path)}
            >
              {renderTabIcons('wallet')}
              <p className="fs-7 mt-1">{t('wallet')}</p>
            </div>
            <div
              className={classNames('footer__item py-2', {
                'border-bottom-active': isProfile,
                'text-primary': isProfile,
              })}
              role="button"
              onClick={() =>
                handleClickFooterIcon(isUserLoggedIn ? routes?.managementProfile?.path : routes?.login?.path)
              }
            >
              {renderTabIcons('user')}
              <p className="fs-7 m-1">{t('userProfile')}</p>
            </div>
          </div>
        </footer>
      ) : null}
    </>
  );
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPage);
