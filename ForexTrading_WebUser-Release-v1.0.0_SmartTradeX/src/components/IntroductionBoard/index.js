/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import './introduction-board.scss';
import React from 'react';

export default function IntroductionBoard() {
  const data = [
    {
      level: 'Cấp 0',
      amount: '0',
      turnover: '0',
      money: '0',
    },
    {
      level: 'Cấp 1',
      amount: '10',
      turnover: '1,000,000,000',
      money: '1,000,000,000',
    },
    {
      level: 'Cấp 2',
      amount: '15',
      turnover: '1,500,000,000',
      money: '1,500,000,000',
    },
    {
      level: 'Cấp 3',
      amount: '30',
      turnover: '2,000,000,000',
      money: '2,000,000,000',
    },
    {
      level: 'Cấp 4',
      amount: '45',
      turnover: '2,500,000,000',
      money: '2,500,000,000',
    },
    {
      level: 'Cấp 5',
      amount: '50',
      turnover: '3,000,000,000',
      money: '3,000,000,000',
    },
    {
      level: 'Cấp 6',
      amount: '60',
      turnover: '5,000,000,000',
      money: '5,000,000,000',
    },
  ];
  const data1 = [
    {
      level: 'Cấp 0',
      f1: '0.6%',
      f2: '0.18%',
      f3: '0.18%',
      f4: '0.0162%',
    },
    {
      level: 'Cấp 1',
      f1: '0.7%',
      f2: '0.21%',
      f3: '0.18%',
      f4: '0.0162%',
    },
    {
      level: 'Cấp 2',
      f1: '0.75%',
      f2: '0.225%',
      f3: '0.18%',
      f4: '0.0162%',
    },
    {
      level: 'Cấp 3',
      f1: '0.8%',
      f2: '0.24%',
      f3: '0.18%',
      f4: '0.0162%',
    },
    {
      level: 'Cấp 4',
      f1: '0.85%',
      f2: '0.255%',
      f3: '0.18%',
      f4: '0.0162%',
    },
    {
      level: 'Cấp 5',
      f1: '0.9%',
      f2: '0.27%',
      f3: '0.18%',
      f4: '0.0162%',
    },
    {
      level: 'Cấp 6',
      f1: '1%',
      f2: '0.3%',
      f3: '0.18%',
      f4: '0.0162%',
    },
  ];
  return (
    <div id="introduction-board">
      <div className="introduction">
        <div className="introduction-container">
          <div className="introduction-container-title">Bảng Doanh thu đại lý</div>
          <table>
            <thead>
              <tr className="introduction-container-tr">
                <td>Cấp đại lý</td>
                <td>Số người</td>
                <td>Doanh thu</td>
                <td>Tiền nạp đội</td>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => {
                return (
                  <tr key={index} className="introduction-container-tr1">
                    <td>{value.level}</td>
                    <td>{value.amount}</td>
                    <td>{value.turnover}</td>
                    <td>{value.money}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="introduction">
        <div className="introduction-container">
          <div className="introduction-container-title">Cách tính hoa hồng</div>
          <table>
            <thead>
              <tr className="introduction-container-tr">
                <td>
                  Cấp bậc
                  <br />
                  Tỷ lệ hoàn trả
                </td>
                <td>
                  F1
                  <br />
                  doanh thu
                </td>
                <td>
                  F2
                  <br />
                  doanh thu
                </td>
                <td>
                  F3
                  <br />
                  doanh thu
                </td>
                <td>
                  F4
                  <br />
                  doanh thu
                </td>
              </tr>
            </thead>
            <tbody>
              {data1.map((value, index) => {
                return (
                  <tr key={index} className="introduction-container-tr1">
                    <td>{value.level}</td>
                    <td>{value.f1}</td>
                    <td>{value.f2}</td>
                    <td>{value.f3}</td>
                    <td>{value.f4}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
