/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Form, Input } from 'antd';
import Page from 'components/Page/Page';
import React, { useState } from 'react';
import './styles/saleTransaction.scss';
import icArrowNext from '../../assets/stock-icons/ic-arrowNext.svg';
import History from '../../services/history';

function SaleTransaction() {
  const [form] = Form.useForm();
  const [dataDetailSale, setDataDetailSale] = useState({});

  // useEffect(() => {
  //   const params = {

  //   }
  //   getDataIWantToSale(params)
  // }, [])

  function getDataIWantToSale(params) {
    History.getDataDetailIWantSale(params).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setDataDetailSale(data?.data);
      }
    });
  }
  return (
    <Page headerTitle="Tôi muốn bán">
      <div id="SaleTransaction">
        <div className="saleTransaction">
          <div className="saleTransaction-info">
            <span className="title">Thông tin</span>
            <div className="infoContent">
              <div className="infoContent-item">
                <span className="name">Họ tên</span>
                <span className="content">Tống Thiên Di</span>
              </div>
              <div className="infoContent-item">
                <span className="name">Tài khoản ngân hàng</span>
                <span className="content">Tống Thiên Di</span>
              </div>
              <div className="infoContent-item">
                <span className="name">Tên ngân hàng</span>
                <span className="content">Tống Thiên Di</span>
              </div>
              <div className="infoContent-item">
                <span className="name">Giá tiền trước đó (USDT)</span>
                <span className="content">Tống Thiên Di</span>
              </div>
              <div className="infoContent-item">
                <span className="name">Giá tiền bán ra ưu đãi nhất</span>
                <span className="content">Tống Thiên Di</span>
              </div>
            </div>
          </div>

          <div className="saleTransaction-form">
            <Form
              name="saleTransactionForm"
              autoComplete="off"
              form={form}
              // onFinish={values => {
              //   onFinish(values);
              // }}
            >
              <div className="saleTransaction-form">
                <span className="saleTransaction-form-title">Giao dịch</span>
                <div className="saleTransaction-form-content">
                  <Form.Item
                    name="paymentAmount"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số tiền bán ra',
                      },
                      () => ({
                        validator(_, value) {
                          // setFee(value);
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
                      <span className="title">Nhập tiền bán ra</span>
                      <Input
                        className="input"
                        placeholder={'Vui lòng nhập giá tiền bán ra'}
                        type="number"
                        size="large"
                      />
                      <div className="bar" />
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="paymentQuantity"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số lượng bán ra',
                      },
                      () => ({
                        validator(_, value) {
                          // setFee(value);
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
                      <span className="title">Số lượng bán ra</span>
                      <Input
                        className="input"
                        placeholder={'Vui lòng nhập số lượng bán ra'}
                        type="number"
                        size="large"
                      />
                      <div className="bar" />
                    </div>
                  </Form.Item>
                </div>
              </div>

              <button className="btnSave">
                Xác nhận bán ra <img src={icArrowNext} alt="" />{' '}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Page>
  );
}
export default SaleTransaction;
