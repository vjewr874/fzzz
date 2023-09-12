/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Request from './request';

export default class PaymentWithdrawTransaction {
  static async requestWithdrawUSDT(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentWithdrawTransaction/user/requestWithdrawUSDT',
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

  static async requestWithdrawBTC(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentWithdrawTransaction/user/requestWithdrawBTC',
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

  static async withdrawHistoryUSDT(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentWithdrawTransaction/user/withdrawHistory',
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

  static async withdrawHistory(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentWithdrawTransaction/user/withdrawHistory',
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
  static async requestWithdraw(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentWithdrawTransaction/user/requestWithdraw',
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
