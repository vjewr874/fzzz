/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import './styles/wallet-amount.scss';
import { useUser } from '../../context/UserContext';
import currencyFormat from '../../ultils/CurrencyFormat';
import AppUsers from '../../services/apppUsers';
import { handleUpdateDetail } from '../../actions';
//icon
import icWallet from '../../assets/new-icons/ic-wallet-red.svg';
import icReload from '../../assets/new-icons/ic-refresh.svg';
import icDiscount from '../../assets/new-icons/ic-discount-red.svg';
import { useDispatch } from 'react-redux';
function WalletAmount(props) {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    handleReload();
  }, [props.reload]);
  function handleReload() {
    setReload(true);
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
        setReload(false);
      })
      .catch(() => {
        setReload(false);
      });
  }
  return (
    <div id={'wallet-amount'} className={'wallet-amount'}>
      <div
        className={'img-wallet background-image'}
        style={{ backgroundImage: `url('${props?.type === 'WinWallet' ? icDiscount : icWallet}')` }}
      />
      <div>
        {props?.title && <p className={'title'}>{props?.title}</p>}
        <div className={'d-flex align-items-center'}>
          {/*<p className={'amount'}>{ currencyFormat(user?.wallets.find(wallet => wallet.walletType === `${props?.type || 'PointWallet'}`)?.balance || 0)} đ</p>*/}
          <p className={'amount'}>
            {currencyFormat(user?.wallets?.find(wallet => wallet.walletType === `${props?.type}`)?.balance || 0)} đ
          </p>
          <div
            className={`img-reload ${reload ? 'active' : ''} background-image`}
            style={{ backgroundImage: `url('${icReload}')` }}
            onClick={() => handleReload()}
          />
        </div>
      </div>
    </div>
  );
}
export default WalletAmount;
