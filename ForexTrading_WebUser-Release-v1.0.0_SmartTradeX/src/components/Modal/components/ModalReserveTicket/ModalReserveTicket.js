/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import Modal from '../../Modal';
import './style/ModalReserveTicket.scss';
import icClose from './../../../../assets/stock-icons/ic-closeSquare.svg';
import { useIntl } from 'react-intl';
import ic_clockRed from '../../../../assets/stock-icons/ic-clock-red.svg';
import { Form, InputNumber } from 'antd';
import { useUser } from 'context/UserContext';
import { currencyFormatUSD } from 'ultils/CurrencyFormat';
import swal from 'sweetalert';
import { COIN_LIST } from '../../../../constants/listCoin';
import { showUnitAppCurrency } from '../../../../helper/common';

function ModalReserveTicket(props) {
  const { formatMessage: f } = useIntl();
  const [form] = Form.useForm();
  const [enterNumberAmount, setenterNumberAmount] = useState(0);
  const user = useUser().user;

  const valueClickChange = [
    {
      label: '20k',
      value: 20000,
    },
    {
      label: '50k',
      value: 50000,
    },
    {
      label: '100k',
      value: 100000,
    },
    {
      label: '200k',
      value: 200000,
    },
    {
      label: '300k',
      value: 300000,
    },
    {
      label: '500k',
      value: 500000,
    },
    // {
    //   label: '10,000',
    //   value: 10000,
    // },
    // {
    //   label: '20,000',
    //   value: 20000,
    // },
    // {
    //   label: '50,000',
    //   value: 50000,
    // },
    // {
    //   label: '100,000',
    //   value: 100000,
    // },
  ];

  function onFinish(values) {
    if (enterNumberAmount > user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance) {
      swal(f({ id: 'NOT_ENOUGH_BALANCE' }), {
        icon: 'warning',
      });
      return;
    }
    const params = {
      appUserId: user.appUserId,
      betRecordAmountIn: enterNumberAmount,
      betRecordType: props.typeChooseModal === 'increase' ? 'BetUp' : 'BetDown',
      betRecordUnit: handleChangeTypeCoin(props?.pair),
    };
    props.handleApiPlaceRecord(params);
    form.setFieldsValue({
      amount: 0,
    });
    setenterNumberAmount(0);
  }
  function handleChangeTypeCoin(nameCoin) {
    const coin = COIN_LIST.find(item => item?.symbol === nameCoin);
    if (coin && coin?.type_coin) {
      return coin?.type_coin;
    } else return '';
  }
  return (
    <Modal status={props?.status} closeDrawer={() => props?.closeDrawer()}>
      <div id={'ModalReserveTicket'}>
        <div className="ModalReserveTicket">
          <div className="ModalReserveTicket-header">
            <div className="left" />
            <span>{f({ id: 'Reserve Ticket' })}</span>
            <img
              src={icClose}
              alt=""
              onClick={() => {
                props?.handleCloseModalReserveTicket();
                setenterNumberAmount(0);
              }}
            />
          </div>

          <div className="ModalReserveTicket-content">
            <div className={'yourChoose'}>
              <span className={'action'}>{f({ id: 'You are' })}</span>
              <span className={`choose ${props.typeChooseModal === 'increase' ? 'basicColor' : 'warnColor'}`}>
                {`${f({ id: 'Choosing' })} ${f({
                  id: props.typeChooseModal === 'increase' ? 'Increase' : 'Decrease',
                })}`}
              </span>
            </div>
            <div className={'enterMoney'}>
              <div className={'countDown'}>
                <div className={'number'}>
                  <img src={ic_clockRed} alt="" />
                  <span>
                    {f({ id: 'Countdown' })}: {props.countdown}s
                  </span>
                </div>
                <span className={'period'}>
                  {f({ id: 'Period' })} {props?.periodCode}
                </span>
              </div>
              <Form
                name="reserveTicket_input"
                autoComplete="off"
                form={form}
                onFinish={values => {
                  onFinish(values);
                }}
              >
                <div className={'enterAmount'}>
                  <Form.Item
                    name="amount"
                    className={'mb-0'}
                    rules={[
                      {
                        required: true,
                        message: f({ id: 'Please enter the amount' }),
                      },
                      () => ({
                        validator(_, value) {
                          value = value?.toString();
                          const amountNumber = parseFloat(value?.replaceAll(',', ''))?.toFixed(2);
                          if (parseFloat(amountNumber) < 1 || (isNaN(amountNumber) && value !== '')) {
                            return Promise.reject(new Error(f({ id: 'Minimum amount: 1' })));
                          }
                          if (parseFloat(amountNumber) > 500000000) {
                            return Promise.reject(new Error(`${f({ id: 'Maximum amount' })}: 500,000,000`));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <div>
                      {/* <Input
                      className={'input'}
                      size="large"
                      placeholder={f({ id: 'Enter the amount' })}
                      type={'number'}
                    /> */}
                      <InputNumber
                        className={'input'}
                        placeholder={f({ id: 'Enter the amount' })}
                        formatter={value => `${value}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        value={enterNumberAmount}
                        onChange={e => {
                          const amountNumber = e?.toFixed(2);
                          setenterNumberAmount(parseFloat(amountNumber));
                        }}
                      />
                    </div>
                  </Form.Item>
                </div>
                <div className={'autoChange'}>
                  <div
                    className={'autoChange-item'}
                    onClick={() => {
                      form.setFieldsValue({
                        amount: user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance,
                      });
                      setenterNumberAmount(user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance);
                    }}
                  >
                    <span>+{f({ id: 'Total' })}</span>
                  </div>
                  {valueClickChange.map((item, index) => (
                    <div
                      key={index}
                      className={'autoChange-item'}
                      onClick={() => {
                        // const dataInput = form.getFieldValue('amount');
                        form.setFieldsValue({ amount: (enterNumberAmount ? enterNumberAmount : 0) + item.value });
                        setenterNumberAmount((enterNumberAmount ? enterNumberAmount : 0) + item.value);
                      }}
                    >
                      <span>+{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className={'btnReserveTicket'}>
                  <span className={'balance'}>
                    {f({ id: 'Available balances' })} {showUnitAppCurrency()}:{' '}
                    {currencyFormatUSD(user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance)}
                  </span>
                  <div className={'groupBtn'}>
                    <span
                      className={'btnCancel'}
                      onClick={() => {
                        props?.handleCloseModalReserveTicket();
                        setenterNumberAmount(0);
                      }}
                    >
                      {f({ id: 'Cancel' })}
                    </span>
                    <button className={'btnSubmit'}>{f({ id: 'Confirm' })}</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalReserveTicket;
