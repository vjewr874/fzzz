/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Modal from '../../Modal';
import React from 'react';
import './styles/modal-confirm.scss';

function ModalConfirm(props) {
  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'modal-edit-info'}>
        <div className={'container-modal__info'}>
          <div className={'modal__header'}>Thông báo</div>
          <div className={'container-input'}>
            <p className={'text-center'}>Bạn có chắc muốn {props?.content}</p>
          </div>
          <div className={'container-btn'}>
            <div className={'btn-action btn-action__cancel'} onClick={() => props?.closeDrawer()}>
              Hủy
            </div>
            <div className={'line'} />
            <div className={'btn-action btn-action__accept'} onClick={() => props?.accept()}>
              Xác nhận
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalConfirm;
