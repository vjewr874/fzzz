/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState, useEffect } from 'react';
import './styles/modal-notification.scss';
import icBack from '../../../../assets/new-icons/ic-arow-left.svg';
import icNoImage from '../../../../assets/new-icons/ic-no-img.svg';
import Pagination from '../../../Pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import CustomerService from '../../../../services/customerMessage';
import { convertDayDate, convertTimeDate, convertDateDefault } from '../../../../ultils/convertDate';
import img from '../../../../assets/new-images/img-detail.png';

function ModalNotification(props) {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(searchParams?.get('pages') ? parseInt(searchParams?.get('pages')) : 0);
  const perPage = 10;
  useEffect(() => {
    if (props.isOpen) {
      const data = {
        skip: page * perPage,
        limit: perPage,
      };
      getListNotification(data);
    }
  }, [props.isOpen]);
  useEffect(() => {
    getNewData();
  }, [data]);
  const checkParams = filterParams => {
    const params = {};
    if (filterParams?.status) {
      params.status = filterParams.status;
    }
    if (filterParams?.pages) {
      params.pages = filterParams.pages;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  };
  function getNewData() {
    if (data?.length > 0) {
      data.forEach(item => {
        if (newData.length > 0) {
          const found = newData.find(obj => {
            return convertDateDefault(obj.date) === convertDateDefault(item.createdAt);
          });
          if (!found) {
            newData.push({
              date: item.createdAt,
              values: [],
            });
          }
        } else {
          newData.push({
            date: item.createdAt,
            values: [],
          });
        }
      });
      getIndex(newData);
    }
  }
  function getIndex(dataIndex) {
    if (data?.length > 0) {
      data.forEach(item => {
        if (dataIndex.length > 0) {
          const found = dataIndex.findIndex(obj => {
            return convertDateDefault(obj.date) === convertDateDefault(item.createdAt);
          });
          dataIndex[found].values.push({
            title: item.customerMessageTitle,
            content: item.customerMessageContent,
            img: item.customerMessageImage,
            customerMessageId: item.customerMessageId,
            isRead: item.isRead,
          });
        }
      });
      setNewData([...dataIndex]);
    }
  }
  function getListNotification(data) {
    CustomerService.getListNotification(data).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        setData(data?.data);
        setTotalRecords(data?.total);
      }
    });
  }
  function readNotification(data) {
    CustomerService.readNotification(data).then(() => {});
  }
  function handleChangePage(type) {
    switch (type) {
      case 'next':
        if (page + 1 < getTotalPage()) {
          setNewData([]);
          const dataNext = {
            skip: (page + 1) * perPage,
            limit: perPage,
          };
          setPage(page + 1);
          getListNotification(dataNext);
          checkParams({ status: props.isOpen, pages: page + 1 });
        }
        break;
      case 'prev':
        if (page - 1 >= 0) {
          setNewData([]);
          setPage(page - 1);
          const dataPrev = {
            skip: (page - 1) * perPage,
            limit: perPage,
          };
          getListNotification(dataPrev);
          checkParams({ status: props.isOpen, pages: page - 1 });
        }
        break;
      default:
        break;
    }
  }
  function getTotalPage() {
    return Math.round(totalRecords / perPage);
  }

  function handClickItem(dt) {
    history.push(`detail/${dt.customerMessageId}`);
    if (dt.isRead === 0) {
      readNotification({ id: dt.customerMessageId });
    }
  }
  return (
    <div id={'notification'} className={`container-notification ${props?.isOpen ? 'show' : ''}`}>
      <div className={'container-header'}>
        <div className={'container-item__left'}>
          <div
            className={'background-image icon-back'}
            style={{ backgroundImage: `url('${icBack}')` }}
            onClick={() => {
              props.closeModal();
              setNewData([]);
              checkParams({ pages: page });
            }}
          />
        </div>
        <div className={'container-item__center'}>Thông báo</div>
        <div className={'icon-back'} />
      </div>
      <div className={'container-notify'}>
        {newData?.length > 0 &&
          newData.map((value, index) => {
            return (
              <div className={'notify'} key={`data${index}`}>
                <div className={'notify-day'}>{convertDayDate(new Date(value.date)).replace(`T1`, 'CN')}</div>
                {value.values.map((dt, index) => {
                  return (
                    <div
                      className={'notify-line'}
                      style={{ background: `${dt.isRead === 0 ? 'rgba(0, 115, 255, 0.04)' : '#FFFFFF'}` }}
                      onClick={() => handClickItem(dt)}
                      key={index}
                    >
                      <img alt={''} src={dt.img === null ? icNoImage : dt.img} className={'notify-img'} />
                      <div style={{ width: 'calc(100% - 40px)' }}>
                        <div className={'notify-header'}>{dt.title}</div>
                        <div className={'notify-text'}>{dt.content}</div>
                        <div className={'notify-time'}>{convertTimeDate(value.date)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        {newData?.length === 0 && <div className={'text-center py-5'}>Không có thông báo</div>}
      </div>
      {getTotalPage() > 1 && (
        <div style={{ paddingTop: 28 }}>
          <Pagination totalRecords={getTotalPage()} page={page} handleChangePage={type => handleChangePage(type)} />
        </div>
      )}
    </div>
  );
}

export default ModalNotification;
