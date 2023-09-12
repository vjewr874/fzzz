import Request from "./request";
export default class PaymentMethodService {
  static async findPaymentMethod(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentMethod/find",
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

  static async insertPaymentMethod(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/PaymentMethod/insert",
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
        path: "/PaymentMethod/updateById",
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
        path: "/PaymentMethod/deleteById",
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
}
