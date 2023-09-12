/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import './styles/shop-cart.scss';
import FullPairLottery from './components/FullPairLottery/FullPairLottery';
import NormalLottery from './components/NormalLottery/NormalLottery';
import currencyFormat from '../../ultils/CurrencyFormat';
import { routes } from '../../App';
import { useHistory } from 'react-router-dom';
import ModalConfirm from '../../components/Modal/components/ModalComfirm/ModalConfirm';
import BuyLotteryAPI from '../../services/buyLottery';
import Modal from '../../components/Modal/Modal';
import swal from 'sweetalert';
import { useUser } from '../../context/UserContext';

function ShopCart() {
  const history = useHistory();
  const { user } = useUser();
  const [dataShopCart, setDataShopCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [dataFail, setDataFail] = useState([]);
  useEffect(() => {
    getBuyLottery();
  }, []);
  function getBuyLottery() {
    let data = JSON.parse(localStorage?.getItem(`buyLottery${user.username}`));
    if (data?.productSingleList.length > 0) {
      data.totalPrice = 0;
      data.productSingleList.forEach((product, index) => {
        const date = new Date(product.expireDate);
        date.setHours(16);
        date.setMinutes(15);
        if (new Date() > date) {
          data.productSingleList.splice(index);
        } else data.totalPrice = data?.totalPrice + parseInt(product?.totalSinglePrice);
      });
      data.productSpecialList.forEach((product, index) => {
        const date = new Date(product.expireDate);
        date.setHours(16);
        date.setMinutes(15);
        if (new Date() > date) {
          data.productSpecialList.splice(index);
        } else data.totalPrice = data?.totalPrice + parseInt(product?.totalBatchPrice);
      });
    }
    setDataShopCart(data);
    localStorage.removeItem(`buyLottery${user.username}`);
    localStorage.setItem(`buyLottery${user.username}`, JSON.stringify(data));
  }

  function handleRemove() {
    dataShopCart.productSingleList = [];
    dataShopCart.productSpecialList = [];
    handleGetTotalPrice(dataShopCart);
    setIsOpen(false);
  }

  function handleChangeLotterySingle(index, value) {
    if (dataShopCart.productSingleList[index].quantity >= value) {
      dataShopCart.productSingleList[index].OrderItemQuantity = value;
      dataShopCart.productSingleList[index].totalSinglePrice =
        dataShopCart?.productSingleList[index]?.OrderItemPrice * value;
    } else {
      dataShopCart.productSingleList[index].OrderItemQuantity = dataShopCart?.productSingleList[index]?.quantity;
      dataShopCart.productSingleList[index].totalSinglePrice =
        dataShopCart?.productSingleList[index]?.OrderItemPrice * dataShopCart?.productSingleList[index]?.quantity;
    }
    handleGetTotalPrice(dataShopCart);
  }
  function handleRemoveLotterySingle(index) {
    dataShopCart.productSingleList.splice(index, 1);
    handleGetTotalPrice(dataShopCart);
  }
  function handleRemoteSingleLotteries() {
    dataShopCart.productSingleList = [];
    handleGetTotalPrice(dataShopCart);
  }
  function handleRemoveLotterySpecial(index) {
    dataShopCart.productSpecialList.splice(index, 1);
    handleGetTotalPrice(dataShopCart);
  }
  function handleRemoteSpecialLotteries() {
    dataShopCart.productSpecialList = [];
    handleGetTotalPrice(dataShopCart);
  }

  function getData() {
    let orderProductItem = [];
    if (dataShopCart?.productSingleList?.length > 0) {
      dataShopCart.productSingleList.forEach(product => {
        orderProductItem.push({
          orderItemQuantity: product?.OrderItemQuantity,
          productId: product?.productId,
        });
      });
    }
    if (dataShopCart?.productSpecialList?.length > 0) {
      dataShopCart.productSpecialList.forEach(product => {
        orderProductItem.push({
          orderItemQuantity: product?.OrderItemQuantity,
          productId: product?.productId,
        });
      });
    }
    getPreCheck(orderProductItem);
  }
  function getPreCheck(data) {
    const dataCheck = {
      orderProductItems: data,
    };
    BuyLotteryAPI.getPreCheckOrder(dataCheck).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        checkQuantityOfProduct(data);
      } else {
        swal(`Có lỗi xảy ra, vui lòng thử lại sau`, {
          icon: 'warning',
        });
      }
    });
  }

  function checkQuantityOfProduct(data) {
    const dataFails = data.orderProductItems.filter(item => item.orderItemQuantity > item.stockQuantity);
    setDataFail(dataFails);
    if (dataFails?.length > 0) {
      let findProductTitle = null;
      if (dataShopCart?.productSingleList?.length > 0) {
        const findProduct = dataShopCart?.productSingleList.find(
          product => product?.productId === dataFails[0]?.productId,
        );
        if (findProduct) {
          findProductTitle = findProduct.productTitle || findProduct.producName;
        }
      }
      if (dataShopCart?.productSpecialList?.length > 0 && !findProductTitle) {
        const findProduct = dataShopCart?.productSpecialList.find(
          product => product?.productId === dataFails[0]?.productId,
        );
        if (findProduct) {
          findProductTitle = findProduct.productTitle || findProduct.producName;
        }
      }
      setMessage(
        `Hiện tại bộ số <b> ${findProductTitle} </b> chỉ còn <b>${dataFails[0]?.stockQuantity}</b> vé. Quý khách có muốn đặt mua toàn bộ không?`,
      );
      setIsOpenNotification(true);
    } else {
      localStorage.removeItem('paymentLottery');
      localStorage.setItem('paymentLottery', JSON.stringify(data));
      history.push(routes.payment.path);
    }
  }
  async function handleAccept() {
    dataFail.forEach(data => {
      if (dataShopCart?.productSingleList?.length > 0) {
        const indexSingle = dataShopCart.productSingleList.findIndex(product => product?.productId === data?.productId);
        if (indexSingle >= 0) {
          dataShopCart.productSingleList[indexSingle].OrderItemQuantity = data?.stockQuantity;
          dataShopCart.productSingleList[indexSingle].totalSinglePrice =
            dataShopCart?.productSingleList[indexSingle]?.OrderItemPrice * data?.stockQuantity;
        }
      }
      if (dataShopCart?.productSpecialList?.length > 0) {
        const indexSpecial = dataShopCart.productSpecialList.findIndex(
          product => product?.productId === data?.productId,
        );
        if (indexSpecial >= 0) {
          dataShopCart.productSpecialList[indexSpecial].orderItemQuantity = data?.stockQuantity;
        }
      }
    });
    setIsOpenNotification(false);
    setTimeout(() => {
      handleGetTotalPrice(dataShopCart);
      getData();
    }, 500);
  }
  function handleGetTotalPrice(data) {
    data.totalPrice = 0;
    if (data?.productSingleList?.length > 0) {
      data.productSingleList.forEach(product => {
        data.totalPrice = data?.totalPrice + product?.totalSinglePrice;
      });
    }
    if (data?.productSpecialList?.length > 0) {
      data.productSpecialList.forEach(product => {
        data.totalPrice = data?.totalPrice + product?.totalBatchPrice;
      });
    }
    localStorage.removeItem(`buyLottery${user.username}`);
    localStorage.setItem(`buyLottery${user.username}`, JSON.stringify(data));
    setDataShopCart({ ...data });
  }

  return (
    <Page headerTitle={'Đặt vé'} isShowTrash={true} handleRemove={() => setIsOpen(true)}>
      <div id={'shop-cart'}>
        {(dataShopCart?.productSpecialList?.length > 0 || dataShopCart?.productSingleList?.length > 0) && (
          <>
            <div className={'container-shop-cart'}>
              <FullPairLottery
                lotteryList={dataShopCart?.productSpecialList}
                removeLotterySpecial={index => handleRemoveLotterySpecial(index)}
                removeSpecialLotteries={() => handleRemoteSpecialLotteries()}
              />
              <NormalLottery
                lotteryList={dataShopCart?.productSingleList}
                changeLotterySingle={(index, value) => handleChangeLotterySingle(index, value)}
                removeLotterySingle={index => handleRemoveLotterySingle(index)}
                remoteSingleLotteries={() => handleRemoteSingleLotteries()}
              />
            </div>
            <div className={`container-order-lottery show`}>
              <div className={'container-amount'}>
                <p className={'title'}>Giá vé tạm tính</p>
                <p className={'amount'}>{currencyFormat(dataShopCart?.totalPrice)} đ</p>
              </div>
              <div className={'container-btn'}>
                <div className={'btn btn-main btn-choose ml-0'} onClick={() => history.push(routes.buyLottery.path)}>
                  Chọn thêm
                </div>
                <div className={'btn btn-main btn-buy ml-0'} onClick={() => getData()}>
                  Nhận vé
                </div>
              </div>
            </div>
          </>
        )}
        {(!dataShopCart ||
          (dataShopCart?.productSpecialList?.length === 0 && dataShopCart?.productSingleList?.length === 0)) && (
          <div className={'text-center py-5'}>Chưa có Vé nào được thêm vào giỏ hàng</div>
        )}
        <ModalConfirm
          status={isOpen}
          closeDrawer={() => setIsOpen(false)}
          content={'xóa hết sản phẩm khỏi giỏ hàng không?'}
          accept={() => handleRemove()}
        />
        <Modal status={isOpenNotification} closeDrawer={() => setIsOpenNotification(false)}>
          <div className={'container-notification'}>
            <h3 className={'title'}>Thông báo!</h3>
            <p className={'content'} dangerouslySetInnerHTML={{ __html: message }} />
            <div className={'container-btn__modal'}>
              <button className={'btn btn-cancel'} onClick={() => setIsOpenNotification(false)}>
                Hủy bỏ
              </button>
              <button className={'btn btn-main'} onClick={() => handleAccept()}>
                Đồng ý
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Page>
  );
}
export default ShopCart;
