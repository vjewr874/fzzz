/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Pagination, Collapse, Table } from 'antd';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { number_to_price } from 'helper/common';
import './index.scss';
import { IconNoData, IconNextBlack } from './../../assets/icons/index';
import BetRecordsService from '../../services/betRecordsService';
import { routes } from './../../App';
const { Panel } = Collapse;

const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 20,
};

function TableTicket(props) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const { keyActive } = props;
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const history = useHistory();
  function handleRenderBetRecordType() {
    if (keyActive === 1) {
      return '5D3';
    } else if (keyActive === 2) {
      return '5D5';
    } else if (keyActive === 3) {
      return '5D10';
    } else {
      return '5D1';
    }
  }
  useEffect(() => {
    const newFillter = {
      ...filter,
      filter: {
        ...filter.filter,
        betRecordType: handleRenderBetRecordType(),
      },
    };
    setFilter(newFillter);
    handleFetchData(newFillter);
  }, [keyActive]);

  function handleFetchData(filter) {
    BetRecordsService.getList(filter).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataList(data);
      }
    });
  }

  const columns = [
    {
      title: 'Kỳ sổ',
      dataIndex: 'betRecordSection',
      key: 'betRecordSection',
      className: 'text-center',
      render: (text, row, index) => {
        return (
          <>
            <div>{text}</div>
          </>
        );
      },
    },

    {
      title: 'Số tiền',
      dataIndex: 'betRecordAmountIn',
      key: 'betRecordAmountIn',
      render: (text, row, index) => {
        const { betRecordAmountIn } = row;
        return (
          <span className="management__box__coin recharge_history__normal_text">
            {number_to_price(betRecordAmountIn)}
          </span>
        );
      },
    },

    {
      title: 'Đặt',
      dataIndex: 'betRecordValue',
      key: 'betRecordValue',
      render: (text, row, index) => {
        const { betRecordValue } = row;
        const newData = betRecordValue.split(';');
        let textValue = newData[1];
        if (newData[1] === 'LON') {
          textValue = 'Lớn';
        } else if (newData[1] === 'NHO') {
          textValue = 'Nhỏ';
        } else if (newData[1] === 'CHAN') {
          textValue = 'Chẵn';
        } else if (newData[1] === 'LE') {
          textValue = 'Lẻ';
        }
        return (
          <span className="management__box__coin recharge_history__normal_text">
            {newData[0]};{textValue}
          </span>
        );
      },
    },
    {
      title: 'Kết quả',
      dataIndex: 'betRecordWin',
      key: 'betRecordWin',
      render: (text, row, index) => {
        const { betRecordWin, betRecordStatus } = row;
        return (
          <span
            className={`management__box__coin recharge_history__normal_text ${
              betRecordWin ? 'text-success' : 'text-danger'
            }`}
          >
            {betRecordStatus === 'New' ? '' : betRecordWin}
          </span>
        );
      },
    },
  ];

  return (
    <section className="management packet ">
      <div
        onClick={() => {
          history.push(routes.allBet5DLotre.path);
        }}
        className="game5D__link-button"
      >
        Hơn <IconNextBlack className="ms-2" />
      </div>
      <Table
        scroll={{
          x: 325,
        }}
        className="overview__table game5D__table__history"
        pagination={false}
        dataSource={dataList?.data || []}
        columns={columns}
        locale={{
          emptyText: (
            <div className="text-center">
              <IconNoData />
            </div>
          ),
        }}
      />
      {dataList?.total < 20 ? null : (
        <Pagination
          onChange={page => {
            const newFilter = {
              ...filter,
              skip: (page - 1) * 20,
            };
            setFilter(newFilter);
            handleFetchData(newFilter);
          }}
          className="factory__pagination"
          simple
          pageSize={20}
          current={+filter.skip / 20 + 1}
          total={dataList?.total}
        />
      )}
    </section>
  );
}
export default TableTicket;
