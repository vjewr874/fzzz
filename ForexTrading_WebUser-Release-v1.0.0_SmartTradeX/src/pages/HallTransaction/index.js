/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import { injectIntl, useIntl } from 'react-intl';
import { Carousel, Pagination } from 'antd';
import './styles/hallTransaction.scss';
import SystemConfiguration from '../../services/systemConfiguration';
import History from '../../services/history';
import ModalHallOrderSale from '../../components/Modal/components/ModalHallOrderSale/ModalHallOrderSale';
//icons
import imWallet2 from '../../assets/stock-images/im-wallet2.png';
import icBuy from '../../assets/stock-icons/ic-buy2.svg';
import icSale from '../../assets/stock-icons/ic-sale2.svg';
import { useUser } from '../../context/UserContext';
//image
// import imgDeFaultAvatar from '../../assets/stock-images/im-defaultAvatar.png';
import HallOrder from './components/HallOrder';
import { currencyFormatUSD } from '../../ultils/CurrencyFormat';
import moment from 'moment';
import ModalCustomerService from '../../components/Modal/components/ModalCustomerService/ModalCustomerService';
import swal from 'sweetalert';
import { faker } from '@faker-js/faker';
import Loader from '../../components/Loader';
import AppUsers from '../../services/apppUsers';
import { handleUpdateDetail } from '../../actions';
import { useDispatch } from 'react-redux';

export const USERS = [];

export function createRandomUser() {
  return {
    avatar: faker.image.avatar(),
    username: faker.internet.userName(),
    date: faker.date.between(moment(new Date()).subtract(600, 'seconds'), moment(new Date())),
    money: faker.finance.amount() * 10,
  };
}

