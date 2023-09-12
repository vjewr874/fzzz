/* Copyright (c) 2022-2023 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect, useState, useRef } from 'react';
import Page from '../../components/Page/Page';
import './styles/recharge.scss';
import { injectIntl, useIntl } from 'react-intl';
import { Form, notification, InputNumber, Tabs, Input, Select } from 'antd';
import { convertFileToBase64, isShowUnitAppCurrency } from '../../helper/common';
import swal from 'sweetalert';
import Upload from '../../services/upload';
import PaymentDepositTransaction from '../../services/paymentDepositTransaction';
import PaymentMethod from './../../services/paymentMethod';
//icon

import icArrowNext from '../../assets/stock-icons/ic-arrowNext.svg';
import icTrash from '../../assets/stock-icons/ic-trash.svg';
import { currencyFormatUSD } from '../../ultils/CurrencyFormat';
import { useDispatch, useSelector } from 'react-redux';
import SystemConfiguration from '../../services/systemConfiguration';
import Loader from '../../components/Loader';
import icDeposit from '../../assets/forex-icons/ic-deposit.svg';
import icDepositActive from '../../assets/forex-icons/ic-deposit-active.svg';
import icWidthDraw from '../../assets/forex-icons/ic-withdraw.svg';
import icWidthDrawActive from '../../assets/forex-icons/ic-withdraw-active.svg';
import ic_upload from '../../assets/stock-icons/ic-upload.svg';
import ic_Work from '../../assets/stock-icons/ic-work.svg';
import ic_Wallet from '../../assets/stock-icons/ic-wallet2.svg';
import ic_Wallet_transf from '../../assets/stock-icons/ic-wallet-transf.svg';
import ic_card from '../../assets/stock-icons/ic-card.svg';
import icCoppy from '../../assets/stock-icons/ic-coppy.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { LINK_DEPOSIT, LINK_WITHDRAW } from '../../constants/url';
import { useUser } from '../../context/UserContext';
import PaymentWithdrawTransaction from '../../services/paymentWithdrawTransaction';
import AppUsers from '../../services/apppUsers';
import { handleUpdateDetail } from '../../actions';
const listTabs = [
  {
    label: 'Deposit',
    value: 'all',
    icon: icDeposit,
    icon_active: icDepositActive,
  },
  {
    label: 'Withdraw',
    value: 'all',
    icon: icWidthDraw,
    icon_active: icWidthDrawActive,
  },
];
const listbanks = [
  {
    value: 'Agribank',
    label: 'Agribank',
  },
  {
    value: 'CB',
    label: 'CB',
  },
  {
    value: 'Oceanbank',
    label: 'Oceanbank',
  },
  {
    value: 'GPBank',
    label: 'GPBank',
  },
  {
    value: 'BIDV',
    label: 'BIDV',
  },
  {
    value: 'VietinBank',
    label: 'VietinBank',
  },
  {
    value: 'Vietcombank',
    label: 'Vietcombank',
  },
  {
    value: 'VPBank',
    label: 'VPBank',
  },
  {
    value: 'MB',
    label: 'MB',
  },
  {
    value: 'Techcombank',
    label: 'Techcombank',
  },
  {
    value: 'ACB',
    label: 'ACB',
  },
  {
    value: 'SHB',
    label: 'SHB',
  },
  {
    value: 'HDBank',
    label: 'HDBank',
  },
  {
    value: 'SCB',
    label: 'SCB',
  },
  {
    value: 'Sacombank',
    label: 'Sacombank',
  },
  {
    value: 'TPBank',
    label: 'TPBank',
  },
  {
    value: 'VIB',
    label: 'VIB',
  },
  {
    value: 'MSB',
    label: 'MSB',
  },
  {
    value: 'SeABank',
    label: 'SeABank',
  },
  {
    value: 'OCB',
    label: 'OCB',
  },
  {
    value: 'Eximbank',
    label: 'Eximbank',
  },
  {
    value: 'LienVietPostBank',
    label: 'LienVietPostBank',
  },
  {
    value: 'PVcombank',
    label: 'PVcombank',
  },
  {
    value: 'Bac A Bank',
    label: 'Bac A Bank',
  },
  {
    value: 'Đông Á Bank',
    label: 'Đông Á Bank',
  },
  {
    value: 'BaoViet Bank',
    label: 'BaoViet Bank',
  },
  {
    value: 'ABBANK',
    label: 'ABBANK',
  },
  {
    value: 'Nam A Bank',
    label: 'Nam A Bank',
  },
  {
    value: 'VietBank',
    label: 'VietBank',
  },
  {
    value: 'Viet A Bank',
    label: 'Viet A Bank',
  },
  {
    value: 'NCB',
    label: 'NCB',
  },
  {
    value: 'BanVietBank',
    label: 'BanVietBank',
  },
  {
    value: 'Kienlongbank',
    label: 'Kienlongbank',
  },
  {
    value: 'Saigonbank',
    label: 'Saigonbank',
  },
  {
    value: 'PG Bank',
    label: 'PG Bank',
  },
  {
    value: 'Shinhan Bank',
    label: 'Shinhan Bank',
  },
  {
    value: 'HSBC',
    label: 'HSBC',
  },
  {
    value: 'Woori Bank',
    label: 'Woori Bank',
  },
  {
    value: 'CIMB Bank',
    label: 'CIMB Bank',
  },
  {
    value: 'Public Bank',
    label: 'Public Bank',
  },
  {
    value: 'Hong Leong Bank',
    label: 'Hong Leong Bank',
  },
  {
    value: 'UOB',
    label: 'UOB',
  },
  {
    value: 'ANZ',
    label: 'ANZ',
  },
];
function Recharge({ intl }) {
  const [form] = Form.useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const data = useSelector(state => (state.member ? state.member : null));
  const [rechargeImage, setRechargeImage] = useState(undefined);
  const [system, setSystem] = useState(null);
  const [paymentAmountUSDT, setPaymentAmountUSDT] = useState(null);
  const [withdrawAmountUSDT, setWithdrawAmountUSDT] = useState(null);
  const [typeInfo, setTypeInfo] = useState('bank');
  const [isLoading, setIsLoading] = useState(false);
  const { TabPane } = Tabs;
  const { formatMessage: f } = useIntl();
  const user = useUser().user;
  const [key, setKey] = useState(searchParams?.get('key') ? parseInt(searchParams?.get('key')) : 0);
  const checkParams = filterParams => {
    const params = {};
    if (filterParams?.key) {
      params.key = filterParams.key;
    }
    const urlSearchParams = new URLSearchParams(params);
    history.replace({ pathname: location.pathname, search: urlSearchParams.toString() });
  };
  useEffect(() => {
    setIsLoading(true);
    PaymentMethod.getList().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setPaymentMethod(data.data);
      }
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    checkParams({ key: key });
    SystemConfiguration.systemConfigurationGetDetail().then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setSystem(data);
      }
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      withdrawTentaikhoan: user.tentaikhoan,
      withdrawTennganhang: user.tennganhang,
      withdrawSotaikhoan: user.sotaikhoan,
    });
  }, []);

  function onFinishDeposit(value) {
    if (LINK_DEPOSIT) {
      window.open(LINK_DEPOSIT);
    } else {
      const params = {
        paymentAmount: paymentAmountUSDT,
        paymentRef: value.paymentRef,
        paymentRefImageUrl: rechargeImage,
      };
      setIsLoading(true);
      PaymentDepositTransaction.requestDeposit(params).then(result => {
        const { isSuccess } = result;
        setIsLoading(false);
        if (isSuccess) {
          setPaymentAmountUSDT(undefined);
          form.resetFields(['noneImg']);
          form.resetFields(['paymentRef']);
          setRechargeImage(undefined);
          swal(intl.formatMessage({ id: 'Deposit request has been sent. Wait for admin to approve you' }), {
            icon: 'success',
          });
        } else {
          swal(intl.formatMessage({ id: 'error' }), {
            icon: 'warning',
          });
        }
      });
    }
  }
  function onFinishWithdraw(value) {
    // console.log(value);
    if (LINK_WITHDRAW) {
      window.open(LINK_WITHDRAW);
    } else {
      if (!withdrawAmountUSDT) {
        return;
      }
      if (true) {
        if (
          parseFloat(withdrawAmountUSDT) > user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance
        ) {
          swal(intl.formatMessage({ id: 'NOT_ENOUGH_BALANCE' }), {
            icon: 'warning',
          });
          return;
        }
        const param = {
          walletId: user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').walletId,
          paymentAmount: withdrawAmountUSDT,
          paymentOwner: value.withdrawTentaikhoan,
          paymentOriginSource: value.withdrawTennganhang,
          paymentOriginName: value.withdrawSotaikhoan,
        };
        const newDataUser = {
          id: user?.appUserId,
          data: {
            sotaikhoan: value.withdrawSotaikhoan,
            tentaikhoan: value.withdrawTentaikhoan,
            tennganhang: value.withdrawTennganhang,
          },
        };
        setIsLoading(true);
        AppUsers.updateInfoUser(newDataUser).then(result => {
          setIsLoading(false);
          const { isSuccess, error } = result;
          if (!isSuccess) {
            handledErrorUser(error);
          } else {
            setIsLoading(true);
            PaymentWithdrawTransaction.requestWithdraw(param).then(result => {
              setIsLoading(false);
              const { isSuccess } = result;
              if (isSuccess) {
                swal(intl.formatMessage({ id: 'Withdrawal request has been sent. Wait for admin to approve you' }), {
                  icon: 'success',
                });
                setWithdrawAmountUSDT(undefined);
                handleReload();
              } else {
                swal(intl.formatMessage({ id: 'error' }), {
                  icon: 'warning',
                });
              }
            });
          }
        });
      }
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
  function RequestDeposit(data) {
    PaymentDepositTransaction.requestDeposit(data).then(result => {
      const { isSuccess } = result;
      setIsLoading(false);
      if (isSuccess) {
        form.resetFields(['noneImg']);
        setRechargeImage(undefined);
        setPaymentAmountUSDT(0);
        swal(intl.formatMessage({ id: 'Deposit request has been sent. Wait for admin to approve you' }), {
          icon: 'success',
        });
      } else {
        swal(intl.formatMessage({ id: 'error' }), {
          icon: 'warning',
        });
      }
    });
  }
  const handleFileChange = event => {
    setIsLoading(true);
    const fileObj = event.target.files && event.target.files[0];
    const file = event.target.files[0];
    if (!fileObj) {
    } else {
      convertFileToBase64(file).then(dataUrl => {
        const newData = dataUrl.replace(/,/gi, '').split('base64');
        if (newData[1]) {
          if (
            file?.type.replace('image/', '') !== 'png' &&
            file?.type.replace('image/', '') !== 'jpeg' &&
            file?.type.replace('image/', '') !== 'jpg'
          ) {
            openNotification('top', 'error', intl.formatMessage({ id: 'Incorrect file format!!!' }));
          } else {
            uploadRechargeImage(newData[1], file?.type.replace('image/', ''));
          }
        }
      });
    }
  };
  function uploadRechargeImage(urlAvatar, type) {
    Upload.uploadMediaFile({
      imageData: urlAvatar,
      imageFormat: type,
    }).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        setRechargeImage(result?.data);
      } else {
        openNotification('top', 'error', intl.formatMessage({ id: 'Update Error' }));
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
  function handleCopyUrl(value) {
    let textField = document.createElement('textarea');
    textField.innerText = value;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    openNotification('top', 'success', intl.formatMessage({ id: 'Copy Success' }));
  }

  function handleDeleteImage() {
    setRechargeImage(undefined);
    form.resetFields(['noneImg']);
  }

  const onChange = key => {
    //setIsLoading(true)
    setKey(+key);
    checkParams({ key: +key });
    setPaymentAmountUSDT(null);
    setWithdrawAmountUSDT(null);
  };
  return (
    <Page isHideRigthItem={true} headerTitle={intl.formatMessage({ id: 'Wallet' })}>
      <div id={'recharge'}>
        {isLoading ? <Loader /> : null}
        <div className="recharge">
          <Tabs
            activeKey={key.toString()}
            defaultActiveKey={0}
            onChange={onChange}
            className={`tab-recharge-withdraw ${key === 0 ? 'colorGreenTab' : 'colorRedTab'}`}
          >
            {/* {
              listTabs.map((item, index) => {
                return ( */}
            <TabPane
              tab={
                <span className={`d-flex align-items-center ${key === 0 ? 'colorGreen' : ''}`}>
                  <img src={key === 0 ? icDepositActive : icDeposit} style={{ marginRight: '10px' }} alt={'icon'} />
                  <p className={`${key === 0 ? 'colorGreen' : ''}`}>{f({ id: `Deposit` })}</p>
                </span>
              }
              key={0}
            >
              {key === 0 && (
                <div className="depositRequest">
                  <div>
                    <div className="text" style={{ marginTop: '10px' }}>
                      {f({
                        id: 'Please choose a transaction method:',
                      })}
                    </div>
                  </div>
                  <div
                    style={{
                      height: '1px',
                      width: 'calc(100% + 40px)',
                      margin: '28px 0 0 -20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    }}
                  />
                  <Form
                    name="rechargeMoney"
                    autoComplete="off"
                    form={form}
                    onFinish={values => {
                      onFinishDeposit(values);
                    }}
                  >
                    <div className="accountInfo">
                      <div className="accountInfo-header">
                        <img src={ic_card} alt="" />
                        <span>{intl.formatMessage({ id: 'Bank information' })}</span>
                      </div>
                      <div className="accountInfo-info">
                        <div className="accountInfo-info-item">
                          <span className="title">{intl.formatMessage({ id: 'Bank' })}</span>
                          {paymentMethod && <div className="content">{paymentMethod[0]?.paymentMethodName || ''}</div>}
                        </div>
                        <div className="accountInfo-info-item">
                          <span className="title">{intl.formatMessage({ id: 'Account number' })}</span>
                          {paymentMethod && (
                            <div className="content">
                              <span>{paymentMethod[0]?.paymentMethodIdentityNumber || ''}</span>
                              {paymentMethod[0]?.paymentMethodIdentityNumber && (
                                <img
                                  className="img background-image"
                                  onClick={() => {
                                    handleCopyUrl(paymentMethod[0]?.paymentMethodIdentityNumber);
                                  }}
                                  src={icCoppy}
                                  alt=""
                                />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="accountInfo-info-item">
                          <span className="title">{intl.formatMessage({ id: 'Account holder' })}</span>
                          {paymentMethod && (
                            <div className="content">
                              <span>{paymentMethod[0]?.paymentMethodReceiverName || ''}</span>
                              {paymentMethod[0]?.paymentMethodReceiverName && (
                                <img
                                  className="img background-image"
                                  onClick={() => {
                                    handleCopyUrl(paymentMethod[0]?.paymentMethodReceiverName);
                                  }}
                                  src={icCoppy}
                                  alt=""
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <div style={{
                        height: "1px",
                        width: "calc(100% + 40px)",
                        margin: "28px 0 0 -20px",
                        backgroundColor: "rgba(255, 255, 255, 0.12)"
                      }} /> */}
                      {/* <div className="accountInfo-header">
                        <img src={ic_Wallet_transf} alt="" />
                        <span>{intl.formatMessage({ id: 'E-wallet information' })}</span>
                      </div>
                      <div className="accountInfo-info">
                        <div className="accountInfo-info-item">
                          <span className="title">{intl.formatMessage({ id: "Wallet address" })}</span>
                          {
                            paymentMethod &&
                            <div className='content'>
                              <span>{paymentMethod ? paymentMethod[1]?.paymentMethodIdentityNumber : ""}</span>
                              {
                                paymentMethod[1]?.paymentMethodIdentityNumber &&
                                <img className="img background-image" onClick={() => {
                                  handleCopyUrl(paymentMethod[1]?.paymentMethodIdentityNumber)
                                }} src={icCoppy} alt='' />
                              }
                            </div>
                          }

                        </div>
                        <div className="accountInfo-info-item">
                          <span className="title">{intl.formatMessage({ id: "Wetwork" })}</span>
                          {
                            paymentMethod &&
                            <div className='content'>
                              <span>{paymentMethod ? paymentMethod[1]?.paymentMethodReceiverName : ""}</span>
                              {
                                paymentMethod[1]?.paymentMethodReceiverName &&
                                <img className="img background-image" onClick={() => {
                                  handleCopyUrl(paymentMethod[1]?.paymentMethodReceiverName)
                                }} src={icCoppy} alt='' />
                              }
                            </div>
                          }
                        </div>
                        <div className="accountInfo-info-item"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column"
                          }}
                        >
                          <span className="title" style={{ width: "100%", display: 'contents' }}>{intl.formatMessage({ id: "or Scan the QR Code below" })}</span>
                          <div >
                            <img className='background-image' src={paymentMethod ? paymentMethod[1]?.paymentMethodImageUrl : ""} alt="" style={{
                              height: "140px",
                              width: "140px",
                              marginTop: "12px"
                            }} />
                          </div>
                        </div>
                      </div> */}
                      <div
                        style={{
                          height: '1px',
                          width: 'calc(100% + 40px)',
                          margin: '28px 0 0 -20px',
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        }}
                      />
                      <div className="accountInfo-header">
                        <img src={ic_Work} alt="" />
                        <span>{intl.formatMessage({ id: 'Deposit' })}</span>
                      </div>
                    </div>

                    <Form.Item
                      name="paymentAmount"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: 'Please enter the amount to deposit' }),
                        },
                        () => ({
                          validator(_, value) {
                            const amountNumber = parseFloat(value?.replaceAll(',', ''));
                            if ((amountNumber < 300000 || isNaN(amountNumber)) && value !== '') {
                              return Promise.reject(
                                new Error(
                                  intl.formatMessage({ id: 'minimumDepositWarningMessage' }) +
                                    (isShowUnitAppCurrency ? ` (USDT)` : ''),
                                ),
                              );
                            }
                            if (amountNumber > 900000000) {
                              return Promise.reject(
                                new Error(
                                  intl.formatMessage({ id: 'Maximum deposit 1000000' }) +
                                    (isShowUnitAppCurrency ? ` (USDT)` : ''),
                                ),
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                      className={'mb-0'}
                    >
                      <div className="input-money">
                        <div className="text-top">
                          {f({ id: 'profile.depositBalance' })} {isShowUnitAppCurrency && `(USDT)`}
                        </div>
                        <InputNumber
                          className="input"
                          placeholder={intl.formatMessage({ id: 'EnterDeposit' })}
                          size="large"
                          value={paymentAmountUSDT}
                          onChange={e => {
                            const amountNumber = e?.toFixed(2);
                            setPaymentAmountUSDT(parseFloat(amountNumber));
                          }}
                          formatter={value => `${value}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <div className="text-bottom">
                          {f({ id: 'Available balances' })}:{' '}
                          {currencyFormatUSD(
                            user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance || 0,
                          )}{' '}
                          {isShowUnitAppCurrency && `(USDT)`}
                        </div>
                      </div>
                    </Form.Item>
                    {/* <Form.Item
                      name="paymentRef"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: 'Please enter transaction code' }),
                        },
                      ]}
                      className={'mb-0'}
                    >
                      <div className="input-money">
                        <span className="text-top">{intl.formatMessage({ id: 'CodeTransaction' })}</span>
                        <Input
                          className="inputText"
                          size="large"
                          placeholder={f({ id: 'Enter transaction code' })}
                        // style={{ border: `${user.tennganhang ? '' : '0.5px solid #666'}` }}
                        />
                      </div>
                    </Form.Item> */}
                    {/* <div className="recharge-uploadImage">
                      <span className="recharge-uploadImage-title">{intl.formatMessage({ id: "Upload image" })}</span>

                      <div className="recharge-uploadImage-content">
                        {
                          !rechargeImage && (
                            <Form.Item
                              name="noneImg"
                              rules={[
                                {
                                  required: true,
                                  message: intl.formatMessage({ id: "Please upload image" }),
                                }
                              ]}
                            >
                              <div className="renderNoneImg">
                                <div
                                  className={'background-image renderNoneImg-icon'}
                                  onClick={() => inputRef.current.click()}
                                >
                                  <span>{f({ id: "Upload image" })}</span>
                                  <img src={ic_upload} alt="" />
                                </div>
                                <input
                                  style={{ display: 'none' }}
                                  ref={inputRef}
                                  type="file"
                                  value={""}
                                  accept="image/png, image/jpeg, image/jpg"
                                  onChange={handleFileChange}
                                />
                              </div>
                            </Form.Item>
                          )}
                        {
                          rechargeImage &&
                          <div className="renderImg">
                            <div
                              className={'background-image renderImg-iconDelete'}
                              style={{ backgroundImage: `url('${icTrash}')` }}
                              onClick={() => handleDeleteImage()}
                            />
                            <div className='imageRecharge background-image' style={{ backgroundImage: `url("${rechargeImage}")` }} />
                          </div>
                        }
                      </div>

                    </div> */}
                    <button className="btnSave">
                      {intl.formatMessage({ id: 'Confirm' })} <img src={icArrowNext} alt="" />{' '}
                    </button>
                  </Form>
                  <div className="note">
                    <div className="title">Chú ý</div>
                    <div className="content">
                      <span style={{ color: '#FFCD08' }}>*</span>{' '}
                      {f({
                        id: 'Same account/family/household address/ phone number / IP address / shared computer / network environment are considered to be the same member pellets. If multiple accounts and the same IP are asked and the account is not clear, all of them will be considered as account suspension fraud.',
                      })}
                    </div>
                  </div>
                </div>
              )}
            </TabPane>
            <TabPane
              tab={
                <span className="d-flex align-items-center">
                  <img src={key === 1 ? icWidthDrawActive : icWidthDraw} style={{ marginRight: '10px' }} alt={'icon'} />
                  <p className={`${key === 1 ? 'colorRed' : ''}`}>{f({ id: `Withdraw` })}</p>
                </span>
              }
              key={1}
            >
              {key === 1 && (
                <div>
                  <Form
                    name="withdrawMoney"
                    autoComplete="off"
                    form={form}
                    onFinish={values => {
                      onFinishWithdraw(values);
                    }}
                  >
                    <div>
                      <div className="text" style={{ marginBottom: '10px' }}>
                        {f({ id: 'The withdrawal amount will be transferred to your wallet' })}
                      </div>
                      <div className="text">
                        {f({ id: 'Please enter the correct information below to make the transaction:' })}
                      </div>
                    </div>

                    <div className="profileUser-header">
                      <img src={ic_card} alt="" />
                      <span>{intl.formatMessage({ id: 'Bank information' })}</span>
                    </div>
                    <div className="profileUser-BankWallet">
                      <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Bank' })}</p>
                      <Form.Item
                        name="withdrawTennganhang"
                        rules={[
                          {
                            required: true,
                            message: intl.formatMessage({ id: 'Select bank name' }),
                          },
                        ]}
                      >
                        <Select
                          className="profileUser-BankWallet-select"
                          showSearch={true}
                          placeholder={intl.formatMessage({ id: 'Select bank name' })}
                          value={user.tennganhang}
                          style={{
                            width: 120,
                          }}
                          options={listbanks}
                          // onChange={(e) => handleEditProfile("tennganhang", e)}
                        />
                      </Form.Item>
                      <p className="profileUser-BankWallet-title">
                        {intl.formatMessage({ id: 'Bank account number' })}
                      </p>
                      <Form.Item
                        name="withdrawSotaikhoan"
                        rules={[
                          {
                            required: true,
                            message: intl.formatMessage({ id: 'Enter bank account name' }),
                          },
                        ]}
                      >
                        <Input
                          className="profileUser-BankWallet-input"
                          value={user?.sotaikhoan || ''}
                          // onChange={(e) => handleEditProfile("sotaikhoan", e.target.value)}
                          placeholder={intl.formatMessage({ id: 'Enter bank account name' })}
                        />
                      </Form.Item>

                      <p className="profileUser-BankWallet-title">{intl.formatMessage({ id: 'Account holder' })}</p>
                      <Form.Item
                        name="withdrawTentaikhoan"
                        rules={[
                          {
                            required: true,
                            message: intl.formatMessage({ id: 'Enter account holder' }),
                          },
                        ]}
                      >
                        <Input
                          className="profileUser-BankWallet-input"
                          value={user?.tentaikhoan || ''}
                          // onChange={(e) => handleEditProfile("tentaikhoan", e.target.value)}
                          placeholder={intl.formatMessage({ id: 'Enter account holder' })}
                        />
                      </Form.Item>
                    </div>
                    <div
                      style={{
                        height: '1px',
                        width: 'calc(100% + 40px)',
                        margin: '32px 0 0 -20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      }}
                    />

                    <Form.Item
                      name="withdrawAmount"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: 'Please enter the amount to withdraw' }),
                        },
                        () => ({
                          validator(_, value) {
                            const amountNumber = parseFloat(value?.replaceAll(',', ''));
                            if ((amountNumber < 100000 || isNaN(amountNumber)) && value !== '') {
                              return Promise.reject(
                                new Error(
                                  intl.formatMessage({ id: 'minimumWithdrawWarningMessage' }) +
                                    (isShowUnitAppCurrency ? ` (USDT)` : ''),
                                ),
                              );
                            }

                            if (amountNumber > 900000000) {
                              return Promise.reject(
                                new Error(
                                  intl.formatMessage({ id: 'Maximum withdraw 1000000' }) +
                                    (isShowUnitAppCurrency ? ` (USDT)` : ''),
                                ),
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                      className={'mb-0'}
                    >
                      <div className="input-money">
                        <div className="text-top">
                          {f({ id: 'withdraw.withdraw_amount' })} {isShowUnitAppCurrency && `(USDT)`}
                        </div>
                        <InputNumber
                          className="input"
                          placeholder={intl.formatMessage({ id: 'EnterWithdraw' })}
                          size="large"
                          value={withdrawAmountUSDT}
                          onChange={e => {
                            const amountNumber = e?.toFixed(2);
                            setWithdrawAmountUSDT(parseFloat(amountNumber));
                          }}
                          formatter={value => `${value}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <div className="text-bottom">
                          {f({ id: 'Available balances' })}:{' '}
                          {currencyFormatUSD(
                            user?.wallets?.find(wallet => wallet.walletType === 'PointWallet')?.balance || 0,
                          )}{' '}
                          {isShowUnitAppCurrency && `(USDT)`}
                        </div>
                      </div>
                    </Form.Item>
                    <button className="btnSave">
                      {intl.formatMessage({ id: 'Confirm' })} <img src={icArrowNext} alt="" />{' '}
                    </button>
                  </Form>
                  <div className="note">
                    <div className="title">Chú ý</div>
                    <div className="content">
                      <span style={{ color: '#FFCD08' }}>*</span>{' '}
                      {f({
                        id: 'Same account/family/household address/ phone number / IP address / shared computer / network environment are considered to be the same member pellets. If multiple accounts and the same IP are asked and the account is not clear, all of them will be considered as account suspension fraud.',
                      })}
                    </div>
                  </div>
                </div>
              )}
            </TabPane>
            {/* )
              })
            } */}
          </Tabs>
        </div>
      </div>
    </Page>
  );
}
export default injectIntl(Recharge);
