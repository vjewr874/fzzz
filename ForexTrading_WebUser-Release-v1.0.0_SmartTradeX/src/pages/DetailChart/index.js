/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { injectIntl, useIntl } from 'react-intl';
import TradeViewChart from 'components/Chart/tradeViewChart';
import Page from 'components/Page/Page';
import { WalletForex } from 'assets/icons';
import { useUser } from '../../context/UserContext';
import './styles/detail-chart.scss';
import { currencyFormatUSD } from '../../ultils/CurrencyFormat';
//icon
import ic_arrowDown from '../../assets/stock-icons/ic-arrow-down.svg';
import ic_clock from '../../assets/stock-icons/ic-clock.svg';
import ic_clock_red from '../../assets/stock-icons/ic-clock-red.svg';
import ModalListCoinChart from '../../components/Modal/components/ModalListCoinChart/ModalListCoinChart';
import { routes } from '../../App';
import ModalReserveTicket from '../../components/Modal/components/ModalReserveTicket/ModalReserveTicket';
import ModalOrderPlacedSuccess from '../../components/Modal/components/ModalOrderPlacedSuccess/ModalOrderPlacedSuccess';
import ModalFailOrderChart from '../../components/Modal/components/ModalFailOrderChart/ModalFailOrderChart';
import ModalSuccessOrderChart from '../../components/Modal/components/ModalSuccessOrderChart';
import DetailCoinService from 'services/detailCoin';
import swal from 'sweetalert';
import Loader from 'components/Loader';
import mqtt from 'mqtt';
import moment from 'moment';
import AppUsers from '../../services/apppUsers';

import { handleUpdateDetail } from '../../actions';
import { BINANCE_PARAMS, COIN_LIST } from '../../constants/listCoin';
import { showUnitAppCurrency } from '../../helper/common';

