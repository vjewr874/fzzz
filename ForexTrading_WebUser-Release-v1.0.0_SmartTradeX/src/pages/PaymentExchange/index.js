/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import BetRecordsService from 'services/betRecordsService';
import ModalBetRecordDetail from 'components/Modal/components/ModalBetRecordDetail/ModalBetRecordDetail';
import { useUser } from 'context/UserContext';
import { currencyFormatUSD } from '../../ultils/CurrencyFormat';
import { removeScrollBar, addScrollBar } from 'ultils/scrollBar';
//styles
import './styles/order.scss';
import Loader from '../../components/Loader';
import { useIntl } from 'react-intl';
import { isShowUnitAppCurrency } from '../../helper/common';

const PaymentExchange = () => {
  const { formatMessage: f } = useIntl();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { user } = useUser();
  const [dataOrder, setDataOrder] = useState(null);
  const [key, setKey] = useState(searchParams?.get('key') ? parseInt(searchParams?.get('key')) : 1);
  const [page, setPage] = useState(searchParams?.get('pages') ? parseInt(searchParams?.get('pages')) : 1);

  const perPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const param = {
      filter: {
        paymentStatus: +key === 2 ? 'New' : +key === 3 ? 'Completed' : +key === 4 ? 'Canceled' : undefined,
        appUserId: user.appUserId,
      },
      skip: (page - 1) * perPage,
      limit: perPage,
    };
    getPaymentExchangeList(param);
  }, [key]);

  function handleChangePage(numberPage) {
    setIsLoading(true);
    const params = {
      filter: {
        // paymentStatus: +key === 2 ? "New" : +key === 3 ? "Completed" : +key === 4 ? "Canceled" : undefined,
        appUserId: user.appUserId,
      },
      skip: (numberPage - 1) * perPage,
      limit: perPage,
    };
    setPage(numberPage);
    getPaymentExchangeList(params);
    checkParams({ key: key, pages: numberPage });
  }

  function getPaymentExchangeList(data) {
    BetRecordsService.getList(data).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataOrder(data);
        setTotalRecords(data.total);
      }
      setIsLoading(false);
    });
  }

  const checkParams = filterParams => {
    const params = {};
    if (filterParams?.key) {
      params.key = filterParams.key;
    }
    if (filterParams?.pages) {
      params.pages = filterParams.pages;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  };

  // function onChange(key) {
  //   setIsLoading(true);
  //   setKey(+key);
  //   setPage(1);
  //   checkParams({ key: +key, pages: 1 });
  // }

  // function handClickItem(order) {
  //   history.push(`paymentExchange-detail/${order}`);
  // }

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

  function handleOpenModalDetail(data) {
    setIsOpen(true);
    setDataDetail(data);
    addScrollBar();
  }
  const closeModal = () => {
    setIsOpen(false);
    removeScrollBar();
  };
  return (
    <div id="PaymentExchange">
      {isLoading ? <Loader /> : null}
      <div className="order">
        <div className="order-header">
          <span className="order-header-title">{f({ id: 'TransitionHistory' })}</span>
        </div>
        <div className="order-tabs">
          {dataOrder?.data?.length > 0 &&
            dataOrder?.data?.map((itemOrder, index) => {
              return (
                <div
                  className="order-tab-container"
                  onClick={() => {
                    handleOpenModalDetail(itemOrder);
                    document.getElementById('otp1').scrollIntoView();
                  }}
                  key={index}
                >
                  <div className="order-tab-container-row">
                    <div className={'order-tab-container-text'}>
                      {f({ id: 'Period' })} {itemOrder?.betRecordSection}
                    </div>
                  </div>
                  <div className="order-tab-container-row1">
                    <div className="border__bottom">
                      <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                        <div>{f({ id: 'Type' })}</div>
                      </div>
                      <div className={'order-tab-container-right'}>
                        <div>{itemOrder?.betRecordUnit}</div>
                      </div>
                    </div>
                  </div>

                  <div className="order-tab-container-row1">
                    <div className="border__bottom">
                      <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                        <div>{f({ id: 'Choosing' })}</div>
                      </div>
                      <div
                        className={'order-tab-container-right'}
                        style={{ color: checkBetRecordType(itemOrder?.betRecordType)?.color }}
                      >
                        <div>{checkBetRecordType(itemOrder?.betRecordType)?.text}</div>
                      </div>
                    </div>
                  </div>

                  <div className="order-tab-container-row1">
                    <div className="border__bottom">
                      <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                        <div>
                          {f({ id: 'Amount_2' })} {isShowUnitAppCurrency && `(USDT)`}
                        </div>
                      </div>
                      <div className={'order-tab-container-right'}>
                        <div>{currencyFormatUSD(itemOrder?.betRecordAmountIn)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="order-tab-container-row1">
                    <div className="border__bottom">
                      <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                        <div>{f({ id: 'Result' })}</div>
                      </div>
                      <div className={'order-tab-container-right'}>
                        <div
                          style={{
                            color:
                              itemOrder?.betRecordResult === 'win'
                                ? '#ADDF48'
                                : itemOrder?.betRecordResult === 'lose'
                                ? '#EC4F4F'
                                : '#00D1FF',
                          }}
                        >
                          {itemOrder?.betRecordResult === 'win'
                            ? 'Thắng'
                            : itemOrder?.betRecordResult === 'lose'
                            ? 'Thua'
                            : 'Chưa có kết quả'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-tab-container-row1">
                    <div className="border__bottom">
                      <div className={'order-tab-container-left'} style={{ width: '37%' }}>
                        <div>{f({ id: 'profile.profit' })}</div>
                      </div>
                      <div className={'order-tab-container-right'}>
                        <div>
                          {currencyFormatUSD(
                            itemOrder?.betRecordResult === 'win'
                              ? itemOrder?.betRecordWin - itemOrder?.betRecordAmountIn
                              : 0,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {dataOrder?.data?.length === 0 && (
            <div className={'text-center py-4 no-data'} style={{ color: '#FFFFFF' }}>
              Không có dữ liệu
            </div>
          )}
        </div>

        {totalRecords > perPage && (
          <div style={{ paddingTop: 28 }}>
            <Pagination
              total={totalRecords}
              className={'custom-pagination'}
              defaultPageSize={perPage}
              defaultCurrent={page}
              onChange={numberPage => handleChangePage(numberPage)}
              current={page}
              showSizeChanger={false}
              showLessItems={true}
            />
          </div>
        )}
      </div>
      <ModalBetRecordDetail isOpen={isOpen} dataDetail={dataDetail} closeModal={closeModal} />
    </div>
  );
};
export default PaymentExchange;
