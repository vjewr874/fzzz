/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import Modal from '../../Modal';
import './styles/modalHallOrderSale.scss';
import icClose from './../../../../assets/stock-icons/ic-closeSquare.svg';
import { Form, Input, InputNumber } from 'antd';
import currencyFormat from 'ultils/CurrencyFormat';
import { useUser } from '../../../../context/UserContext';
import swal from 'sweetalert';
import { useIntl } from 'react-intl';

function ModalHallOrderSale(props) {
  const { formatMessage: f } = useIntl();
  const { closeDrawer } = props;
  const [form] = Form.useForm();
  const [saleAmount, setSaleAmount] = useState(0);
  const { user } = useUser();
  const walletBalance = user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance;

  function onFinish() {
    const amountNumber = saleAmount;
    if (walletBalance < amountNumber) {
      swal(f({ id: 'The amount of input is greater than the money in the wallet' }), {
        icon: 'warning',
      });
      return;
    }
    if (amountNumber < props?.dataToSaleUSDT?.minOrderItemQuantity) {
      swal(f({ id: 'Not within the allowable amount' }), {
        icon: 'warning',
      });
      return;
    }
    const param = {
      productOrderId: props?.dataToSaleUSDT?.productOrderId,
      amount: parseFloat(amountNumber),
    };
    props.handleHallOrderSaleUSDT(param);
    setSaleAmount(0);
    form.resetFields();
    props.setIsOpenModalSale(false);
  }
  function handleClose() {
    setSaleAmount(0);
    closeDrawer();
  }
  return (
    <Modal status={props?.status} closeDrawer={() => handleClose()}>
      <div id={'ModalHallOrderSale'}>
        <div className="ModalHallOrderSale">
          <div className="ModalHallOrderSale-header">
            <div className="left" />
            <span>{f({ id: 'Sold out' })} USDT</span>
            <img src={icClose} alt="" onClick={() => handleClose()} />
          </div>

          <div className="ModalHallOrderSale-content">
            <Form
              name="withdraw"
              autoComplete="off"
              form={form}
              onFinish={values => {
                onFinish(values);
              }}
            >
              <Form.Item
                name="saleUSDT"
                rules={[
                  {
                    required: true,
                    message: f({ id: 'Please enter the amount of USDT' }),
                  },
                  () => ({
                    validator(_, value) {
                      const amountNumber = parseFloat(value?.replaceAll(',', ''));
                      if ((amountNumber <= 0 || isNaN(amountNumber)) && value !== '') {
                        return Promise.reject(new Error(f({ id: 'Number greater than 0' })));
                      }
                      if (
                        amountNumber < props?.dataToSaleUSDT?.minOrderItemQuantity ||
                        amountNumber > props?.dataToSaleUSDT?.maxOrderItemQuantity
                      ) {
                        return Promise.reject(new Error(f({ id: 'Amount entered is not in the amount' })));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                className={'mb-0'}
              >
                <div className="cover-input">
                  <span className="name">{f({ id: 'Sold out' })} (USDT)</span>
                  <InputNumber
                    className="input"
                    placeholder={f({ id: 'Enter the amount you want to sell' })}
                    value={saleAmount}
                    onChange={e => {
                      const amountNumber = e?.toFixed(2);
                      setSaleAmount(parseFloat(amountNumber));
                    }}
                    formatter={value => `${value}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                  <div className="bar" />
                  <span className="changeVND">
                    ~
                    {currencyFormat(
                      parseInt(saleAmount) *
                        (props?.dataToSaleUSDT?.productOrderItems[0]
                          ? props?.dataToSaleUSDT?.productOrderItems[0]?.orderItemPrice
                          : props?.system?.exchangeVNDPrice) || 0,
                    )}{' '}
                    VND
                  </span>
                </div>
              </Form.Item>
              <div className="ModalHallOrderSale-btn">
                <span className="btnSale-item cancel" onClick={() => handleClose()}>
                  {f({ id: 'Cancel' })}
                </span>
                <button className="btnSale-item sale">{f({ id: 'Sell' })}</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalHallOrderSale;
