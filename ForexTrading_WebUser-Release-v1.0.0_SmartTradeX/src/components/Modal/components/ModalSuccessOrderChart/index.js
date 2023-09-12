/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import Modal from '../../Modal';
import './styles/modal-success-order-chart.scss';
import { useIntl } from 'react-intl';
import img_orderPlaceSuccess from '../../../../assets/stock-images/im-successOrderChart.png';
import currencyFormat from '../../../../ultils/CurrencyFormat';
import { showUnitAppCurrency } from '../../../../helper/common';
function ModalSuccessOrderChart(props) {
  const { formatMessage: f } = useIntl();
  return (
    <div id={'ModalSuccessOrderChart'}>
      <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
        <div className="modal-success-order-chart">
          <div
            className={'modal-success-order-chart-background'}
            style={{ backgroundImage: `url("${img_orderPlaceSuccess}")` }}
          />

          <div className={'modal-success-order-chart-item'}>
            <p className={'congratulations'}>{f({ id: 'Congratulations' })}</p>
            <p className={'title'}>
              +{currencyFormat(props?.moneyWinLose ? props.moneyWinLose : 0)} {showUnitAppCurrency()}
            </p>
            <p className={'button'} onClick={() => props.setIsOpenModalSuccessOrderChart(false)}>
              {f({ id: 'Continue trading' })}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalSuccessOrderChart;
