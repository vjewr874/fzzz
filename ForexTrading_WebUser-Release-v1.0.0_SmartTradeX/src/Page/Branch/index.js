/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { useUser } from 'context/UserContext';
import { number_to_price, getBalanceByWalletType } from 'helper/common';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import {
  IconWalletSecond,
  IconAssitantWoman,
  IconButtonRrefreshSecond,
  IconPiggyBank1,
  IconPiggyBank2,
  IconNextBlack,
} from './../../assets/icons/index';
import Header from '../../components/Header';
import { routes } from './../../App';
import './index.scss';
import { useIntl } from 'react-intl';

function Branch(props) {
  const { history } = props;
  const { refresh } = useUser();
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const { wallets, userAvatar, lastName, firstName, memberLevelName, totalDeposit, totalWithdraw } = useSelector(
    state => state.member || {},
  );

  return (
    <div className="profile">
      <Header title="Ví tiền" headerRight={<IconAssitantWoman />} />

      <div className="branch__header">
        <div className="branch__detail">
          <img
            alt="test"
            className="icon_avatar"
            src={userAvatar && userAvatar !== '' ? userAvatar : '/assets/images/avatar.png'}
          />
          <div className="mt-3 text-center">
            {memberLevelName} {firstName || ''} {lastName || ''}
          </div>
        </div>
        <div className="branch__card">
          <div className="branch__box">
            <div className="branch__box__title">
              <IconWalletSecond className="me-2" /> Số dư của tôi
            </div>
            <div className="branch__box__des">
              {number_to_price(wallets ? getBalanceByWalletType(wallets, 'PointWallet') : 0)} đ{' '}
              <IconButtonRrefreshSecond
                onClick={() => {
                  refresh();
                  swal('Làm mới thành công', {
                    icon: 'success',
                  });
                }}
              />
            </div>
            <div className="branch__box__line"></div>
            <div className="row">
              <div className="col-6 branch__box__div text-center">
                <div className="branch__box__text"> Lịch sử giao dịch</div>

                <div className="text-center branch__box__lable">{number_to_price(totalDeposit || 0)} đ</div>
              </div>
              <div className="col-6 branch__box__text text-center">
                <div className="branch__box__text">Rút tiền tích luỹ</div>
                <div className="text-center branch__box__lable">{number_to_price(totalWithdraw || 0)} đ</div>
              </div>
            </div>
          </div>
          <div className="button_payment">
            <button onClick={() => history.push(routes.managementDeposit.path)} className="button_withdraw">
              Rút tiền
            </button>
            <button onClick={() => history.push(routes.recharge.path)} className="button_deposit">
              Nạp tiền
            </button>
          </div>
        </div>
      </div>

      <div className="branch__footer">
        <div
          onClick={() => history.push(routes.managementDepositHistory.path)}
          className="d-flex align-items-center branch__footer__item"
        >
          <IconPiggyBank1 className="me-2" /> Lịch sử nạp tiền <IconNextBlack className="ms-auto" />
        </div>
        <div className="lineGray mt-2 mb-2"></div>
        <div
          onClick={() => history.push(routes.managementWithdrawHistory.path)}
          className="d-flex align-items-center branch__footer__item"
        >
          <IconPiggyBank2 className="me-2" /> Lịch sử rút tiền <IconNextBlack className="ms-auto" />
        </div>
      </div>
    </div>
  );
}
export default Branch;
