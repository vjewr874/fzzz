/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import { currencyFormatVND } from '../../ultils/CurrencyFormat';
import { currencyFormatUSD } from '../../ultils/CurrencyFormat';
import { useUser } from '../../context/UserContext';
import PaymentDepositTransaction from '../../services/paymentDepositTransaction';
import SystemConfiguration from '../../services/systemConfiguration';
import { useHistory } from 'react-router-dom';
import { routes } from '../../App';
//styles
import './styles/my-wallet.scss';
//icons
import icWallet from '../../assets/stock-icons/ic-wallet-green.svg';
import imWallet from '../../assets/stock-images/im-wallet.png';
import icPlus from '../../assets/stock-icons/ic-plus.svg';
import Loader from '../../components/Loader';
import { useIntl } from 'react-intl';
import { showUnitAppCurrency } from '../../helper/common';

const MyWallet = () => {
  const { formatMessage: f } = useIntl();
  const { user } = useUser();
  const history = useHistory();
  const [summary, setSummary] = useState(null);
  const [system, setSystem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    summaryByUser();
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

  return (
    <Page isHideItemRight={true} headerTitle={f({ id: 'profile.wallet' })}>
      <div id="MyWallet">
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
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ height: '100%', paddingLeft: '20px' }}
          >
            <div className="d-flex align-items-center">
              <img
                src={icWallet}
                style={{ height: '60px', width: '40px', marginRight: '15px', paddingBottom: '15px' }}
                alt={''}
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
                    user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance
                      ? user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance
                      : 0,
                  )}
                </span>
                {/* <span
                  style={{
                    fontWeight: '500',
                    fontSize: '15px',
                    lineHeight: '20px',
                    color: '#36FFB5'
                  }}>~ {currencyFormatVND((user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance * system?.exchangeVNDPrice))} VND</span> */}
              </div>
            </div>
            <div style={{ paddingRight: '12px', cursor: 'pointer' }} onClick={() => history.push(routes.recharge.path)}>
              <img src={icPlus} alt={''} />
            </div>
          </div>
        </div>
        <div className="history-text">{f({ id: 'History' })}</div>
        <div className="history-container">
          <div className={'history-row'}>
            <div className={'history-line'}>
              <div className="history-line-left">
                <p>{f({ id: 'Amount_2' })}</p>
                <p>{f({ id: 'deposited' })}</p>
              </div>
              <p className="history-line-right">
                {currencyFormatUSD(summary?.totalDeposit ? summary?.totalDeposit : 0)} {showUnitAppCurrency()}
              </p>
            </div>
            <div className={'history-line'}>
              <div className="history-line-left">
                <p>{f({ id: 'Amount_transaction' })}</p>
                {/* <p>{f({id:"transaction"})}</p> */}
              </div>
              <p className="history-line-right">
                {currencyFormatUSD(summary?.totalEarned ? summary?.totalEarned : 0)} {showUnitAppCurrency()}
              </p>
            </div>
            <div className={'history-line'}>
              <div className="history-line-left">
                <p>{f({ id: 'Profits' })}</p>
                <p>{f({ id: 'received' })}</p>
              </div>
              <p className="history-line-right">
                {currencyFormatUSD(summary?.totalProfit ? summary?.totalProfit : 0)} {showUnitAppCurrency()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default MyWallet;
