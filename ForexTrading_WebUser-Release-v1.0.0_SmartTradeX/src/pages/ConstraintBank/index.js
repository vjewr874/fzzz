/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Page from '../../components/Page/Page';
import AppUsers from 'services/apppUsers';
import { Form, Input } from 'antd';
import { handleUpdateDetail } from '../../actions';
//styles
import './styles/constraint-bank.scss';
import { injectIntl, useIntl } from 'react-intl';
import { useUser } from '../../context/UserContext';
import swal from 'sweetalert';
import Loader from '../../components/Loader';

const ConstraintBank = props => {
  const { formatMessage: f } = useIntl();
  const { intl } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useUser();
  const dataUser = JSON.parse(localStorage.getItem('data'));
  const [isLoading, setIsLoading] = useState(false);
  // const [dataToUpdate, setDataToUpdate] = useState({
  //   tentaikhoan: "",
  //   phoneNumber: "",
  //   sotaikhoan: "",
  //   tennganhang: ""
  // })

  // useEffect(() => {
  //   if (dataUser) {
  //     setDataToUpdate({
  //       tentaikhoan: dataUser?.tentaikhoan,
  //       phoneNumber: dataUser?.phoneNumber,
  //       sotaikhoan: dataUser?.sotaikhoan,
  //       tennganhang: dataUser?.tennganhang
  //     })
  //   }
  // }, [])
  // const openNotification = (placement, types, info) => {
  //   notification[types]({
  //     message: `${info}`,
  //     description:
  //       '',
  //     placement,
  //   });
  // };
  //   function getDetailUserById() {
  //     AppUsers.getDetailUserById({
  //         id: dataUser?.appUserId
  //     }).then((result) => {
  //         const {isSuccess, data} = result
  //         if (isSuccess) {
  //             dispatch(handleUpdateDetail(data))
  //             //setInfo(data)
  //         }
  //     })
  // }
  //   function updateInfoUser(object) {
  //     AppUsers.updateInfoUser({
  //       id: dataUser?.appUserId,
  //       data: object
  //     }).then((result) => {
  //       const {isSuccess} = result
  //       if (isSuccess) {
  //         openNotification("top", "success", "Thành Công")
  //         getDetailUserById()
  //       }
  //       else {
  //         openNotification("top", "error", "Lỗi")
  //       }
  //     })
  //   }
  //   function handleEditBank(name, value) {
  //     switch (name) {
  //       case 'tentaikhoan':
  //         dataToUpdate.tentaikhoan = value
  //         setDataToUpdate({...dataToUpdate})
  //         break
  //       case 'phoneNumber':
  //         dataToUpdate.phoneNumber = value
  //         setDataToUpdate({...dataToUpdate})
  //         break
  //       case 'sotaikhoan':
  //         dataToUpdate.sotaikhoan = value
  //         setDataToUpdate({...dataToUpdate})
  //         break
  //       case 'tennganhang':
  //         dataToUpdate.tennganhang = value
  //         setDataToUpdate({...dataToUpdate})
  //         break
  //       default:
  //         break
  //     }
  //   }

  function onFinish(values) {
    setIsLoading(true);
    const newDataUser = {
      id: user?.appUserId,
      data: {
        sotaikhoan: values?.accountNumber,
        tentaikhoan: values?.accountName,
        tennganhang: values?.bankName,
        phoneNumber: values?.phoneNumber,
      },
    };
    updateUser(newDataUser);
  }
  function updateUser(data) {
    AppUsers.updateInfoUser(data).then(result => {
      const { isSuccess, error } = result;
      setIsLoading(false);
      if (isSuccess) {
        swal(f({ id: 'Update successful' }), {
          icon: 'success',
        });
        handleReload();
      } else {
        handledErrorUser(error);
      }
    });
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
    <Page isHideItemRight={true} headerTitle={f({ id: 'profile.detail_account' })}>
      <div id="ConstraintBank">
        {isLoading ? <Loader /> : null}
        <div className="constraint-container">
          <Form
            name="constraint-form"
            autoComplete="off"
            form={form}
            onFinish={values => {
              onFinish(values);
            }}
          >
            <div className="constraint">
              <div className="constraint-infoUser">
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
                        {/*<Input className="input" size="large" defaultValue={user.tentaikhoan} disabled={user.tentaikhoan} styles={{border:`${user.tentaikhoan? "": "0.5px solid #666"}`}}/>*/}
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
                            message: f({ id: 'Please enter the phone number' }),
                          },
                        ]}
                        className={'mb-0'}
                      >
                        <div className="cover-input">
                          <span className="name">{f({ id: 'Phone number' })}</span>
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
                        <span className="name">{f({ id: 'Phone number' })}</span>
                        <p>{user?.phoneNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={'container-btn'} style={{ marginTop: '40px' }}>
                <button className={'btn-main w-100 m-0'} disabled={user.tennganhang}>
                  {f({ id: 'Save' })}
                </button>
              </div>
            </div>
          </Form>

          {/*<div className={'constraint-row'}>*/}
          {/*  <div className={'constraint-line'}>*/}
          {/*    <div className="constraint-line-left">*/}
          {/*      <p>Họ tên</p>*/}
          {/*      <p>mở tài khoản</p>*/}
          {/*    </div>*/}
          {/*    <input className="constraint-line-right"*/}
          {/*      value={dataToUpdate?.tentaikhoan || ""}*/}
          {/*      onChange={(e) => handleEditBank("tentaikhoan", e.target.value)}*/}
          {/*      />*/}
          {/*  </div>*/}
          {/*  <div className={'constraint-line'}>*/}
          {/*    <div className="constraint-line-left">*/}
          {/*      <p>Số điện thoại</p>*/}
          {/*    </div>*/}
          {/*    <input className="constraint-line-right"*/}
          {/*      value={dataToUpdate?.phoneNumber || ""}*/}
          {/*      onChange={(e) => handleEditBank("phoneNumber", e.target.value)}*/}
          {/*      />*/}
          {/*  </div>*/}
          {/*  <div className={'constraint-line'}>*/}
          {/*    <div className="constraint-line-left">*/}
          {/*      <p>Tài khoản</p>*/}
          {/*      <p>ngân hàng</p>*/}
          {/*    </div>*/}
          {/*    <input className="constraint-line-right"*/}
          {/*      value={dataToUpdate?.sotaikhoan || ""}*/}
          {/*      onChange={(e) => handleEditBank("sotaikhoan", e.target.value)}*/}
          {/*      />*/}
          {/*  </div>*/}
          {/*  <div className={'constraint-line'}>*/}
          {/*    <div className="constraint-line-left">*/}
          {/*      <p>Tên ngân hàng</p>*/}
          {/*    </div>*/}
          {/*    <input className="constraint-line-right"*/}
          {/*      value={dataToUpdate?.tennganhang || ""}*/}
          {/*      onChange={(e) => handleEditBank("tennganhang", e.target.value)}*/}
          {/*      />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        {/*<div className="constraint-btnSave"*/}
        {/*  onClick={() => updateInfoUser(*/}
        {/*    dataToUpdate*/}
        {/*  )}*/}
        {/*>*/}
        {/*  Lưu*/}
        {/*</div>*/}
      </div>
    </Page>
  );
};
export default injectIntl(ConstraintBank);
