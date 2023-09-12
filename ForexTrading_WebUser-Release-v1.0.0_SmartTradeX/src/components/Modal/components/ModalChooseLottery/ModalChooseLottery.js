/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';
import './styles/modal-choose-lottery.scss';
import { InputNumber } from 'antd';
import currencyFormat from '../../../../ultils/CurrencyFormat';

//icons
import icClose from '../../../../assets/new-icons/ic-close.svg';

function ModalChooseLottery(props) {
  const [quantity, setQuantity] = useState(1);
  const [quantityPlus, setQuantityPlus] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(props?.lottery?.price);
  }, [props?.lottery]);

  function handleChangeQuantity(value) {
    if (value <= props?.lottery?.stockQuantity) {
      setQuantity(value);
      getTotalPrice(value);
    } else {
      setQuantity(props?.lottery?.stockQuantity);
      getTotalPrice(props?.lottery?.stockQuantity);
    }
  }
  function handleChangeQuantityPlush() {
    if (quantity + quantityPlus <= props?.lottery?.stockQuantity) {
      setQuantity(quantity + quantityPlus);
      getTotalPrice(quantity + quantityPlus);
    } else {
      setQuantity(props?.lottery?.stockQuantity);
      getTotalPrice(props?.lottery?.stockQuantity);
    }
  }
  function handleAddQuantity(value) {
    if (quantity + value <= props?.lottery?.stockQuantity) {
      setQuantity(quantity + value);
      getTotalPrice(quantity + value);
    } else {
      setQuantity(props?.lottery?.stockQuantity);
      getTotalPrice(props?.lottery?.stockQuantity);
    }
  }
  function handleChangeQuantityReduce() {
    if (quantity - quantityPlus >= 1) {
      setQuantity(quantity - quantityPlus);
      getTotalPrice(quantity - quantityPlus);
    } else {
      setQuantity(1);
      getTotalPrice(1);
    }
  }
  function getTotalPrice(quantity) {
    setTotalPrice(props?.lottery?.price * quantity);
  }
  function handleAccept() {
    const data = {
      productId: props?.lottery?.productId,
      producName: props?.lottery?.producName,
      productType: props?.lottery?.productType,
      productChannel: props?.lottery?.productChannel,
      OrderItemQuantity: quantity,
      OrderItemPrice: props?.lottery?.price,
      totalSinglePrice: totalPrice,
      expireDate: props?.lottery?.expireDate,
      quantity: props?.lottery?.stockQuantity,
    };
    props.handleAccept(data);
    props.closeDrawer();
    dataDefault();
  }
  function dataDefault() {
    setQuantity(1);
    setQuantityPlus(1);
    setTotalPrice(props?.lottery?.price);
  }
  return (
    <Modal
      status={props?.status}
      closeDrawer={() => {
        props.closeDrawer();
        dataDefault();
      }}
    >
      <div id={'modal-choose-lottery'}>
        <div className={'container-modal__choose-lottery'}>
          <div className={'modal__header'}>
            <h3 className={'title'}>Chọn số lượng vé</h3>
            <div
              className={'icon-close background-image'}
              style={{ backgroundImage: `url('${icClose}')` }}
              onClick={() => {
                props.closeDrawer();
                dataDefault();
              }}
            />
          </div>
          <div className={'modal__body'}>
            <div className={'container-info'}>
              <div className={'title'}>Vé số</div>
              <div className={'info__lottery'}>
                <p className={'number'}>{props?.lottery?.producName}</p>
                <p className={'note'}>
                  <span>*</span> là đầu số bạn muốn mua
                </p>
              </div>
            </div>
            <div className={'container-choose-quantity'}>
              <div className={'choose-quantity__item'}>
                <div className={'title'}>Đầu</div>
                <div className={'quantity__number'}>
                  <p className={'number'}>0</p>
                </div>
              </div>
              <div className={'choose-quantity__item'}>
                <div className={'title'}>Số lượng vé</div>
                <div className={'container-input'}>
                  <div className={'btn-input btn-reduce'} onClick={handleChangeQuantityReduce}>
                    -
                  </div>
                  <InputNumber
                    value={quantity}
                    min={1}
                    max={props?.lottery?.stockQuantity}
                    onChange={handleChangeQuantity}
                  />
                  <div className={'btn-input btn-increasing'} onClick={handleChangeQuantityPlush}>
                    +
                  </div>
                </div>
              </div>
              <div className={'choose-quantity__item justify-content-end'}>
                <div
                  className={`btn-quantity ${quantityPlus === 1 ? 'active' : ''}`}
                  onClick={() => {
                    setQuantityPlus(1);
                    handleAddQuantity(1);
                  }}
                >
                  {' '}
                  +1
                </div>
                <div
                  className={`btn-quantity ${quantityPlus === 5 ? 'active' : ''}`}
                  onClick={() => {
                    setQuantityPlus(5);
                    handleAddQuantity(5);
                  }}
                >
                  {' '}
                  +5
                </div>
                <div
                  className={`btn-quantity ${quantityPlus === props?.lottery?.stockQuantity ? 'active' : ''}`}
                  onClick={() => {
                    setQuantityPlus(props?.lottery?.stockQuantity);
                    handleAddQuantity(props?.lottery?.stockQuantity);
                  }}
                >
                  {' '}
                  Chọn tất cả
                </div>
                <p className={'quantity'}>
                  Còn: <span>{props?.lottery?.stockQuantity} vé</span>
                </p>
              </div>
            </div>
            <div className={'container-total-amount'}>
              <p className={'title'}>Giá vé tạm tính</p>
              <p className={'amount'}>{currencyFormat(totalPrice)} đ</p>
            </div>
          </div>
        </div>
        <div className={'container-btn'}>
          <div
            className={'btn-action btn-action__cancel'}
            onClick={() => {
              props.closeDrawer();
              dataDefault();
            }}
          >
            Hủy
          </div>
          <div className={'btn-action btn-action__accept'} onClick={() => handleAccept()}>
            Xác nhận
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ModalChooseLottery;
