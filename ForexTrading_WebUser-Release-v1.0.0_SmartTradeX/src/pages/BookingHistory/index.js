/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import './styles/BookingHistory.scss';
import Pagination from '../../components/Pagination/Pagination';
import HistoryAPI from '../../services/history';
import currencyFormat from '../../ultils/CurrencyFormat';
import { convertDayDate } from '../../ultils/convertDate';
import ModalImage from '../../components/Modal/components/ModalImage/ModalImage';
//logo
import icLogo from '../../assets/new-icons/ic-logo.svg';
//icon
import ic_delete from '../../assets/new-icons/ic-delete.svg';
import ic_image from '../../assets/new-icons/ic-image.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from '../../App';
import { PRODUCT_CHANNEL } from '../../constants/province';
function BookingHistory() {
  const { RangePicker } = DatePicker;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();
  const [typeLottery, setTypeLottery] = useState('');
  const dateFormat = 'DD/MM/YYYY';
  const [isOpen, setIsOpen] = useState(false);
  const [bookingHistoryList, setBookingHistoryList] = useState([]);
  const [page, setPage] = useState(searchParams?.get('page') ? parseInt(searchParams?.get('page')) : 0);
  const perPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [productImage, setProductImage] = useState();
  useEffect(() => {
    const data = {
      skip: page,
      limit: perPage,
    };
    getBookingHistoryList(data);
  }, []);
  const checkParams = filterParams => {
    const params = {};
    if (filterParams?.page) {
      params.page = filterParams.page;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  };
  function handleChangePage(type) {
    switch (type) {
      case 'next':
        if (page + 1 < getTotalPage()) {
          const dataNext = {
            skip: (page + 1) * perPage,
            limit: perPage,
          };
          setPage(page + 1);
          checkParams({ page: page + 1 });
          getBookingHistoryList(dataNext);
        }
        break;
      case 'prev':
        if (page - 1 >= 0) {
          setPage(page - 1);
          const dataPrev = {
            skip: (page - 1) * perPage,
            limit: perPage,
          };
          checkParams({ page: page - 1 });
          getBookingHistoryList(dataPrev);
        }
        break;
      default:
        break;
    }
  }
  function getTotalPage() {
    return Number(Math.ceil(totalRecords / perPage));
  }

  // const typeLotteries = [
  //     {
  //         id: 0,
  //         label: 'Tất cả',
  //         value: ''
  //     },
  //     {
  //         id: 1,
  //         label: 'Vé thường',
  //         value: 'SINGLE'
  //     },
  //     {
  //         id: 2,
  //         label: 'Vé Cặp nguyên',
  //         value: 'BATCH'
  //     },
  // ]
  function handleChangeType(value, date) {
    const data = {
      skip: 0,
      limit: perPage,
      startDate: moment(date[0]).format(),
      endDate: moment(date[1]).format(),
    };

    getBookingHistoryList(data);
  }

  function getBookingHistoryList(data) {
    HistoryAPI.getBookingHistoryList(data).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setBookingHistoryList(data?.data);
        setTotalRecords(data?.total);
      } else {
        setBookingHistoryList([]);
      }
    });
  }
  function findName(items) {
    if (items?.productOrderItems?.length > 0) {
      const single = items.productOrderItems.find(item => item.productType === 'SINGLE');
      const batch = items.productOrderItems.find(item => item.productType === 'BATCH');
      if (single && batch) {
        return 'Vé thường và cặp nguyên';
      } else if (single) {
        return 'Vé thường';
      } else if (batch) {
        return 'Vé cặp nguyên';
      } else return '';
    }
  }
  function findChannel(channel) {
    switch (channel) {
      case PRODUCT_CHANNEL.TPHCM:
        return 'TPHCM';
      case PRODUCT_CHANNEL.DONG_THAP:
        return 'Đồng Tháp';
      case PRODUCT_CHANNEL.CA_MAU:
        return 'Cà Mau';
      case PRODUCT_CHANNEL.BEN_TRE:
        return 'Bến Tre';
      case PRODUCT_CHANNEL.VUNG_TAU:
        return 'Vũng Tàu';
      case PRODUCT_CHANNEL.BAC_LIEU:
        return 'Bạc Liêu';
      case PRODUCT_CHANNEL.DONG_NAI:
        return 'Đồng Nai';
      case PRODUCT_CHANNEL.CAN_THO:
        return 'Cần Thơ';
      case PRODUCT_CHANNEL.SOC_TRANG:
        return 'Sóc Trăng';
      case PRODUCT_CHANNEL.TAY_NINH:
        return 'Tây Ninh';
      case PRODUCT_CHANNEL.AN_GIANG:
        return 'An Giang';
      case PRODUCT_CHANNEL.BINH_THUAN:
        return 'Bình Thuận';
      case PRODUCT_CHANNEL.VINH_LONG:
        return 'Vĩnh Long';
      case PRODUCT_CHANNEL.BINH_DUONG:
        return 'Bình Dương';
      case PRODUCT_CHANNEL.TRA_VINH:
        return 'Trà Vinh';
      case PRODUCT_CHANNEL.LONG_AN:
        return 'Long An';
      case PRODUCT_CHANNEL.HAU_GIANG:
        return 'Hậu Giang';
      case PRODUCT_CHANNEL.BINH_PHUOC:
        return 'Bình Phước';
      case PRODUCT_CHANNEL.TIEN_GIANG:
        return 'Tiền Giang';
      case PRODUCT_CHANNEL.KIEN_GIANG:
        return 'Kiên Giang';
      case PRODUCT_CHANNEL.DA_LAT:
        return 'Đà Lạt';
      default:
        return '';
    }
  }
  function findStatus(status) {
    switch (status) {
      case 'Completed':
        return 'Hoàn thành';
      case 'New':
        return 'Mới';
      default:
        return 'Mới';
    }
  }
  return (
    <Page headerTitle={'Lịch sử đặt vé'}>
      <div id="BookingHistory">
        <div className="booking-history">
          {/*chọn ngày và chọn loại vé*/}
          <div className="booking-history-select">
            <RangePicker
              className={'date-time'}
              onChange={handleChangeType}
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            />
            {/*<div className={'select'}>*/}
            {/*    <DatePicker className={'date-time'} placeholder={'Chọn ngày'} disabledDate={(current) =>  current > moment(new Date(), dateFormat)} defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />*/}
            {/*</div>*/}
            {/*<div className={'select'}>*/}
            {/*    <DatePicker className={'date-time'} placeholder={'Chọn ngày'} disabledDate={(current) =>  current > moment(new Date(), dateFormat)} defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />*/}
            {/*</div>*/}
          </div>
          {/*body*/}
          {bookingHistoryList?.length === 0 && <div className={'text-center'}>Không có dữ liệu</div>}
          <div className="booking-history-content">
            {bookingHistoryList.map(
              (item_list, index) =>
                item_list.productOrderItems.length > 0 && (
                  <div className="booking-history-item" key={index}>
                    {/*tên loại vé, logo, trạng thái*/}
                    <div className="booking-history-item-header">
                      <div className="imageLogo" style={{ backgroundImage: `url(${icLogo})` }} />
                      <div className="title">
                        <h3>{findName(item_list)}</h3>
                        <div className="status">
                          <div
                            className="status-icon background-image"
                            style={{ backgroundImage: `url(${ic_delete})` }}
                          />
                          <span>{findStatus(item_list?.orderStatus)}</span>
                        </div>
                      </div>
                    </div>
                    {item_list.productOrderItems.map((product, index_product) => {
                      return (
                        <div className="booking-history-item-province" key={`product${index_product}`}>
                          <div className="province-time">
                            <p>
                              {findChannel(product?.productChannel)} -{' '}
                              {convertDayDate(new Date(product?.expireDate)).replace('T1', 'CN')}
                            </p>
                          </div>
                          <div className="result">
                            <table className="result-table">
                              <thead>
                                <tr>
                                  <th className="result-table-title">Vé</th>
                                  <th className="result-table-title">Số lượng</th>
                                  <th className="result-table-title">Kết quả</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="result-table-lottery mt-8">
                                    <p>{product?.producName}</p>
                                    <div
                                      className="icon background-image"
                                      style={{ backgroundImage: `url(${ic_image})` }}
                                      onClick={() => {
                                        setProductImage(item_list.productImage[index_product]);
                                        setIsOpen(!isOpen);
                                      }}
                                    />
                                  </td>
                                  <td className="result-table-amount mt-8">x{product?.orderItemQuantity}</td>
                                  <td className="result-table-result mt-8">
                                    {product?.productCategory === '' ? '-' : product?.productCategory}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })}
                    {/*số tiền và xem két quả sổ số*/}
                    <div className="booking-history-item-footer">
                      <p className="money">
                        #: <span style={{ color: '#F5493A' }}>{currencyFormat(item_list.total)} đ</span>
                      </p>
                      <p className={'button-result'} onClick={() => history.push(routes.resultLottery.path)}>
                        Xem kết quả xổ
                      </p>
                    </div>
                  </div>
                ),
            )}
          </div>
          {getTotalPage() > 1 && (
            <div style={{ margin: '28px 0 20px 0' }}>
              <Pagination totalRecords={getTotalPage()} page={page} handleChangePage={type => handleChangePage(type)} />
            </div>
          )}
        </div>
      </div>
      <ModalImage productImage={productImage} status={isOpen} closeDrawer={() => setIsOpen(false)} />
    </Page>
  );
}
export default BookingHistory;
