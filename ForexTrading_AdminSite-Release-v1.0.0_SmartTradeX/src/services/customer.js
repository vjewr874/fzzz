import Request from "./request";
export default class Customer {
    static async listCustomer(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/AppUsers/find",
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
    static async detailCustomer(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/AppUsers/findById",
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
    static async changeIncreaseDecreasePoint(params,type) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: `/Wallet/${type}Balance`,
                data: params
            }).then(result => {
                const { statusCode, data, message } = result
                if (statusCode === 200) {
                    resolve(result)
                } else {
                    throw new Error(message);
                }
            }).catch(error => {
                reject(error);
            })
        })
    }
    static async updateDetailCustomer(params) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: `/AppUsers/updateUserById`,
                data: params
            }).then(result => {
                const { statusCode, data, message } = result
                if (statusCode === 200) {
                    resolve(result)
                } else {
                    throw new Error(message);
                }
            }).catch(error => {
                reject(error);
            })
        })
    }

    static async updatePasswordCustomer(params) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: `/AppUsers/adminChangePasswordUser`,
                data: params
            }).then(result => {
                const { statusCode, data, message } = result
                if (statusCode === 200) {
                    resolve(result)
                } else {
                    throw new Error(message);
                }
            }).catch(error => {
                reject(error);
            })
        })
    }
}
