/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { currencyFormatUSD } from '../../../../ultils/CurrencyFormat';
import React from 'react';
import { useIntl } from 'react-intl';
import './style/style.scss';
import LineChart from '../LineChart';

function ListMarket(props) {
  const { formatMessage: f } = useIntl();
  const { title, handleSymbolClick, listData } = props;
  const convertPercent = number => {
    if (number !== undefined && number !== null) {
      return parseFloat(Math.round(number * 100) / 100).toFixed(2);
    } else return 0;
  };

  return (
    <div id={'ListMarket'}>
      <div className={'listMarket'}>
        <div className={'listMarket-header'}>
          <span>{title}</span>
        </div>
        <div className={'listMarket-body'}>
          <div className={'bodyTop'}>
            <span className={'left'}>{f({ id: 'Code' })}</span>
            <span className={'mid'}>{f({ id: 'volatility' })}</span>
            <span className={'right'}>{f({ id: 'Price' })}</span>
          </div>
          <div className={'bodyMain'}>
            {listData &&
              listData.map((item, index) => (
                <div className={'bodyMainItem'} key={index} onClick={() => handleSymbolClick(item?.symbol)}>
                  <div className={'nameFlex left'}>
                    <img className={'image'} src={item.icon_url} alt="" />
                    <div className={'coin'}>
                      <p>{item?.label}</p>
                      <span>{item?.name}</span>
                    </div>
                  </div>

                  <div className={'chart mid'}>
                    {item?.symbol && <LineChart symbol={item?.symbol} corePercent={item?.percent} />}
                  </div>
                  <div className={'detail right'}>
                    <span className={'amount'}>$ {item?.price ? currencyFormatUSD(item?.price) : 0}</span>
                    <span className={`percent ${item?.percent >= 0 ? 'green' : 'red'}`}>
                      {convertPercent(item?.percent)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListMarket;
