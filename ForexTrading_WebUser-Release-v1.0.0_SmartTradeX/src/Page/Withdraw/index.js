/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Input } from 'antd';
import Header from 'components/Header';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { number_to_price, getBalanceByWalletType } from '../../helper/common';
import PaymentDepositTransaction from './../../services/paymentDepositTransaction';
import swal from 'sweetalert';
import './index.scss';
import { routes } from './../../App';
function Withdraw(props) {
  const { wallets = [] } = useSelector(state => (state.member ? state.member : {}));
  const history = useHistory();
  const [amount, setamount] = useState(null);

  function onFinish() {
    if (wallets && wallets.length > 0 && getBalanceByWalletType(wallets, 'PointWallet') < amount) {
      swal('Số tiền rút vượt quá số dư cho phép', {
        icon: 'warning',
      });
    } else if (amount < 100000000) {
      swal('Số tiền rút phải không được hơn 1,000,000,000 Đ', {
        icon: 'warning',
      });
    } else if (amount > 50000) {
      PaymentDepositTransaction.requestWithdraw({
        paymentAmount: amount,
      }).then(result => {
        const { isSuccess } = result;

        if (!isSuccess) {
          swal('Rút tiền thất bại', {
            icon: 'warning',
          });

          return;
        } else {
          swal('Rút thành công', {
            icon: 'success',
          });

          setamount(null);
        }
      });
    } else {
      swal('Số tiền rút phải lớn hơn 50,000 Đ', {
        icon: 'warning',
      });
    }
  }

  return (
    <div className="withdraw pt-0 overflow-hidden position-relative pb-5">
      <Header
        title={'Rút tiền'}
        goBack={() => history.goBack()}
        headerRight={
          <img
            className="pointer icon_audio"
            onClick={() => {
              history.push(routes.managementProfileCustomer.path);
            }}
            src="/assets/images/audio.png"
          />
        }
      />
      <div className="balance">
        <div className="ic-title">
          <img src={require('../../assets/icons/ic_wallet.svg')} className="ic-wallet" />
          <div className="total">Tổng tiền</div>
        </div>
        <div className="money">{number_to_price(wallets ? getBalanceByWalletType(wallets, 'PointWallet') : 0)} VNĐ</div>
      </div>

      <div className="balance">
        <div className="ic-title">
          <img src={require('../../assets/icons/ic_bankCard.svg')} className="ic-wallet" />
          <div className="payment-method">Phương thức thanh toán</div>
        </div>

        <div className="row-center">
          <input checked={true} className="radio pointer" type={'radio'} />
          <div className="method">Chuyển khoản</div>
        </div>
      </div>

      <div className="balance" style={{ marginTop: 40 }}>
        <div className="ic-title">
          <img src={require('../../assets/icons/ic_wallet_black.svg')} className="ic-wallet" />
          <div className="payment-method">Số tiền rút</div>
        </div>
        <div className="input">
          <Input
            type={'number'}
            onChange={e => setamount(e.target.value)}
            value={amount}
            placeholder="Vui lòng nhập số tiền rút"
            bordered={false}
          />
        </div>
      </div>
      <button onClick={onFinish} className="recharge-button">
        Rút tiền
      </button>

      <div className="info m-2 mt-4">
        <div className="row-between" style={{ marginTop: 26, marginBottom: 26 }}>
          <div className="info-title">
            <img className="icon" src={require('../../assets/icons/ic_piggy-bank.svg')} />
          </div>
          <div className="info-value">1. Lệ phí 0%</div>
        </div>

        <div className="row-between" style={{ marginTop: 26, marginBottom: 26 }}>
          <div className="info-title">
            <img className="icon" src={require('../../assets/icons/ic_withdraw-time.svg')} />
          </div>
          <div className="info-value">2. Thời gian rút tiền 00:00 - 23:55</div>
        </div>

        <div className="row-between" style={{ marginTop: 26, marginBottom: 26 }}>
          <div className="info-title">
            <img className="icon" src={require('../../assets/icons/ic_withdraw_times.svg')} />
          </div>
          <div className="info-value">3. Số lần rút tiền trong 1 ngày: 3</div>
        </div>

        <div className="row-between" style={{ marginTop: 26, marginBottom: 26 }}>
          <div className="info-title">
            <img className="icon" src={require('../../assets/icons/ic_withdrau_range.svg')} />
          </div>
          <div className="info-value">4. Phạm vi rút tiền trong 1 ngày: 50,000 - 1,000,000,000</div>
        </div>
      </div>
    </div>
  );
}
export default Withdraw;
