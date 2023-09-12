import Request from './request'

export default class DepositHistory {
  static async findDepositHistory(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentDepositTransaction/find",
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

  static async findDetailPositHistory(id) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentDepositTransaction/findById",
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

  static async approveDepositTransaction(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentDepositTransaction/approveDepositTransaction",
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
  static async denyDepositTransaction(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentDepositTransaction/denyDepositTransaction",
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

  static async insertPaymentDeposit(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentDepositTransaction/insert",
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

//   static async addRewardPointForUser(params) {
//     return new Promise((resolve, reject) => {
//       Request.send({
//         method: "POST",
//         path: "/PaymentDepositTransaction/addRewardPointForUser",
//         data: params, 
//       }).then((result) => {
//         const { statusCode, error } = result;
//         if (statusCode === 200) {
//           return resolve();
//         } else {
//           reject(new Error(error));
//         }
//       }).catch(error => {
//         reject(error);
//       });
//     });
//   }
}