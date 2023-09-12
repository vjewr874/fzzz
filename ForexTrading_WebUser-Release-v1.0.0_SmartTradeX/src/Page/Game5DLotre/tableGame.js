/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import TableHistory from './tableHistory';
import TableChart from './tableChart';
import TableTicket from './tableTicket';
function TableGame(props) {
  const { indexActive: keyActive, gameRecordSection } = props;
  const [indexActive, setIndexActive] = useState(0);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div
          keyActive={keyActive}
          onClick={() => {
            setIndexActive(0);
          }}
          className={!indexActive ? 'game5D__button__active me-2' : 'game5D__button me-2'}
        >
          Lịch sử trò chơi
        </div>
        {/* <div keyActive={keyActive} onClick={()=> { setIndexActive(1)}}  className={indexActive===1 ? 'game5D__button__active me-2': 'game5D__button me-2'}>
            Biểu đồ trên
            </div> */}
        <div
          keyActive={keyActive}
          onClick={() => {
            setIndexActive(2);
          }}
          className={indexActive === 2 ? 'game5D__button__active me-2' : 'game5D__button me-2'}
        >
          Vé đặt của tôi
        </div>
      </div>
      {!indexActive ? <TableHistory gameRecordSection={gameRecordSection} keyActive={keyActive} /> : null}
      {/* {
        indexActive === 1 ? <TableChart keyActive={keyActive}/> :null
    } */}

      {indexActive === 2 ? <TableTicket keyActive={keyActive} /> : null}
    </>
  );
}
export default TableGame;
