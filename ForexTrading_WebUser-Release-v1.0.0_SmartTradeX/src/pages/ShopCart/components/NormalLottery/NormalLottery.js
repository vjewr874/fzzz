/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import './styles/normal-lottery.scss';
import currencyFormat from '../../../../ultils/CurrencyFormat';
import { InputNumber } from 'antd';
import { PRODUCT_CHANNEL } from '../../../../constants/province';
//icons
import icLogo from '../../../../assets/new-icons/ic-logo.svg';
import icTrash from '../../../../assets/new-icons/ic-trash-gray.svg';
import icRemove from '../../../../assets/new-icons/ic-remove.svg';
import moment from 'moment';

function NormalLottery(props) {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    finData();
    getTotalPrice();
  }, [props]);
  function finData() {
    let dataFind = [];
    if (props?.lotteryList?.length > 0) {
      props.lotteryList.forEach(item => {
        if (dataFind?.length === 0) {
          dataFind.push({
            productChannel: props?.lotteryList[0]?.productChannel,
            expireDate: props?.lotteryList[0]?.expireDate,
            lotteries: [],
          });
        } else {
          const checkData = dataFind.find(lottery => lottery?.productChannel === item?.productChannel);
          if (!checkData) {
            dataFind.push({
              productChannel: item?.productChannel,
              expireDate: item?.expireDate,
              lotteries: [],
            });
          }
        }
      });
      props.lotteryList.forEach(item => {
        const index = dataFind.findIndex(lottery => lottery?.productChannel === item?.productChannel);
        if (index >= 0) {
          dataFind[index].lotteries.push(item);
        }
      });
    }
    setData([...dataFind]);
  }
  function getTotalPrice() {
    let price = 0;
    if (props?.lotteryList?.length > 0) {
      props.lotteryList.forEach(lottery => {
        price = price + lottery?.totalSinglePrice;
      });
    }
    setTotalPrice(price);
  }
  function handleChangeQuantity(value, index, indexLottery) {
    if (value >= 1) {
      if (value <= data[index].lotteries[indexLottery]?.quantity) {
        data[index].lotteries[indexLottery].OrderItemQuantity = value;
      } else {
        data[index].lotteries[indexLottery].OrderItemQuantity = data[index].lotteries[indexLottery]?.quantity;
      }
    } else {
      data[index].lotteries[indexLottery].OrderItemQuantity = 1;
    }
    setData([...data]);
    changeDataMain(value >= 1 ? value : 1, index, indexLottery);
  }
  function handleRemoveLottery(index, indexLottery) {
    removeDataMain(index, indexLottery);
    data[index].lotteries.splice(indexLottery, 1);
    setData([...data]);
  }

  function handleRemoveLotteries() {
    props.remoteSingleLotteries();
  }

  function changeDataMain(value, index, indexLottery) {
    const dataIndex = props.lotteryList.findIndex(
      item => data[index].lotteries[indexLottery]?.productId === item?.productId,
    );
    if (dataIndex >= 0) {
      props.changeLotterySingle(dataIndex, value);
    }
  }
  function removeDataMain(index, indexLottery) {
    const dataIndex = props.lotteryList.findIndex(
      item => data[index].lotteries[indexLottery]?.productId === item?.productId,
    );
    if (dataIndex >= 0) {
      props.removeLotterySingle(dataIndex);
    }
  }
  function handChangeChannel(productChannel) {
    switch (productChannel) {
      case PRODUCT_CHANNEL.TPHCM:
        return 'HỒ CHÍ MINH';
        break;
      case PRODUCT_CHANNEL.DONG_THAP:
        return 'ĐỒNG THÁP';
        break;
      case PRODUCT_CHANNEL.CA_MAU:
        return 'CÀ MAU';
        break;
      case PRODUCT_CHANNEL.BEN_TRE:
        return 'BẾN TRE';
        break;
      case PRODUCT_CHANNEL.VUNG_TAU:
        return 'VŨNG TÀU';
        break;
      case PRODUCT_CHANNEL.BAC_LIEU:
        return 'BẠC LIÊU';
        break;
      case PRODUCT_CHANNEL.DONG_NAI:
        return 'ĐỒNG NAI';
        break;
      case PRODUCT_CHANNEL.CAN_THO:
        return 'CẦN THƠ';
        break;
      case PRODUCT_CHANNEL.SOC_TRANG:
        return 'SÓC TRĂNG';
        break;
      case PRODUCT_CHANNEL.TAY_NINH:
        return 'TÂY NINH';
        break;
      case PRODUCT_CHANNEL.AN_GIANG:
        return 'AN GIANG';
        break;
      case PRODUCT_CHANNEL.BINH_THUAN:
        return 'BÌNH THUẬN';
        break;
      case PRODUCT_CHANNEL.VINH_LONG:
        return 'VĨNH LONG';
        break;
      case PRODUCT_CHANNEL.BINH_DUONG:
        return 'BÌNH DƯƠNG';
        break;
      case PRODUCT_CHANNEL.TRA_VINH:
        return 'TRÀ VINH';
        break;
      case PRODUCT_CHANNEL.LONG_AN:
        return 'LONG AN';
        break;
      case PRODUCT_CHANNEL.HAU_GIANG:
        return 'HẬU GIANG';
        break;
      case PRODUCT_CHANNEL.BINH_PHUOC:
        return 'BÌNH PHƯỚC';
        break;
      case PRODUCT_CHANNEL.TIEN_GIANG:
        return 'TIỀN GIANG';
        break;
      case PRODUCT_CHANNEL.KIEN_GIANG:
        return 'KIÊN GIANG';
        break;
      case PRODUCT_CHANNEL.DA_LAT:
        return 'ĐÀ LẠT';
        break;
    }
  }
  return data?.length > 0 ? (
    <div id={'normal-lottery'}>
      <div className={'container-normal-lottery'}>
        <div className={'normal-lottery__header'}>
          <div className={'background-image icon__logo'} style={{ backgroundImage: `url('${icLogo}')` }} />
          <h3 className={'title'}>Vé thường</h3>
        </div>
        <div className={'container-lottery__by-province'}>
          {data?.map((lottery, index) => {
            return (
              <div className={'lottery__by-province'} key={`lottery${index}`}>
                <p className={'lottery__title'}>
                  {handChangeChannel(lottery?.productChannel)} -{' '}
                  {lottery?.expireDate
                    ? new Date(moment.utc(lottery?.expireDate).format()).toLocaleDateString('vi')
                    : ''}
                </p>
                {lottery?.lotteries.map((item, indexLottery) => {
                  return (
                    <div className={'lottery__detail'} key={`lottery${indexLottery}`}>
                      <p className={'lottery__number'}>{item?.producName}</p>
                      <div className={'container-amount'}>
                        <div className={'container-input'}>
                          <div
                            className={'btn-input btn-reduce'}
                            onClick={() => handleChangeQuantity(item?.OrderItemQuantity - 1, index, indexLottery)}
                          >
                            -
                          </div>
                          <InputNumber
                            value={item?.OrderItemQuantity}
                            min={1}
                            max={item?.quantity}
                            onChange={e => handleChangeQuantity(e, index, indexLottery)}
                          />
                          <div
                            className={'btn-input btn-increasing'}
                            onClick={() => handleChangeQuantity(item?.OrderItemQuantity + 1, index, indexLottery)}
                          >
                            +
                          </div>
                        </div>
                        <p className={'quantity'}>
                          Còn: <span>{item?.quantity} vé</span>
                        </p>
                      </div>
                      <div
                        className={'background-image icon__trash'}
                        style={{ backgroundImage: `url('${icTrash}')` }}
                        onClick={() => handleRemoveLottery(index, indexLottery)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={'container-total-price'}>
          <p className={'amount'}>
            #: <span>{currencyFormat(totalPrice)} đ</span>
          </p>
          <div className={'btn-remove'} onClick={() => handleRemoveLotteries()}>
            <p>Hủy vé</p>
            <div className={'background-image icon__remove'} style={{ backgroundImage: `url('${icRemove}')` }} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}
export default NormalLottery;
