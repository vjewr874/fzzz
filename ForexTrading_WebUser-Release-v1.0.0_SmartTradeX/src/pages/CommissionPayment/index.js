/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import './commission-payment.scss';
import React, { useEffect, useState } from 'react';
import icUser from '../../assets/new-icons/ic-user.svg';
import icKey from '../../assets/new-icons/ic-key.svg';
import icBank from '../../assets/new-icons/ic-bank.svg';
import { Form, Input } from 'antd';
import ModalRegulations from '../../components/Modal/components/ModalRegulations/modal-regulations';
import WalletAmount from '../../components/WalletAmount/WalletAmount';
import { useUser } from '../../context/UserContext';
import swal from 'sweetalert';
import PaymentDepositTransaction from '../../services/paymentDepositTransaction';
import AppUsers from '../../services/apppUsers';
import icCard from '../../assets/new-icons/ic-card-gray.svg';
import icWallet from '../../assets/new-icons/ic-wallet-red.svg';
import icCardHide from '../../assets/new-icons/ic-creditcard-hide.svg';
import icWalletHide from '../../assets/new-icons/ic-wallet-hide.svg';
// import PaymentWithdrawTransaction from "../../services/paymentWithdrawTransaction";

function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState(true);
  const [form] = Form.useForm();
  const { user } = useUser();
  const [reload, setReload] = useState(true);
  function onFinish(values) {
    if (parseInt(values?.paymentAmount) > user?.wallets?.find(wallet => wallet?.walletType === 'BonusWallet').balance) {
      swal(`Không đủ tiền trong ví`, {
        icon: 'warning',
      });
    } else if (parseInt(values?.paymentAmount) < 0) {
      swal(`Vui lòng không nhập giá trị nhỏ hơn 0`, {
        icon: 'warning',
      });
    } else {
      if (info) {
        const newData = {
          // walletId: user?.wallets?.find(wallet => wallet?.walletType === 'BonusWallet').walletId,
          paymentAmount: parseInt(values?.paymentAmount),
          paymentOwner: values?.accountName,
          paymentOriginSource: values?.bankName,
          paymentOriginName: values?.accountNumber,
        };
        const newDataUser = {
          id: user?.appUserId,
          data: {
            sotaikhoan: values?.accountNumber,
            tentaikhoan: values?.accountName,
            tennganhang: values?.bankName,
          },
        };
        withdraw(newData);
        updateUser(newDataUser);
      } else {
        const newData = {
          paymentAmount: parseInt(values?.paymentAmount),
          walletId: user?.wallets?.find(item => item.walletType === 'BonusWallet')?.walletId,
        };
        exchange(newData);
      }
    }
  }
  // function withdraw(data) {
  //     PaymentWithdrawTransaction.requestWithdraw(data).then((result) => {
  //         const {isSuccess} = result
  //         if (isSuccess) {
  //             swal(`Yêu cầu rút tiền đã được gửi đi. Chờ admin duyệt bạn nhé`, {
  //                 icon: "success",
  //             })
  //             setReload(!reload)
  //         } else {
  //             swal(`Có lỗi rồi!!!!`, {
  //                 icon: "warning",
  //             })
  //         }
  //     })
  // }
  function withdraw(data) {
    PaymentDepositTransaction.requestWithdrawBonus(data).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        swal(`Yêu cầu rút tiền đã được gửi đi. Chờ admin duyệt bạn nhé`, {
          icon: 'success',
        });
        setReload(!reload);
      } else {
        swal(`Có lỗi rồi!!!!`, {
          icon: 'warning',
        });
      }
    });
  }
  function exchange(data) {
    PaymentDepositTransaction.requestExchangePoint(data).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        swal(`Yêu cầu rút tiền đã được gửi đi. Chờ admin duyệt bạn nhé`, {
          icon: 'success',
        });
        setReload(!reload);
      } else {
        swal(`Có lỗi rồi!!!!`, {
          icon: 'warning',
        });
      }
    });
  }
  function updateUser(data) {
    AppUsers.updateInfoUser(data).then(() => {});
  }
  useEffect(() => {
    form.setFieldsValue({
      accountName: user.tentaikhoan,
      bankName: user.tennganhang,
      accountNumber: user.sotaikhoan,
    });
  }, []);
  return (
    <Page isHideItemRight={true} headerTitle={'Thanh toán hoa hồng'}>
      <div id="commission-payment">
        <div className="container">
          <WalletAmount reload={reload} type={'BonusWallet'} title={'Hoa hồng'} />
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="right"
          >
            Quy định
          </div>
        </div>
        <div className={'container-withdraw__payment'}>
          <p className={'payment__title'}>Phương thức thanh toán</p>
          <div
            className={'payment'}
            style={{ paddingBottom: '8px' }}
            onClick={() => {
              setInfo(true);
            }}
          >
            <div
              className={'payment__icon background-image'}
              style={{ backgroundImage: `url('${info ? icCard : icCardHide}')` }}
            />
            <p className={'payment__content'} style={{ color: info ? '#092249' : '#D3D3D3' }}>
              Chuyển khoản
            </p>
          </div>
          <div
            className={'payment'}
            onClick={() => {
              setInfo(false);
            }}
          >
            <div
              className={'payment__icon background-image'}
              style={{ backgroundImage: `url('${info ? icWalletHide : icWallet}')` }}
            />
            <p className={'payment__content'} style={{ color: info ? '#D3D3D3' : '#092249' }}>
              Rút về tài khoản
            </p>
          </div>
        </div>
        <Form
          name="withdraw"
          autoComplete="off"
          form={form}
          onFinish={values => {
            onFinish(values);
          }}
        >
          <div className={'container-withdraw__price'}>
            <p className={'price__title'}>Số tiền muốn rút</p>
            <Form.Item
              name="paymentAmount"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tiền cần rút',
                },
                () => ({
                  validator(_, value) {
                    if (value < 50000 && value !== '') {
                      return Promise.reject(new Error('Số tiền rút tối thiểu: 50.000đ'));
                    }
                    if (value > 100000000) {
                      return Promise.reject(new Error('Số tiền rút tối đa: 100.000.000đ'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              className={'mb-0'}
            >
              <div className="container-input">
                <Input className="input" placeholder={'Nhập số tiền cần rút'} type="number" size="large" />
              </div>
            </Form.Item>
          </div>
          {info && (
            <div className={'container-withdraw__price'}>
              <p className={'price__title'}>Thông tin người nhận</p>
              <Form.Item
                name="accountName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên người chủ tài khoản',
                  },
                ]}
                className={'mb-0'}
              >
                <div className="container-input">
                  <div className="login__input__icon-phone position-absolute">
                    <img src={icUser} alt="icon-phone" className="position-static" width={14} />
                  </div>
                  <Input
                    className="input"
                    placeholder={'Họ tên chủ tài khoản'}
                    size="large"
                    defaultValue={user.tentaikhoan}
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="bankName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên ngân hàng',
                  },
                ]}
                className={'mb-0'}
              >
                <div className="container-input">
                  <div className="login__input__icon-phone position-absolute">
                    <img src={icBank} alt="icon-phone" className="position-static" width={14} />
                  </div>
                  <Input className="input" placeholder={'Tên ngân hàng'} size="large" defaultValue={user.tennganhang} />
                </div>
              </Form.Item>
              <Form.Item
                name="accountNumber"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số tài khoản người nhận',
                  },
                  //     {
                  //         min: 9,
                  //         message: 'Số tài khoản ngân hàng không hợp lệ'
                  //     },
                  //     {
                  //         max: 20,
                  //         message: 'Số tài khoản ngân hàng không hợp lệ'
                  //     }
                ]}
                className={'mb-0'}
              >
                <div className="container-input">
                  <div className="login__input__icon-phone position-absolute">
                    <img src={icKey} alt="icon-phone" className="position-static" width={14} />
                  </div>
                  <Input
                    className="input"
                    placeholder={'Số tài khoản ngân hàng'}
                    size="large"
                    defaultValue={user.sotaikhoan}
                  />
                </div>
              </Form.Item>
            </div>
          )}
          <div className={'container-btn'}>
            <button className={'btn btn-main w-100 m-0'}>Tạo lệnh thanh toán</button>
            <p className={'btn-note'}>
              Nếu quý khách nhập sai thông tin người nhận, khoản tiền bị thất thoát công ty chúng tôi sẽ không chịu
              trách nhiệm !{' '}
            </p>
          </div>
        </Form>
      </div>
      <ModalRegulations status={isOpen} closeDrawer={() => setIsOpen(false)} />
    </Page>
  );
}
export default Index;
