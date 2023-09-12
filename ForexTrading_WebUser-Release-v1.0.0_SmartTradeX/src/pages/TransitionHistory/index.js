/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import React, { useEffect, useState } from 'react';
import { Pagination, Tabs } from 'antd';
import { injectIntl, useIntl } from 'react-intl';
import { WALLET } from '../../constants/wallet';
import PaymentDepositTransaction from '../../services/paymentDepositTransaction';
import { currencyFormatVND } from '../../ultils/CurrencyFormat';
import { currencyFormatUSD } from '../../ultils/CurrencyFormat';
import { convertTimeDate } from '../../ultils/convertDate';
import { useHistory, useLocation } from 'react-router-dom';
import ModalTransactionDetail from '../../components/Modal/components/ModalTransactionDetail/ModalTransactionDetail';

import SystemConfiguration from '../../services/systemConfiguration';
import { useUser } from 'context/UserContext';
//styles
import './styles/transition-history.scss';

//icons
import icReCharge from '../../assets/new-icons/ic-recharge-1.svg';
import icWithdraw from '../../assets/new-icons/ic-withdraw-1.svg';
import icBonus from '../../assets/new-icons/ic-bonus-1.svg';
import icBonusRose from '../../assets/new-icons/ic-bonus-rose.svg';
import icWithdrawRose from '../../assets/new-icons/ic-withdraw-rose.svg';
import icBuy from '../../assets/new-icons/ic-buy-loterry.svg';
import icTransfer from '../../assets/new-icons/ic-tranfer.svg';
import icTransferMoney from '../../assets/new-icons/ic-transfer-money.svg';
import icWin from '../../assets/new-icons/ic-win-1.svg';
import icArrowDown from '../../assets/stock-icons/ic-arrow-down-square-gray.svg';
import icArrowDownActive from '../../assets/stock-icons/ic-arrow-down-square-green.svg';
import icArrowUp from '../../assets/stock-icons/ic-arrow-up-square-gray.svg';
import icArrowUpActive from '../../assets/stock-icons/ic-arrow-up-square-red.svg';
import icWallet from '../../assets/stock-icons/ic-wallet-green.svg';
import imWallet from '../../assets/stock-images/im-wallet.png';
import Loader from '../../components/Loader';
import { showUnitAppCurrency } from '../../helper/common';

const listTabs = [
  {
    label: 'Deposit_1',
    value: 'all',
    icon: icArrowDown,
    icon_active: icArrowDownActive,
  },
  {
    label: 'Withdraw_1',
    value: 'all',
    icon: icArrowUp,
    icon_active: icArrowUpActive,
  },
];

