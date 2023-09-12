/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import './styles/result-lottery.scss';
import GameRecordService from '../../services/gameRecordService';
import { DatePicker, Switch } from 'antd';
import icVe from '../../assets/new-icons/ic-ve.svg';
import icVolum from '../../assets/new-icons/ic-volum.svg';
import icLeftLight from '../../assets/new-icons/ic-left-light.svg';
import icRightLight from '../../assets/new-icons/ic-right-light.svg';
import icRightHide from '../../assets/new-icons/ic-right-hide.svg';
import icCalendar from '../../assets/new-icons/ic-calendar-red.svg';
import ModalNotification from '../../components/Modal/components/ModalNotification/ModalNotification';
import moment from 'moment';
import { PRODUCT_CHANNEL } from '../../constants/province';
import { convertDayDate1, convertDay } from '../../ultils/convertDate';
import { useHistory, useLocation } from 'react-router-dom';

function ResultLottery(props) {
  const { intl } = props;
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [resultList, setResultList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [type, setType] = useState('XSMB');
  const tabs = ['XSMB', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  const prizes = ['G8', 'G7', 'G6', 'G5', 'G4', 'G3', 'G2', 'G1', 'ĐB'];
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const [isShowNotification, setIsShowNotification] = useState(
    searchParams?.get('status') ? searchParams?.get('status') : false,
  );
  const [number, setNumber] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [unit, setUnit] = useState(true);
  const [dozen, setDozen] = useState(true);
  const onChange1 = checked => {
    setUnit(checked);
  };
  const onChange2 = checked => {
    setDozen(checked);
  };
  useEffect(() => {
    setResultList([]);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(1);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    getDay();
  }, [startDate]);
  useEffect(() => {
    if (provinceList?.length > 0) {
      provinceList.forEach(province => {
        const data = {
          filter: {
            gameRecordType: province.value,
          },
          startDate: moment(startDate).format(),
          endDate: moment(endDate).format(),
        };
        getList(data);
      });
    }
  }, [provinceList]);
  const checkParamsNotification = filterParams => {
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
  function getList(data) {
    GameRecordService.getList(data).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        resultList.push({ data: data?.data });
        setResultList([...resultList]);
      }
    });
  }
  function getDay() {
    switch (startDate.getDay()) {
      case 0:
        setProvinceList([
          {
            id: 1,
            label: 'TIỀN GIANG',
            value: PRODUCT_CHANNEL.TIEN_GIANG,
          },
          {
            id: 2,
            label: 'KIÊN GIANG',
            value: PRODUCT_CHANNEL.KIEN_GIANG,
          },
          {
            id: 3,
            label: 'ĐÀ LẠT',
            value: PRODUCT_CHANNEL.DA_LAT,
          },
        ]);
        break;
      case 1:
        setProvinceList([
          {
            id: 1,
            label: 'TP.HCM',
            value: PRODUCT_CHANNEL.TPHCM,
          },
          {
            id: 2,
            label: 'ĐỒNG THÁP',
            value: PRODUCT_CHANNEL.DONG_THAP,
          },
          {
            id: 3,
            label: 'CÀ MAU',
            value: PRODUCT_CHANNEL.CA_MAU,
          },
        ]);
        break;
      case 2:
        setProvinceList([
          {
            id: 1,
            label: 'BẾN TRE',
            value: PRODUCT_CHANNEL.BEN_TRE,
          },
          {
            id: 2,
            label: 'VŨNG TÀU',
            value: PRODUCT_CHANNEL.VUNG_TAU,
          },
          {
            id: 3,
            label: 'BẠC LIÊU',
            value: PRODUCT_CHANNEL.BAC_LIEU,
          },
        ]);
        break;
      case 3:
        setProvinceList([
          {
            id: 1,
            label: 'ĐỒNG NAI',
            value: PRODUCT_CHANNEL.DONG_NAI,
          },
          {
            id: 2,
            label: 'CẦN THƠ',
            value: PRODUCT_CHANNEL.CAN_THO,
          },
          {
            id: 3,
            label: 'SÓC TRĂNG',
            value: PRODUCT_CHANNEL.SOC_TRANG,
          },
        ]);
        break;
      case 4:
        setProvinceList([
          {
            id: 1,
            label: 'TÂY NINH',
            value: PRODUCT_CHANNEL.TAY_NINH,
          },
          {
            id: 2,
            label: 'AN GIANG',
            value: PRODUCT_CHANNEL.AN_GIANG,
          },
          {
            id: 3,
            label: 'BÌNH THUẬN',
            value: PRODUCT_CHANNEL.BINH_THUAN,
          },
        ]);
        break;
      case 5:
        setProvinceList([
          {
            id: 1,
            label: 'VĨNH LONG',
            value: PRODUCT_CHANNEL.VINH_LONG,
          },
          {
            id: 2,
            label: 'BÌNH DƯƠNG',
            value: PRODUCT_CHANNEL.BINH_DUONG,
          },
          {
            id: 3,
            label: 'TRÀ VINH',
            value: PRODUCT_CHANNEL.TRA_VINH,
          },
        ]);
        break;
      case 6:
        setProvinceList([
          {
            id: 1,
            label: 'TP.HCM',
            value: PRODUCT_CHANNEL.TPHCM,
          },
          {
            id: 2,
            label: 'LONG AN',
            value: PRODUCT_CHANNEL.LONG_AN,
          },
          {
            id: 3,
            label: 'HẬU GIANG',
            value: PRODUCT_CHANNEL.HAU_GIANG,
          },
          {
            id: 4,
            label: 'BÌNH PHƯỚC',
            value: PRODUCT_CHANNEL.BINH_PHUOC,
          },
        ]);
        break;
      default:
        break;
    }
  }
  function handleChange1() {
    setNumber(0);
  }
  function handleChange2() {
    setNumber(-3);
  }
  function handleChange3() {
    setNumber(-2);
  }
  function changeDayToVn(value) {
    let a;
    switch (value) {
      case 0:
        a = 'Chủ nhật';
        break;
      case 1:
        a = 'Thứ 2';
        break;
      case 2:
        a = 'Thứ 3';
        break;
      case 3:
        a = 'Thứ 4';
        break;
      case 4:
        a = 'Thứ 5';
        break;
      case 5:
        a = 'Thứ 6';
        break;
      case 6:
        a = 'Thứ 7';
        break;
    }
    return a;
  }
  function handleChangeDay(date, startDate, endDate) {
    const startDate1 = startDate.getTime() + 86400000 * date;
    const startDate2 = new Date(startDate1);
    setStartDate(new Date(startDate2));
    const endDate1 = endDate.getTime() + 86400000 * date;
    const endDate2 = new Date(endDate1);
    setEndDate(new Date(endDate2));
    const getDate = startDate2.getDay();
    setType(changeDayToVn(getDate));
  }

  function handTab(tab) {
    setType(tab);
    if (tabs.indexOf(tab) === parseInt(moment(new Date()).format('E').replace('0', '7')) || tabs.indexOf(tab) === 0) {
      setStartDate(new Date());
      setEndDate(new Date());
    } else if (tabs.indexOf(tab) < parseInt(moment(new Date()).format('E').replace('0', '7'))) {
      handleChangeDay(
        tabs.indexOf(tab) - parseInt(moment(new Date()).format('E').replace('0', '7')),
        new Date(),
        new Date(),
      );
    } else {
      handleChangeDay(
        tabs.indexOf(tab) - parseInt(moment(new Date()).format('E').replace('0', '7')) - 7,
        new Date(),
        new Date(),
      );
    }
  }

  return (
    <Page
      isShowNotification={true}
      headerTitle={intl.formatMessage({ id: 'result' })}
      handleShowNotification={() => {
        let page = searchParams?.get('pages') ? parseInt(searchParams?.get('pages')) : 0;
        checkParamsNotification({ status: true, pages: page });
        setIsShowNotification(!isShowNotification);
      }}
      backToHome={true}
    >
      <div id="result-lottery">
        <div className="result">
          {!isShowNotification && (
            <>
              <div className="result-header">
                {tabs.map(tab => {
                  return (
                    <button
                      className="result-btnDate"
                      key={tab}
                      style={
                        type === tab
                          ? {
                              color: '#FFFFFF',
                              background: '#C82215',
                            }
                          : {}
                      }
                      onClick={() => handTab(tab)}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              <div className="result-date">
                <div
                  style={{ backgroundImage: `url(${icLeftLight})`, width: '20px', height: '20px', cursor: 'pointer' }}
                  onClick={() => handleChangeDay(-1, startDate, endDate)}
                />
                <div className="result-date-text">
                  <img alt={'date'} src={icCalendar} width={16} height={16} style={{ marginRight: '6px' }} />
                  <div>Kết quả XSMN - {convertDayDate1(startDate).replace('T1', 'CN')}</div>
                </div>
                {convertDayDate1(startDate) === convertDayDate1(new Date()) ? (
                  <div style={{ backgroundImage: `url(${icRightHide})`, width: '20px', height: '20px' }} />
                ) : (
                  <div
                    style={{
                      backgroundImage: `url(${icRightLight})`,
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleChangeDay(1, startDate, endDate)}
                  />
                )}
              </div>
              <DatePicker
                style={{ margin: '0 8px 12px 8px', width: 'calc(100% - 16px)' }}
                placeholder={'Chọn ngày'}
                value={moment(startDate, 'YYYY-MM-DD')}
                format={'DD-MM-YYYY'}
                onChange={e => {
                  setStartDate(moment(e)._d);
                  setEndDate(moment(e)._d);
                  setType(changeDayToVn(parseInt(moment(e).format('d'))));
                }}
              />
              <table className={'result-table1'}>
                <thead>
                  <tr className="result-thead">
                    <th style={{ textAlign: 'left', padding: '4px 8px' }}>
                      <b>{convertDay(startDate).replace('T1', 'CN')}</b>
                    </th>
                    {provinceList?.map((value, index) => {
                      return (
                        <th key={`data1${index}`}>
                          <b>{value?.label}</b>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {prizes.map((prize, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ padding: '4px 8px', textAlign: 'left', fontWeight: '400' }}>{prize}</td>
                        {provinceList?.map(province => {
                          return resultList.map(result => {
                            return result.data.map((data, index2) => {
                              if (province.value === data.gameRecordType)
                                switch (index) {
                                  case 0:
                                    return (
                                      <td key={index2} style={{ color: '#F5493A' }}>
                                        {data.gameRecordValue.split(';')[0]}
                                      </td>
                                    );
                                  case 1:
                                    return (
                                      <td key={index2} style={{ color: '#4062ED' }}>
                                        {data.gameRecordValue.split(';')[1].slice(number)}
                                      </td>
                                    );
                                  case 2:
                                    return (
                                      <td key={index2}>
                                        <div>{data.gameRecordValue.split(';')[2].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[3].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[4].slice(number)}</div>
                                      </td>
                                    );
                                  case 3:
                                    return (
                                      <td key={index2}>
                                        <div>{data.gameRecordValue.split(';')[5].slice(number)}</div>
                                      </td>
                                    );
                                  case 4:
                                    return (
                                      <td key={index2}>
                                        <div>{data.gameRecordValue.split(';')[6].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[7].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[8].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[9].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[10].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[11].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[12].slice(number)}</div>
                                      </td>
                                    );
                                  case 5:
                                    return (
                                      <td key={index2}>
                                        <div>{data.gameRecordValue.split(';')[13].slice(number)}</div>
                                        <div>{data.gameRecordValue.split(';')[14].slice(number)}</div>
                                      </td>
                                    );
                                  case 6:
                                    return <td key={index2}>{data.gameRecordValue.split(';')[15].slice(number)}</td>;
                                  case 7:
                                    return <td key={index2}>{data.gameRecordValue.split(';')[16].slice(number)}</td>;
                                  case 8:
                                    return (
                                      <td key={index2} style={{ color: '#F5493A' }}>
                                        {data.gameRecordValue.split(';')[17].slice(number)}
                                      </td>
                                    );
                                }
                            });
                          });
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={'result-footer'}>
                <form className="result-left">
                  <input type="radio" name="number" value="1" className={'result-radio'} onChange={handleChange1} />
                  <label className="result-label">Đầy đủ</label>
                  <input type="radio" name="number" value="3" className={'result-radio'} onChange={handleChange2} />
                  <label className="result-label">3 số</label>
                  <input type="radio" name="number" value="2" className={'result-radio'} onChange={handleChange3} />
                  <label className="result-label">2 số</label>
                </form>
                <div className="result-right">
                  <div className="result-btn">
                    <div style={{ backgroundImage: `url(${icVe})`, width: '12px', height: '12px' }} />
                    <div className="result-btn-text">Vé mẫu</div>
                  </div>
                  <div style={{ backgroundImage: `url(${icVolum})`, width: '16px', height: '16px' }} />
                </div>
              </div>
              <div className="result-loto">
                <div className="result-left">
                  <div className="result-loto-text">Loto đơn vị</div>
                  <Switch defaultChecked onChange={onChange1} />
                </div>
                <div className="result-right">
                  <div className="result-loto-text">Loto hàng chục</div>
                  <Switch defaultChecked onChange={onChange2} />
                </div>
              </div>
              {unit &&
                provinceList?.map((province, index) => {
                  return (
                    <div className="result-unit" key={index}>
                      <div className="result-title">
                        <b>{province?.label}</b>
                      </div>
                      <table className={'result-table2'}>
                        <thead>
                          <tr>
                            {numbers.map((value, index2) => {
                              return <th key={index2}>{value}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {numbers.map((value, index) => {
                              return (
                                <td key={`data3${index}`}>
                                  {resultList.map(result => {
                                    return result.data.map((data, index) => {
                                      if (province.value === data.gameRecordType) {
                                        const arr = data.gameRecordValue.split(';');
                                        return (
                                          <div key={`data${index}`}>
                                            {arr.map((int, index) => {
                                              if (int.slice(-1) === value) {
                                                return (
                                                  <div
                                                    key={index}
                                                    style={{
                                                      color:
                                                        index === 0
                                                          ? '#F5493A'
                                                          : index === 1
                                                          ? '#4062ED'
                                                          : index === 17
                                                          ? '#F5493A'
                                                          : '#092249',
                                                    }}
                                                  >
                                                    {int.slice(-4)}
                                                  </div>
                                                );
                                              }
                                            })}
                                          </div>
                                        );
                                      }
                                    });
                                  })}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              {dozen && (
                <table className={'result-table3'}>
                  <thead>
                    <tr>
                      <th>Đầu</th>
                      {provinceList?.map((value, index) => {
                        return (
                          <th key={`data3${index}`}>
                            <b>{value?.label}</b>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {numbers.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ color: '#F5493A' }}>{value}</td>
                          {provinceList.map(province => {
                            return resultList.map((result, index) => {
                              return result.data.map(data => {
                                if (province.value === data.gameRecordType) {
                                  const arr = data.gameRecordValue.split(';');
                                  let text = '';
                                  arr.map(int => {
                                    if (int.slice(-2, -1) === value) {
                                      text = text + int.slice(-1) + ',';
                                    }
                                  });
                                  return <td key={`data1${index}`}>{text.slice(0, -1)}</td>;
                                }
                              });
                            });
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}
          {isShowNotification && <div style={{ height: 'calc(100vh - 108px)' }} />}
        </div>
        <ModalNotification isOpen={isShowNotification} closeModal={() => setIsShowNotification(false)} />
      </div>
    </Page>
  );
}
export default injectIntl(ResultLottery);
