/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Pagination, Collapse, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import GameRecordService from '../../services/gameRecordService';
import './index.scss';
import { IconNoData } from './../../assets/icons/index';
const { Panel } = Collapse;

const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 20,
};

function TableHistory(props) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const { keyActive, gameRecordSection } = props;
  const [dataList, setDataList] = useState({ data: [], total: 0 });

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
        gameRecordType: handleRenderBetRecordType(),
      },
    };
    setFilter(newFillter);
    handleFetchData(newFillter);
  }, [keyActive, gameRecordSection]);

  function handleFetchData(filter) {
    GameRecordService.getList(filter).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataList(data);
      }
    });
  }

  const columns = [
    {
      title: 'Kỳ sổ',
      dataIndex: 'gameRecordSection',
      key: 'gameRecordSection',
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
      title: 'Kết quả',
      dataIndex: 'gameRecordValue',
      key: 'gameRecordValue',
      className: 'text-center',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <div className="game5D__table__history__cricel">{text[0] || 0}</div>
            <div className="game5D__table__history__cricel">{text[1] || 0}</div>
            <div className="game5D__table__history__cricel">{text[2] || 0}</div>
            <div className="game5D__table__history__cricel">{text[3] || 0}</div>
            <div className="game5D__table__history__cricel">{text[4] || 0}</div>
          </div>
        );
      },
    },
    {
      title: 'Tổng',
      dataIndex: 'gameRecordValue',
      key: 'gameRecordValue',
      className: 'text-center',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center ">
            <div className="game5D__table__history__cricel game5D__table__history__cricel__active">
              {(+text[0] || 0) + (+text[1] || 0) + (+text[2] || 0) + (+text[3] || 0) + (+text[4] || 0)}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <section className="management packet ">
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
export default TableHistory;
