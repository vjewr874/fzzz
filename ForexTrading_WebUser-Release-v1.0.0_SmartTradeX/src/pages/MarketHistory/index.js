/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import './style/market-history.scss';
import { useIntl } from 'react-intl';
import { Pagination } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from 'components/Loader';

import swal from 'sweetalert';
import DetailCoinService from '../../services/detailCoin';

function MarketHistory() {
  const { formatMessage: f } = useIntl();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(searchParams?.get('pages') ? parseInt(searchParams?.get('pages')) : 1);
  const [type, setType] = useState(searchParams?.get('type') ? searchParams?.get('type') : 'BTCUSDT');
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const perPage = 20;

  useEffect(() => {
    setIsLoading(true);
    handleApiGameRecordUserGetList({
      filter: {
        gameRecordUnit: handleChangeTypeCoin(type),
      },
      skip: (page - 1) * perPage,
      limit: perPage,
    });
    checkParams({ pages: 1, type: type });
  }, []);
  function handleApiGameRecordUserGetList(params) {
    DetailCoinService.GameRecordUserGetList(params).then(result => {
      setIsLoading(false);
      const { isSuccess } = result;
      if (isSuccess) {
        setListData(result.data.data);
        setTotalRecords(result.data.total);
      } else {
        swal(f({ id: 'error' }), {
          icon: 'warning',
        });
      }
    });
  }
  function handleChangeTypeCoin(nameCoin) {
    if (nameCoin === 'BTCUSDT') {
      return 'BTC-USD';
    }
    if (nameCoin === 'ETHUSDT') {
      return 'ETH-USD';
    }
    // if (nameCoin === 'TUSDT') {
    //   return 'USDT-USD';
    // }
    if (nameCoin === 'BNBUSDT') {
      return 'BNB-USD';
    }
    if (nameCoin === 'XRPUSDT') {
      return 'XRP-USD';
    }
    if (nameCoin === 'SHIBUSDT') {
      return 'SHIB-USD';
    }
    if (nameCoin === 'TRXUSDT') {
      return 'TRX-USD';
    }
    if (nameCoin === 'DOGEUSDT') {
      return 'DOGE-USD';
    }
    if (nameCoin === 'SOLUSDT') {
      return 'SOL-USD';
    }
    if (nameCoin === 'ADAUSDT') {
      return 'ADA-USD';
    }
  }
  function handleChangePage(numberPage) {
    setIsLoading(true);
    const params = {
      skip: (numberPage - 1) * perPage,
      limit: perPage,
      filter: {
        gameRecordUnit: handleChangeTypeCoin(type),
      },
    };
    setPage(numberPage);
    handleApiGameRecordUserGetList(params);
    checkParams({ pages: numberPage, type: type });
  }
  const checkParams = filterParams => {
    const params = {};
    if (filterParams?.type) {
      params.type = filterParams.type;
    }
    if (filterParams?.pages) {
      params.pages = filterParams.pages;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  };
  return (
    <Page isHideItemRight={true} headerTitle={f({ id: 'Market History' })}>
      {isLoading ? <Loader /> : null}
      <div id={'MarketHistory'}>
        <div className={'marketHistory'}>
          <div className={'marketHistory-header'}>
            <span className={'left'}>{f({ id: 'Time' })}</span>
            <span className={'mid'}>{f({ id: 'Type' })}</span>
            <span className={'right'}>{f({ id: 'Total_2' })}</span>
          </div>
          <div className={'marketHistory-body'}>
            {listData.map((item, index) => (
              <div className={'marketHistory-bodyItem'} key={index}>
                <span className={'left time'}>Kỳ {item?.gameRecordSection}</span>
                <span className={'mid type'}>{item?.gameRecordUnit.replace('-USD', '')}</span>
                <span
                  className={`right total ${
                    item?.gameRecordTypeUp === 1 ? 'basic' : item?.gameRecordTypeDown === 1 ? 'warn' : ''
                  }`}
                >
                  {item?.gameRecordPrice}
                </span>
              </div>
            ))}
          </div>

          {totalRecords > perPage && (
            <div style={{ paddingTop: 40 }}>
              <Pagination
                total={totalRecords}
                className={'custom-pagination'}
                defaultPageSize={perPage}
                defaultCurrent={page}
                onChange={numberPage => handleChangePage(numberPage)}
                showSizeChanger={false}
                showLessItems={true}
              />
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

export default MarketHistory;
