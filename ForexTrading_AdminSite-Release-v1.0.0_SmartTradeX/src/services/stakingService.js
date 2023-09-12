import Request from "./request";

export default class StakingService {
  static async findStaking(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/StakingPackage/find",
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

  static async getStaking(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/StakingPackage/getList",
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

  static async findById(stakingPackageId) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/StakingPackage/findById",
        data: {
          id: stakingPackageId
        },
      }).then((result) => {
        const {statusCode, data , error} =result;
        if (statusCode === 200) {
          return resolve(data);
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      })
    })
  }

  static async insertStaking(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/StakingPackage/insert",
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
        path: "/StakingPackage/updateById",
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
        path: "/StakingPackage/deleteById",
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
