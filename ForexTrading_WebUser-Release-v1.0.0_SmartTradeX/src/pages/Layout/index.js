/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect } from 'react';
import './index.scss';
import Footer from '../../components/Page/components/Footer/Footer';
import { useHistory } from 'react-router-dom';

function LayoutPage(props) {
  const history = useHistory();
  const { isAuth, Component, className = '', isHiddenFooter, isUserLoggedIn } = props;
  const { location } = props;
  const { pathname = '' } = location;

  useEffect(() => {
    window.addEventListener('scroll', () => {
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
    if (isAuth) {
      if (!isUserLoggedIn) {
        history.push('/login');
      }
    }
    if (isUserLoggedIn && (pathname === '/login' || pathname === '/register')) {
      history.push('/');
    }
    if (pathname === '/') {
      document.getElementById('root').style.backgroundColor = '#1D1D42';
    } else if (
      pathname === '/login' ||
      pathname === '/myProfile' ||
      pathname === '/change-password' ||
      pathname === '/profile' ||
      pathname === '/recharge' ||
      pathname === '/register' ||
      pathname === '/forgot' ||
      pathname === '/withdraw' ||
      pathname === '/notification' ||
      pathname === '/hallTransaction' ||
      pathname === '/contacts' ||
      pathname === '/refer-friends' ||
      pathname === '/commission-payment' ||
      pathname === '/transition-history' ||
      pathname === '/FAQs' ||
      pathname === '/booking-history' ||
      pathname === '/terms-of-use' ||
      pathname === '/customer-service' ||
      pathname === '/my-wallet' ||
      pathname === '/group' ||
      pathname === '/constraint-bank' ||
      pathname === '/order' ||
      pathname.includes('order-detail') ||
      pathname === '/saleTransaction' ||
      pathname === '/betRecord' ||
      pathname === '/chart' ||
      pathname.includes('paymentExchange-detail') ||
      pathname === '/market-history'
    ) {
      document.getElementById('root').style.backgroundColor = '#1D1D42';
    } else {
      document.getElementById('root').style.backgroundColor = '#1D1D42';
    }
    document.getElementById('root').style.height = '100vh';
    document.getElementById('root').style.color = '#ffffff';
  }, [props, isAuth]);

  useEffect(() => {
    const bodyId = document.getElementById('body-root');
    if (bodyId) {
      bodyId.classList.add(className || '');
    }
  }, [className]);
  return (
    <>
      <div>
        <Component {...props} />
      </div>

      {!isHiddenFooter && <Footer pathname={pathname} />}
    </>
  );
}

export default LayoutPage;
