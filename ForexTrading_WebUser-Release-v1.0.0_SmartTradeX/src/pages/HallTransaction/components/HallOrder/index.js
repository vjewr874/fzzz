/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './styles/hallOrder.scss';
import icArrowNext from '../../../../assets/stock-icons/ic-arrowNext.svg';
import { currencyFormatUSD } from '../../../../ultils/CurrencyFormat';

function HallOrder({ listData, typeTransaction, setIsOpenModalSale, setDataToSaleUSDT, f }) {
  return (
    <div className="hallOrder">
      {listData?.map((item, index) => (
        <div className="hallOrder-contain" key={index}>
          <div className="hallOrder-item">
            <span className="left large">{item?.username}</span>
            <span className="right small">
              {f({ id: 'Quantity' })} {currencyFormatUSD(item?.productOrderItems[0]?.orderItemQuantity || 0)} USDT
            </span>
          </div>
          <div className="hallOrder-item">
            <span className="left small">
              {f({ id: 'Unit price' })} {currencyFormatUSD(item?.productOrderItems[0]?.orderItemPrice || 0)}
            </span>
            <span className="right small">
              {f({ id: 'Not traded' })}{' '}
              {currencyFormatUSD(
                item?.productOrderItems[0]?.orderItemQuantity -
                  item?.productOrderItems[0]?.orderItemDeliveredQuantity || 0,
              )}{' '}
              USDT
            </span>
          </div>
          {typeTransaction === '2' && (
            <div className={'hallOrder-item'}>
              <span className={'left'}>
                {f({ id: 'Amount' })} {currencyFormatUSD(item?.minOrderItemQuantity)} -{' '}
                {currencyFormatUSD(item?.maxOrderItemQuantity)}
              </span>
              <div className={'right'}>
                <div
                  className="btnHallOrderSale"
                  onClick={() => {
                    setIsOpenModalSale(true);
                    setDataToSaleUSDT(item);
                  }}
                >
                  <span>{f({ id: 'Go sell' })}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default HallOrder;
