import Request from './request'

export default class WithdrawHistory {
  static async findWithdrawHistory(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentWithdrawTransaction/find",
        data:params
      }).then(result =>{ 
        const { statusCode, data,message} = result
        if(statusCode === 200) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  }

  static async findDetailWithdrawHistory(id) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentWithdrawTransaction/findById",
        data: {
          id: id,
        }
      }).then(result =>{ 
        const { statusCode, data,message} = result
        if(statusCode === 200) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  }

  static async approveWithdrawTransaction(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentWithdrawTransaction/approveWithdrawTransaction",
        data:params
      }).then(result =>{ 
        const { statusCode, data,message} = result
        if(statusCode === 200) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  }
  static async denyWithdrawTransaction(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentWithdrawTransaction/denyWithdrawTransaction",
        data:params
      }).then(result =>{ 
        const { statusCode, data,message} = result
        if(statusCode === 200) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  }

  static async insertPaymentWithdraw(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentWithdrawTransaction/insert",
        data: params, 
      }).then((result) => {
        const { statusCode, error } = result;
        if (statusCode === 200) {
          return resolve();
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }
}