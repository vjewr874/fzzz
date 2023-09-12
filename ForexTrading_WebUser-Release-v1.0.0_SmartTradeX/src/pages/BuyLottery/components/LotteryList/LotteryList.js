/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import './styles/lottery-list.scss';
import ModalChooseLottery from '../../../../components/Modal/components/ModalChooseLottery/ModalChooseLottery';

//icons
import icTick from '../../../../assets/new-icons/ic-tick-red.svg';
import icTickPurple from '../../../../assets/new-icons/ic-tick-purple.svg';

//image
import imLottery from '../../../../assets/new-images/img-lottery.png';
import { notification } from 'antd';

function LotteryList(props) {
  const [isOpen, setIsOpen] = useState();
  const [lottery, setLottery] = useState(null);
  const openNotification = (placement, types, info) => {
    notification[types]({
      message: `${info}`,
      description: '',
      placement,
    });
  };
  function getLottery(item) {
    if (props?.typeLottery === 'SINGLE') {
      getLotteryNormal(item);
    }
    if (props?.typeLottery === 'BATCH') {
      getLotterySpecial(item);
    }
  }
  function getLotteryNormal(item) {
    const index = props?.shopCartList?.findIndex(shopCart => shopCart?.productId === item?.productId);
    if (index >= 0) {
      props.removeArr(index);
    } else if (item?.stockQuantity > 0) {
      setIsOpen(true);
      setLottery(item);
    } else openNotification('bottom', 'error', 'Úi, hình như hết vé rồi');
  }
  function getLotterySpecial(item) {
    const index = props?.shopCartList?.findIndex(shopCart => shopCart?.productId === item?.productId);
    if (index >= 0) {
      props.removeArr(index);
    } else {
      const data = {
        productId: item.productId,
        producName: item.producName,
        productType: item.productType,
        expireDate: item?.expireDate,
        productChannel: item.productChannel,
        quantity: item.quantity,
        OrderItemQuantity: 1,
        OrderItemPrice: item?.price,
        totalBatchPrice: item?.price,
      };
      props.handleAccept(data);
    }
  }
  function findData(item) {
    return props?.shopCartList?.find(shopCart => shopCart?.productId === item?.productId);
  }

  return props?.lotteries?.filter(lottery => lottery?.stockQuantity > 0)?.length > 0 ? (
    <div id={'lottery-list'}>
      <div className={`container-lottery-list ${props.typeViewLottery === false ? 'rowNumberLottery' : ''}`}>
        {props?.lotteries
          ?.filter(lottery => lottery?.stockQuantity > 0)
          ?.map((item, index) => {
            return (
              <div
                className={` container-lottery ${
                  findData(item)
                    ? props?.typeLottery === 'SINGLE'
                      ? 'active'
                      : props?.typeLottery === 'BATCH'
                      ? 'active-special'
                      : 'rowNumberLottery-item'
                    : ''
                } ${props.typeViewLottery === false ? 'rowNumberLottery-item' : ''}`}
                key={index}
                onClick={() => getLottery(item)}
              >
                {props.typeViewLottery === true ? (
                  <div className={'lottery'}>
                    <div className={'container-image'}>
                      <div
                        className={'background-image image'}
                        style={{
                          backgroundImage: `url('${
                            item?.productImages?.length > 0 ? item?.productImages[0] : imLottery
                          }')`,
                        }}
                      />
                      <div
                        className={'icon-tick background-image'}
                        style={{ backgroundImage: `url('${props?.typeLottery === 'SINGLE' ? icTick : icTickPurple}')` }}
                      />
                    </div>
                    <div className={'container-info'}>
                      <p className={'lottery-number'}>{item?.producName}</p>
                      {props?.typeLottery === 'SINGLE' && (
                        <div className={'lottery-input'}>x{findData(item) ? findData(item)?.OrderItemQuantity : 0}</div>
                      )}
                      {props?.typeLottery === 'BATCH' && (
                        <div className={'lottery-input'}>x{item?.quantity ? item?.quantity : 0}</div>
                      )}

                      {props?.typeLottery === 'SINGLE' && (
                        <p className={'lottery-quantity'}>
                          Còn: <span> {item?.stockQuantity ? item?.stockQuantity : 0} vé</span>
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={'lottery lotteryNumber'}>
                    <div
                      className={'icon-tick background-image'}
                      style={{ backgroundImage: `url('${props?.typeLottery === 'SINGLE' ? icTick : icTickPurple}')` }}
                    />
                    <div className={'lotteryNumber-contain'}>
                      <p className={'lotteryNumber-number'}>{item?.producName}</p>
                      {props?.typeLottery === 'SINGLE' && (
                        <div className={'lotteryNumber-quantity'}>
                          ({findData(item) ? findData(item)?.OrderItemQuantity + '/' : ''}
                          {item?.stockQuantity ? item?.stockQuantity : 0})
                        </div>
                      )}
                      {props?.typeLottery === 'BATCH' && (
                        <div className={'lotteryNumber-quantity'}>CN-{item?.quantity ? item?.quantity : 0}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <ModalChooseLottery
        status={isOpen}
        closeDrawer={() => setIsOpen(false)}
        lottery={lottery}
        handleAccept={data => props?.handleAccept(data)}
      />
    </div>
  ) : (
    <div className={'text-center py-5'}>Không có dữ liệu</div>
  );
}
export default LotteryList;
