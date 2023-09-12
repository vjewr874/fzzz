/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../../components/Page/Page';
import './styles/order-detail.scss';
import { useParams } from 'react-router-dom';
//import ProductOrderUser from '../../../services/productOrderUser';
import { convertTimeDate } from '../../../ultils/convertDate';
import { convertNumber, currencyFormatVND, currencyFormatUSD } from '../../../ultils/CurrencyFormat';
import PaymentExchangeService from '../../../services/paymentExchange';
import Loader from '../../../components/Loader';
import { useIntl } from 'react-intl';
import { isShowUnitAppCurrency } from '../../../helper/common';
const Detail = () => {
  const { formatMessage: f } = useIntl();
  const { id } = useParams();
  const [dataOrder, setDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const data = {
      id: id,
    };
    getProductOrderById(data);
  }, []);

  function getProductOrderById(data) {
    PaymentExchangeService.getDetail(data).then(r => {
      const { isSuccess, data } = r;
      setIsLoading(false);
      if (isSuccess) {
        setDataOrder(data);
      }
    });
  }
  return (
    <Page isHideItemRight={true} headerTitle={f({ id: 'Order details' })}>
      <div id="OrderDetail">
        {isLoading ? <Loader /> : null}
        <div className="order-tab-container">
          <div className="order-tab-container-row">
            <div className={'order-tab-container-text'}>
              {f({ id: 'Order' })} : {convertNumber(dataOrder?.exchangePaymentMappingOrderId)}
            </div>
          </div>
          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                <div>{f({ id: 'Merchant account' })}</div>
              </div>
              <div className={'order-tab-container-right'}>
                <div>{dataOrder?.username}</div>
              </div>
            </div>
          </div>
          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                <div>{f({ id: 'Price' })}</div>
              </div>
              <div className={'order-tab-container-right'}>
                <div>{currencyFormatVND(dataOrder?.orderItemPrice)} VND</div>
              </div>
            </div>
          </div>
          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                <div>{f({ id: 'Amount of money' })}</div>
              </div>
              <div className={'order-tab-container-right'} style={{ textAlign: 'right' }}>
                <div>
                  {currencyFormatUSD(dataOrder?.paymentAmount)} {isShowUnitAppCurrency && `(USDT)`}
                </div>
                <div>~ {currencyFormatVND(dataOrder?.orderItemPrice * dataOrder?.paymentAmount)} VND</div>
              </div>
            </div>
          </div>

          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                <div>{f({ id: 'Amount to be paid' })}</div>
              </div>
              <div className={'order-tab-container-right'} style={{ textAlign: 'right' }}>
                <div>
                  {currencyFormatUSD(dataOrder?.paymentAmount)} {isShowUnitAppCurrency && `(USDT)`}
                </div>
                <div>~ {currencyFormatVND(dataOrder?.orderItemPrice * dataOrder?.paymentAmount)} VND</div>
              </div>
            </div>
          </div>

          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                {f({ id: 'Pairing time' })}
              </div>
              <div className={'order-tab-container-right'}>
                <div>{convertTimeDate(dataOrder?.paymentApproveDate)}</div>
              </div>
            </div>
          </div>

          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                <div>{f({ id: 'Status' })}</div>
              </div>
              {dataOrder?.paymentStatus === 'Completed' ? (
                <div
                  className={'order-tab-container-right'}
                  style={{
                    color: '#ADDF48',
                    textAlign: 'right',
                  }}
                >
                  <div>{f({ id: 'Accomplished' })}</div>
                </div>
              ) : dataOrder?.paymentStatus === 'New' ? (
                <div
                  className={'order-tab-container-right'}
                  style={{
                    color: '#00D1FF',
                    textAlign: 'right',
                  }}
                >
                  <div>{f({ id: 'Processing' })}</div>
                </div>
              ) : (
                <div
                  className={'order-tab-container-right'}
                  style={{
                    color: '#EC4F4F',
                    textAlign: 'right',
                  }}
                >
                  <div>{f({ id: 'Failed' })}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default Detail;
