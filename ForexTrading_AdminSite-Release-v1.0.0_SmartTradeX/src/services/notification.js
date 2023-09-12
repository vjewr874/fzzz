import Request from "./request";
export default class NotificationList {
    static async createNotification(data = {},api) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: api,
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

    static async detailNotification(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/GroupCustomerMessage/findById",
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
