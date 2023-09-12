/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import './styles/payment.scss';
import Page from '../../components/Page/Page';
import WalletAmount from '../../components/WalletAmount/WalletAmount';
import currencyFormat from '../../ultils/CurrencyFormat';
import ModalPaymentSuccess from '../../components/Modal/components/ModalPaymentSuccess/ModalPaymentSuccess';
import { useUser } from '../../context/UserContext';
import BuyLotteryAPI from '../../services/buyLottery';
import swal from 'sweetalert';
import { routes } from '../../App';
import { useHistory } from 'react-router-dom';
import AppUsers from '../../services/apppUsers';
import { handleUpdateDetail } from '../../actions';
import { useDispatch } from 'react-redux';

function Payment() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [dataShopCart, setDataShopCart] = useState(null);
  const [dataPayments, setDataPayments] = useState([]);
  const dispatch = useDispatch();
  const { user } = useUser();
  useEffect(() => {
    getPaymentInfoLottery();
  }, []);
  function getPaymentInfoLottery() {
    const data = JSON.parse(localStorage.getItem('paymentLottery'));
    setDataShopCart(data);
    if (data && data?.orderProductItems?.length > 0) {
      data.orderProductItems.forEach(item => {
        dataPayments.push({
          productId: item?.productId,
          orderItemQuantity: item.orderItemQuantity,
        });
      });
      setDataPayments([...dataPayments]);
    }
  }
  function handleReload() {
    getDetailUserById();
  }
  function getDetailUserById() {
    AppUsers.getDetailUserById({
      id: user?.appUserId,
    })
      .then(result => {
        const { isSuccess, data } = result;
        if (isSuccess) {
          dispatch(handleUpdateDetail(data));
        }
      })
      .catch(() => {});
  }
  function getPayment() {
    const dataPayment = {
      orderProductItems: dataPayments,
    };
    BuyLotteryAPI.getPayment(dataPayment).then(r => {
      const { isSuccess, error } = r;
      if (isSuccess) {
        localStorage.removeItem('paymentLottery');
        localStorage.removeItem(`buyLottery${user.username}`);
        setIsOpen(true);
        handleReload();
      } else {
        if (error === 'NOT_ENOUGHT_MONEY') {
          swal(`Số dư trong tài khoản không đủ`, {
            icon: 'warning',
          });
        } else {
          swal(`Có lỗi xảy ra, vui lòng thử lại sau`, {
            icon: 'warning',
          });
        }
      }
    });
  }
  return (
    <Page isHideItemRight={true} headerTitle={'Hình thức nhận vé'}>
      {dataPayments && dataPayments.length > 0 && (
        <div id={'payment'}>
          <div className={'container-payment'}>
            <div className={'container-wallet'}>
              <WalletAmount type={'PointWallet'} />
            </div>
            <div className={'container-info-payment'}>
              <div className={'title'}>Thông tin thanh toán</div>
              <div className={'container-amount'}>
                <div className={'info-detail'}>
                  <p className={'name'}>Tiền vé</p>
                  <p className={'amount'}>{currencyFormat(dataShopCart?.subTotal)} đ</p>
                </div>
                <div className={'info-detail'}>
                  <p className={'name'}>Phí giao dịch</p>
                  <p className={'amount'}>{currencyFormat(dataShopCart?.fee)} đ</p>
                </div>
              </div>
              <div className={'container-amount--total'}>
                <div className={'info-detail'}>
                  <p className={'name'}>Tổng tiền thanh toán</p>
                  <p className={'amount'}>{currencyFormat(dataShopCart?.total)} đ</p>
                </div>
              </div>
            </div>
            <div className={'container-info-payment mb-0 pb-0'}>
              <div className={'title'}>Thông tin người nhận vé</div>
              <div className={'container-amount border-none'}>
                <div className={'info-detail'}>
                  <p className={'name'}>Họ tên</p>
                  <p className={'content'}>{user?.firstName}</p>
                </div>
                <div className={'info-detail'}>
                  <p className={'name'}>Số điện thoại</p>
                  <p className={'content'}>{user?.phoneNumber}</p>
                </div>
                <div className={'info-detail'}>
                  <p className={'name'}>Số CMND/CCCD</p>
                  <p className={'content'}>{user?.identityNumber}</p>
                </div>
              </div>
            </div>
            <div className={'container-action'}>
              <p className={'note'}>
                Quý khách vui lòng kiểm tra kỹ và đảm bảo thông tin là chính xác. Thông tin này sẽ được ghi vào mặt sau
                của vé.
              </p>
              <button className={'btn btn-main w-100'} onClick={() => getPayment()}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
      {(!dataPayments || dataPayments?.length === 0) && (
        <div className={'text-center py-5'}>Không có thông tin thanh toán</div>
      )}
      <ModalPaymentSuccess
        status={isOpen}
        closeDrawer={() => {
          setIsOpen(false);
          history.push(routes.home.path);
        }}
      />
    </Page>
  );
}
export default Payment;
