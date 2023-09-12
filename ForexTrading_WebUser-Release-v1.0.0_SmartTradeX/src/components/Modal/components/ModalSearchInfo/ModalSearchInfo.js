/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';
import './styles/modal-search-info.scss';

function ModalSearchInfo(props) {
  const [search, setSearch] = useState('');
  function handleChangeSearch(e) {
    setSearch(e?.target?.value);
  }

  useEffect(() => {
    setSearch(props?.productTitle || '');
  }, [props?.productTitle]);
  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'modal-edit-info'}>
        <div className={'container-modal__info'}>
          <div className={'modal__header'}>TÌM SỐ NHANH</div>
          <div className={'container-input'}>
            <p className={'title'}>{props?.title}</p>
            <input
              type="number"
              value={search}
              placeholder={props?.placeholder}
              className={'input-content'}
              onChange={handleChangeSearch}
            />
          </div>
          <div className={'container-btn'}>
            <div
              className={'btn-action btn-action__cancel'}
              onClick={() => {
                props.closeDrawer();
                setSearch(props.productTitle || '');
              }}
            >
              Hủy
            </div>
            <div className={'line'} />
            <div
              className={'btn-action btn-action__accept'}
              onClick={() => {
                props.handleSearch(search);
                setSearch('');
              }}
            >
              Xác nhận
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalSearchInfo;
