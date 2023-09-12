/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Modal from '../../Modal';
import './styles/ModalConfirmDelete.scss';
import icClose from './../../../../assets/stock-icons/ic-closeSquare.svg';
import { useIntl } from 'react-intl';

function ModalConfirmDelete(props) {
  const { formatMessage: f } = useIntl();

  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'ModalHallOrderSale'}>
        <div className="ModalHallOrderSale">
          <div className="ModalHallOrderSale-header">
            <div className="left" />
            <span>{f({ id: 'Delete notification' })}</span>
            <img src={icClose} alt="" onClick={() => props.setIsOpenModalDelete(false)} />
          </div>

          <div className="ModalHallOrderSale-content">
            <div className="cover-content">
              <p className="content" style={{ textAlign: 'center' }}>
                {f({ id: 'Are you sure you want to remove this notification?' })}
              </p>
            </div>
            <div className="ModalHallOrderSale-btn">
              <span className="btnSale-item cancel" onClick={() => props?.setIsOpenModalDelete(false)}>
                {f({ id: 'Cancel' })}
              </span>
              <button className="btnSale-item sale" onClick={() => props?.deleteNotificationById()}>
                {f({ id: 'Delete' })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalConfirmDelete;
