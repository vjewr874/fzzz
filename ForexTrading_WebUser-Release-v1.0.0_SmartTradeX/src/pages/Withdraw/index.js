/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import './styles/withdraw.scss';
import { useUser } from '../../context/UserContext';
import { Form, Input, InputNumber } from 'antd';
import PaymentWithdrawTransaction from '../../services/paymentWithdrawTransaction';
import AppUsers from '../../services/apppUsers';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { handleUpdateDetail } from '../../actions';

//icon
import icArrowNext from '../../assets/stock-icons/ic-arrowNext.svg';
import Loader from '../../components/Loader';

function Withdraw({ intl }) {
  const [form] = Form.useForm();
  const { user } = useUser();
  const dispatch = useDispatch();
  const [paymentAmountUSDT, setPaymentAmountUSDT] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [fee, setFee] = useState(0);
  // const [reload, setReload] = useState(true);
  function onFinish(values) {
    const amountNumber = paymentAmountUSDT;
    const newData = {
      walletId: user?.wallets?.find(wallet => wallet?.walletType === 'RewardWallet').walletId,
      paymentAmount: parseFloat(amountNumber),
      paymentOwner: values?.accountName,
      paymentOriginSource: values?.bankName,
      paymentOriginName: values?.accountNumber,
      // paymentFeeAmount: (parseInt(values?.paymentAmount) * 0.02).toFixed(0),
    };
    const newDataUser = {
      id: user?.appUserId,
      data: {
        sotaikhoan: values?.accountNumber,
        tentaikhoan: values?.accountName,
        tennganhang: values?.bankName,
        phoneNumber: values?.phoneNumber,
      },
    };
    if (parseFloat(amountNumber) > user?.wallets?.find(wallet => wallet?.walletType === 'RewardWallet').balance) {
      swal(intl.formatMessage({ id: 'NOT_ENOUGH_BALANCE' }), {
        icon: 'warning',
      });
    } else {
      setIsLoading(true);
      updateUser(newDataUser, newData);
    }
  }
  function withdraw(data) {
    PaymentWithdrawTransaction.requestWithdraw(data).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        swal(intl.formatMessage({ id: 'Withdrawal request has been sent. Wait for admin to approve you' }), {
          icon: 'success',
        });
        handleReload();
      } else {
        swal(intl.formatMessage({ id: 'error' }), {
          icon: 'warning',
        });
      }
    });
  }
  function updateUser(data, dataToWithdraw) {
    AppUsers.updateInfoUser(data).then(result => {
      setIsLoading(false);
      const { isSuccess, error } = result;
      if (!isSuccess) {
        handledErrorUser(error);
      } else {
        setIsLoading(true);
        withdraw(dataToWithdraw);
      }
    });
  }
  useEffect(() => {
    form.setFieldsValue({
      accountName: user.tentaikhoan,
      bankName: user.tennganhang,
      accountNumber: user.sotaikhoan,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    handleReload();
  }, []);
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
        setIsLoading(false);
      })
      .catch(() => {});
  }

  function handledErrorUser(error) {
    if (error === 'DUPLICATED_USER') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER' }), {
        icon: 'warning',
      });
    } else if (error === 'DUPLICATED_USER_EMAIL') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER_EMAIL' }), {
        icon: 'warning',
      });
    } else if (error === 'DUPLICATED_USER_PHONE') {
      swal(intl.formatMessage({ id: 'DUPLICATED_USER_PHONE' }), {
        icon: 'warning',
      });
    } else if (error === 'INVALID_REFER_USER') {
      swal(intl.formatMessage({ id: 'INVALID_REFER_USER' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_AUTHORIZED') {
      swal(intl.formatMessage({ id: 'NOT_AUTHORIZED' }), {
        icon: 'warning',
      });
    } else if (error === 'USER_LOCKED') {
      swal(intl.formatMessage({ id: 'USER_LOCKED' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_VERIFIED_EMAIL') {
      swal(intl.formatMessage({ id: 'NOT_VERIFIED_EMAIL' }), {
        icon: 'warning',
      });
    } else if (error === 'NOT_VERIFIED_PHONE') {
      swal(intl.formatMessage({ id: 'NOT_VERIFIED_PHONE' }), {
        icon: 'warning',
      });
    } else if (error === 'REFER_USER_NOT_FOUND') {
      swal(intl.formatMessage({ id: 'REFER_USER_NOT_FOUND' }), {
        icon: 'warning',
      });
    } else if (error === 'OTP_NOT_FOUND') {
      swal(intl.formatMessage({ id: 'OTP_NOT_FOUND' }), {
        icon: 'warning',
      });
    } else {
      swal(intl.formatMessage({ id: 'error' }), {
        icon: 'warning',
      });
    }
  }
  return (
    <Page headerTitle={intl.formatMessage({ id: 'Withdraw' })}>
      <div id={'withdraw'}>
        {isLoading ? <Loader /> : null}
        <Form
          name="withdraw"
          autoComplete="off"
          form={form}
          onFinish={values => {
            onFinish(values);
          }}
        >
          <div className="withdraw">
            <div className="withdraw-infoUser">
              <div className="title">{intl.formatMessage({ id: 'withdraw.information' })}</div>
              <div className="content">
                <div className="item">
                  <Form.Item
                    name="accountName"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({ id: 'withdraw.please_enter_account_name' }),
                      },
                    ]}
                    className={'mb-0'}
                  >
                    <div className="cover-input">
                      <span className="name">{intl.formatMessage({ id: 'withdraw.AccountName' })}</span>
                      <Input
                        className="input"
                        size="large"
                        defaultValue={user.tentaikhoan}
                        disabled={user.tentaikhoan}
                        style={{ border: `${user.tentaikhoan ? '' : '0.5px solid #666'}` }}
                      />
                      {/*<p>{user?.tentaikhoan}</p>*/}
                    </div>
                  </Form.Item>
                </div>

                <div className="item">
                  <Form.Item
                    name="accountNumber"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({ id: 'withdraw.please_enter_account_bank' }),
                      },
                    ]}
                    className={'mb-0'}
                  >
                    <div className="cover-input">
                      <span className="name">{intl.formatMessage({ id: 'withdraw.account_bank' })}</span>
                      <Input
                        className="input"
                        size="large"
                        defaultValue={user.sotaikhoan}
                        disabled={user.sotaikhoan}
                        style={{ border: `${user.sotaikhoan ? '' : '0.5px solid #666'}` }}
                      />
                      {/*<p>{user?.sotaikhoan}</p>*/}
                    </div>
                  </Form.Item>
                </div>

                <div className="item">
                  <Form.Item
                    name="bankName"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({ id: 'withdraw.please_enter_name_bank' }),
                      },
                    ]}
                    className={'mb-0'}
                  >
                    <div className="cover-input">
                      <span className="name">{intl.formatMessage({ id: 'withdraw.name_bank' })}</span>
                      <Input
                        className="input"
                        size="large"
                        defaultValue={user.tennganhang}
                        disabled={user.tennganhang}
                        style={{ border: `${user.tennganhang ? '' : '0.5px solid #666'}` }}
                      />
                      {/*<p>{user?.tennganhang}</p>*/}
                    </div>
                  </Form.Item>
                </div>

                {!user.phoneNumber && (
                  <div className="item">
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: 'Please enter the phone number' }),
                        },
                      ]}
                      className={'mb-0'}
                    >
                      <div className="cover-input">
                        <span className="name">{intl.formatMessage({ id: 'Phone number' })}</span>
                        <Input
                          className="input"
                          size="large"
                          defaultValue={user.phoneNumber}
                          style={{ border: `${user.tennganhang ? '' : '0.5px solid #666'}` }}
                        />
                      </div>
                    </Form.Item>
                  </div>
                )}
                {user.phoneNumber && (
                  <div className="item">
                    <div className="cover-input">
                      <span className="name">{intl.formatMessage({ id: 'Phone number' })}</span>
                      <p>{user?.phoneNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={'container-withdraw__price'}>
              <p className={'price__title'}>{intl.formatMessage({ id: 'withdraw.transaction' })}</p>
              <Form.Item
                name="paymentAmount"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'Please enter the amount to withdraw' }),
                  },
                  () => ({
                    validator(_, value) {
                      // setFee(value);
                      const amountNumber = parseFloat(value?.replaceAll(',', ''));
                      if ((amountNumber < 10 || isNaN(amountNumber)) && value !== '') {
                        return Promise.reject(
                          new Error(intl.formatMessage({ id: 'Minimum withdrawal amount is more than 10' })),
                        );
                      }
                      if (amountNumber > 1000000000) {
                        return Promise.reject(
                          new Error(intl.formatMessage({ id: 'Maximum withdrawal amount: 1,000,000,000đ' })),
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                className={'mb-0'}
              >
                <div className="container-input">
                  <span className="title">{intl.formatMessage({ id: 'withdraw.withdraw_amount' })}</span>
                  <InputNumber
                    className={'input'}
                    placeholder={intl.formatMessage({ id: 'Please enter the amount you want to withdraw' })}
                    value={paymentAmountUSDT}
                    onChange={e => {
                      const amountNumber = e?.toFixed(2);
                      setPaymentAmountUSDT(parseFloat(amountNumber));
                    }}
                    formatter={value => `${value}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                  <div className="bar" />
                  {/*<span className={"getAll"}*/}
                  {/*      onClick={()=> form.setFieldValue({ paymentAmount: 1 })}*/}
                  {/*>Toàn bộ</span>*/}
                </div>
              </Form.Item>
            </div>
            <div className={'container-btn'}>
              <button className={'btn-main w-100 m-0'}>
                {intl.formatMessage({ id: 'withdraw.withdraw_confirm' })} <img src={icArrowNext} alt="" />
              </button>
            </div>
          </div>
        </Form>
      </div>
    </Page>
  );
}
export default injectIntl(Withdraw);
