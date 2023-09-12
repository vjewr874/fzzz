import Request from "./request";
export default class PaymentPackageService {
  static async findPaymentPackage(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/find",
        data: data,
      }).then((result) => {
        const { statusCode, data, error } = result;
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static async findUserBuyPackage(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/findUserBuyPackage",
        data: data,
      }).then((result) => {
        const { statusCode, data, error } = result;
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static async findById(paymentServicePackageId) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/findById",
        data: {
          id: paymentServicePackageId
        },
      }).then((result) => {
        const {statusCode, error} =result;
        if (statusCode === 200) {
          return resolve();
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      })
    })
  }

  static async completePackageUser(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/adminCompletePackagesById",
        data: params
      }).then((result) => {
        const {statusCode, error} =result;
        if (statusCode === 200) {
          return resolve();
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      })
    })
  }

  static async insertPaymentPackage(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/insert",
        data: params,
      }).then((result) => {
        const {statusCode, error} =result;
        if (statusCode === 200) {
          return resolve();
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      })
    })
  }

  static async updateById(params){
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/updateById",
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
    })
  }

  static async activePackagesList(paymentServicePackageId){
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/activatePackagesByIdList",
        data: {
          "idList": [
            paymentServicePackageId
          ]
        }, 
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
    })
  }

  static async deactivatePackagesByIdList(paymentServicePackageId){
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/deactivatePackagesByIdList",
        data: {
          "idList": [
            paymentServicePackageId
          ]
        },
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
    })
  }

  static async rewardProfit(params){
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/rewardProfitBonusForUser",
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
    })
  }

  static async deleteById(params){
    return new Promise ((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/deleteById",
        data: params
      }).then((result = {}) => {
        const { statusCode, error } = result
        if (statusCode === 200) {
          return resolve();
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      })
    })
  }

  static async countAllUserPackage(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/countAllUserPackage",
        data: data,
      }).then((result) => {
        const { statusCode, data, error } = result;
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static async historyCancelServicePackage(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/admin/historyCancelServicePackage",
        data: data,
      }).then((result) => {
        const { statusCode, data, error } = result;
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static async historyCompleteServicePackage(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/admin/historyCompleteServicePackage",
        data: data,
      }).then((result) => {
        const { statusCode, data, error } = result;
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static async updateChangeComplete(params){
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentServicePackage/admin/updateById",
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
    })
  }
}
