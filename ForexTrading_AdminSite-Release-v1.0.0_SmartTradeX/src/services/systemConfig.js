import Request from "./request";
export default class SystemConfig {
    static async showSystemConfig(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/SystemConfigurations/find",
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
    static async updateSystemConfig(data = {}) {
        return new Promise((resolve, reject) => {
            Request.send({
                method: "POST",
                path: "/SystemConfigurations/updateConfigs",
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