const DetailChart = () => {
  const { formatMessage: f } = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  // const query = useLocation().search;
  const searchParams = new URLSearchParams(useLocation().search);
  const [pair, setPair] = useState(searchParams?.get('type') ? searchParams?.get('type') : 'BTCBUSD');
  const [intervalChart, setIntervalChart] = useState(
    searchParams?.get('interval') ? searchParams?.get('interval') : '1m',
  );
  const [isOpenModalListCoin, setIsOpenModalListCoin] = useState(false);
  const [isOpenModalReserveTicket, setIsOpenModalReserveTicket] = useState(false);
  const [isOpenModalOrderPlacedSuccess, setIsOpenModalOrderPlacedSuccess] = useState(false);
  const [isOpenModalFailOrderChart, setIsOpenModalFailOrderChart] = useState(false);
  const [isOpenModalSuccessOrderChart, setIsOpenModalSuccessOrderChart] = useState(false);
  const [typeChooseModal, setTypeChooseModal] = useState('');
  const { user } = useUser();
  const [coinData, setCoinData] = useState(COIN_LIST);
  const [newCoinData, setNewCoinData] = useState(COIN_LIST);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountDown] = useState(0);
  const [moneyWinLose, setMoneyWinLose] = useState(0);
  const [priceNewCoin, setPriceNewCoin] = useState(0);
  const data = useSelector(state => (state.member ? state.member : null));
  const socketUrl = 'wss://stream.binance.com:9443/ws';
  const headerRight = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          marginRight: '6px',
        }}
      >
        {currencyFormatUSD(user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance || 0)}{' '}
        {showUnitAppCurrency()}
      </span>{' '}
      <WalletForex />
    </div>
  );

  function handleChangeTypeCoin(pair) {
    setPair(pair);
    setIsOpenModalListCoin(false);
    checkParams({ type: pair });
  }
  const handleClickToLink = type => {
    const searchParams = new URLSearchParams();
    searchParams.append('type', type);
    searchParams.toString();
    history.push(routes.marketHistory.path + '?' + searchParams.toString());
  };
  const checkParams = filterParams => {
    const params = {};
    if (filterParams?.type) {
      params.type = filterParams.type;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  };
  function handleCloseModalReserveTicket() {
    setIsOpenModalReserveTicket(false);
  }

  const getDataWebSocket = () => {
    const ws = new WebSocket(socketUrl);
    let isCheck = false;
    ws.onopen = () => {
      const params = {
        method: 'SUBSCRIBE',
        params: BINANCE_PARAMS,
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
    handleReload();
    getDataWebSocket();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      getDataWebSocket();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const convertPercent = number => {
    if (number !== undefined && number !== null) {
      return parseFloat(Math.round(number * 100) / 100).toFixed(2);
    } else return 0;
  };

  function handleApiPlaceRecord(params) {
    setIsLoading(true);
    DetailCoinService.placeRecord(params).then(result => {
      const { isSuccess } = result;
      setIsLoading(false);
      if (isSuccess) {
        handleReload();
        setIsOpenModalReserveTicket(false);
        setIsOpenModalOrderPlacedSuccess(true);
      } else {
        swal(f({ id: 'error' }), {
          icon: 'warning',
        });
      }
    });
  }

  // socket coundown
  const BTC = 'BTC';
  const ETH = 'ETH';
  const LIVE_RECORD = 'LIVE_RECORD';

  let myGetDetail = null;
  const userId = user.appUserId;
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState('Connect');
  const [payloadBTC, setPayloadBTC] = useState({});

  const [betRecordsListLive, setBetRecordsListLive] = useState([]);
  const [payloadLIVERECORD, setPayloadLIVERECORD] = useState();
  const [payload, setPayload] = useState({});
  const [periodCode, setPeriodCode] = useState(0);
  const tmpType = pair;

  const number_to_price = v => {
    if (v === 0) {
      return '0';
    }

    if (!v || v === '') {
      return v;
    }
    v = v.toString();

    v = v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

    v = v.split('.').join('*').split(',').join('.').split('*').join(',');
    return v;
  };
  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', err => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        if (topic === 'BTC') {
          setCountDown(60 - moment(JSON.parse(message).when).format('ss'));
          setPeriodCode(moment(JSON.parse(message).when).add(1, 'minute').format('YYYYMMDDHHmm'));
        }
        if (topic === tmpType) {
          setPayload(payload);
        }
        if (topic === BTC && payload.message) {
          setPayloadBTC(JSON.parse(`${payload.message}`));
        }
        if (topic === LIVE_RECORD && payload.message) {
          setPayloadLIVERECORD(JSON.parse(`${payload.message}`));
        }

        if (topic === `USER_${userId}` && payload.message) {
          const newData = JSON.parse(`${payload.message}`);

          if (newData.result === 'win') {
            setMoneyWinLose(number_to_price(newData.amount));
            setIsOpenModalSuccessOrderChart(true);
            handleReload();
            // toast.success(`Thắng ${number_to_price(newData.amount)} - Kết quả ${newData.value}`, {
            //   autoClose: 5000,
            // });
          } else {
            setIsOpenModalFailOrderChart(true);
          }
        }
      });

      mqttSub({
        topic: BTC,
        qos: 0,
      });
      mqttSub({
        topic: ETH,
        qos: 0,
      });
      mqttSub({
        topic: LIVE_RECORD,
        qos: 0,
      });

      mqttSub({
        topic: `USER_${userId}`,
        qos: 0,
      });

      return () => {
        mqttUnSub({
          topic: `USER_${userId}`,
        });
        mqttUnSub({
          topic: BTC,
        });

        mqttSub({
          topic: LIVE_RECORD,
          qos: 0,
        });
      };
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  };

  const mqttSub = subscription => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, error => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
      });
    }
  };

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting');
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttUnSub = subscription => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
      });
    }
  };

  useEffect(() => {
    if (payloadLIVERECORD) {
      betRecordsListLive.push(payloadLIVERECORD);
      if (betRecordsListLive.length > 15) {
        betRecordsListLive.shift();
      }
      setBetRecordsListLive([...betRecordsListLive]);
    }
  }, [payloadLIVERECORD]);

  useEffect(() => {
    handleConnect();
    return () => {
      handleDisconnect();
    };
  }, []);

  const handleConnect = () => {
    let url = 'wss://smartradex-cdn.poolata.com:21666/mqtt';

    if (window.location.protocol !== 'https:') {
      url = 'ws://smartradex-cdn.poolata.com:21777/mqtt';
    }

    const clientId = `ChartData_${userId}_${moment().format('YYYY_MM_DD_hh_mm_ss')}`;

    const options = {
      rejectUnauthorized: false,
      reconnectPeriod: 10000,
    };
    options.clientId = clientId;

    mqttConnect(url, options);
  };

  const handleDisconnect = () => {
    mqttDisconnect();
  };

  function handleReload() {
    getDetailUserById();
  }
  function getDetailUserById() {
    AppUsers.getDetailUserById({
      id: data?.appUserId,
    })
      .then(result => {
        const { isSuccess, data } = result;
        if (isSuccess) {
          dispatch(handleUpdateDetail(data));
        }
        setIsLoading(false);
      })
      .catch(() => {});
  }
  useEffect(() => {}, [countdown]);
  return (
    <Page headerRight={headerRight}>
      {isLoading ? <Loader /> : null}
      <div id={'Chart'}>
        <div className="chart">
          <div className="chartHeader">
            <div className={'chartHeaderTop'}>
              <div className={'chartHeaderTopContain'} onClick={() => setIsOpenModalListCoin(true)}>
                <img className={'imgCoin'} src={newCoinData?.find(item => item?.symbol === pair)?.icon_url} alt="" />
                <span className={'name'}>{newCoinData?.find(item => item?.symbol === pair)?.name}</span>
                <img className={'imgDown'} src={ic_arrowDown} alt="" />
              </div>
              <img className={'clock'} src={ic_clock} alt="" onClick={() => handleClickToLink(pair)} />
            </div>
            <p className={'chartHeaderAmount'}>
              {'$ '}
              {priceNewCoin}
            </p>
            <p
              className={`chartHeaderPercent ${
                newCoinData?.find(item => item.symbol === pair)?.percent < 0 ? 'red' : 'green'
              }`}
            >
              {convertPercent(
                newCoinData?.find(item => item.symbol === pair)?.percent
                  ? newCoinData?.find(item => item.symbol === pair)?.percent
                  : 0,
              )}{' '}
              %
            </p>
          </div>

          <div className={'chartDetail'}>
            <div>
              <TradeViewChart pair={pair} interval={intervalChart} setPriceNewCoin={setPriceNewCoin} />
            </div>
          </div>

          {/*<div className={"chartSort"}>*/}
          {/*  <span className={"chartSortItem"}>1 {f({id:'hour'})}</span>*/}
          {/*  <span className={"chartSortItem"}>1 {f({id:'day'})}</span>*/}
          {/*  <span className={"chartSortItem"}>1 {f({id:'week'})}</span>*/}
          {/*  <span className={"chartSortItem"}>1 {f({id:'month'})}</span>*/}
          {/*  <span className={"chartSortItem"}>1 {f({id:'year'})}</span>*/}
          {/*</div>*/}

          <div className={'chartFooter'}>
            <div className={'chartFooterTime'}>
              <div className={'count'}>
                <img src={ic_clock_red} alt="" />
                <span>
                  {f({ id: 'Countdown' })}: {countdown}s
                </span>
              </div>
              <span className={'period'}>
                {f({ id: 'Period' })} {periodCode}
              </span>
            </div>
            <div className={'chartFooterButton'}>
              <div
                className={'btnChart red'}
                onClick={() => {
                  setTypeChooseModal('decrease');
                  setIsOpenModalReserveTicket(true);
                }}
              >
                <span>{f({ id: 'Decrease' })}</span>
                <strong>90%</strong>
              </div>
              <div
                className={'btnChart green'}
                onClick={() => {
                  setTypeChooseModal('increase');
                  setIsOpenModalReserveTicket(true);
                }}
              >
                <span>{f({ id: 'Increase' })}</span>
                <strong>90%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalListCoinChart
        status={isOpenModalListCoin}
        closeDrawer={() => setIsOpenModalListCoin(false)}
        setIsOpenModalListCoin={setIsOpenModalListCoin}
        listCoins={newCoinData}
        handleChangeTypeCoin={handleChangeTypeCoin}
        convertPercent={convertPercent}
        priceNewCoin={priceNewCoin}
        pair={pair}
      />
      <ModalReserveTicket
        status={isOpenModalReserveTicket}
        closeDrawer={() => handleCloseModalReserveTicket}
        setIsOpenModalReserveTicket={setIsOpenModalReserveTicket}
        handleCloseModalReserveTicket={handleCloseModalReserveTicket}
        typeChooseModal={typeChooseModal}
        handleApiPlaceRecord={handleApiPlaceRecord}
        pair={pair}
        countdown={countdown}
        periodCode={periodCode}
      />
      <ModalOrderPlacedSuccess
        status={isOpenModalOrderPlacedSuccess}
        closeDrawer={() => setIsOpenModalOrderPlacedSuccess(false)}
        setIsOpenModalOrderPlacedSuccess={setIsOpenModalOrderPlacedSuccess}
      />
      <ModalFailOrderChart
        status={isOpenModalFailOrderChart}
        closeDrawer={() => setIsOpenModalFailOrderChart(false)}
        setIsOpenModalFailOrderChart={setIsOpenModalFailOrderChart}
        history={history}
      />
      <ModalSuccessOrderChart
        status={isOpenModalSuccessOrderChart}
        closeDrawer={() => setIsOpenModalSuccessOrderChart(false)}
        setIsOpenModalSuccessOrderChart={setIsOpenModalSuccessOrderChart}
        moneyWinLose={moneyWinLose}
      />
    </Page>
  );
};
export default injectIntl(DetailChart);