function TransitionHistory(props) {
  const { formatMessage: f } = useIntl();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();
  const { TabPane } = Tabs;
  const { intl } = props;
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(searchParams?.get('page') ? parseInt(searchParams?.get('page')) : 1);
  const [isOpen, setIsOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [key, setKey] = useState(0);
  const perPage = 10;
  const [system, setSystem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dataUser = useUser();
  // const checkParams = filterParams => {
  //   const params = {};
  //   if (filterParams?.page) {
  //     params.page = filterParams.page;
  //   }
  //   const urlSearchParams = new URLSearchParams(params);
  //   history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  // };
  useEffect(() => {
    setIsLoading(true);
    const data = {
      filter: {
        paymentAmountInOut: 10,
        WalletRecordType: 'DEPOSIT_POINTWALLET',
      },
      skip: 0,
      limit: perPage,
    };
    // checkParams({ page: page });
    getHistory(data);

    SystemConfiguration.systemConfigurationGetDetail().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setSystem(data);
      }
    });
  }, []);

  function getHistory(data) {
    PaymentDepositTransaction.viewHistory(data).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        setData(data?.data);
        setTotalRecords(data?.total);
      }
      setIsLoading(false);
    });
  }

  const onChange = key => {
    setIsLoading(true);
    const data = {
      filter: {
        paymentAmountInOut: +key === 0 ? 10 : +key === 1 ? 0 : undefined,
        WalletRecordType: +key === 0 ? 'DEPOSIT_POINTWALLET' : +key === 1 ? 'WITHDRAW_POINTWALLET' : undefined,
      },
      skip: 0,
      limit: perPage,
    };
    setKey(+key);
    setPage(1);
    // checkParams({ page: key });
    getHistory(data);
  };

  // function handleChangePage(type) {
  //     switch (type) {
  //         case 'next':
  //             if (page + 1 < getTotalPage()) {
  //                 const dataNext = {
  //                     skip: (page + 1) * perPage,
  //                     limit: perPage,
  //                     filter: {
  //                         paymentAmountInOut: key === "1" ? 10 : key === "2" ? 0 : undefined
  //                     }
  //                 }
  //                 setPage(page + 1)
  //                 checkParams({page: page + 1})
  //                 getHistory(dataNext)
  //             }
  //             break
  //         case 'prev':
  //             if (page - 1 >= 0) {
  //                 setPage(page - 1)
  //                 const dataPrev = {
  //                     skip: (page - 1) * perPage,
  //                     limit: perPage,
  //                     filter: {
  //                         paymentAmountInOut: key === "1" ? 10 : key === "2" ? 0 : undefined
  //                     }
  //                 }
  //                 checkParams({page: page - 1})
  //                 getHistory(dataPrev)
  //             }
  //             break
  //         default:
  //             break
  //     }
  // }

  function handleChangePage(numberPage) {
    setIsLoading(true);
    const params = {
      skip: (numberPage - 1) * perPage,
      limit: perPage,
      filter: {
        paymentAmountInOut: key === 0 ? 10 : key === 1 ? 0 : undefined,
        WalletRecordType: +key === 0 ? 'DEPOSIT_POINTWALLET' : +key === 1 ? 'WITHDRAW_POINTWALLET' : undefined,
      },
    };
    setPage(numberPage);
    getHistory(params);
    // checkParams({ status: props.isOpen, pages: numberPage });
  }
  // function getTotalPage() {
  //     return Math.round(totalRecords / perPage)
  // }

  function handleOpenModalDetail(data) {
    setIsOpen(true);
    setDataDetail(data);
  }
  function checkName(walletRecordType) {
    // eslint-disable-next-line default-case
    switch (walletRecordType) {
      case WALLET.REFER_BONUS:
        return {
          img: icBonusRose,
          text: f({ id: 'Commission' }),
        };
        break;
      case WALLET.ADMIN_BONUS:
        return {
          img: icWin,
          text: f({ id: 'Bonus from Admin' }),
        };
        break;
      case WALLET.EARNED:
        return {
          img: icBonus,
          text: f({ id: 'Earn' }),
        };
        break;
      case WALLET.MAKE_PAYMENT:
        return {
          img: icBuy,
          text: f({ id: 'Spending' }),
        };
        break;
      case WALLET.ADMIN_ADJUST:
        return {
          img: icWin,
          text: f({ id: 'Adjust' }),
        };
        break;
      case WALLET.PAYMENT_DEPOSIT:
        return {
          img: icReCharge,
          text: f({ id: 'Deposit' }),
        };
        break;
      case WALLET.PAYMENT_WITHDRAW:
        return {
          img: icWithdraw,
          text: f({ id: 'Withdraw' }),
        };
        break;
      case WALLET.PAYMENT_EXCHANGE:
        return {
          img: icTransferMoney,
          text: f({ id: 'Cash' }),
        };
        break;
      case WALLET.DEPOSIT_POINTWALLET:
        return {
          img: icReCharge,
          text: f({ id: 'Deposit' }),
        };
        break;
      case WALLET.WITHDRAW_POINTWALLET:
        return {
          img: icWithdraw,
          text: f({ id: 'Withdraw' }),
        };
        break;
      case WALLET.WITHDRAW_BONUSWALLET:
        return {
          img: icWithdrawRose,
          text: f({ id: 'Withdrawal of commissions' }),
        };
        break;
      case WALLET.WITHDRAW_REWARDWALLET:
        return {
          img: icWithdraw,
          text: f({ id: 'Withdraw' }),
        };
        break;
      case WALLET.BONUS_EXCHANGE_POINT:
        return {
          img: icTransfer,
          text: f({ id: 'Redeem commissions' }),
        };
        break;
      case 'PAYMENT_EXCHANGE_RECEIVE':
        return {
          img: icReCharge,
          text: f({ id: 'Buy' }),
        };
        break;
      case 'PAYMENT_EXCHANGE_SEND':
        return {
          img: icWithdraw,
          text: f({ id: 'Sell' }),
        };
        break;
      case 'PAYMENT_EXCHANGE_REFUND':
        return {
          img: icReCharge,
          text: f({ id: 'Refund' }),
        };
    }
  }

  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'Deposit withdraw history' })}>
      <div id="TransitionHistory">
        {isLoading ? <Loader /> : null}
        <div
          className="background-image"
          style={{
            backgroundImage: `url('${imWallet}')`,
            width: '100%',
            height: '118px',
            borderRadius: '14px',
            marginBottom: '25px',
          }}
        >
          <div className="d-flex align-items-center" style={{ height: '100%', paddingLeft: '20px' }}>
            <img
              src={icWallet}
              style={{ height: '60px', width: '40px', marginRight: '15px', paddingBottom: '15px' }}
              alt=""
            />
            <div className="d-flex flex-column">
              <span
                style={{
                  fontWeight: '400',
                  fontSize: '15px',
                  lineHeight: '20px',
                  color: 'rgba(255, 255, 255, 0.75)',
                }}
              >
                {f({ id: 'Balance' })} {showUnitAppCurrency()}
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
                  dataUser?.user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance || 0,
                )}
              </span>
              {/* <span
                                style={{
                                    fontWeight: '500',
                                    fontSize: '15px',
                                    lineHeight: '20px',
                                    color: '#36FFB5'
                                }}>~ {currencyFormatVND((dataUser?.user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance * system?.exchangeVNDPrice))} VND</span> */}
            </div>
          </div>
        </div>

        <div className="transition-history">
          <Tabs defaultActiveKey={0} onChange={onChange} className={'transition-history-header'}>
            {listTabs.map((item, index) => {
              return (
                <TabPane
                  tab={
                    <span className={`d-flex align-items-center ${key === 0 ? 'colorGreen' : 'colorRed'}`}>
                      <img
                        src={key === index ? item.icon_active : item?.icon}
                        style={{ marginRight: '10px' }}
                        alt={'icon'}
                      />
                      <p className={`${key === 0 ? 'colorGreen' : 'colorRed'}`}>{f({ id: `${item?.label}` })}</p>
                    </span>
                  }
                  key={index}
                >
                  {data?.length > 0 &&
                    data.map((itemHistory, index) => (
                      <div
                        className={'transition-history-container'}
                        key={index}
                        onClick={() => {
                          handleOpenModalDetail(itemHistory);
                          document.getElementById('otp').scrollIntoView();
                        }}
                      >
                        <a className={'transition-history-row'}>
                          <div className={'transition-history-left'}>
                            <div>
                              <div className={'transition-history-time'}>{convertTimeDate(itemHistory?.createdAt)}</div>
                            </div>
                          </div>
                          <div
                            className={'transition-history-right'}
                            style={{ color: key === 1 ? '#FF647C' : '#36FFB5' }}
                          >
                            {itemHistory?.paymentAmountInOut === 10 ? '+' : ''}
                            {currencyFormatUSD(itemHistory?.paymentAmount)}
                          </div>
                        </a>
                      </div>
                    ))}
                  {totalRecords > perPage && (
                    <div style={{ paddingTop: 28 }}>
                      <Pagination
                        total={totalRecords}
                        className={'custom-pagination'}
                        defaultPageSize={perPage}
                        defaultCurrent={page}
                        onChange={numberPage => handleChangePage(numberPage)}
                        showSizeChanger={false}
                        showLessItems={true}
                      />
                    </div>
                  )}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
        <ModalTransactionDetail
          keyTab={key}
          isOpen={isOpen}
          dataDetail={dataDetail}
          closeModal={() => setIsOpen(false)}
        />
      </div>
    </Page>
  );
}
export default injectIntl(TransitionHistory);
