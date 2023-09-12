/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Modal from '../../Modal';
import './style/modalListCoinChart.scss';
import icClose from './../../../../assets/stock-icons/ic-closeSquare.svg';
import { useIntl } from 'react-intl';
import { currencyFormatUSD } from '../../../../ultils/CurrencyFormat';
import LineChart from './LineChart';

function ModalListCoinChart(props) {
  const { listCoins, handleChangeTypeCoin, convertPercent, priceNewCoin, pair } = props;
  const { formatMessage: f } = useIntl();

  return (
    <div id={'ModalListCoinChart'}>
      <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
        <div className="ModalListCoinChart">
          <div className="ModalListCoinChart-header">
            <div className="left" />
            <span>{f({ id: 'List of market codes' })}</span>
            <img src={icClose} alt="" onClick={() => props?.setIsOpenModalListCoin(false)} />
          </div>

          <div className="ModalListCoinChart-body">
            <div className={'bodyTop'}>
              <span className={'left'}>{f({ id: 'Code' })}</span>
              <span className={'mid'}>{f({ id: 'volatility' })}</span>
              <span className={'right'}>{f({ id: 'Price' })}</span>
            </div>
            <div className={'bodyMain'}>
              {listCoins.map((item, index) => (
                <div
                  className={'bodyMainItem'}
                  key={index}
                  onClick={() => {
                    handleChangeTypeCoin(item.symbol);
                  }}
                >
                  <div className={'name left'}>
                    <img className={'image'} src={item?.icon_url} alt="" />
                    <div className={'coin'}>
                      <p>{item?.name}</p>
                      <span>{item?.label}</span>
                    </div>
                  </div>
                  <div className={'chart mid'}>
                    <LineChart symbol={item?.symbol} corePercent={item?.percent} />
                  </div>
                  <div className={'detail right'}>
                    {/* <span className={'amount'}>$ {currencyFormatUSD(item?.price ? item?.price : 0)}</span> */}
                    <span className={'amount'}>
                      $ {pair == item.symbol ? priceNewCoin : item?.price ? item?.price : 0}
                    </span>
                    <span className={`percent ${item?.percent > 0 ? 'green' : 'red'}`}>
                      {convertPercent(item?.percent ? item?.percent : 0)} %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalListCoinChart;
