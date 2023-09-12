/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Modal from '../../Modal';
import './styles/modal-payment-success.scss';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../../App';

//images
import imPopup from '../../../../assets/new-images/im-popup-payment.png';

function ModalPaymentSuccess(props) {
  const history = useHistory();

  return (
    <Modal status={props?.status} closeDrawer={() => props.closeDrawer()}>
      <div id={'modal-payment-success'}>
        <div className={'container-modal__payment'}>
          <div className={'container-image'}>
            <div className={'background-image image'} style={{ backgroundImage: `url('${imPopup}')` }} />
          </div>
          <h3 className={'title'}>Vé của bạn đã được đặt</h3>
          <p className={'content'}>Kết quả vé dò sẽ được thông báo tới bạn khi kì xổ số kết thúc. Chúc bạn may mắn!!</p>
          <div className={'container-btn'}>
            <button className={'btn btn-red w-100'} onClick={() => history.push(routes.buyLottery.path)}>
              Mua thêm số
            </button>
          </div>
          <div className={'container-btn'}>
            <button className={'btn btn-outline-main btn-action'} onClick={() => history.push(routes.home.path)}>
              Trang chủ
            </button>
            <button
              className={'btn btn-outline-main btn-action'}
              onClick={() => history.push(routes.bookingHistory.path)}
            >
              Vé đã mua
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalPaymentSuccess;
