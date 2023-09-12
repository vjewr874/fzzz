/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Modal from '../../Modal';
import './styles/ModalNewNotification.scss';
import icClose from './../../../../assets/stock-icons/ic-closeSquare.svg';
import img from '../../../../assets/new-images/img-detail.png';
import { useIntl } from 'react-intl';

function ModalNewNotification(props) {
  const { formatMessage: f } = useIntl();
  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'ModalHallOrderSale'}>
        <div className="ModalHallOrderSale">
          <div className="ModalHallOrderSale-header">
            <div className="left" />
            <span>{f({ id: 'Latest announcements' })}</span>
            <img src={icClose} alt="" onClick={() => props?.handleCloseModalNotification()} />
          </div>

          <div className="ModalHallOrderSale-content">
            <div className="cover-content" style={{ width: '100%' }}>
              {props?.dataNewNotification[0]?.groupCustomerMessageImage && (
                <img
                  alt={''}
                  src={props?.dataNewNotification[0]?.groupCustomerMessageImage}
                  className={'details-img background-image'}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover',
                    marginBottom: '16px',
                  }}
                />
              )}

              <p className="content" style={{ marginBottom: '12px' }}>
                {props?.dataNewNotification && props?.dataNewNotification[0]?.groupCustomerMessageTitle}
              </p>

              <p
                className="content"
                dangerouslySetInnerHTML={{
                  __html: props?.dataNewNotification && props?.dataNewNotification[0]?.groupCustomerMessageContent,
                }}
              ></p>
            </div>
            {/* <div className="ModalHallOrderSale-btn">
              <span className="btnSale-item cancel" onClick={() => props?.setIsOpenModalNotification(false)}>
                Huỷ
              </span>
              <button className="btnSale-item sale" onClick={() => history.push(routes.notification.path)}>
                Tất cả
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalNewNotification;
