/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Request from './request';

export default class ProductOrderUser {
  static async getProductOrderById(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'ProductOrder/user/findById',
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

  static async getHistoryOrder(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'ProductOrder/user/getHistoryOrder',
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
}
