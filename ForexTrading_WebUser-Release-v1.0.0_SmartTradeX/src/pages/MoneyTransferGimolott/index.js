/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import Page from '../../components/Page/Page';
import WalletAmount from '../../components/WalletAmount/WalletAmount';
import './styles/MoneyTransferGimolott.scss';
import { Form, Input, Tabs } from 'antd';
import { useUser } from '../../context/UserContext';
import PaymentDepositTransaction from '../../services/paymentDepositTransaction';
import swal from 'sweetalert';

function MoneyTransferGimolott(props) {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const { user } = useUser();
  const { TabPane } = Tabs;
  const [reload, setReload] = useState(true);

  function onFinish2(values) {
    if (
      parseInt(values?.withdrawGimolott) > user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').balance
    ) {
      swal(`Không đủ tiền trong ví`, {
        icon: 'warning',
      });
    } else if (parseInt(values?.withdrawGimolott) < 0) {
      swal(`Vui lòng không nhập giá trị nhỏ hơn 0`, {
        icon: 'warning',
      });
    } else {
      const walletId = user?.wallets?.find(wallet => wallet?.walletType === 'PointWallet').walletId;
      const params = {
        paymentAmount: parseInt(values?.withdrawGimolott),
        walletId: walletId,
        paymentFeeAmount: parseInt((parseInt(values?.withdrawGimolott) * 0.02).toFixed(0)),
      };
      sendMoneyToGimolott(params);
    }
  }
  function onFinish1(values) {
    const param = {
      paymentAmount: parseInt(values.depositGimolott),
    };
    receiveMoneyFromGimolott(param);
  }
  function sendMoneyToGimolott(data) {
    PaymentDepositTransaction.sendMoneyToGimolott(data).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        setReload(!reload);
        swal(`Yêu cầu rút tiền thành công`, {
          icon: 'success',
        });
        form2.resetFields();
      } else {
        swal(`Có lỗi rồi!!!!`, {
          icon: 'warning',
        });
      }
    });
  }
  function receiveMoneyFromGimolott(data) {
    PaymentDepositTransaction.receiveMoneyFromGimolott(data).then(result => {
      const { isSuccess } = result;
      if (isSuccess) {
        swal(`Yêu cầu nạp tiền thành công`, {
          icon: 'success',
        });
        setReload(!reload);
        form1.resetFields();
      } else {
        swal(`Có lỗi rồi!!!!`, {
          icon: 'warning',
        });
      }
    });
  }
  return (
    <Page headerTitle={'Chuyển tiền qua Gimolott'} isHideItemRigth={true}>
      <div id={'MoneyTransferGimolott'}>
        <div className={'money'}>
          <WalletAmount reload={reload} type={'PointWallet'} title={'Ví chính'} />
        </div>
        <div className={'container-payment'}>
          <Tabs defaultActiveKey="1" className={'container-payment-tabs'}>
            {/*<TabPane tab={"NẠP TIỀN"} key={"0"}>*/}
            {/*    <div className={"container-payment-content"}>*/}
            {/*        <span className={"introduce"}>*/}
            {/*            Số tiền nạp sẽ được chuyển từ Tài khoản Gimolott sang ví chính của bạn.*/}
            {/*            Vui lòng nhập chính xác thông tin bên dưới để thực hiện giao dịch:*/}
            {/*        </span>*/}
            {/*        <span className={"type"}>Số tiền nạp</span>*/}
            {/*        <Form*/}
            {/*            name="depositGimo"*/}
            {/*            autoComplete="off"*/}
            {/*            form={form1}*/}
            {/*            onFinish={(values) => {*/}
            {/*                onFinish1(values)*/}
            {/*        }}>*/}
            {/*            <Form.Item*/}
            {/*                name="depositGimolott"*/}
            {/*                rules={[*/}
            {/*                    {*/}
            {/*                        required: true,*/}
            {/*                        message: 'Vui lòng nhập số tiền cần nạp'*/}
            {/*                    },*/}
            {/*                    () => ({*/}
            {/*                        validator(_, value) {*/}
            {/*                            if (value <=0 && value !== "") {*/}
            {/*                                return Promise.reject(new Error('Vui lòng không nhập giá trị nhỏ hơn hoặc bằng 0'));*/}
            {/*                            }*/}
            {/*                            if (value > 100000000) {*/}
            {/*                                return Promise.reject(new Error('Số tiền nạp tối đa: 100.000.000đ'));*/}
            {/*                            }*/}
            {/*                            return Promise.resolve();*/}
            {/*                        },*/}
            {/*                    }),*/}
            {/*                ]}*/}
            {/*                className={'mb-0'}*/}
            {/*            >*/}
            {/*                <div className="container-input">*/}
            {/*                    <Input*/}
            {/*                        className="input"*/}
            {/*                        placeholder={'Nhập số tiền muốn nạp'}*/}
            {/*                        type="number"*/}
            {/*                        size="large"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </Form.Item>*/}
            {/*            <div styles={{marginTop:"53px"}}>*/}
            {/*                <button className={'btn btn-main w-100 m-0'}>Xác nhận</button>*/}
            {/*            </div>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</TabPane>*/}
            <TabPane tab={'RÚT TIỀN'} key={'1'}>
              <div className={'container-payment-content'}>
                <span className={'introduce'}>
                  Số tiền rút sẽ được chuyển từ Ví chính chuyển về tài khoản chính bên Gimolott của bạn. Vui lòng nhập
                  chính xác thông tin bên dưới để thực hiện giao dịch:
                </span>
                <span className={'type'}>Số tiền muốn rút</span>
                <Form
                  name="withdrawGimo"
                  autoComplete="off"
                  form={form2}
                  onFinish={values => {
                    onFinish2(values);
                  }}
                >
                  <Form.Item
                    name="withdrawGimolott"
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
                      <Input
                        className="input"
                        placeholder={'Số tiền rút tối thiểu: 50,000 đ'}
                        type="number"
                        size="large"
                      />
                    </div>
                  </Form.Item>
                  <div style={{ marginTop: '53px' }}>
                    <button className={'btn btn-main w-100 m-0'}>Xác nhận</button>
                  </div>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Page>
  );
}
export default injectIntl(MoneyTransferGimolott);
