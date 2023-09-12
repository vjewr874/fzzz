import Request from './request'

export default class BonusDecreaseService {

  static async increaseBalance(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/Wallet/increaseBalance",
        data: params
      }).then(result =>{ 
        const { statusCode, data,message} = result
        if(statusCode === 200) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  }

  static async decreaseBalance(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/Wallet/decreaseBalance",
        data: params
      }).then(result =>{ 
        const { statusCode, data,message} = result
        if(statusCode === 200) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  }
}