Array.from({ length: 100 }).forEach(() => {
  USERS.push(createRandomUser());
});
function HallTransaction() {
  const { formatMessage: f } = useIntl();
  const dispatch = useDispatch();
  const { user } = useUser();
  const [system, setSystem] = useState(null);
  const [typeTransaction, setTypeTransaction] = useState('1');
  const [listData, setListData] = useState([]);
  // const [listUserSale, setListUserSale] = useState([]);
  const [isOpenModalSale, setIsOpenModalSale] = useState(false);
  const [isOpenModalCustomerService, setIsOpenModalCustomerService] = useState(false);
  const [dataToSaleUSDT, setDataToSaleUSDT] = useState(undefined);
  const [title, setTitle] = useState(null);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const perPage = 10;

  useEffect(() => {
    setIsLoading(true);
    SystemConfiguration.systemConfigurationGetDetail().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setSystem(data);
      }
      setIsLoading(false);
    });
    handleReload();
    // getListUserSale({
    //   filter: {
    //     orderStatus: "Completed",
    //     orderType: "SELL"
    //   },
    //   skip: 0,
    //   limit: 10,
    // });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const params = {
      filter: {
        orderType: typeTransaction === '1' ? 'SELL' : 'BUY',
      },
    };
    getListHallOrder(params);
  }, [typeTransaction]);

  // useEffect(() => {
  //   const params = {
  //     filter: {
  //       orderType: 'SELL',
  //       orderStatus: 'Completed',
  //     },
  //     skip: 0,
  //     limit: 10,
  //   };
  //   const interval = setInterval(() => {
  //     getListUserSale(params);
  //   }, 30000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  function handleReload() {
    getDetailUserById();
  }
  function getDetailUserById() {
    AppUsers.getDetailUserById({
      id: user?.appUserId,
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
  function handleChangePage(numberPage) {
    setIsLoading(true);
    const params = {
      filter: {
        orderType: typeTransaction === '1' ? 'SELL' : 'BUY',
      },
      skip: (numberPage - 1) * perPage,
      limit: perPage,
    };
    setPage(numberPage);
    getListHallOrder(params);
  }
  function getListHallOrder(params) {
    History.getBookingHistoryList(params).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setListData(data?.data);
        setTotalRecords(data.total);
      }
      setIsLoading(false);
    });
  }

  // function getListUserSale(params) {
  //   History.getBookingHistoryList(params).then(result => {
  //     const {isSuccess, data} = result;
  //     if (isSuccess) {
  //       setListUserSale(data?.data);
  //     }
  //   });
  // }

  function handleHallOrderSaleUSDT(data) {
    History.SaleUSDT(data).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        handleReload();
        swal(f({ id: 'Sell request has been sent. Wait for admin to approve you' }), {
          icon: 'success',
        });
      } else {
        if (result.message === 'NOT_ENOUGH_BALANCE') {
          swal(f({ id: 'NOT_ENOUGH_BALANCE' }), {
            icon: 'warning',
          });
        } else if (result.message === 'INVALID_EXCHANGE_WALLET') {
          swal(f({ id: 'INVALID_EXCHANGE_WALLET' }), {
            icon: 'warning',
          });
        } else {
          swal(f({ id: 'error' }), {
            icon: 'warning',
          });
        }
      }
    });
  }

  function handleCalculatorDate(time) {
    let timeText = '';
    time = new Date(moment(time));
    const today = new Date();
    let diff = (today.getTime() - time.getTime()) / 1000;
    diff /= 3600;
    let remainTime = Math.abs(Math.round(diff));
    if (remainTime < 24) {
      if (remainTime < 1) {
        diff *= 60;
        remainTime = Math.abs(Math.round(diff));
        if (remainTime === 0) {
          timeText = f({ id: 'just finished' });
        } else {
          timeText = `${Math.abs(Math.round(diff))} ${f({
            id: `minute${Math.abs(Math.round(diff)) === 1 ? '' : 's'}`,
          })}`;
        }
      } else {
        timeText = `${remainTime} ${f({ id: `hour${remainTime === 1 ? '' : 's'}` })}`;
      }
      // } else if (remainTime < 168) {
    } else {
      timeText = `${Math.abs(Math.round(remainTime / 24))} ngày`;
    }
    // else {
    //   timeText = time.toString();
    // }
    return timeText;
  }

  function handleEditBank(name) {
    switch (name) {
      case 'Tôi muốn bán':
        setTitle(f({ id: `${name}` }));
        setIsOpenModalCustomerService(true);
        break;
      case 'Tôi muốn mua':
        setTitle(f({ id: `${name}` }));
        setIsOpenModalCustomerService(true);
        break;
      default:
        break;
    }
  }

  function handleClickActive(values) {
    setActive(values);
    setTypeTransaction(values + '');
    setPage(1);
  }
  return (
    <div id="HallTransaction">
      {isLoading ? <Loader /> : null}
      <div className="hallTransaction">
        <div className="hallTransaction-header">
          <span className="hallTransaction-header-title">{f({ id: 'Transaction hall' })}</span>
        </div>

        <div className="hallTransaction-contain">
          <div className="hallTransaction-contain-wallet">
            <div
              className="background-image"
              style={{
                backgroundImage: `url('${imWallet2}')`,
                width: '100%',
                height: '118px',
                borderRadius: '14px',
                marginBottom: '16px',
              }}
            >
              <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                <div className="d-flex align-items-center">
                  {/*<img*/}
                  {/*  src={icWallet}*/}
                  {/*  styles={{height: '60px', width: '40px', marginRight: '15px', paddingBottom: '15px'}}*/}
                  {/*/>*/}
                  <div className="d-flex flex-column text-center">
                    <span
                      style={{
                        fontWeight: '400',
                        fontSize: '15px',
                        lineHeight: '20px',
                        color: 'rgba(255, 255, 255, 0.75)',
                      }}
                    >
                      {f({ id: 'Balance' })} (USDT)
                    </span>
                    <span
                      style={{
                        fontWeight: '500',
                        fontSize: '32px',
                        lineHeight: '40px',
                        color: '#FFFFFF',
                      }}
                    >
                      {currencyFormatUSD(
                        user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance || 0,
                      )}
                    </span>
                    <span
                      style={{
                        fontWeight: '500',
                        fontSize: '15px',
                        lineHeight: '20px',
                        color: '#36FFB5',
                      }}
                    >
                      {f({ id: 'Withdrawing orders' })}: {/*{currencyFormat(*/}
                      {/*  user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance **/}
                      {/*  system?.exchangeVNDPrice,*/}
                      {/*)}{' '}*/}
                      USDT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hallTransaction-contain-purchase">
            <div className="purchase-item" onClick={() => handleEditBank('Tôi muốn mua')}>
              <img className="img" src={icBuy} alt="" />
              <span className="title">{f({ id: 'I want to buy' })}</span>
            </div>
            <div className="purchase-item" onClick={() => handleEditBank('Tôi muốn bán')}>
              <img className="img" src={icSale} alt="" />
              <span className="title">{f({ id: 'I want to sell' })}</span>
            </div>
          </div>

          <div className="hallTransaction-contain-viewUserSale">
            <Carousel vertical={true} autoplay dots={false}>
              {USERS.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="viewUserSale-item">
                      <div
                        className="img background-image"
                        style={{ backgroundImage: `url("${item.avatar}")` }}
                        alt=""
                      />
                      <span className="content">
                        {item?.username + ' '}
                        {f({ id: 'sold out' })}
                        {' ' + (item.money || 0) + ' '}
                        USDT -{' ' + handleCalculatorDate(item?.date)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div className="hallTransaction-contain-transaction">
            <div className="d-flex justify-content-between" style={{ marginBottom: '24px' }}>
              <button
                style={{
                  width: 'calc(50% - 4px)',
                  padding: '12px 0',
                  borderRadius: '8px',
                  color: '#1D1D42',
                  background: active === 1 ? '#36FFB5' : '#FFFFFF',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  lineHeight: '1.25rem',
                }}
                onClick={() => handleClickActive(1)}
              >
                {f({ id: 'Sales orders' })}
              </button>

              <button
                className={`${active === 2 ? active : null}`}
                style={{
                  width: 'calc(50% - 4px)',
                  padding: '12px 0',
                  borderRadius: '8px',
                  color: '#1D1D42',
                  background: active === 2 ? '#36FFB5' : '#FFFFFF',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  lineHeight: '1.25rem',
                }}
                onClick={() => handleClickActive(2)}
              >
                {f({ id: 'Sell to merchants' })}
              </button>
            </div>
            {active === 1 && <HallOrder listData={listData} typeTransaction={'1'} f={f} />}
            {active === 2 && (
              <HallOrder
                listData={listData}
                typeTransaction={'2'}
                setIsOpenModalSale={setIsOpenModalSale}
                setDataToSaleUSDT={setDataToSaleUSDT}
                f={f}
              />
            )}
          </div>
          {totalRecords > perPage && (
            <div style={{ paddingTop: 28 }}>
              <Pagination
                total={totalRecords}
                className={'custom-pagination'}
                defaultPageSize={perPage}
                defaultCurrent={page}
                onChange={numberPage => handleChangePage(numberPage)}
                current={page}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
      <ModalHallOrderSale
        status={isOpenModalSale}
        closeDrawer={() => setIsOpenModalSale(false)}
        setIsOpenModalSale={setIsOpenModalSale}
        user={user}
        system={system}
        handleHallOrderSaleUSDT={handleHallOrderSaleUSDT}
        dataToSaleUSDT={dataToSaleUSDT}
      />
      <ModalCustomerService
        title={title}
        status={isOpenModalCustomerService}
        closeDrawer={() => setIsOpenModalCustomerService(false)}
        setIsOpenModalCustomerService={setIsOpenModalCustomerService}
      />
    </div>
  );
}
export default injectIntl(HallTransaction);
