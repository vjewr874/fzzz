/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import Modal from '../../Modal';
import './styles/ModalFailOrderChart.scss';
import { useIntl } from 'react-intl';
import img_failOrderChart from '../../../../assets/stock-images/img-failOrderChart.png';
import { routes } from '../../../../App';
function ModalFailOrderChart(props) {
  const { formatMessage: f } = useIntl();
  return (
    <div id={'ModalFailOrderChart'}>
      <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
        <div className="ModalFailOrderChart">
          <div
            className={'ModalFailOrderChart-background'}
            style={{ backgroundImage: `url("${img_failOrderChart}")` }}
          />

          <div className={'ModalFailOrderChart-item'}>
            <p className={'title'}>{f({ id: 'Wish you luck next time!!' })}</p>
            <p className={'button'} onClick={() => props.history.push(routes.betRecord.path)}>
              {f({ id: 'See results' })}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalFailOrderChart;
