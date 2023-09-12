/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Request from './request';

export default class BuyLotteryAPI {
  static async getLotteryList(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'Product/user/getList',
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

  static async getPreCheckOrder(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'ProductOrder/user/userPrecheckOrder',
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
  static async getPayment(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'ProductOrder/user/userPlaceOrder',
        data,
      }).then((result = {}) => {
        const { statusCode, data, message, error } = result;

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message, error });
        }
      });
    });
  }
}
