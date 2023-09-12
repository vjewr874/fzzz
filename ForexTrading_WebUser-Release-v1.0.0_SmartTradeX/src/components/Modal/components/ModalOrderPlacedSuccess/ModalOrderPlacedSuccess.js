/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import Modal from '../../Modal';
import './styles/ModalOrderPlacedSuccess.scss';
import { useIntl } from 'react-intl';
import img_orderPlaceSuccess from '../../../../assets/stock-images/img-orderPlaceSuccess.png';
function ModalOrderPlacedSuccess(props) {
  const { formatMessage: f } = useIntl();
  return (
    <div id={'ModalOrderPlacedSuccess'}>
      <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
        <div className="ModalOrderPlacedSuccess">
          <div
            className={'ModalOrderPlacedSuccess-background'}
            style={{ backgroundImage: `url("${img_orderPlaceSuccess}")` }}
          />

          <div className={'ModalOrderPlacedSuccess-item'}>
            <p className={'title'}>{f({ id: 'Order placed successfully' })}</p>
            <p className={'button'} onClick={() => props.setIsOpenModalOrderPlacedSuccess(false)}>
              {f({ id: 'Continue trading' })}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalOrderPlacedSuccess;
