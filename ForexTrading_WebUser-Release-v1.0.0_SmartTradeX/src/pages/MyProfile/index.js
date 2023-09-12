/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import Page from '../../components/Page/Page';
import './styles/myProfile.scss';
import { useHistory } from 'react-router-dom';
import { routes } from '../../App';
import { useUser } from '../../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import PaymentDepositTransaction from '../../services/paymentDepositTransaction';
import currencyFormat from 'ultils/CurrencyFormat';
import { currencyFormatUSD } from 'ultils/CurrencyFormat';
import SystemConfiguration from '../../services/systemConfiguration';
//icon
import icNext from '../../assets/new-icons/ic-next.svg';
import icDeposit from '../../assets/stock-icons/ic-deposit.svg';
import icDepositStatistic from '../../assets/stock-icons/ic-depositStatistic.svg';
import icWithdrawStatistic from '../../assets/stock-icons/ic-withdrawStatistic.svg';
import icProfit from '../../assets/stock-icons/ic-profit.svg';
import icWallet2 from '../../assets/stock-icons/ic-wallet2.svg';
import icGroup2 from '../../assets/stock-icons/ic-group2.svg';
import icConstraint2 from '../../assets/stock-icons/ic-constrain2.svg';
import icDetail2 from '../../assets/stock-icons/ic-detail2.svg';
import icStar from '../../assets/stock-icons/ic-Star.svg';
import icLogout from '../../assets/stock-icons/ic-logout.svg';
import icTransitionHistory from '../../assets/forex-icons/ic-arrow-up-down-green.svg';
import icAccountDetail from '../../assets/forex-icons/ic-setting-green.svg';

//image
import imAvatar from '../../assets/new-images/im-avatar-ex.png';
import imWallet from '../../assets/forex-images/im-wallet.png';
import ModalCustomerService from '../../components/Modal/components/ModalCustomerService/ModalCustomerService';
import Loader from '../../components/Loader';
import AppUsers from '../../services/apppUsers';
import { handleUpdateDetail } from '../../actions';
import { isShowUnitAppCurrency } from '../../helper/common';

const menuList = [
  {
    id: 1,
    label: 'profile.wallet',
    ic_url: icWallet2,
    value: 'wallet',
    routes: routes.myWallet.path,
  },
  {
    id: 2,
    label: 'TransitionHistory',
    ic_url: icTransitionHistory,
    value: 'constraint_account',
    routes: routes.transitionHistory.path,
  },
  {
    id: 3,
    label: 'profile.list_group',
    ic_url: icGroup2,
    value: 'group',
    routes: routes.group.path,
  },
  {
    id: 4,
    label: 'profile.detail_account',
    ic_url: icAccountDetail,
    value: 'detail_account',
    routes: routes.profile.path,
  },
];

