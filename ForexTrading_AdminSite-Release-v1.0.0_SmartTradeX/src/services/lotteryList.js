import Request from "./request";
export default class LotteryList {
    static async createProduct(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/Product/insert",
                data: data,
            }).then((result) => {
                const { statusCode, error } = result
                if (statusCode === 200) {
                    resolve(result)
                } else {
                    reject(new Error(error));
                }
            }).catch(error => {
                reject(error);
            });
        });
    }
    static async updateProduct(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/Product/updateById",
                data: data,
            }).then((result) => {
                const { statusCode, error } = result
                if (statusCode === 200) {
                    resolve(result)
                } else {
                    reject(new Error(error));
                }
            }).catch(error => {
                reject(error);
            });
        });
    }
    static async detailProduct(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/Product/findById",
                data: data,
            }).then((result) => {
                const { statusCode, error } = result
                if (statusCode === 200) {
                    resolve(result)
                } else {
                    reject(new Error(error));
                }
            }).catch(error => {
                reject(error);
            });
        });
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
