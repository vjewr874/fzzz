/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState, useMemo } from 'react';
import History from './history';
import FigureHistory from './figureHistory';
import MyTicket from './myTicket';
function TableGame(props) {
  const [indexActive, setIndexActive] = useState(0);

  const renderTab = () => {
    switch (indexActive) {
      case 0:
        return <History />;
      case 1:
        return <FigureHistory />;
      default:
        return <MyTicket />;
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div
          onClick={() => {
            setIndexActive(0);
          }}
          className={!indexActive ? 'win-go__button__active me-2' : 'win-go__button me-2'}
        >
          Lịch sử trò chơi
        </div>
        <div
          onClick={() => {
            setIndexActive(1);
          }}
          className={indexActive === 1 ? 'win-go__button__active me-2' : 'win-go__button me-2'}
        >
          Biểu đồ trên
        </div>
        <div
          onClick={() => {
            setIndexActive(2);
          }}
          className={indexActive === 2 ? 'win-go__button__active me-2' : 'win-go__button me-2'}
        >
          Vé đặt của tôi
        </div>
      </div>
      {renderTab()}
    </>
  );
}
export default TableGame;
