/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState, useEffect } from 'react';
import './styles/notification.scss';

import { useHistory, useLocation } from 'react-router-dom';
import CustomerService from '../../services/customerMessage';
import { convertTimeDate } from '../../ultils/convertDate';
import Page from '../../components/Page/Page';
import icNotRead from '../../assets/stock-icons/ic-isReadAndDelete.svg';
import icRead from '../../assets/stock-icons/ic-ReadedAndDelete.svg';
import { Pagination, notification } from 'antd';
import ModalConfirmDelete from '../../components/Modal/components/ModalConfirmDelete/ModalConfirmDelete';
import Loader from '../../components/Loader';
import { useIntl } from 'react-intl';

function ModalNotification(props) {
  const { formatMessage: f } = useIntl();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(undefined);
  const [page, setPage] = useState(searchParams?.get('pages') ? parseInt(searchParams?.get('pages')) : 1);
  const perPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const data = {
      skip: (page - 1) * perPage,
      limit: perPage,
    };
    getListNotification(data);
  }, []);
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

  function getListNotification(data) {
    CustomerService.getListNotification(data).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        setData(data?.data);
        setTotalRecords(data?.total);
      }
      setIsLoading(false);
    });
  }
  const openNotification = (placement, types, info) => {
    notification[types]({
      message: `${info}`,
      description: '',
      placement,
    });
  };
  function deleteNotificationById() {
    setIsLoading(true);
    const params = {
      id: idToDelete,
    };
    CustomerService.deleteNotification(params).then(r => {
      const { isSuccess } = r;
      if (isSuccess) {
        const data = {
          skip: (page - 1) * perPage,
          limit: perPage,
        };
        // notification.open({
        //   message: 'Thông báo',
        //   description: 'Xoá thành công!!!',
        // });
        setIsLoading(false);
        openNotification('top', 'success', f({ id: 'Delete Successful' }));
        setIsOpenModalDelete(false);
        getListNotification(data);
      } else {
        //     notification.open({
        //   message: 'Thông báo',
        //   description: 'Xoá thất bại!!!',
        // });
        openNotification('top', 'error', f({ id: 'Delete failed' }));
      }
    });
  }
  function readNotification(data) {
    CustomerService.readNotification(data).then(() => {});
  }
  function handleChangePage(numberPage) {
    setIsLoading(true);
    const params = {
      skip: (numberPage - 1) * perPage,
      limit: perPage,
    };
    setPage(numberPage);
    getListNotification(params);
    checkParams({ status: props.isOpen, pages: numberPage });
  }
  // function getTotalPage() {
  //   return Math.round(totalRecords / perPage);
  // }

  function handClickItem(dt) {
    history.push(`/detail/${dt.customerMessageId}`);
    if (dt.isRead === 0) {
      readNotification({ id: dt.customerMessageId });
    }
  }

  function handleOpenModal(e, id) {
    e.stopPropagation();
    setIsOpenModalDelete(true);
    setIdToDelete(id);
  }
  return (
    <Page headerTitle={f({ id: 'Notification' })}>
      <div id="notification">
        {isLoading ? <Loader /> : null}
        <div className="notification">
          {data.map((item, index) => (
            <div className="notification-list" key={index} onClick={() => handClickItem(item)}>
              <div className={`notification-item ${item.isRead ? 'isReadNotification' : ''}`}>
                <p className="notification-item-date">{convertTimeDate(item?.createdAt)}</p>
                <div className="notification-item-content">
                  <span className="content">{item?.customerMessageTitle}</span>
                  <img
                    className="img"
                    src={item?.isRead === 0 ? icNotRead : icRead}
                    onClick={e => handleOpenModal(e, item?.customerMessageId)}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
          {data?.length === 0 && <div className={'text-center py-5'}>{f({ id: 'No notification' })}</div>}

          {/*{getTotalPage() > 1 && (*/}
          {totalRecords > perPage && (
            <div style={{ paddingTop: 28 }}>
              <Pagination
                total={totalRecords}
                className={'custom-pagination'}
                defaultPageSize={perPage}
                defaultCurrent={page}
                onChange={numberPage => handleChangePage(numberPage)}
                showSizeChanger={false}
                showLessItems={true}
              />
            </div>
          )}
        </div>
      </div>
      <ModalConfirmDelete
        status={isOpenModalDelete}
        closeDrawer={() => setIsOpenModalDelete(false)}
        setIsOpenModalDelete={setIsOpenModalDelete}
        deleteNotificationById={deleteNotificationById}
      />
    </Page>
  );
}

export default ModalNotification;