function MyProfile(props) {
  const { intl } = props;
  const history = useHistory();
  const { signOut } = useUser();
  const data = useSelector(state => (state.member ? state.member : null));
  const [isOpenModalCustomerService, setIsOpenModalCustomerService] = useState(false);
  const [summary, setSummary] = useState(null);
  const [system, setSystem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    summaryByUser();
    handleReload();
    SystemConfiguration.systemConfigurationGetDetail().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setSystem(data);
      }
      setIsLoading(false);
    });
  }, []);

  function summaryByUser() {
    PaymentDepositTransaction.summaryByUser().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setSummary(data);
      }
    });
  }

  function handleToPageItem(item) {
    // if (item?.value === 'group') {
    //   if (data?.appUserMembershipId > 3) {
    //     history.push(item?.routes)
    //   } else {
    //     setIsOpenModalCustomerService(true)
    //   }
    // } else {
    history.push(item?.routes);
    //}
  }
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
  const handleClickWithDraw = () => {
    const searchParams = new URLSearchParams();
    searchParams.append('key', 1);
    searchParams.toString();
    history.push('/recharge?' + searchParams.toString());
  };
  return (
    <Page isNoIconLeft={true} headerTitle={intl.formatMessage({ id: 'profile.my_profile' })} isShowNotification={true}>
      <div id="myProfile">
        {isLoading ? <Loader /> : null}
        <div className="myProfile">
          <div className={'menu'}>
            <div className={'container-profile'}>
              <div className={'container-info__user'}>
                <div className={'info-user'}>
                  <div
                    className={`container-avatar background-image`}
                    style={{ backgroundImage: `url('${data?.userAvatar ? data?.userAvatar : imAvatar}')` }}
                  />
                  <div className={'info-detail'}>
                    {/* <p className={'name'}>
                                    {data?.firstName ? data?.firstName : 'Nguyễn Giang Anh'}
                                </p> */}
                    <p className={'tag'}>
                      <img className="img" src={icStar} alt="" />
                      {data?.appUserMembershipTitle ? `${data?.appUserMembershipTitle}` : 'Thành Viên'}
                    </p>
                    <p className={'phone-number'}>{data?.username ? data?.username : '0385778899'}</p>
                  </div>
                </div>
                <span className={'upgrade'} onClick={() => setIsOpenModalCustomerService(true)}>
                  {intl.formatMessage({ id: 'profile.upgrade' })}
                </span>
              </div>
              <div
                className="info-wallets background-image"
                //style={{backgroundImage: `url('${imWallet}')`, width: '100%', height: '180px', borderRadius: '14px', marginBottom: '25px'}}
              >
                <div className="info-type">
                  <p className="title">
                    {intl.formatMessage({ id: 'profile.balance' })} {isShowUnitAppCurrency && `(USDT)`}
                  </p>
                  <p className="money">
                    {/* {data?.wallets?.find(wallet => wallet.walletType === 'WinWallet')?.balance || 0} */}
                    {currencyFormatUSD(
                      data?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance || 0,
                    )}
                  </p>
                  <div className="bar" />
                  <p className="title">{intl.formatMessage({ id: 'Commission' })}</p>
                  <p className="money">
                    {currencyFormatUSD(
                      parseInt(
                        data?.wallets?.find(wallet => wallet.walletType === 'BonusWallet')?.balance?.toFixed(),
                      ) || 0,
                    )}
                  </p>
                </div>
              </div>
              <div className={'container-btn-action'}>
                <button className={'btn '} onClick={() => history.push(routes.recharge.path)}>
                  <span className="title">{intl.formatMessage({ id: 'Deposit' })}</span>
                  <div className={'background-image icon__button'} style={{ backgroundImage: `url('${icDeposit}')` }} />
                </button>
                <button className={'btn '} onClick={() => handleClickWithDraw()}>
                  <span className="title">{intl.formatMessage({ id: 'Withdraw' })}</span>
                  <div className={'background-image icon__button'} style={{ backgroundImage: `url('${icDeposit}')` }} />
                </button>
              </div>
            </div>

            <div className="container-statistics">
              <p className="statistics-title">{intl.formatMessage({ id: 'profile.statistics' })}</p>
              <div className="statistics-item">
                <img src={icDepositStatistic} alt="" />
                <div>
                  <p className="type">
                    {intl.formatMessage({ id: 'profile.depositBalance' })} {isShowUnitAppCurrency && `(USDT)`}
                  </p>
                  <p className="money">{summary ? currencyFormatUSD(summary?.totalDeposit) : 0}</p>
                </div>
              </div>
              <div className="statistics-item">
                <img src={icWithdrawStatistic} alt="" />
                <div>
                  <p className="type">
                    {intl.formatMessage({ id: 'TotalTransaction' })} {isShowUnitAppCurrency && `(USDT)`}
                  </p>
                  <p className="money">{summary ? currencyFormatUSD(parseInt(summary?.totalEarned?.toFixed(0))) : 0}</p>
                </div>
              </div>
              <div className="statistics-item">
                <img src={icProfit} alt="" />
                <div>
                  <p className="type">
                    {intl.formatMessage({ id: 'profile.profit' })} {isShowUnitAppCurrency && `(USDT)`}
                  </p>
                  <p className="money">
                    {summary ? currencyFormatUSD(parseInt(summary?.totalProfit?.toFixed(0))) : 0}{' '}
                  </p>
                </div>
              </div>
            </div>

            <div className={'container-urls'}>
              {menuList?.map((item, index) => {
                return (
                  <div className={'menu-item'} key={index} onClick={() => handleToPageItem(item)}>
                    <div className={'menu-label'}>
                      <div className={'icon__menu'} style={{ backgroundImage: `url('${item?.ic_url}')` }} />
                      <div className={'label'}>{intl.formatMessage({ id: `${item?.label}` })}</div>
                    </div>
                    <div className={'background-image icon__next'} style={{ backgroundImage: `url('${icNext}')` }} />
                  </div>
                );
              })}
            </div>
            <div
              className={'btn-logout'}
              onClick={() => {
                signOut();
              }}
            >
              {intl.formatMessage({ id: 'Log out' })}
              <img src={icLogout} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ModalCustomerService
        title={intl.formatMessage({ id: 'Upgrade account' })}
        status={isOpenModalCustomerService}
        closeDrawer={() => setIsOpenModalCustomerService(false)}
        setIsOpenModalCustomerService={setIsOpenModalCustomerService}
      />
    </Page>
  );
}
export default injectIntl(MyProfile);
