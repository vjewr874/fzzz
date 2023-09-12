import Request from "./request";

export default class gameService {
  static async getLastGameRecord(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/GameRecord/getCurrentGameRecord",
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

  static async getGameRecord(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/GameRecord/find",
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

  static async findDetailUserById(id) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/findById",
        data: {
          id: id,
        },
      }).then((result = {}) => {
        const { statusCode, data, message } = result;
        if (statusCode === 200) {
          return resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }

  static async updateUserById(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/updateUserById",
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

  static async verifyInfoUser(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/verifyInfoUser",
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

  static async rejectInfoUser(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/rejectInfoUser",
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

  static async uploadAvatar(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/uploadAvatar",
        data: params,
      }).then((result) => {
        const { statusCode, data, error } = result;
        if (statusCode === 200) {
          return resolve(data);
        } else {
          reject(new Error(error));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static async exportExcel(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/exportExcel",
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

  static async adminChangePasswordUser(params) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/adminChangePasswordUser",
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

  static async findAllUsersFollowingReferId(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/AppUsers/findAllUsersFollowingReferId",
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

  static async gameRecordUpdateById(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/GameRecord/updateById",
        data: params,
      }).then((result) => {
        console.log('==============sẻvice=========',result);
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
}
