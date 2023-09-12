/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Form } from 'antd';
import Header from 'components/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { simpleCopyToClipboard } from 'helper/common';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { number_to_price, getBalanceByWalletType } from '../../helper/common';
import PaymentDepositTransaction from './../../services/paymentDepositTransaction';
import PaymentMethod from './../../services/paymentMethod';
import { routes } from './../../App';
import { Input, Pagination, Collapse } from 'antd';
import { IconArrowUp, IconCopy } from '../../assets/icons/index';
const { Panel } = Collapse;
function ProFile(props) {
  const { wallets = [] } = useSelector(state => (state.member ? state.member : {}));
  const [listBank, setListBank] = useState({ total: 0, data: [] });
  const history = useHistory();
  const [amount, setamount] = useState(0);

  function onFinish() {
    if (amount > 0) {
      PaymentDepositTransaction.requestDeposit({
        paymentAmount: amount,
      }).then(result => {
        const { isSuccess, message } = result;

        if (!isSuccess) {
          swal('Nạp tiền thất bại', {
            icon: 'warning',
          });

          return;
        } else {
          swal('Nạp thành công', {
            icon: 'success',
          });
          setamount(null);
        }
      });
    } else {
      swal('Số tiền nạp phải lớn hơn 0 ', {
        icon: 'warning',
      });
    }
  }

  function getListBank(filter) {
    PaymentMethod.getList(filter).then(result => {
      const { isSuccess, data } = result;

      if (!isSuccess || !data) {
        return;
      } else {
        setListBank(data);
      }
    });
  }

  useEffect(() => {
    getListBank({});
  }, []);

  return (
    <div className="recharge pt-0 overflow-hidden position-relative pb-5">
      <Header
        title={'Nạp tiền'}
        goBack={() => history.goBack()}
        headerRight={
          <img
            alt="test"
            className="pointer icon_audio"
            onClick={() => {
              history.push(routes.managementProfileCustomer.path);
            }}
            src="/assets/images/audio.png"
          />
        }
      />
      <div className="balance">
        <div className="ic-title">
          <img alt="test" src={require('../../assets/icons/ic_wallet.svg')} className="ic-wallet" />
          <div className="total">Tổng tiền</div>
        </div>
        <div className="money">{number_to_price(wallets ? getBalanceByWalletType(wallets, 'PointWallet') : 0)} VNĐ</div>
      </div>

      <div className="balance">
        <div className="ic-title">
          <img alt="test" src={require('../../assets/icons/ic_bankCard.svg')} className="ic-wallet" />
          <div className="payment-method">Phương thức thanh toán</div>
        </div>

        <div className="row-center">
          <input checked={true} className="radio pointer" type={'radio'} />
          <div className="method">Chuyển khoản</div>
        </div>
      </div>

      <div className="balance" style={{ marginTop: 40 }}>
        <div className="ic-title">
          <img alt="test" src={require('../../assets/icons/ic_bank.svg')} className="ic-wallet" />
          <div className="payment-method">Lựa chọn ngân hàng</div>
        </div>
        <div>
          {/* {
            listBank?.data?.length > 0 && listBank?.data?.map(item => (
              <div className='row-center'>
                <input className='radio pointer' type={'radio'} />
                <div className='method'>{item.paymentMethodReferName}</div>
              </div>
            ))
          } */}
          {listBank?.total ? (
            <Collapse
              expandIconPosition="right"
              expandIcon={({ isActive }) => (
                <IconArrowUp className={!isActive ? 'factory__up-arrow' : ''} rotate={isActive ? 90 : 0} />
              )}
              defaultActiveKey={['0']}
            >
              {listBank?.data?.map((item, index) => (
                <Panel header={item.paymentMethodReferName} key={`${index}`}>
                  <div
                    onClick={() => {
                      simpleCopyToClipboard(item?.paymentMethodIdentityNumber);
                    }}
                    className="d-flex align-items-center payment-method__text pointer"
                  >
                    <div>Số tài khoản</div>
                    <strong className="ms-auto">
                      {item.paymentMethodIdentityNumber}
                      <IconCopy className="ms-2" />
                    </strong>
                  </div>

                  <div
                    onClick={() => {
                      simpleCopyToClipboard(item?.paymentMethodReceiverName);
                    }}
                    className="d-flex align-items-center payment-method__text pointer"
                  >
                    <div>Chủ tài khoản</div>
                    <strong className="ms-auto">
                      {item.paymentMethodReceiverName}
                      <IconCopy className="ms-2" />
                    </strong>
                  </div>
                </Panel>
              ))}
            </Collapse>
          ) : (
            <div className="ms-2 mt-3">Không có dữ liệu.</div>
          )}
        </div>
      </div>

      <div className="balance" style={{ marginTop: 40 }}>
        <div className="ic-title">
          <img alt="test" src={require('../../assets/icons/ic_wallet_black.svg')} className="ic-wallet" />
          <div className="payment-method">Số tiền nạp</div>
        </div>
        <div className="input">
          <Input
            type={'number'}
            onChange={e => setamount(e.target.value)}
            value={amount}
            placeholder="Vui lòng nhập số tiền nạp"
            bordered={false}
          />
        </div>
        <div className="note">
          *Nếu quý khách chuyển sai sô tiền đã tạo lệnh, khoản tiền bị trừ bị thất thoát công ty chúng tôi sẽ không chịu
          trách nhiệm
        </div>
      </div>
      <button onClick={() => onFinish()} className="recharge-button mb-2">
        Nạp tiền
      </button>
      {/* {

        listBank?.data.length > 0 && listBank?.data?.map(item => (
          <div className='info m-2 '>
            <div className='row-between'>
              <div className='info-title'>Số tài khoản</div>
              <div className='info-value'>{item.paymentMethodIdentityNumber}</div>
            </div>

            <div className='row-between' styles={{ marginTop: 26, marginBottom: 26 }}>
              <div className='info-title'>Ngân hàng</div>
              <div className='info-value'>{item.paymentMethodReferName}</div>
            </div>
            <div className='row-between'>
              <div className='info-title'>Chủ tài khoản</div>
              <div className='info-value'>{item.paymentMethodReceiverName}</div>
            </div>
          </div>
        ))
      } */}
    </div>
  );
}
export default ProFile;
