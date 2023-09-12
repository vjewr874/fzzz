/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useRef, useState } from 'react';
import Modal from '../../Modal';
import './styles/ModalRegulations.scss';

function ModalRegulations(props) {
  const modal = useRef();
  const overlayClickHandler = e => {
    if (e.target === modal.current) {
      props.closeDrawer();
    }
  };
  return (
    <Modal status={props?.status} closeDrawer={() => props.closeDrawer()}>
      <div id="modal-regulations">
        <div className="regulations">
          <div className="regulations-title">QUY ĐỊNH VỀ ĐỔI THƯỞNG</div>
          <div className="regulations-content">
            <p>
              Khi vé của Người dùng may mắn trúng thưởng ngoài việc hệ thống của chúng tôi tự động thông báo đến cho bạn
              đồng thời tiền trúng thưởng sẽ được xử lý như sau:
            </p>
            <p>
              - Đối với các giải thưởng từ 10 tỷ đồng trở xuống, chúng tôi sẽ đảm bảo các công tác đổi thưởng theo quy
              định và tạm ứng toàn bộ số tiền trúng thưởng và Tài khoản trả thưởng của Người dùng trên ỨNG DỤNG sau khi
              khấu trừ thuế thu nhập cá nhân.
            </p>
            <p>- Khi Tài khoản trả thưởng vượt quá 200,000 đ</p>
          </div>
          <div className="regulations-close" onClick={overlayClickHandler} ref={modal}>
            Đóng
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalRegulations;
