/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import ProductOrderUser from 'services/productOrderUser';
import { convertTimeDate } from '../../ultils/convertDate';
import { useUser } from 'context/UserContext';
import { convertNumber, currencyFormatVND, currencyFormatUSD } from '../../ultils/CurrencyFormat';
//styles
import './styles/order.scss';
import { func } from 'prop-types';
import Loader from '../../components/Loader';

const listTabs = [
  {
    label: 'Toàn bộ',
    value: 'all',
  },
  {
    label: 'Đang GD',
    value: 'all',
  },
  {
    label: 'Hoàn thành',
    value: 'all',
  },
  {
    label: 'Thất bại',
    value: 'all',
  },
];

const Order = props => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const { user } = useUser();
  const [dataOrder, setDataOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [key, setKey] = useState(0);
  const [skip, setSkip] = useState(0);
  const [system, setSystem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const data = {
  //     skip: 0,
  //     limit: 20
  //   }
  //   getProductOrder(data)
  // }, [])
  useEffect(() => {
    setIsLoading(true);
    const data = {
      // filter: {
      //   orderType: "SELL"
      // },
      skip: skip,
      limit: 10,
    };
    getProductOrder(data);
  }, [skip]);

  function getProductOrder(data) {
    ProductOrderUser.getHistoryOrder(data).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataOrder(data);
      }
      setIsLoading(false);
    });
  }

  function onChange(key) {
    setIsLoading(true);
    const data = {
      filter: {
        orderStatus: +key === 1 ? 'New' : +key === 2 ? 'Completed' : 'Failed',
        orderType: 'SELL',
      },
      skip: 0,
      limit: 20,
    };
    if (+key === 0) {
      data.filter = {};
    }
    setKey(+key);
    getProductOrder(data);
  }

  function handClickItem(order) {
    history.push(`order-detail/${order}`);
  }
  return (
    <div id="Order">
      {isLoading ? <Loader /> : null}
      <div className="order">
        <div className="order-header">
          <span className="order-header-title">Danh sách đơn hàng</span>
        </div>
        <div className="order-tabs">
          <Tabs defaultActiveKey={0} onChange={onChange} className={'order-tab'}>
            {listTabs.map((item, index) => {
              return (
                <TabPane tab={item?.label} key={index}>
                  {dataOrder?.data?.length > 0 &&
                    dataOrder?.data?.map((itemOrder, index) => {
                      return (
                        <div
                          className="order-tab-container"
                          onClick={() => handClickItem(itemOrder?.productOrderId)}
                          key={index}
                        >
                          <div className="order-tab-container-row">
                            <div className={'order-tab-container-text'}>
                              Giao dịch : {convertNumber(itemOrder?.productOrderId)}
                            </div>
                          </div>
                          <div className="order-tab-container-row1">
                            <div className="border__bottom">
                              <div className={'order-tab-container-left'}>
                                <div>Tài khoản </div>
                                <div>thương gia</div>
                              </div>
                              <div className={'order-tab-container-right'}>
                                <div>{itemOrder?.username}</div>
                              </div>
                            </div>
                          </div>
                          <div className="order-tab-container-row1">
                            <div className="border__bottom">
                              <div className={'order-tab-container-left'}>
                                <div>Số lượng bán ra</div>
                              </div>
                              <div className={'order-tab-container-right'}>
                                <div>{currencyFormatVND(itemOrder?.productOrderItems?.[0]?.orderItemQuantity)}</div>
                              </div>
                            </div>
                          </div>
                          <div className="order-tab-container-row1">
                            <div className="border__bottom">
                              <div className={'order-tab-container-left'}>
                                <div>Giá tiền</div>
                              </div>
                              <div className={'order-tab-container-right'}>
                                <div>{currencyFormatVND(itemOrder?.productOrderItems?.[0]?.orderItemPrice)} VND</div>
                              </div>
                            </div>
                          </div>
                          <div className="order-tab-container-row1">
                            <div className="border__bottom">
                              <div className={'order-tab-container-left'}>
                                <div>Số tiền</div>
                              </div>
                              <div className={'order-tab-container-right'}>
                                <div>
                                  {currencyFormatVND(
                                    itemOrder?.productOrderItems?.[0]?.orderItemQuantity *
                                      itemOrder?.productOrderItems?.[0]?.orderItemPrice,
                                  )}{' '}
                                  VND
                                </div>
                              </div>
                            </div>
                          </div>
                          {itemOrder?.orderStatus === 'New' ? (
                            <div className="order-tab-container-row1">
                              <div className="border__bottom">
                                <div className={'order-tab-container-left'}>
                                  <div>Trạng thái</div>
                                </div>
                                <div
                                  className={'order-tab-container-right'}
                                  style={{
                                    color: '#00D1FF',
                                    textAlign: 'right',
                                  }}
                                >
                                  <div>Đang thực hiện </div>
                                </div>
                              </div>
                            </div>
                          ) : itemOrder?.orderStatus === 'Completed' ? (
                            <div className="order-tab-container-row1">
                              <div className="border__bottom">
                                <div className={'order-tab-container-left'}>
                                  <div>Trạng thái</div>
                                </div>
                                <div
                                  className={'order-tab-container-right'}
                                  style={{
                                    color: '#ADDF48',
                                    textAlign: 'right',
                                  }}
                                >
                                  <div>Đã hoàn thành - Thời gian</div>
                                  <div>cho phép ghép đôi:</div>
                                  <div>{convertTimeDate(itemOrder?.paymentApproveDate)}</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="order-tab-container-row1">
                              <div className="border__bottom">
                                <div className={'order-tab-container-left'}>
                                  <div>Trạng thái</div>
                                </div>
                                <div
                                  className={'order-tab-container-right'}
                                  style={{
                                    color: '#EC4F4F',
                                    textAlign: 'right',
                                  }}
                                >
                                  <div>Thất bại - Thời gian:</div>
                                  <div>{convertTimeDate(itemOrder?.updatedAt)}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  {dataOrder?.data?.length === 0 && (
                    <div className={'text-center py-4 no-data'} style={{ color: '#FFFFFF' }}>
                      Không có dữ liệu
                    </div>
                  )}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default Order;
