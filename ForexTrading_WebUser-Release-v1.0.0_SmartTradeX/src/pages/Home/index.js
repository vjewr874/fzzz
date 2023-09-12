/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Carousel } from 'antd';
import { useHistory } from 'react-router-dom';
import { routes } from '../../App';
import ModalNewNotification from 'components/Modal/components/ModalNewNotification/ModalNewNotification';
import CustomerService from '../../services/customerMessage';
import './styles/home.scss';
import SystemConfiguration from '../../services/systemConfiguration';
import Logo from '../../assets/stock-images/im-logo.png';
import ic_wave from '../../assets/stock-icons/ic-wave.svg';
import ic_history from '../../assets/stock-icons/ic-history.svg';
import ic_guide from '../../assets/stock-icons/ic-guide.svg';
import ic_refer from '../../assets/stock-icons/ic-refer.svg';
import ic_service from '../../assets/stock-icons/ic-service.svg';
import ic_wallet from '../../assets/stock-icons/ic-wallet.svg';
import ic_group from '../../assets/stock-icons/ic-group.svg';
import ic_logout from '../../assets/stock-icons/ic-logoutLg.svg';
import ic_detail from '../../assets/stock-icons/ic-detail.svg';
// import currencyFormat from 'ultils/CurrencyFormat';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import ModalCustomerService from '../../components/Modal/components/ModalCustomerService/ModalCustomerService';
import { useUser } from '../../context/UserContext';
import ListMarket from './Components/ListMarket';
import Language from '../../components/Language';
import { BINANCE_PARAMS, COIN_LIST } from '../../constants/listCoin';

const features = [
  {
    img: ic_wallet,
    label: 'home.wallet',
    value: 'wallet',
    routes: routes.myWallet.path,
  },
  {
    img: ic_refer,
    label: 'home.refer_friend',
    value: 'refer_friend',
    routes: routes.referFriends.path,
  },
  {
    img: ic_group,
    label: 'home.group',
    value: 'group',
    routes: routes.group.path,
  },
  {
    img: ic_guide,
    label: 'home.guide',
    value: 'guide',
    routes: routes.termsOfUse.path,
  },
  {
    img: ic_detail,
    label: 'home.detail_account',
    value: 'detail_account',
    routes: routes.profile.path,
    towLine: true,
  },
  {
    img: ic_service,
    label: 'home.customer_service',
    value: 'customer_service',
    routes: routes.customerService.path,
    towLine: true,
  },
  {
    img: ic_history,
    label: 'home.transaction_history',
    value: 'transaction_history',
    routes: routes.transitionHistory.path,
    towLine: true,
  },
];

