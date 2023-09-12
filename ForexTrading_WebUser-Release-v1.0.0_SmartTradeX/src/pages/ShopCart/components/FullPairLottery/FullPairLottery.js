/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import './styles/full-pair-lottery.scss';
import currencyFormat from '../../../../ultils/CurrencyFormat';

//icons
import icLogo from '../../../../assets/new-icons/ic-logo.svg';
import icTrash from '../../../../assets/new-icons/ic-trash-gray.svg';
import icRemove from '../../../../assets/new-icons/ic-remove.svg';
import moment from 'moment';
import { PRODUCT_CHANNEL } from '../../../../constants/province';

function FullPairLottery(props) {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    finData();
    getTotalPrice();
  }, [props]);

  function finData() {
    const dataSpecial = [];
    if (props?.lotteryList?.length > 0) {
      props.lotteryList.forEach(item => {
        if (dataSpecial?.length === 0) {
          dataSpecial.push({
            productChannel: props?.lotteryList[0]?.productChannel,
            expireDate: props?.lotteryList[0]?.expireDate,
            lotteries: [],
          });
        } else {
          const checkData = dataSpecial.find(lottery => lottery?.productChannel === item?.productChannel);
          if (!checkData) {
            dataSpecial.push({
              productChannel: item?.productChannel,
              expireDate: item?.expireDate,
              lotteries: [],
            });
          }
        }
      });
      props.lotteryList.forEach(item => {
        const index = dataSpecial.findIndex(lottery => lottery?.productChannel === item?.productChannel);
        if (index >= 0) {
          dataSpecial[index].lotteries.push(item);
        }
      });
    }
    setData([...dataSpecial]);
  }

  function getTotalPrice() {
    let price = 0;
    if (props?.lotteryList?.length > 0) {
      props.lotteryList.forEach(lottery => {
        price = price + lottery?.totalBatchPrice;
      });
    }
    setTotalPrice(price);
  }

  function handleRemoveLottery(index, indexLottery) {
    removeDataMain(index, indexLottery);
    data[index].lotteries.splice(indexLottery, 1);
    setData([...data]);
  }

  function handleRemoveLotteries() {
    props.removeSpecialLotteries();
  }

  function removeDataMain(index, indexLottery) {
    const dataIndex = props.lotteryList.findIndex(
      item => data[index].lotteries[indexLottery]?.productId === item?.productId,
    );
    if (dataIndex >= 0) {
      props.removeLotterySpecial(dataIndex);
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
    <div id={'full-pair-lottery'}>
      <div className={'container-normal-lottery'}>
        <div className={'normal-lottery__header'}>
          <div className={'background-image icon__logo'} style={{ backgroundImage: `url('${icLogo}')` }} />
          <h3 className={'title'}>Vé cặp nguyên</h3>
        </div>
        <div className={'container-lottery__by-province'}>
          {data?.map((item, index) => {
            return (
              <div className={'lottery__by-province'} key={index}>
                <p className={'lottery__title'}>
                  {handChangeChannel(item?.productChannel)} -{' '}
                  {item?.expireDate ? new Date(moment.utc(item?.expireDate).format()).toLocaleDateString('vi') : ''}
                </p>
                {item?.lotteries.map((lottery, indexLottery) => {
                  return (
                    <div className={'lottery__detail'} key={`lottery${indexLottery}`}>
                      <p className={'lottery__number'}>{lottery?.producName}</p>
                      <p className={'lottery__quantity'}>x{lottery?.quantity}</p>
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
export default FullPairLottery;
