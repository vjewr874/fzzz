/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './styles/modal-otp.scss';
import { Button, Form, Input } from 'antd';
//icon
import icBack from '../../../../assets/new-icons/ic-arow-left.svg';
import icCalling from '../../../../assets/new-icons/ic-calling.svg';
import icKey from '../../../../assets/new-icons/ic-key.svg';
import Countdown from 'react-countdown';

function ModalOTP(props) {
  const [form] = Form.useForm();
  function onFinish(values) {
    handleConfirmOTP(values);
  }
  function handleConfirmOTP(values) {
    values = form.getFieldsValue();
    props.confirmOTP(values);
  }
  function renderCountdown({ minutes, seconds, completed }) {
    if (completed) {
      return <span>00:00</span>;
    } else {
      return (
        <span>
          {' '}
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} Giây
        </span>
      );
    }
  }
  return (
    <div id={'otp'} className={`container-otp ${props?.isOpen ? 'show' : ''}`}>
      <div className={'container-header'}>
        <div className={'container-item__left'}>
          <div
            className={'background-image icon-back'}
            style={{ backgroundImage: `url('${icBack}')` }}
            onClick={() => props?.closeOTP()}
          />
        </div>
        <div className={'container-item__center'}>Xác thực SĐT</div>
        <div className={'icon-back'} />
      </div>
      <div className={'container-otp__detail'}>
        <div className={'container-detail'}>
          <p className={'content'}>
            OTP đã được gửi tới số điện thoại đăng kí.
            <br />
            Vui lòng nhập lại vào ô dưới đây
          </p>
          <img src={icCalling} alt="" width={140} height={140} style={{ marginBottom: '20px' }} />
          <Form
            name="otp"
            autoComplete="off"
            form={form}
            onFinish={values => {
              onFinish(values);
            }}
          >
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: 'mã xác thực không được để trống',
                },
                {
                  max: 6,
                  message: 'Không được nhập quá 6 kí tự',
                },
              ]}
            >
              <div className="container-input">
                <div className="login__input__icon-phone position-absolute">
                  <img src={icKey} alt="icon-phone" className="position-static" width={14} />
                </div>
                <Input className="input" placeholder={'Nhập mã xác thực'} type="number" size="large" maxLength={6} />
              </div>
            </Form.Item>
            <p className={'time'}>
              Thời gian còn lại:
              <Countdown
                date={props.date || Date.now() + 180000}
                intervalDelay={0}
                precision={3}
                renderer={renderCountdown}
              />
            </p>
            <div className="w-100 d-flex justify-content-center">
              <Button className="btn-main w-100" htmlType="submit" size="large">
                Xác nhận
              </Button>
            </div>
            <p className={'opt-content'}>
              Bạn không nhận được OTP? <span onClick={props.sendOTP}>Gửi lại ngay</span>
            </p>
            <div className={'line'} />
            <p className={'contact'}>
              Hoặc vui lòng gọi hotline 1800 1111 <br /> để được hỗ trợ
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ModalOTP;
