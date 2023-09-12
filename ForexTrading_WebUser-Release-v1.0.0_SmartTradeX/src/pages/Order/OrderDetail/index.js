/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../../components/Page/Page';
import './styles/order-detail.scss';
import { useParams } from 'react-router-dom';
//import ProductOrderUser from '../../../services/productOrderUser';
import ProductOrderUser from 'services/productOrderUser';
import { convertTimeDate } from '../../../ultils/convertDate';
import SystemConfiguration from '../../../services/systemConfiguration';
import { convertNumber, currencyFormatVND, currencyFormatUSD } from '../../../ultils/CurrencyFormat';
const OrderDetail = props => {
  const { id } = useParams();
  const [dataOrder, setDataOrder] = useState([]);
  const [system, setSystem] = useState(null);
  useEffect(() => {
    const data = {
      id: id,
    };
    getProductOrderById(data);
    SystemConfiguration.systemConfigurationGetDetail().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setSystem(data);
      }
    });
  }, []);

  function getProductOrderById(data) {
    ProductOrderUser.getProductOrderById(data).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        setDataOrder(data);
      }
    });
  }
  return (
    <Page isHideItemRight={true} headerTitle={'Chi tiết đơn hàng'}>
      <div id="OrderDetail">
        <div className="order-tab-container">
          <div className="order-tab-container-row">
            <div className={'order-tab-container-text'}>Đơn hàng : {convertNumber(dataOrder?.productOrderId)}</div>
          </div>
          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'}>
                <div>Tài khoản </div>
                <div>thương gia</div>
              </div>
              <div className={'order-tab-container-right'}>
                <div>{dataOrder?.customerName}</div>
              </div>
            </div>
          </div>
          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'}>
                <div>Giá tiền</div>
              </div>
              <div className={'order-tab-container-right'}>
                <div>{currencyFormatVND(dataOrder?.productOrderItems?.[0]?.orderItemPrice)} VND</div>
              </div>
            </div>
          </div>
          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'}>
                <div>Số tiền</div>
              </div>
              <div className={'order-tab-container-right'} style={{ textAlign: 'right' }}>
                <div>
                  {currencyFormatUSD(
                    dataOrder?.productOrderItems?.[0]?.orderItemQuantity *
                      dataOrder?.productOrderItems?.[0]?.orderItemPrice,
                  )}{' '}
                  USDT
                </div>
                <div>
                  ~{' '}
                  {currencyFormatVND(
                    dataOrder?.productOrderItems?.[0]?.orderItemQuantity *
                      dataOrder?.productOrderItems?.[0]?.orderItemPrice,
                  )}{' '}
                  VND
                </div>
              </div>
            </div>
          </div>

          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'}>
                <div>Số tiền cần </div>
                <div>thanh toán</div>
              </div>
              <div className={'order-tab-container-right'} style={{ textAlign: 'right' }}>
                <div>
                  {currencyFormatUSD(
                    dataOrder?.productOrderItems?.[0]?.orderItemQuantity *
                      dataOrder?.productOrderItems?.[0]?.orderItemPrice,
                  )}{' '}
                  USDT
                </div>
                <div>
                  ~{' '}
                  {currencyFormatVND(
                    dataOrder?.productOrderItems?.[0]?.orderItemQuantity *
                      dataOrder?.productOrderItems?.[0]?.orderItemPrice,
                  )}{' '}
                  VND
                </div>
              </div>
            </div>
          </div>

          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'}>
                <div>Thời gian </div>
                <div>ghép đôi</div>
              </div>
              <div className={'order-tab-container-right'}>
                <div>{convertTimeDate(dataOrder?.paymentApproveDate)}</div>
              </div>
            </div>
          </div>

          <div className="order-tab-container-row1">
            <div className="border__bottom">
              <div className={'order-tab-container-left'}>
                <div>Trạng thái</div>
              </div>
              {dataOrder?.orderStatus === 'Completed' ? (
                <div
                  className={'order-tab-container-right'}
                  style={{
                    color: '#ADDF48',
                    textAlign: 'right',
                  }}
                >
                  <div>Đã hoàn thành</div>
                </div>
              ) : dataOrder?.orderStatus === 'New' ? (
                <div
                  className={'order-tab-container-right'}
                  style={{
                    color: '#00D1FF',
                    textAlign: 'right',
                  }}
                >
                  <div>Đang thực hiện</div>
                </div>
              ) : (
                <div
                  className={'order-tab-container-right'}
                  style={{
                    color: '#EC4F4F',
                    textAlign: 'right',
                  }}
                >
                  <div>Đã hoàn thành</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default OrderDetail;
