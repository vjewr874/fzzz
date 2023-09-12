import Request from "./request";
export default class PrizeService {
  static async findPrize(data = {}) {
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/LeaderBoard/admin/find",
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


  static async updateRanking(params){
    return new Promise((resolve, reject) => {
      Request.send({
        method: "POST",
        path: "/LeaderBoard/admin/updateRanking",
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
