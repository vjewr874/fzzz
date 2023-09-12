import Request from "./request";
export default class SystemConfigurationService {
  static async find(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/SystemConfigurations/find",
        data: params,
      })
        .then((result) => {
          const { statusCode, data, error } = result;
          if (statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(error));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async updateConfigs(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/SystemConfigurations/updateConfigs",
        data: {
          data: params,
        },
      })
        .then((result) => {
          const { statusCode, error } = result;
          if (statusCode === 200) {
            return resolve();
          } else {
            reject(new Error(error));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async uploadMediaFile(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/Upload/uploadMediaFile",
        data: params,
      })
        .then((result) => {
          const { statusCode, data, error } = result;
          if (statusCode === 200) {
            return resolve(data);
          } else {
            reject(new Error(error));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
