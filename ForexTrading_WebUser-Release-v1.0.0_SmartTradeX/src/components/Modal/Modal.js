/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import './styles/modal.scss';
import React, { useRef } from 'react';

function Modal(props) {
  const modal = useRef();
  const overlayClickHandler = e => {
    if (e.target === modal.current) {
      props.closeDrawer();
    }
  };
  return (
    <div
      className={`modal ${props.status === true ? 'show' : ''} ${props.className || ''} `}
      onClick={overlayClickHandler}
      ref={modal}
    >
      {props.status}
      <div className={`modal-container`}>{props.children}</div>
    </div>
  );
}
export default Modal;
