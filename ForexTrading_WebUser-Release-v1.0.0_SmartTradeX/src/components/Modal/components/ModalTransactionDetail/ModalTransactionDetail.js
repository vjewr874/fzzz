/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './styles/modal-transaction-detail.scss';

import { convertTimeDate } from '../../../../ultils/convertDate';

import { currencyFormatUSD } from '../../../../ultils/CurrencyFormat';

import icBack from '../../../../assets/stock-icons/ic-arrow-left-square.svg';
import { useIntl } from 'react-intl';
import { isShowUnitAppCurrency } from '../../../../helper/common';

function ModalTransactionDetail(props) {
  const { formatMessage: f } = useIntl();

  return (
    <div id={'otp'} className={`container-otp ${props?.isOpen ? 'show' : ''}`}>
      <div className={'container-header'}>
        <div className={'container-item__left'}>
          <div
            className={'background-image icon-back'}
            style={{ backgroundImage: `url('${icBack}')` }}
            onClick={() => props?.closeModal()}
          />
        </div>
        <div className={'container-item__center'}>{f({ id: 'DetaiTransaction' })}</div>
        <div className={'icon-back'} />
      </div>
      <div id="TransitionDetail">
        <div className={'transition-detail'}>
          <div className={'transition-detail-container'}>
            <div className={'transition-detail-row'}>
              <div className={'transition-detail-text'}>
                <div>
                  {f({ id: 'CodeTransaction' })} : {props?.dataDetail?.WalletRecordId}
                </div>
              </div>
            </div>
            <div className={'transition-detail-row1'}>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'account' })}</p>
                <p className="transition-detail-line-right">
                  {props?.dataDetail?.email || props?.dataDetail?.username}
                </p>
              </div>
              <div className={'transition-detail-line'}>
                {props.keyTab === 0 ? (
                  <p className="transition-detail-line-left">
                    {f({ id: 'profile.depositBalance' })} {isShowUnitAppCurrency && `(USDT)`}
                  </p>
                ) : (
                  <p className="transition-detail-line-left">
                    {f({ id: 'withdraw.withdraw_amount' })} {isShowUnitAppCurrency && `(USDT)`}
                  </p>
                )}
                <p
                  className="transition-detail-line-right"
                  style={{ color: props.keyTab === 0 ? '#36FFB5' : '#EC4F4F' }}
                >
                  {currencyFormatUSD(props?.dataDetail?.paymentAmount || 0)}
                </p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'TimeCreate' })}</p>
                <p className="transition-detail-line-right">{convertTimeDate(props?.dataDetail?.createdAt)}</p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'TimeBrowsing' })}</p>
                <p className="transition-detail-line-right">{convertTimeDate(props?.dataDetail?.updateAt)}</p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'Status' })}</p>
                <p className="transition-detail-line-right" style={{ color: '#ADDF48' }}>
                  {f({ id: 'Accomplished' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTransactionDetail;
