/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Request from './request';

export default class PaymentDepositTransaction {
  static async insert(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentDepositTransaction/insert',
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

  static async requestDeposit(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentDepositTransaction/user/requestDeposit',
        data,
      }).then(result => {
        const { statusCode, data, message, error } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message, error });
        }
      });
    });
  }

  static async requestWithdraw(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentWithdrawTransaction/user/requestWithdrawPOINT',
        data,
      }).then(result => {
        const { statusCode, data, message, error } = result;
        if (statusCode === 200) {
          return resolve({ isSuccess: true, data });
        } else {
          return resolve({ isSuccess: false, message, error });
        }
      });
    });
  }

  static async depositHistory(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentDepositTransaction/user/depositHistory',
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

  static async viewHistoryFAC(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'WalletRecord/user/viewHistoryFAC',
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

  static async viewHistoryPOINT(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'WalletRecord/user/viewHistoryPOINT',
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

  static async bonusHistory(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentBonusTransaction/user/bonusHistory',
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

  static async requestWithdrawBonus(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentBonusTransaction/user/requestWithdrawBonus',
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
  static async requestExchangePoint(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'PaymentBonusTransaction/user/requestExchangePoint',
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
  static async viewHistoryBTC(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'WalletRecord/user/viewHistoryBTC',
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
  static async viewHistory(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'WalletRecord/user/viewHistory',
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

  static async summaryByUser(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'WalletRecord/user/summaryByUser',
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

  static async sendMoneyToGimolott(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'Gimolott/user/requestDepositGimollot',
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
  static async receiveMoneyFromGimolott(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'Gimolott/user/requestWithdrawGimollot',
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