const Home = props => {
  const isShowNewNotification = JSON.parse(window.localStorage.getItem('showFirstNotification'));
  const { intl } = props;
  const history = useHistory();
  const { signOut } = useUser();
  // const userStore = useSelector(state => state?.member);
  const [dataNewNotification, setDataNewNotification] = useState(undefined);
  const [isOpenModalNotification, setIsOpenModalNotification] = useState(isShowNewNotification);
  const [system, setSystem] = useState({});
  const [coinData, setCoinData] = useState(COIN_LIST);
  const [newCoinData, setNewCoinData] = useState(COIN_LIST);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalCustomerService, setIsOpenModalCustomerService] = useState(false);
  const socketUrl = 'wss://stream.binance.com:9443/ws';

  const handleSymbolClick = type => {
    const searchParams = new URLSearchParams();
    searchParams.append('type', type);
    searchParams.append('interval', '1m');
    searchParams.toString();
    history.push('/chart?' + searchParams.toString());
  };

  useEffect(() => {
    getDataWebSocket();
  }, []);
  useEffect(() => {
    if (isShowNewNotification) {
      const params = {
        skip: 0,
        limit: 1,
        order: {
          key: 'createdAt',
          value: 'desc',
        },
      };
      getNewNotification(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    SystemConfiguration.systemConfigurationGetDetail().then(res => {
      const { data, isSuccess } = res;
      if (isSuccess) {
        setSystem(data);
        getDataWebSocket();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataWebSocket = () => {
    const ws = new WebSocket(socketUrl);
    let isCheck = false;
    ws.onopen = () => {
      const params = {
        method: 'SUBSCRIBE',
        params: BINANCE_PARAMS,
        // params: ['btcusdt@trade'],
        id: 1,
      };
      ws.send(JSON.stringify(params));
    };
    ws.onmessage = evt => {
      const data = evt?.data ? JSON.parse(evt?.data) : {};
      if (data?.s) {
        for (let coin of coinData) {
          if (coin?.symbol === data?.s) {
            coin.price = Number(data?.c);
            coin.percent = data?.P;
          }
        }
        setCoinData(coinData);
        if (!isCheck) {
          isCheck = true;
          setNewCoinData([...coinData]);
        }
      }
    };
    setIsLoading(false);
    ws.onclose = () => {};
    return () => {
      ws.close();
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDataWebSocket();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getNewNotification(params) {
    CustomerService.getGroupCustomerMessage(params).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataNewNotification(data?.data);
      }
    });
  }

  function handleCloseModalNotification() {
    setIsOpenModalNotification(false);
    window.localStorage.setItem('showFirstNotification', false);
  }

  function handleLinkToFeature(item) {
    switch (item?.value) {
      // case 'group':
      // case 'refer_friend':
      //     if (userStore?.appUserMembershipId > 3) {
      //         history.push(item?.routes);
      //     } else {
      //         setIsOpenModalCustomerService(true);
      //     }
      //     return;
      default:
        history.push(item?.routes);
        return;
    }
  }
  return (
    <div id="home">
      {isLoading ? <Loader /> : null}
      <div className="home">
        <div className="home-logo d-flex align-items-center justify-content-between">
          <img className={'logo-img'} src={Logo} alt="" />
          <Language />
        </div>
        <div className="home-welcome">
          <span>{intl.formatMessage({ id: `home.hello` })}, </span>
          <img src={ic_wave} alt="" />
        </div>
        <div className="home-feature">
          {features.map((item, index) => (
            <div className="home-feature-item" key={index} onClick={() => handleLinkToFeature(item)}>
              <img className="img-icon" src={item.img} alt="" />
              <span className={`title ${item?.towLine ? 'breakLine' : ''}`}>
                {intl.formatMessage({ id: `${item.label}` })}
              </span>
            </div>
          ))}
          <div className="home-feature-item" onClick={() => signOut()}>
            <img className="img-icon" src={ic_logout} alt="" />
            <span className={`title`}>{intl.formatMessage({ id: `Log out` })}</span>
          </div>
        </div>

        <div
          className="home-slide"
          style={{
            height:
              system?.bannerImage1?.includes('https://') ||
              system?.bannerImage2?.includes('https://') ||
              system?.bannerImage3?.includes('https://') ||
              system?.bannerImage4?.includes('https://') ||
              system?.bannerImage5?.includes('https://')
                ? '125px'
                : '0',
          }}
        >
          {system &&
            (system?.bannerImage1?.includes('https://') ||
              system?.bannerImage2?.includes('https://') ||
              system?.bannerImage3?.includes('https://') ||
              system?.bannerImage4?.includes('https://') ||
              system?.bannerImage5?.includes('https://')) && (
              <Carousel autoplay dots slidesToShow={1}>
                {system?.bannerImage1?.includes('https://') && (
                  <img
                    className=" img-banner "
                    src={system?.bannerImage1}
                    alt="banner"
                    onClick={() =>
                      system?.linkBannerImage1 ? window.open(system?.linkBannerImage1) : history.push('#')
                    }
                  />
                )}
                {system?.bannerImage2?.includes('https://') && (
                  <img
                    className=" img-banner "
                    src={system?.bannerImage2}
                    alt="banner"
                    onClick={() =>
                      system?.linkBannerImage2 ? window.open(system?.linkBannerImage2) : history.push('#')
                    }
                  />
                )}
                {system?.bannerImage3?.includes('https://') && (
                  <img
                    className=" img-banner "
                    src={system?.bannerImage3}
                    alt="banner"
                    onClick={() =>
                      system?.linkBannerImage3 ? window.open(system?.linkBannerImage3) : history.push('#')
                    }
                  />
                )}
                {system?.bannerImage4?.includes('https://') && (
                  <img
                    className=" img-banner "
                    src={system?.bannerImage4}
                    alt="banner"
                    onClick={() =>
                      system?.linkBannerImage4 ? window.open(system?.linkBannerImage4) : history.push('#')
                    }
                  />
                )}
                {system?.bannerImage5?.includes('https://') && (
                  <img
                    className=" img-banner "
                    src={system?.bannerImage5}
                    alt="banner"
                    onClick={() =>
                      system?.linkBannerImage5 ? window.open(system?.linkBannerImage5) : history.push('#')
                    }
                  />
                )}
              </Carousel>
            )}
        </div>

        <div style={{ marginTop: '28px' }}>
          <ListMarket
            title={intl.formatMessage({ id: 'Cryptocurrency Market' })}
            handleSymbolClick={handleSymbolClick}
            listData={newCoinData}
          />
        </div>
      </div>
      {dataNewNotification && (
        <ModalNewNotification
          status={isOpenModalNotification}
          closeDrawer={() => handleCloseModalNotification()}
          handleCloseModalNotification={handleCloseModalNotification}
          dataNewNotification={dataNewNotification}
        />
      )}
      <ModalCustomerService
        title={intl.formatMessage({ id: `home.hello` })}
        message={intl.formatMessage({
          id: 'Account is not yet eligible to use this function. Please contact customer service for assistance.',
        })}
        status={isOpenModalCustomerService}
        closeDrawer={() => setIsOpenModalCustomerService(false)}
        setIsOpenModalCustomerService={setIsOpenModalCustomerService}
      />
    </div>
  );
};

export default injectIntl(Home);
