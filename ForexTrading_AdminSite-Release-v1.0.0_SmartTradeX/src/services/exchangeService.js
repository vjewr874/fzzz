import Request from './request'

export default class ExchangeHistory {
  static async findExchangeHistory(params) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentExchangeTransaction/find",
        data:params
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

  static async findDetailExchangeHistory(id) {
    return new Promise((resolve, reject) => { 
      Request.send({
        method: "POST",
        path: "/PaymentExchangeTransaction/findById",
        data: {
          id: id,
        }
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