import Request from "./request";
export default class OrganizationService {
  static async findOrganization(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsersMembership/find",
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

  static async insertOrganization(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsersMembership/insert",
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
        path: "/AppUsersMembership/updateById",
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
        path: "/AppUsersMembership/deleteById",
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
