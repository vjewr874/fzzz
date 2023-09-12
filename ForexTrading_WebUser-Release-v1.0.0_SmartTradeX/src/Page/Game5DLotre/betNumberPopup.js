/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import { Button, InputNumber, Checkbox, Modal } from 'antd';
import BetNumber from './betNumber';
function BetNumberPopup(props) {
  const {
    isHidden,
    betRecordAmountIn,
    setBetRecordAmountIn,
    betRecordValue,
    setBetRecordValue,
    betRecordAmount,
    setBetRecordAmount,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div>
        <BetNumber
          betRecordAmountIn={betRecordAmountIn}
          setBetRecordAmountIn={setBetRecordAmountIn}
          betRecordValue={betRecordValue}
          setBetRecordValue={setBetRecordValue}
          betRecordAmount={betRecordAmount}
          setBetRecordAmount={setBetRecordAmount}
          isHidden={isHidden}
          isPopup={true}
        />
        <div className="d-flex align-items-center mt-2">
          <div>Số tiền</div>
          <div className="ms-auto">
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmountIn === 1000 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmountIn(1000);
              }}
            >
              1000
            </Button>
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmountIn === 10000 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmountIn(10000);
              }}
            >
              10,000
            </Button>
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmountIn === 100000 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmountIn(100000);
              }}
            >
              100,000
            </Button>
            <Button
              size="small"
              className={`game5D__button-small ${betRecordAmountIn === 1000000 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmountIn(1000000);
              }}
            >
              1,000,000
            </Button>
          </div>
        </div>
        <div className="d-flex align-items-center mt-2">
          <div>Số lượng</div>
          <div className="ms-auto d-flex align-items-center ">
            <Button
              onClick={() => {
                const newBet = betRecordAmount - 1;
                setBetRecordAmount(newBet);
              }}
              disabled={betRecordAmount <= 1}
              size="small"
              className="me-2 game5D__button-small game5D__button-2 game5D__button-small__minus"
            >
              -
            </Button>
            <InputNumber
              onChange={value => {
                setBetRecordAmount(value);
              }}
              className="game5D__input-money me-2 text-center"
              value={betRecordAmount}
            />
            <Button
              onClick={() => {
                const newBet = betRecordAmount + 1;
                setBetRecordAmount(newBet);
              }}
              size="small"
              className="game5D__button-small game5D__button-small__plus "
            >
              +
            </Button>
          </div>
        </div>
        <div className="d-flex align-items-center mt-2">
          <div className="ms-auto">
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmount === 1 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmount(1);
              }}
            >
              x1
            </Button>
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmount === 5 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmount(5);
              }}
            >
              x5
            </Button>
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmount === 10 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmount(10);
              }}
            >
              x10
            </Button>
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmount === 20 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmount(20);
              }}
            >
              x20
            </Button>
            <Button
              size="small"
              className={`me-2 game5D__button-small ${betRecordAmount === 50 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmount(50);
              }}
            >
              x50
            </Button>
            <Button
              size="small"
              className={`game5D__button-small ${betRecordAmount === 100 ? '' : 'game5D__button-2'}`}
              onClick={() => {
                setBetRecordAmount(100);
              }}
            >
              x100
            </Button>
          </div>
        </div>
        <div className="d-flex align-items-center mt-4">
          <Checkbox defaultChecked={true}>Tôi đồng ý </Checkbox>{' '}
          <span
            className="game5D__text__active"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Quy tắc bán trước
          </span>
        </div>
      </div>
      <Modal className="game5D__model game5D__model-2" centered closable={false} visible={isModalVisible} footer={null}>
        <div className="game5D__condition__title" alt="test">
          Quy tắc bán trước
        </div>
        <div className="game5D__condition__content">
          {' '}
          Để bảo vệ quyền - lợi ích hợp pháp của người dùng tham gia bán trước và duy trì trình tự hoạt động bình thường
          của việc bán trước, các quy tắc được xây dựng theo hiệp định phù hợp với các thỏa thuận và quy tắc liên quan
          của luật cũng như quy định quốc gia. Chương 1 Định nghĩa1.1Định nghĩa bán trước: đề cập đến mô hình bán hàng
          trong đó người bán cung cấp gói sản phẩm hoặc dịch vụ để thu thập đơn đặt hàng của người tiêu dùng thông qua
          các công cụ sản phẩm bán trước và cung cấp hàng hóa, dịch vụ cho người bán theo thỏa thuận trước. 1.2Mô hình
          bán trước là mô hình "Ký gửi" . Khoản "Ký gửi" được đề cập đến như một lượng hàng hóa cố định bán trước được
          định sẵn. Khoản "ký gửi" có thể tham gia các trò chơi nhỏ và có cơ hội giành được nhiều lợi nhuận. Khoản tiền
          gửi có thể được trao đổi trực tiếp thành hàng hóa nhưng số tiền ký gửi không được dùng để trao đổi.1.3Sản phẩm
          bán trước: Là các sản phẩm do người bán cung cấp bằng cách sử dụng công cụ sản phẩm bán trước, chỉ các từ bán
          trước được đánh dấu trên tiêu đề hoặc trên trang chi tiết sản phẩm , ngoài ra các sản phẩm khác không sử dụng
          công cụ sản phẩm bán trước không phải là sản phẩm bán trước.1.4 Hệ thống bán trước: Đề cập đến hệ thống công
          cụ sản phẩm được cung cấp để hỗ trợ bán hàng theo mô hình bán trước. 1.5Giá hàng hóa bán trước: là giá của
          hàng hóa trước khi bán. Giá của hàng hóa bán trước bao gồm hai phần: giá bán và thanh toán.{' '}
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            onClick={() => {
              setIsModalVisible(false);
            }}
            className="mt-4"
          >
            Tôi biết
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default BetNumberPopup;
