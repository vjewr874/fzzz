/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import swal from 'sweetalert';
import './qr.scss';

export default function QR(props) {
  const { intl } = props;
  function copyToClipboard(text) {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0);
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    swal('Copy link thành công', {
      icon: 'success',
    });
  }
  return (
    <div className="qr px-3">
      <div className="qr__icon">
        <img src="assets/images/qr.png" alt="qr" />
        <p>{intl.formatMessage({ id: 'save_qr' })}</p>
      </div>
      <div className="qr__action">
        <button
          className="item"
          onClick={() => {
            copyToClipboard('coppyText');
          }}
        >
          {intl.formatMessage({ id: 'copy_qr' })}
        </button>
        <button
          className="item"
          onClick={() => {
            copyToClipboard('coppyText');
          }}
        >
          {intl.formatMessage({ id: 'copy_link' })}
        </button>
      </div>
    </div>
  );
}
