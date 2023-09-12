/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Pagination, Collapse, Table, Tabs } from 'antd';

import React, { useEffect, useState } from 'react';
import CustomerService from '../../services/customerMessage';
import { IconNoData } from './../../assets/icons/index';
import './tableChart.scss';

const { Panel } = Collapse;
const DEFAULT_FILTER = {
  filter: {
    isRead: 0,
  },
  skip: 0,
  limit: 20,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};
const { TabPane } = Tabs;
const POSTION = [
  [
    {
      bottom: '-35px',
      height: '35px',
      with: '1px',
      color: '#E1584C',
      left: '6px',
    },
    {
      bottom: '-35px',
      height: '35px',
      with: '1px',
      color: '#E1584C',
      left: '6px',
    },
  ],
];
function TableChart(props) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  useEffect(() => {
    handleFetchData(filter);
  }, []);

  function handleFetchData(filter) {
    CustomerService.getListNotification(filter).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataList(data);
      }
    });
  }

  function handleRenderDrawer(currentNumber, nextNumber) {
    return <div className={`game5D__${currentNumber}n${nextNumber}`}></div>;
  }

  const columns = [
    {
      title: 'Kỳ sổ',
      dataIndex: 'name',
      key: 'name',
      className: 'text-center',
      render: (text, row, index) => {
        return (
          <>
            <div>2022053110683</div>
          </>
        );
      },
    },
    {
      title: 'Kết quả',
      dataIndex: 'age',
      key: 'age',
      className: 'text-center',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second ">
              0
              {!index ? (
                <>
                  {handleRenderDrawer(0, 0)}
                  {handleRenderDrawer(0, 1)}
                  {handleRenderDrawer(0, 2)}
                  {handleRenderDrawer(0, 3)}
                  {handleRenderDrawer(0, 4)}
                  {handleRenderDrawer(0, 5)}
                  {handleRenderDrawer(0, 6)}
                  {handleRenderDrawer(0, 7)}
                  {handleRenderDrawer(0, 8)}
                  {handleRenderDrawer(0, 9)}
                </>
              ) : null}
            </div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">1</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">2</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">3</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">4</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">5</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">6</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">7</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">8</div>
            <div className="game5D__table__history__cricel game5D__table__history__cricel__second">9</div>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'address',
      key: 'address',
      className: 'text-center',
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center ">
            {index % 2 === 0 ? (
              <>
                <div className="game5D__table__history__cricel__L mr-2">L</div>
                <div className="game5D__table__history__cricel__E ">E</div>
              </>
            ) : (
              <>
                <div className="game5D__table__history__cricel__H mr-2">H</div>
                <div className="game5D__table__history__cricel__O ">O</div>
              </>
            )}
          </div>
        );
      },
    },
  ];

  function renderChartDeatail() {
    return (
      <div className="game5D__detail mb-4">
        <div className="mb-2">Hỗ trợ tham khảo (100 kỳ trước)</div>
        <div className="row mb-2">
          <div className="col-4">Số kỳ chưa xổ</div>
          <div className="col-8 game5D__detail__result">
            <span>15</span> <span>7</span> <span>1</span> <span>2</span> <span>3</span> <span>24</span> <span>4</span>{' '}
            <span>5</span> <span>8</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4">Bình quân số kỳ</div>
          <div className="col-8 game5D__detail__result">
            <span>15</span> <span>7</span> <span>13</span> <span>2</span> <span>23</span> <span>24</span>{' '}
            <span>43</span> <span>5</span> <span>8</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4">Tần số xuất hiện</div>
          <div className="col-8 game5D__detail__result">
            <span>15</span> <span>7</span> <span>1</span> <span>2</span> <span>12</span> <span>21</span> <span>4</span>{' '}
            <span>5</span> <span>8</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4">Lần xổ liên tiếp</div>
          <div className="col-8 game5D__detail__result">
            <span>15</span> <span>7</span> <span>1</span> <span>2</span> <span>3</span> <span>24</span> <span>4</span>{' '}
            <span>5</span> <span>8</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="management packet ">
      <div className="game5D__box-number">
        <Tabs className="game5D__tab" defaultActiveKey="1">
          <TabPane tab="A" key="1">
            {renderChartDeatail()}
          </TabPane>
          <TabPane tab="B" key="2">
            {renderChartDeatail()}
          </TabPane>
          <TabPane tab="C" key="3">
            {renderChartDeatail()}
          </TabPane>
          <TabPane tab="D" key="4">
            {renderChartDeatail()}
          </TabPane>
          <TabPane tab="Tổng" key="5">
            {renderChartDeatail()}
          </TabPane>
        </Tabs>
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
export default TableChart;
