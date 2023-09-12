/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Modal from '../../Modal';
import './styles/modalImages.scss';
import imgEmpty from '../../../../assets/new-images/img-lottery.png';

function ModalImage(props) {
  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'modal-image'}>
        <img alt={'Ảnh vé số'} src={props?.productImage || imgEmpty} />
      </div>
    </Modal>
  );
}
export default ModalImage;
