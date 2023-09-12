/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import Modal from '../../Modal';
import './styles/ModalCustomerService.scss';
import icClose from './../../../../assets/stock-icons/ic-closeSquare.svg';
import { useHistory } from 'react-router-dom';
import { routes } from 'App';
import { useIntl } from 'react-intl';
function ModalCustomerService(props) {
  const { formatMessage: f } = useIntl();
  const history = useHistory();

  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'ModalService'}>
        <div className="ModalHallOrderSale">
          <div className="ModalHallOrderSale-header">
            <div className="left" />
            <span>{props?.title}</span>
            <img src={icClose} alt="" onClick={() => props.setIsOpenModalCustomerService(false)} />
          </div>

          <div className="ModalHallOrderSale-content">
            <div className="cover-content">
              {/* <p className="content">Hiện tại chức năng này đang trong quá trình nâng cấp.</p> */}
              <p className="content">
                {props?.message ? props?.message : f({ id: 'Please contact customer service for assistance' })}
              </p>
            </div>
            <div className="ModalHallOrderSale-btn">
              {/* <span className="btnSale-item cancel" onClick={() => props?.setIsOpenModalCustomerService(false)}>
                Huỷ
              </span> */}
              <button className="btnSale-item sale" onClick={() => history.push(routes.customerService.path)}>
                {f({ id: 'Contact' })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalCustomerService;
