/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect } from 'react';
import { Button, Modal, Tabs } from 'antd';
import BetNumberPopup from './betNumberPopup';
import { number_to_price, getBalanceByWalletType } from 'helper/common';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import BetRecordsService from '../../services/betRecordsService';
const { TabPane } = Tabs;

function ModalBet(props) {
  const {
    isModalVisible,
    setIsModalVisible,
    setKeyActive,
    keyActive,
    betRecordAmountIn,
    setBetRecordAmountIn,
    betRecordValue,
    setBetRecordValue,
    betRecordAmount,
    setBetRecordAmount,
    indexActive,
    gameRecordSection,
  } = props;
  const { wallets } = useSelector(state => state.member || {});
  function handleRenderBetRecordType() {
    if (indexActive === 1) {
      return '5D3';
    } else if (indexActive === 2) {
      return '5D5';
    } else if (indexActive === 3) {
      return '5D10';
    } else {
      return '5D1';
    }
  }

  async function handleBetRecord() {
    const data = {
      betRecordAmountIn: betRecordAmount * betRecordAmountIn,
      sectionName: gameRecordSection,
      betRecordType: handleRenderBetRecordType(),
    };
    const arrayPromise = [];
    betRecordValue.forEach(val => {
      const newData = {
        ...data,
        betRecordValue: `${keyActive};${val}`,
      };
      arrayPromise.push(BetRecordsService.placeRecord(newData));
    });
    const arrayResut = await Promise.all(arrayPromise);
    let check = true;
    arrayResut.forEach(item => {
      if (!item.isSuccess) {
        check = false;
      }
    });
    if (check) {
      swal('Đặt mua thành công', {
        icon: 'success',
      });
    } else {
      swal('Đặt mua thất bại', {
        icon: 'warning',
      });
    }
    setIsModalVisible(false);
    setBetRecordAmount(1);
    setBetRecordAmountIn(1000);
    setBetRecordValue([]);
  }

  return (
    <>
      <Modal closable={false} className="game5D__model" visible={isModalVisible} footer={null}>
        <div style={{ height: '100%' }} className="d-flex align-item-center flex-column">
          <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
            <Tabs
              onChange={key => {
                setKeyActive(key);
                setBetRecordValue([]);
              }}
              activeKey={keyActive}
              className="game5D__tab"
            >
              <TabPane tab="A" key="A">
                <BetNumberPopup
                  betRecordAmountIn={betRecordAmountIn}
                  setBetRecordAmountIn={setBetRecordAmountIn}
                  betRecordValue={betRecordValue}
                  setBetRecordValue={setBetRecordValue}
                  betRecordAmount={betRecordAmount}
                  setBetRecordAmount={setBetRecordAmount}
                />
              </TabPane>
              <TabPane tab="B" key="B">
                <BetNumberPopup
                  betRecordAmountIn={betRecordAmountIn}
                  setBetRecordAmountIn={setBetRecordAmountIn}
                  betRecordValue={betRecordValue}
                  setBetRecordValue={setBetRecordValue}
                  betRecordAmount={betRecordAmount}
                  setBetRecordAmount={setBetRecordAmount}
                />
              </TabPane>
              <TabPane tab="C" key="C">
                <BetNumberPopup
                  betRecordAmountIn={betRecordAmountIn}
                  setBetRecordAmountIn={setBetRecordAmountIn}
                  betRecordValue={betRecordValue}
                  setBetRecordValue={setBetRecordValue}
                  betRecordAmount={betRecordAmount}
                  setBetRecordAmount={setBetRecordAmount}
                />
              </TabPane>
              <TabPane tab="D" key="D">
                <BetNumberPopup
                  betRecordAmountIn={betRecordAmountIn}
                  setBetRecordAmountIn={setBetRecordAmountIn}
                  betRecordValue={betRecordValue}
                  setBetRecordValue={setBetRecordValue}
                  betRecordAmount={betRecordAmount}
                  setBetRecordAmount={setBetRecordAmount}
                />
              </TabPane>
              <TabPane tab="E" key="E">
                <BetNumberPopup
                  betRecordAmountIn={betRecordAmountIn}
                  setBetRecordAmountIn={setBetRecordAmountIn}
                  betRecordValue={betRecordValue}
                  setBetRecordValue={setBetRecordValue}
                  betRecordAmount={betRecordAmount}
                  setBetRecordAmount={setBetRecordAmount}
                />
              </TabPane>
              <TabPane tab="Tổng" key="TONG">
                <BetNumberPopup
                  betRecordAmountIn={betRecordAmountIn}
                  setBetRecordAmountIn={setBetRecordAmountIn}
                  betRecordValue={betRecordValue}
                  setBetRecordValue={setBetRecordValue}
                  betRecordAmount={betRecordAmount}
                  setBetRecordAmount={setBetRecordAmount}
                  isHidden={true}
                />
              </TabPane>
            </Tabs>
          </div>
          <div className="d-flex align-items-center mt-4 justify-content-center mt-auto">
            <div
              onClick={() => {
                setIsModalVisible(false);
                setBetRecordAmount(1);
                setBetRecordAmountIn(1000);
                setBetRecordValue([]);
              }}
              className="game5D__cancel"
            >
              Huỷ
            </div>
            <div
              onClick={() => {
                if (!betRecordValue.length) {
                  swal('Vui lòng chọn mua', {
                    icon: 'warning',
                  });
                  setIsModalVisible(false);
                } else if (
                  wallets &&
                  wallets.length > 0 &&
                  getBalanceByWalletType(wallets, 'PointWallet') <
                    betRecordAmount * betRecordAmountIn * betRecordValue.length
                ) {
                  swal('Tổng số tiền vượt quá số dư cho phép', {
                    icon: 'warning',
                  });
                } else {
                  handleBetRecord();
                }
              }}
              className="w-100 game5D__total"
            >
              Tổng số tiền {number_to_price(betRecordAmount * betRecordAmountIn * betRecordValue.length)} đ
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalBet;
