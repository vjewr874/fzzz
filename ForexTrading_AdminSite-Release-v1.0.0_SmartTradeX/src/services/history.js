import Request from "./request";
export default class History {
    static async listHistory(data = {},api) {
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
    static async detailHistory(data = {},api) {
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
    static async approveRefuseRequest(data = {},api) {
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
}