/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './styles/modal-transaction-detail.scss';

import { convertTimeDate } from '../../../../ultils/convertDate';

import { currencyFormatUSD, currencyFormatVND } from '../../../../ultils/CurrencyFormat';

import icBack from '../../../../assets/stock-icons/ic-arrow-left-square.svg';
import { useIntl } from 'react-intl';
import { isShowUnitAppCurrency } from '../../../../helper/common';

function ModalBetRecordDetail(props) {
  const { formatMessage: f } = useIntl();
  const checkBetRecordType = betRecordType => {
    // eslint-disable-next-line default-case
    switch (betRecordType) {
      case 'BetDown':
        return {
          color: '#FF715E',
          text: f({ id: 'Decrease' }),
        };
        break;
      case 'BetUp':
        return {
          color: '#36FFB5',
          text: f({ id: 'Increase' }),
        };
        break;
      case 'BIG':
        return {
          color: '#36FFB5',
          text: f({ id: 'Big' }),
        };
        break;
      case 'SMALL':
        return {
          color: '#FF715E',
          text: f({ id: 'Small' }),
        };
        break;
      case 'ODD':
        return {
          color: '#FF715E',
          text: f({ id: 'Odd' }),
        };
        break;
      case 'EVEN':
        return {
          color: '#36FFB5',
          text: f({ id: 'Even' }),
        };
        break;
      case 'UP':
        return {
          color: '#36FFB5',
          text: f({ id: 'Up' }),
        };
        break;
      case 'DOWN':
        return {
          color: '#FF715E',
          text: f({ id: 'Down' }),
        };
        break;
      case 'HALF':
        return {
          color: '#FF715E',
          text: f({ id: 'Half' }),
        };
        break;
      case 'FULL':
        return {
          color: '#36FFB5',
          text: f({ id: 'Full' }),
        };
        break;
    }
  };

  return (
    <div id={'otp1'} className={`container-otp ${props?.isOpen ? 'show' : ''}`}>
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
      <div id="TransitionDetail_BetRecord">
        <div className={'transition-detail'}>
          <div className={'transition-detail-container'}>
            <div className={'transition-detail-row'}>
              <div className={'transition-detail-text'}>
                <div>
                  {f({ id: 'CodeTransaction' })} : {props?.dataDetail?.betRecordId}
                </div>
              </div>
            </div>
            <div className={'transition-detail-row1'}>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'Period' })}</p>
                <p className="transition-detail-line-right">{props?.dataDetail?.betRecordSection}</p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'Type' })}</p>
                <p className="transition-detail-line-right">{props?.dataDetail?.betRecordUnit}</p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'Choosing' })} </p>
                <p
                  className="transition-detail-line-right"
                  style={{ color: checkBetRecordType(props?.dataDetail?.betRecordType)?.color }}
                >
                  {checkBetRecordType(props?.dataDetail?.betRecordType)?.text}
                </p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">
                  {f({ id: 'Amount_2' })} {isShowUnitAppCurrency && '(USDT)'}
                </p>
                <p className="transition-detail-line-right">
                  {currencyFormatUSD(props?.dataDetail?.betRecordAmountIn || 0)}
                </p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'TimeCreate' })}</p>
                <p className="transition-detail-line-right">{convertTimeDate(props?.dataDetail?.createdAt)}</p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'Result' })}</p>
                <p
                  className="transition-detail-line-right"
                  style={{
                    color:
                      props?.dataDetail?.betRecordResult === 'win'
                        ? '#ADDF48'
                        : props?.dataDetail?.betRecordResult === 'lose'
                        ? '#EC4F4F'
                        : '#00D1FF',
                  }}
                >
                  {props?.dataDetail?.betRecordResult === 'win'
                    ? 'Thắng'
                    : props?.dataDetail?.betRecordResult === 'lose'
                    ? 'Thua'
                    : 'Chưa có kết quả'}
                </p>
              </div>
              <div className={'transition-detail-line'}>
                <p className="transition-detail-line-left">{f({ id: 'profile.profit' })}</p>
                <p className="transition-detail-line-right">
                  {currencyFormatUSD(
                    props?.dataDetail?.betRecordResult === 'win'
                      ? props?.dataDetail?.betRecordWin - props?.dataDetail?.betRecordAmountIn
                      : 0,
                  )}
                </p>
              </div>
              {/* <div className={'transition-detail-line'}>
                                <p className="transition-detail-line-left">{f({id: "Status"})}</p>
                                <p className="transition-detail-line-right" style={{color: '#ADDF48'}}>{f({id: "Accomplished"})}</p>
                            </div> */}
              {props?.dataDetail?.betRecordStatus === 'New' ? (
                <div className="transition-detail-line">
                  <div className="transition-detail-line-left">{f({ id: 'Status' })}</div>
                  <div className={'transition-detail-line-right'}>{f({ id: 'Processing' })}</div>
                </div>
              ) : props?.dataDetail?.betRecordStatus === 'Completed' ? (
                <div className="transition-detail-line">
                  <div className="transition-detail-line-left">{f({ id: 'Status' })}</div>
                  <div className={'transition-detail-line-right'} style={{ color: '#ADDF48' }}>
                    {f({ id: 'Accomplished' })}
                  </div>
                </div>
              ) : props?.dataDetail?.betRecordStatus === 'Waiting' ? (
                <div className="transition-detail-line">
                  <div className="transition-detail-line-left">{f({ id: 'Status' })}</div>
                  <div className={'transition-detail-line-right'}>{f({ id: 'Processing' })}</div>
                </div>
              ) : props?.dataDetail?.betRecordStatus === 'Pending' ? (
                <div className="transition-detail-line">
                  <div className="transition-detail-line-left">{f({ id: 'Status' })}</div>
                  <div className={'transition-detail-line-right'}>{f({ id: 'Processing' })}</div>
                </div>
              ) : props?.dataDetail?.betRecordStatus === 'Deleted' ? (
                <div className="transition-detail-line">
                  <div className="transition-detail-line-left">{f({ id: 'Status' })}</div>
                  <div className={'transition-detail-line-right'}>{f({ id: 'Deleted' })}</div>
                </div>
              ) : (
                <div className="transition-detail-line">
                  <div className="transition-detail-line-left">{f({ id: 'Status' })}</div>
                  <div className={'transition-detail-line-right'}>{f({ id: 'Failed' })}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBetRecordDetail;
