import Request from "./request";
export default class CustomerMessageService {
  static async findMessage(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/GroupCustomerMessage/find",
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

  static async findDetailMessageById(groupCustomerMessageId){
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/GroupCustomerMessage/findById",
        data: {
          id: groupCustomerMessageId,
        },
      }).then((result = {}) => {
        const { statusCode, data, message } = result;
        if (statusCode === 200) {
          return resolve(data);
        } else {
          return reject(message);
        }
      }).catch(error => {
        reject(error);
      })
    });
  }

  static async deleteNotification(customerMessageId){
    return new Promise ((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/CustomerMessage/staff/deleteNotification",
        data: {
          customerMessageId: customerMessageId,
        }
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

  static async deleteAllNotification(customerMessageId){
    return new Promise ((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/CustomerMessage/staff/deleteAllNotification",
        data: {
          customerMessageId: customerMessageId,
        }
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

  static async findMessagesSent(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/CustomerMessage/findMessagesSent",
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

  static async insertMessage(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/GroupCustomerMessage/insert",
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

  static async sendMessageByCustomerList(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/CustomerMessage/staff/sendMessageByCustomerList",
        data: params,
      }).then((result) => {
        const { statusCode, error } = result;
        if (statusCode === 200) {
          resolve();
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static async sendMessageByFilter(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/CustomerMessage/staff/sendMessageByFilter",
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

  static async uploadImage(params) {
    return new Promise((resolve, reject) => {
        Request.send({
            method: "POST",
            path: "/Upload/uploadMediaFile",
            data: params
        }).then(result => {
            const { statusCode, data, message } = result
            if (statusCode === 200) {
                resolve(data)
            } else {
                throw new Error(message);
            }
        }).catch(error => {
            reject(error);
        })
    })
  }
}
