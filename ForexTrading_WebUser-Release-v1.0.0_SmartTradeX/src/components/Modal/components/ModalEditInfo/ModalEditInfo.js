/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import './styles/modal-edit-info.scss';
import Modal from '../../Modal';
import './styles/modal-edit-info.scss';

//images
import imPopup from '../../../../assets/new-images/im-popup-change.png';
import { handleInput } from 'concurrently/src/defaults';
function ModalEditInfo(props) {
  const [valueHTML, setValueHTML] = useState('');
  useEffect(() => {
    if (props.valueInnerHTML == null) {
      setValueHTML('');
    } else {
      setValueHTML(props.valueInnerHTML);
    }
  }, [props.valueInnerHTML]);
  function handleChange(e) {}
  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'modal-edit-info'}>
        <div className={'container-modal__info'}>
          <div
            className={'banner background-image'}
            style={{ backgroundImage: `url('${imPopup}'), linear-gradient(0deg, #189E51 8.33%, #42C178 92.5%)` }}
          />
          <div className={'container-input'}>
            <p className={'title'}>{props?.title}</p>
            {/*<input type={`${((props.name === "identity")||(props.name === "numberOfBankAccount"))? "number":"text"}`} placeholder={props?.placeholder} className={'input-content'}  onChange={(e)=>(setValueHTML(e.target.value), handleChange)} onKeyDown={(evt) => props.name === 'identity' ? ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault() : ''} value={valueHTML}/>*/}
            <input
              type={`${props.name === 'identity' ? 'number' : 'text'}`}
              placeholder={props?.placeholder}
              className={'input-content'}
              onChange={e => (setValueHTML(e.target.value), handleChange)}
              onKeyDown={evt =>
                props.name === 'identity' ? ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault() : ''
              }
              value={valueHTML}
            />
          </div>

          <div className={'container-btn'}>
            <div className={'btn-action btn-action__cancel'} onClick={() => props?.closeDrawer()}>
              Hủy
            </div>
            <div className={'line'} />
            <div
              className={'btn-action btn-action__accept'}
              onClick={() => {
                props.updateInfoUser(valueHTML);
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
export default ModalEditInfo;
