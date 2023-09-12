/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
function BetNumber(props) {
  const { isHidden, setIsModalVisible, isPopup, betRecordValue, setBetRecordValue } = props;

  function onChangeValue(value) {
    const check = betRecordValue.findIndex(val => val === value) !== -1;
    const newBet = betRecordValue.filter(val => val !== 'LON' && val !== 'NHO' && val !== 'CHAN' && val !== 'LE');
    if (check) {
      const newData = newBet.filter(val => val !== value);
      setBetRecordValue([...newData]);
    } else {
      newBet.push(value);
      setBetRecordValue([...newBet]);
    }
  }

  function onChangeValueRate(value) {
    const check = betRecordValue.findIndex(val => val === value) !== -1;

    if (check) {
      setBetRecordValue([]);
    } else {
      setBetRecordValue([value]);
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-3">
          <div
            onClick={() => {
              onChangeValueRate('LON');
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className={`game5D__bet__button ${
              betRecordValue.findIndex(value => value === 'LON') !== -1 ? 'active-big' : ''
            }`}
          >
            <span>Lớn</span>
            <span className="ms-3">2</span>
          </div>
        </div>
        <div className="col-3">
          <div
            onClick={() => {
              onChangeValueRate('NHO');
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className={`game5D__bet__button ${
              betRecordValue.findIndex(value => value === 'NHO') !== -1 ? 'active-small' : ''
            }`}
          >
            <span>Nhỏ</span>
            <span className="ms-3">2</span>
          </div>
        </div>
        <div className="col-3">
          <div
            onClick={() => {
              onChangeValueRate('LE');
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className={`game5D__bet__button ${
              betRecordValue.findIndex(value => value === 'LE') !== -1 ? 'active-odd' : ''
            }`}
          >
            <span>Lẻ</span>
            <span className="ms-3">2</span>
          </div>
        </div>
        <div className="col-3">
          <div
            onClick={() => {
              onChangeValueRate('CHAN');
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className={`game5D__bet__button ${
              betRecordValue.findIndex(value => value === 'CHAN') !== -1 ? 'active-even' : ''
            }`}
          >
            <span>Chẵn</span>
            <span className="ms-3">2</span>
          </div>
        </div>
      </div>
      {isHidden ? null : (
        <div className="game5D__flex-wrap">
          <div
            onClick={() => {
              onChangeValue(0);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 0) !== -1 ? 'active' : ''}`}
            >
              0
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(1);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 1) !== -1 ? 'active' : ''}`}
            >
              1
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(2);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 2) !== -1 ? 'active' : ''}`}
            >
              2
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(3);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 3) !== -1 ? 'active' : ''}`}
            >
              3
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(4);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 4) !== -1 ? 'active' : ''}`}
            >
              4
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(5);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 5) !== -1 ? 'active' : ''}`}
            >
              5
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(6);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 6) !== -1 ? 'active' : ''}`}
            >
              6
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(7);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 7) !== -1 ? 'active' : ''}`}
            >
              7
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(8);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 8) !== -1 ? 'active' : ''}`}
            >
              8
            </div>
            9
          </div>
          <div
            onClick={() => {
              onChangeValue(9);
              if (!isPopup) {
                setIsModalVisible(true);
              }
            }}
            className="game5D__number__cotent text-center"
          >
            <div
              className={`game5D__number__bet ${betRecordValue.findIndex(value => value === 9) !== -1 ? 'active' : ''}`}
            >
              9
            </div>
            9
          </div>
        </div>
      )}
    </>
  );
}
export default BetNumber;
