import Request from "./request";

export default class gameService {
  static async find(params = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/BetRecords/find",
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
}
