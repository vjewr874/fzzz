/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Request from './request';

export default class History {
  static async getBookingHistoryList(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'ProductOrder/user/getList',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async SaleQuantityUSDT(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: '/ProductOrder/user/userPlaceSellingOrder',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async getDataDetailIWantSale(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: '/ProductOrder/user/userPlaceOrder',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }

  static async SaleUSDT(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'ProductOrder/user/exchangeCurrencyByOrder',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data, message });
        } else {
          return resolve({ isSuccess: false, message });
        }
      });
    });
  }
}
