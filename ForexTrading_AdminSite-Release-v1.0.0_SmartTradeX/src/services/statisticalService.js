import Request from "./request";

export default class StatisticalService {
  static async getStatistical(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/Statistical/generalReport",
        data: params,
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

  static async summaryUserReport(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/Statistical/summaryUserReport",
        data: params,
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

  static async getPaymentPending(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/Statistical/paymentStatisticCount",
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
    })
  }
}
